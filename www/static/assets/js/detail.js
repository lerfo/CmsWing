/**
 * Created by Arterli on 2016/10/10.
 */
$(function () {
    if($("#detail").length>0){
        //载入编辑器
        var editor = new wangEditor('detail');
        // 上传图片
        editor.config.uploadImgUrl = '/uc/file/uploadpic/type/path';
        editor.config.uploadImgFileName = 'file';
        editor.create();
        if(($("#detail").html()).length==0){
            editor.clear();
        }
    }

    //tags
    $('#keywords').tagsInput({
        autocomplete_url:'/admin/public/getkeyword',
        autocomplete:{selectFirst:true,autoFill:true},
        width:'auto',
        height:'43px',
        defaultText:'add a tag',
    });
    //下啦组件改造
    var question_select = $(".question_select");
     var ul = $(".question_select .dropdown-menu")
    var li = $(".question_select .dropdown-menu>li");
    $(document).on("click",".question_select .dropdown-menu>li",function () {
        var v = $(this).attr("data-value");
        var n = $(this).text();
        console.log(v);
        $(this).parents(".question_select").find("span.name").text(n);
        $(this).parents(".question_select").find("input").val(v);
        var isajax = $(this).parents().is("#group");
        //alert(isajax);
        //alert(v)
        if(!isajax){
            $.ajax({
                url:"/mod/question/ajax/getgroups/cid/"+v,
                success:function (res) {
                    if(res){
                        var li ="";
                            li += '<li data-value="0"><a href="javascript:;">不分组</a></li>';
                        $.each(res,function (k,v) {
                            li += '<li data-value="'+v.id+'"><a href="javascript:;">'+v.name+'</a></li>'
                        })
                        $("#group ul").html(li);
                        //console.log(li);
                        $("#group").removeClass("hide");
                    }else {
                        $("#group").addClass("hide");
                        $("#group").find("input").val(0)
                    }
                }
            })
        }

    })

//回复

    function addhtml(id) {
        var rhtml = "";
        //ajax
        $.ajax({
            url:"/mod/question/ajax/ajaxanswercomments/answer_id/"+id,
            // success:function (res) {
            //     var count = (res.data).length;
            //     if(count>0){
            //         $.each(res.data,function (k,v) {
            //             rhtml+='<li class="comment comment-reply">'+
            //                 '<img class="avatar" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50" alt="avatar">'+
            //                 '<div class="comment-body">'+
            //                 '<a href="#" class="comment-author">'+
            //                 '<small class="text-muted pull-right">'+v.time+'</small>'+
            //                 '<span>'+v.username+'</span>'+
            //                 '</a>'+
            //                 '<p>'+v.message+'</p>'+
            //                 '</div>';
            //                     if(res.is_login){
            //                         rhtml+=  '<ul class="list-inline size-11 margin-top-10">'+
            //                 '<li>'+
            //                 '<a href="#" class="text-info commentreyplay" data-name="@'+v.username+':" data-id="'+id+'"><i class="fa fa-reply"></i> 回复</a>'+
            //                 '</li>';
            //             if(res.is_login==v.uid || res.is_admin){
            //             rhtml+='<li class="pull-right">'+
            //                 '<a href="/mod/question/ajax/delcomments/id/'+v.id+'" class="text-danger confirm ajax-get">删除</a>'+
            //                 '</li>';
            //             }
            //             rhtml+=  '</li></ul>';
            //                     }
            //             rhtml+= '</li>';
            //         })
            //     }else {
            //         rhtml += '<div class="alert alert-mini alert-warning margin-bottom-10 text-center">'+
            //             '暂无评论'+
            //             '</div>';
            //     }
            //     if(res.is_login){
            //         rhtml +=' <li>'+
            //             '<div class="input-group">'+
            //             '<input id="btn-input-'+id+'" type="text" class="form-control" placeholder="评论一下...">'+
            //             '<span class="input-group-btn">'+
            //             '<button class="btn btn-primary btn-chat" id="btn-chat-'+id+'" data-btn-id="'+id+'">'+
            //             '<i class="fa fa-reply"></i> 评论'+
            //             '</button>'+
            //             '</span>'+
            //             '</div>'+
            //             '</li>';
            //     }

            //     $('#comment-reply-'+id).html(rhtml);
            //     $('#comment-reply-'+id).addClass("isopen");
            //     $("#count-"+id).text(count);
            // }
        

           success:function (res) {
                var count = (res.data).length;
                if(count>0){
                    $.each(res.data,function (k,v) {
                        rhtml+='<li class="comment comment-reply">'+
                            '<b class="triangle"></b>'+
                            '<img class="avatar" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50" alt="avatar">'+
                            '<div class="comment-body">'+
                            '<a href="#" class="comment-author">'+
                            '<span>'+v.username+'</span>'+
                            '<small class="text-muted">'+v.time+'</small>'+
                            '</a>'+
                            '<p>'+v.message+'</p>'+
                            '</div>';
                            
                                
        
                                if(res.is_login==v.uid || res.is_admin){
                                    rhtml+= '<ul class="list-inline size-11 margin-top-10 clear">'+
                                                '<li class="pull-right">'+
                                                    '<a href="/mod/question/ajax/delcomments/id/'+v.id+'" class="edit-delete confirm ajax-get">删除</a>'+
                                                '</li>';
                                    }
                                rhtml+=  '</li></ul>';
                            
                        rhtml+= '</li>';
                    })
                }else {
                    rhtml += '<div class="alert alert-mini alert-warning margin-bottom-10 text-center">'+
                        '暂无评论'+
                        '</div>';
                }
                if(res.is_login){
                    rhtml +=' <li id="write-reply-'+id+'">'+
                        '<div class="input-group">'+
                        '<input id="btn-input-'+id+'" type="text" class="form-control" placeholder="评论一下...">'+
                        '<span class="input-group-btn">'+
                        '<button class="btn btn-primary btn-chat" id="btn-chat-'+id+'" data-btn-id="'+id+'">'+
                        '<i class="fa fa-reply"></i> 评论'+
                        '</button>'+
                        '</span>'+
                        '</div>'+
                        '</li>';
                }

                $('#comment-reply-'+id).html(rhtml);
                $('#comment-reply-'+id).addClass("isopen");
                $("#count-"+id).text(count);
            } 


        })
    }
    $(".box-light").on("click",".comment-reply",function () {
        var rid = $(this).attr("data-comment");
        //console.log(rid);
        var id = rid.split("-")[2];
        var isopen = $('#'+rid).is(".isopen");
        //console.log(isopen);
        if(isopen){
            $('#'+rid).html("");
            $('#'+rid).removeClass("isopen");
            $("#oc-"+id).text("回复");
        }else {

            addhtml(id)
            $("#oc-"+id).text("关闭");
        }

    })


    //提交评论
    $(document).on("click",'.btn-chat',function () {
        var id = $(this).attr("data-btn-id");
        var val = $("#btn-input-"+id).val();
        if(val.length==0){
            _toastr("评论不能为空!","top-right","error",false);
            return false;
        }
        $.ajax({
            type:"post",
            url:"/mod/question/ajax/ajaxanswercommentspost",
            data:{answer_id:id,message:val},
            success:function (data) {
                if (data.errno==0) {
                        _toastr(data.data.name,"top-right","success",false);
                        addhtml(id)
                }else{

                        _toastr(data.errmsg,"top-right","error",false);

                }
            }
        })
        //alert(id)
    })

    //回复评论
    $(document).on("click",'.commentreyplay',function (e) {
        e.preventDefault();
        var name = $(this).attr("data-name");
        var id =$(this).attr("data-id");
        //在光标位置插入回复者的姓名
        $("#btn-input-" + id).insertContent(name);
       // alert(name)
    })

        //提交推荐
    $(document).on("click",'.btn_recommend',function () {
        var id = $(this).attr("data-recommend-id");
        console.log("btn_recommend id:"+id);
        
        $.ajax({
            type:"get",
            url:"/mod/question/ajax/ajaxrecommend/cmd/1/id/"+id,
            success:function (data) {
                if (data.errno==0) {
                        _toastr(data.data.name,"top-right","success",false);
                       location.reload() ;
                }else{

                        _toastr(data.errmsg,"top-right","error",false);

                }
            }
        })
        //alert(id)
    })
        //取消推荐
    $(document).on("click",'.btn_disrecommend',function () {
        var id = $(this).attr("data-recommend-id");
        console.log("btn_disrecommend id:"+id);
        
        $.ajax({
            type:"get",
            url:"/mod/question/ajax/ajaxrecommend/cmd/0/id/"+id,
            success:function (data) {
                console.log(data);
                if (data.errno==0) {
                        _toastr(data.data.name,"top-right","success",false);
                        location.reload();
                }else{

                        _toastr(data.errmsg,"top-right","error",false);

                }
            }
        })
        //alert(id)
    })
  
   
});

$(function(){
    //console.log("pasasd");
    //var qid = $("input[name=qId]").val();
    //console.log(qid);
    tournote_pagination(1);
    question_pagination(1)
});

//攻略评论分页
function tournote_pagination(page){

    var id = $("input[name=qId]").val();
    //console.log(id);
    var i;
    if (1==page) {
        i=0;
    }else{
        i = parseInt($("input[name=ival]").val());
    }
    //console.log(i);
    var html = '';
    $.ajax({
        type:"get",
        url:"/mod/question/index/answer/id/"+id+"/limit/8/page/"+page,
        //async:false,
        success:function(dataResult){
            //console.log(dataResult);
            //console.log(dataResult.data);
            $.each(dataResult.data.data,function(k,v){
                i = i+1;
                html +='<div  class="margin-bottom-40">\
                            <ul class="comment list-unstyled margin-bottom-0" >\
                                <li class="comment margin-bottom-0 comment-user">\
                                    <img class="avatar" src="/uc/index/avatar/uid/'+v.uid+'" width="80" height="80" alt="avatar" >\
                                    <span >'+v.username+'</span>\
                                    <div class="comment-body">\
                                        <div class="floor" >'+i+'F</div>\
                                        <div class="border-div" >\
                                            <div class="wangEditor-container cmswing-container comments-container" >\
                                                <div class="wangEditor-txt nopadding margin-left-10 ">\
                                                    '+v.answer_content+'\
                                                </div>\
                                                <small class="text-muted pull-left time-small" >\
                                                    '+v.add_time+'\
                                                </small> \
                                                <ul class="list-inline size-12 margin-top-10">\
                                                    <li class="pull-right">\
                                                        <a href="javascript:;"  class="text-info comment-reply" data-comment="comment-reply-'+v.answer_id+'"> \
                                                        <i class="fa fa-reply"></i> \
                                                        <span id="oc-'+v.answer_id+'">回复</span>全部评论 (<span id="count-'+v.answer_id+'">'+v.count+'</span>)</a>\
                                                    </li>';
                var hasPower = invalidateAnwser(v.uid,v.answer_id);
                //console.log(hasPower);
                if (hasPower) {
                    var data_plugin_options ='{"type":"ajax", "closeOnBgClick":false}';
                    //{{info.id}}   {{a.answer_id}}
                    html +='<li class="pull-right">\
                                <a href="/mod/question/ajax/delanswer/qid/'+id+'/id/'+v.answer_id+'" class="text-danger confirm ajax-get">删除</a>\
                            </li>\
                            <li class="pull-right">\
                                 <a href="/mod/question/ajax/editanswer/id/'+v.answer_id+'" class="text-primary lightbox" data-lightbox="iframe" data-plugin-options='+data_plugin_options+'>编辑</a>\
                            </li>';
                }                                       


                html +=                         '</ul>\
                                            </div>\
                                            <div id="comment-reply-'+v.answer_id+'" class="margin-top-20 ">\
                                            </div>\
                                        </div>\
                                    </div>\
                                </li>\
                            </ul>\
                        </div>';
                 
            });
            if(dataResult.data.currentPage < dataResult.data.totalPages){
                var nextPage = page+1;
                html +='<div class="text-center tc-addmore">' + '<a href="javascript:tournote_pagination('+nextPage+');">加载更多</a>'+'</div></div>';
                $(".tournote_page"+page).after("<div><div>");
                $(".tournote_page"+page).next().addClass("tournote_page"+nextPage);
            }
            //console.log(html);
            $("input[name=ival]").val(i);
            $(".tc-addmore").hide();
            $(".tournote_page"+page).html(html);
        }
    })
}


//问答评论分页
function question_pagination(page){
    //id是 question_id
    var id = $("input[name=qId]").val();
    var html = '';
    $.ajax({
        type:"get",
        url:"/mod/question/index/answer/id/"+id+"/limit/8/page/"+page,
        //async:false,
        success:function(dataResult){
            //console.log(dataResult);
            //console.log(dataResult.data);
            $.each(dataResult.data.data,function(k,v){
                 html +='<ul class="comment list-unstyled margin-bottom-20">\
                                <li class="comments-head-li">\
                                    <div>\
                                        <img class="avatar comments-head-img" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50"  alt="avatar">\
                                        <a href="javascript:;" class="comment-author comments-head-a">\
                                            <span>'+v.username+'</span>\
                                        </a>\
                                    </div>\
                                </li>\
                                <li class="comment margin-bottom-0">\
                                    <div class="comment-body">\
                                        <div class="wangEditor-container cmswing-container comments-container" >\
                                            <div class="wangEditor-txt nopadding">\
                                                '+v.answer_content+'\
                                            </div>\
                                        </div>\
                                         <a href="#" class="comment-author comments-a">\
                                            <small class="text-muted pull-right">'+v.add_time+' </small>\
                                        </a>\
                                    </div>\
                                    <ul class="list-inline size-11 margin-top-10">\
                                        <li>\
                                            <a href="javascript:;"  class="text-info comment-reply" data-comment="comment-reply-'+v.answer_id+'"> <i class="fa fa-reply"></i> <span id="oc-'+v.answer_id+'">显示</span>全部评论 (<span id="count-'+v.answer_id+'">'+v.count+'</span>)</a>'+
                                        '</li>';
                var hasPower = invalidateAnwser(v.uid,v.answer_id);
                //console.log("hasPower"+hasPower);
                if (hasPower) {
                    var data_plugin_options ='{"type":"ajax", "closeOnBgClick":false}';
                    //{{info.id}}   {{a.answer_id}}
                    html +='<li class="pull-right">\
                                <a href="/mod/question/ajax/delanswer/qid/'+id+'/id/'+v.answer_id+'" class="text-danger confirm ajax-get">删除</a>\
                            </li>\
                            <li class="pull-right">\
                                 <a href="/mod/question/ajax/editanswer/id/'+v.answer_id+'" class="text-primary lightbox" data-lightbox="iframe" data-plugin-options='+data_plugin_options+'>编辑</a>\
                            </li>';
                }             
                  

                      html +=     '</ul>\
                                </li>\
                             <div id="comment-reply-'+v.answer_id+'" class="margin-top-10 ">\
                             </div>\
                            </ul>';
            });
            if(dataResult.data.currentPage < dataResult.data.totalPages){
                var nextPage = page+1;
                html +='<div class="text-center qc-addmore">' + '<a href="javascript:question_pagination('+nextPage+');">加载更多</a>'+'</div></div>';
                $(".question_page"+page).after("<div><div>");
                $(".question_page"+page).next().addClass("question_page"+nextPage);
            }
            //console.log(html);
            $(".qc-addmore").hide();
            $(".question_page"+page).html(html);
        }
    })
}

//问答评论分页
function quesasdasdasdasdtion_pagination(id,page){
    //id是 question_id
    var lastPage = page-1;
    $(".question_page"+lastPage).after("<div><div>");
    $(".question_page"+lastPage).next().addClass("question_page"+page);
    var html = '';
    $.ajax({
        type:"get",
        url:"/mod/question/index/answer/id/"+id+"/limit/2/page/"+page,
        //async:false,
        success:function(dataResult){
            //console.log(dataResult);
            //console.log(dataResult.data);
            $.each(dataResult.data.data,function(k,v){
                 html +='<ul class="comment list-unstyled margin-bottom-20">\
                                <li class="comments-head-li">\
                                    <div>\
                                        <img class="avatar comments-head-img" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50"  alt="avatar">\
                                        <a href="javascript:;" class="comment-author comments-head-a">\
                                            <span>'+v.uid+'</span>\
                                        </a>\
                                    </div>\
                                </li>\
                                <li class="comment margin-bottom-0">\
                                    <div class="comment-body">\
                                        <div class="wangEditor-container cmswing-container comments-container" >\
                                            <div class="wangEditor-txt nopadding">\
                                                '+v.answer_content+'\
                                            </div>\
                                        </div>\
                                         <a href="#" class="comment-author comments-a">\
                                            <small class="text-muted pull-right">'+v.add_time+' </small>\
                                        </a>\
                                    </div>\
                                    <ul class="list-inline size-11 margin-top-10">\
                                        <li>\
                                            <a href="javascript:;"  class="text-info comment-reply" data-comment="comment-reply-'+v.answer_id+'"> <i class="fa fa-reply"></i> <span id="oc-'+v.answer_id+'">显示</span>全部评论 (<span id="count-'+v.answer_id+'">'+v.ccount+'</span>)</a>'+
                                        '</li>';
                var hasPower = invalidateAnwser(v.uid,v.answer_id);
                //console.log("hasPower"+hasPower);
                if (hasPower) {
                    var data_plugin_options ='{"type":"ajax", "closeOnBgClick":false}';
                    //{{info.id}}   {{a.answer_id}}
                    html +='<li class="pull-right">\
                                <a href="/mod/question/ajax/delanswer/qid/'+id+'/id/'+v.answer_id+'" class="text-danger confirm ajax-get">删除</a>\
                            </li>\
                            <li class="pull-right">\
                                 <a href="/mod/question/ajax/editanswer/id/'+v.answer_id+'" class="text-primary lightbox" data-lightbox="iframe" data-plugin-options='+data_plugin_options+'>编辑</a>\
                            </li>';
                }             
                  

                      html +=     '</ul>\
                                </li>\
                             <div id="comment-reply-'+v.answer_id+'" class="margin-top-10 ">\
                             </div>\
                            </ul>';
            });
            if(dataResult.data.currentPage < dataResult.data.totalPages){
                var nextPage = page+1;
                html +='<div class="text-center qc-addmore">' + '<a href="javascript:question_pagination('+id+','+nextPage+');">加载更多</a>'+'</div></div>';
            }
            //console.log(html);
            $(".qc-addmore").hide();
            $(".question_page"+page).html(html);
        }
    })
}

function invalidateAnwser(id,answer_id) {
    //console.log(id);
    //console.log(answer_id);
    var hasPower=false;
    $.ajax({
            
            url:"/mod/question/ajax/ajaxanswercomments/answer_id/"+answer_id,
            async:false,
            success:function (res) {
            //console.log(res);  
            //console.log(res.is_login);  
                if(res.is_login == id){
                    //console.log("???");
                   hasPower = true;
                   //console.log(hasPower);
                }
            } 
        })
    //console.log(hasPower);
    //console.log("验证完毕");
    return hasPower;
}


//管理员推荐置顶
function question_pagination(page){
    //id是 question_id
    var id = $("input[name=qId]").val();
    var html = '';
    $.ajax({
        type:"get",
        url:"/mod/question/ajax/ajaxrecommend/cmd/1/id/{{info.id}}"+id,
        //async:false,
        success:function(dataResult){
            //console.log(dataResult);
            //console.log(dataResult.data);
            $.each(dataResult.data.data,function(k,v){
                 html +='<ul class="comment list-unstyled margin-bottom-20">\
                                <li class="comments-head-li">\
                                    <div>\
                                        <img class="avatar comments-head-img" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50"  alt="avatar">\
                                        <a href="javascript:;" class="comment-author comments-head-a">\
                                            <span>'+v.username+'</span>\
                                        </a>\
                                    </div>\
                                </li>\
                                <li class="comment margin-bottom-0">\
                                    <div class="comment-body">\
                                        <div class="wangEditor-container cmswing-container comments-container" >\
                                            <div class="wangEditor-txt nopadding">\
                                                '+v.answer_content+'\
                                            </div>\
                                        </div>\
                                         <a href="#" class="comment-author comments-a">\
                                            <small class="text-muted pull-right">'+v.add_time+' </small>\
                                        </a>\
                                    </div>\
                                    <ul class="list-inline size-11 margin-top-10">\
                                        <li>\
                                            <a href="javascript:;"  class="text-info comment-reply" data-comment="comment-reply-'+v.answer_id+'"> <i class="fa fa-reply"></i> <span id="oc-'+v.answer_id+'">显示</span>全部评论 (<span id="count-'+v.answer_id+'">'+v.count+'</span>)</a>'+
                                        '</li>';
                var hasPower = invalidateAnwser(v.uid,v.answer_id);
                //console.log("hasPower"+hasPower);
                if (hasPower) {
                    var data_plugin_options ='{"type":"ajax", "closeOnBgClick":false}';
                    //{{info.id}}   {{a.answer_id}}
                    html +='<li class="pull-right">\
                                <a href="/mod/question/ajax/delanswer/qid/'+id+'/id/'+v.answer_id+'" class="text-danger confirm ajax-get">删除</a>\
                            </li>\
                            <li class="pull-right">\
                                 <a href="/mod/question/ajax/editanswer/id/'+v.answer_id+'" class="text-primary lightbox" data-lightbox="iframe" data-plugin-options='+data_plugin_options+'>编辑</a>\
                            </li>';
                }             
                  

                      html +=     '</ul>\
                                </li>\
                             <div id="comment-reply-'+v.answer_id+'" class="margin-top-10 ">\
                             </div>\
                            </ul>';
            });
            if(dataResult.data.currentPage < dataResult.data.totalPages){
                var nextPage = page+1;
                html +='<div class="text-center qc-addmore">' + '<a href="javascript:question_pagination('+nextPage+');">加载更多</a>'+'</div></div>';
                $(".question_page"+page).after("<div><div>");
                $(".question_page"+page).next().addClass("question_page"+nextPage);
            }
            //console.log(html);
            $(".qc-addmore").hide();
            $(".question_page"+page).html(html);
        }
    })
}