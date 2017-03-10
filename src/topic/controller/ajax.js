// +----------------------------------------------------------------------
// | PeanutRoll [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.peanutroll.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Arterli <zhengqsh@126.com>
// +----------------------------------------------------------------------
'use strict';
import moment from "moment"
moment.locale('zh-cn');
import Base from './base.js';
export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
     indexAction(){
        let doaction = this.get('action');
        console.log(doaction);
        if(doaction == 'topic'){
          this.action('ajax',doaction);
        }else{
          this.http.error = new Error('分类不存在或者被禁用！');
          return think.statusAction(702, this.http);
        }
        
    }
/**
 * 获取数据标签
 * {% topic data = "data"%}
 * topic:标签名称
 * data:接受返回数据的变量名称，例: data = "data"
 * page: 设置查询开始页面，从1开始，默认为0，例：page = "2"
 * limit: 设置查询结果的条数，例: limit="10",limit="3,10"
 * cid: 栏目id ,单个栏目 cid="1",多个栏目 cid = "1,2,3,4" , 不写调取全部栏目
 * {{name|get_url(id)}}文章链接
 * type: 标签类型,hot-按照浏览量从高到底,level-安装优先级从高到低排序,默认安装更新时间排序
 * //{% topic data = "data",limit= "5",cid=category.id,type="hot"%}
 * position:1:列表推荐,2:频道推荐,4:首页推荐
 * ispic:是否包涵缩略图,1:包含缩略图的内容,2:不包含缩略图,默认所有
 * issub:1:包含自栏目,2:不包含自栏目,默认包含自栏目
 * ischild:1:包含子目录，其它：不包含子目录
 * isstu:1:获取副表内容,2:只从主表拿数据,默认只从主表拿
 * group:分组id，单个分组：group="1",多个分组 :group="1,2,3,4",不写调取全部分组。
 */
  async topicAction(){
        let args = this.post();
        console.log(args);
        let where = {'status':1};
        let data = think.isEmpty(args.data) ? "data" : args.data;
        let limit = think.isEmpty(args.limit) ? "10" : args.limit;
        let page = think.isEmpty(args.page) ? "0" : args.page;
        if(args.ischild != 1){
            where = think.extend({},where,{'pid':0});
        }
        if(think.isEmpty(args.cid)){
          return this.json('cid is none');
        }
        //获取当前分类的所有子栏目
        if(args.issub!=2){
            if(!think.isEmpty(args.cid)){
                let cids = `${args.cid}`;
                let cidarr = []
                for (let v of cids.split(",")){
                    let subcate = await think.model('category',think.config("db")).get_sub_category(v);
                    cidarr = cidarr.concat(subcate)
                    cidarr.push(Number(v))
                }

                args.cid=unique(cidarr).sort();
            }
        }
        console.log('topic().args.cid:'+args.cid)
        //subcate.push(cate.id);
        let cid = think.isEmpty(args.cid) ? false :{'category_id':['IN',args.cid]};
        if(cid){
            where = think.extend({},where,cid);
        }
        //分组
        if( !think.isEmpty(args.group)){
            where = think.extend(where,{'group_id':['IN',args.group]});
        }
        let type='update_time DESC';
        if(!think.isEmpty(args.type)){
            if(args.type=="hot"){
              type="view DESC"
            }else if(args.type == "level"){
              type="level DESC"
            }
        }
        //推荐
        if(!think.isEmpty(args.position)){
            where = think.extend(where,{position:args.position})
        }
        //是否缩略图
        if(!think.isEmpty(args.ispic)){
            if(args.ispic ==1){
                where = think.extend(where,{cover_id:['>',0]});
            }else if(args.ispic == 2){
                where = think.extend(where,{cover_id:0});
            }
        }

        console.log(where);
        let topic = await think.model('document', think.config("db")).where(where).page(page,limit).order(type).select();
        console.log(topic);
        //副表数据
        if(args.isstu == 1){
            let topicarr = []
            for(let v of topic){
                let table =await think.model("model",think.config("db")).get_table_name(v.model_id);
                let details = await think.model(table,think.config("db")).find(v.id);
                topicarr.push(think.extend({},v,details));
            }
            topic = topicarr;
        }
        
        return this.json(topic);
    }



}
