// +----------------------------------------------------------------------
// | PeanutRoll [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.peanutroll.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Arterli <zhengqsh@126.com>
// +----------------------------------------------------------------------
'use strict';
import moment from "moment"
import Segment from 'segment';
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
        }else if(doaction == "question"){
          this.action('ajax',doaction);
        }else if(doaction == "search"){
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
 async topicAction() {

    //跨域
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader();
    //0.获取查询关键字
    let searchword = [];
    let q = this.get("q");
    if(!think.isEmpty(q)){
      this.assign("queryword",q);
      let segment = new Segment();
      // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
      await segment.useDefault();
      // 开始分词
      let segment_q= await segment.doSegment(q, {
          simple: true,
          stripPunctuation: true
      });
      console.log(segment_q);
      for (let k=0; k<segment_q.length ;k++){
          searchword.push("%"+segment_q[k]+"%");
      }
    }
    //1.获取分类栏目
    let get = this.get("value") ? this.get("value") : "youxue" ;//this.get('value') || 'youxue'; //默认显示游学搜索

    console.log('args:'+get);
    let id=0;
    let query = get.split("-");
    if(get != 0){
      id = query[0];
    }
    if(id == '0'){

        let where = {};//{'status':1};
        let limit = this.config("db.nums_per_page");
        let page = think.isEmpty(this.param('page')) ? "0" : this.param('page');
        //帖子包含图片
        where = think.extend({},where,{'has_img':1});
        
        if(this.param('cid')){
            where = think.extend({},where,{'category_id':this.param('cid')});
        }
        //排序
        let type='update_time DESC';
        if(!think.isEmpty(this.param('order'))){
            type = this.param('order');
        }
        console.log('page:'+page);
        console.log('limit:'+limit);
        console.log(where);
        let questions = await think.model('question', think.config("db")).page(page,limit).where(where).order(type).countSelect();
        //console.log(questions);
        return this.json(questions);
    }

    let cate = await this.category(id);
    cate = think.extend({}, cate);
    
    //2.访问控制
    let roleid=8;//游客
    if(this.is_login){
      roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
    }
    let priv = await this.model("category_priv").priv(cate.id,roleid,'visit');
    if(!priv){
      this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
      return this.fail("您所在的用户组,禁止访问本栏目!")
    }

    //4.获取当前分类的所有子栏目
    let subcate = await this.model('category').get_sub_category(cate.id);
    subcate.push(cate.id);


    //5.设置查询条件
    let map = {
      'pid':0,
      'status': 1,
      'category_id': ['IN', subcate]
    };
    //5.1排序
    let o = {};
    o.level = 'DESC';
    let order = query[1]||0;
    //console.log('order:'+order);
    order = Number(order);
    switch (order){
      case 1:
      o.update_time = 'ASC';
      break;
      case 2:
      o.view = 'DESC';
      break;
      case 3:
      o.view = 'ASC';
      break;
      case 4:
      map.create_time = {">": new Date(GetDateStr(0)+" "+"00:00:00").getTime(), "<": new Date(GetDateStr(0)+" "+"23:59:59").getTime()}
      o.update_time = 'DESC';
      break;
      case 5:
      map.create_time = {">": new Date(GetDateStr(1)+" "+"00:00:00").getTime(), "<": new Date(GetDateStr(5)+" "+"23:59:59").getTime()}
      o.update_time = 'DESC';
      break;
      case 6:
      map.create_time = {"<": new Date().getTime()}
      map.deadline = {">": new Date().getTime()}
      o.update_time = 'DESC';
      break;
      case 7:
      map.deadline = {"<": new Date().getTime()}
      o.update_time = 'DESC';
      break;
      default:
      o.update_time = 'DESC';
    }
    //this.assign('order',order);
    //5.2获取模型对应的排序分类信息132-0-0-17
    let sortid = query[3]||0;
    console.log('sortid:'+sortid);
    if(!think.isEmpty(sortid)){
      map.sort_id = sortid;
    }
    let sortarr = query[4]||null;
    let nsobj = {};
    let sort = await this.model("category").get_category(cate.id, 'documentsorts');
    console.log('got category document sorts:'+sort);
    if (sort) {
      this.assign("sorturl",get.split("-")[4])
      sort = JSON.parse(sort);
      if(sortid==0){
        sortid=sort.defaultshow;
      }
      let typevar = await this.model("typevar").where({sortid:sortid}).order('displayorder ASC').select();
      for (let val of typevar){

        val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
        if(val.option.type == 'select' ||val.option.type == 'radio'){
          if(!think.isEmpty(val.option.rules)){
            val.option.rules = JSON.parse(val.option.rules);
            val.rules=parse_type_attr(val.option.rules.choices);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            //console.log(val.rules);
          }

        }else if(val.option.type == 'checkbox'){
          if(!think.isEmpty(val.option.rules)){
            val.option.rules = JSON.parse(val.option.rules);
            val.rules=parse_type_attr(val.option.rules.choices);
            console.log(val.rules);
            for(let v of val.rules){
              v.id = "l>"+v.id
            }
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            //console.log(val.rules);
          }
        }else if(val.option.type == 'range'){
          if(!think.isEmpty(val.option.rules)){
            let searchtxt = JSON.parse(val.option.rules).searchtxt;
            let searcharr = []
            if(!think.isEmpty(searchtxt)){
              let arr = searchtxt.split(",");
              let len = arr.length;
              for (var i=0;i<len;i++)
              {
                let obj = {}
                if (!think.isEmpty(arr[i-1])){
                  if(i==1){
                    obj.id = 'd>'+arr[i];
                    obj.name = '小于'+arr[i];
                    obj.pid=0
                    searcharr.push(obj);
                  }else {
                    obj.id = arr[i-1]+'>'+arr[i];
                    obj.name = arr[i-1]+"-"+arr[i];
                    obj.pid=0
                    searcharr.push(obj)
                  }

                }

              }
              searcharr.push({id:'u>'+arr[len-1],name:arr[len-1]+'以上',pid:0})
            }
            //console.log(searcharr);
            val.option.rules = JSON.parse(val.option.rules);
            val.rules=searcharr;
            // val.option.rules.choices = parse_config_attr(val.option.rules.choices);

          }
        }
      }
      console.log(typevar);
      this.assign("typevar",typevar);
    }
    //5.3解析URL中的分类排序参数信息tourdest_100.102|tourtype_0|tourfeature_0|tourdays_0|tourmonth_0
    if(!think.isEmpty(sortarr)) {
      sortarr = sortarr.split("|");
      let optionidarr = [];
      let valuearr = [];
      for (let v of sortarr) {
        let qarr = v.split("_");
        nsobj[qarr[0]] = qarr[1];
        if(qarr[1] !=0){
          let vv = qarr[1].split(">");
          //console.log(vv);
          if(vv[0]=="d" && !think.isEmpty(vv[1])){
            map["t."+qarr[0]] = ["<",vv[1]];
          }else if(vv[0]=="u" && !think.isEmpty(vv[1])){
            map["t."+qarr[0]] = [">",vv[1]];
          }else if(vv[0]=="l" && !think.isEmpty(vv[1])){
            map["t."+qarr[0]] = ["like",`%"${vv[1]}"%`];
          }else if(!think.isEmpty(vv[0])&&!think.isEmpty(vv[1])){
            map["t."+qarr[0]] = ["BETWEEN", Number(vv[0]), Number(vv[1])];
          }else {
            if(qarr[0] == "tourdest"){  //  游学地址采用100.101的方式，所以要做特殊处理
              map["t."+qarr[0]] = ["like",`%${qarr[1]}%`]; 
            }else{
              map["t."+qarr[0]] = qarr[1];
            }
          }
        }
      }
      map.fid = cate.id;
    }

    //5.4获取分组信息132-0-0-17
    let group_id = 0;
    if(!think.isEmpty(query[2]) && query[2] !=0){
      map.group_id=query[2];
      group_id = map.group_id;
    }
    //this.assign("group_id",group_id)
    //5.5获取查询关键字

    if(searchword.length > 0){
      map.title = ["like",searchword]
    }
    //5.6 获取查询数量
    let num;
    if(cate.list_row>0){
      num = cate.list_row;
    } else if(cate.model.split(",").length == 1){
      let pagenum=await this.model('model').get_model(cate.model,"list_row");
      if(pagenum !=0){
        num = pagenum;
      }
    }else {
      num =this.config("db.nums_per_page");
    }
    if(checkMobile(this.userAgent())){
      num=10;
    }

    console.log(map);
    let data;
    if(!think.isEmpty(sortarr)){
      data = await this.model('document').join({
        table: "type_optionvalue"+sortid,
        join: "left", // 有 left,right,inner 3 个值
        as: "t",
        on: ["id", "tid"]

      }).where(map).page(this.param('page'),num).order(o).countSelect();
    }else {
      data = await this.model('document').where(map).page(this.param('page'),num).order(o).countSelect();
    }
    for(let val of data.data){
        console.log(val.cover_id);
        val.cover_url = await get_pic(val.cover_id,1,200,120);
        val.price = await get_price(val.price,1);
        
    }
    return this.json(data);

  }
 /*
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
*/
/**
 * 获取社区帖子列表
 * limit 每页条数
 * page:页数 从1开始
 * has_img：是否有图片
 * order:排序方式 0：默认按时间排序，1：按热度排序，2：按推荐排序，3：按未回答排序
 * q: 搜索文字
 * day: 发表时间 
 * cid: 帖子分类
 * 
 */
async questionAction(){
        let args = this.post();
        console.log(this.get("page"));
        let where = {};//{'status':1};
        //let data = think.isEmpty(args.data) ? "data" : args.data;
        let limit = this.get("limit") ? this.get("limit"): 5 ;
        let page = this.get("page") ? this.get("page") : 1 ;
        let has_img = this.get("has_img") ? this.get("has_img") : 0 ;
        console.log("limit:"+limit+",page:"+page);
        //帖子包含图片
        if(has_img == 1){
            where = think.extend({},where,{'has_img':1});
        }

        //排序
        let odrerMap = {};
        let type = this.get("order") ? this.get("order") : 0 ;
        type = Number(type);
        switch (type){
          case 1://按热度排序
            odrerMap.view = 'DESC';
            break;
          case 2://按推荐排序
            //map.is_recommend = 1;
            where = think.extend({},where,{'is_recommend':1});
            odrerMap.id='DESC';
            break;
          case 3://等待回复
            //map.answer_count = 0;
            where = think.extend({},where,{'answer_count':0});
            odrerMap.id='DESC';
            break;
          default:
            odrerMap.update_time = 'DESC';
        }


        //0.获取查询关键字
        let searchword = [];
        let q = this.get("q");
        
        if(!think.isEmpty(q)){
          let segment = new Segment();
          // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
          await segment.useDefault();
          // 开始分词
          let segment_q= await segment.doSegment(q, {
              simple: true,
              stripPunctuation: true
          });
          for (let k=0; k<segment_q.length ;k++){
              searchword.push("%"+segment_q[k]+"%");
          }

          if(searchword.length > 0){
            where = think.extend({},where,{'title':["like",searchword]});
          }
        }
        console.log(searchword);
        //查询时间
        let days = this.get("day");
        if(!think.isEmpty(days) && days>0){
          let search_time = new Date().getTime() - 86400000*days;
          where = think.extend({},where,{'create_time':['>',search_time]});
        }
        //查询分类
        let cid = this.get("cid");
        if(!think.isEmpty(cid)){
          where = think.extend({},where,{'category_id':cid});
        }

        
        console.log('page:'+page);
        console.log(where);
        console.log(odrerMap);
        let questions = await think.model('question', think.config("db")).page(page,limit).where(where).order(odrerMap).countSelect();
        //console.log(questions);
        if(!think.isEmpty(questions.data)){
          //前端字符显示处理
          for(let val of questions.data){
            val.create_time = await time_format(val.create_time);
            if(val.cover_id){
              val.imgurl = await get_pic(val.cover_id,1,233,150);
            }else{
              val.imgurl = '';
            }
            val.detailtext = await delhtmltags(val.detail);
            if(think.isEmpty(val.detailtext)){
              val.detailtext = "";
            }
            if(val.detailtext && val.detailtext.length >90){
              val.detailtext = val.detailtext.substring(0,90);
            }
            if(val.uid){
              val.username = await get_nickname(val.uid);
              console.log(val.username);
            }
            //console.log(val.detailtext);
          }
        }
        console.log(questions)
        return this.json(questions);
    }


}
