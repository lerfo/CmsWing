
$(function(){
	//console.log("EXCHANGE");
	localStorage.setItem("hotstudytour_page",2);//热门
	localStorage.setItem("studytour_page",2);//游学
	localStorage.setItem("community_page",2);//社区
	localStorage.setItem("hotproduct_page",2);//热门产品
	localStorage.setItem("hottour_page",2);//热门
	localStorage.setItem("starproduct_page",2);//明星产品
	localStorage.setItem("scienceproduct_page",2);//学术类
	localStorage.setItem("specialproduct_page",2);//特色类
	localStorage.setItem("relateproduct_page",2);//相关产品 
	localStorage.setItem("popularproduct_page",2);//相关产品
	

	localStorage.removeItem("hotstudytour_info");
	localStorage.removeItem("studytour_info");
	localStorage.removeItem("community_info");
	localStorage.removeItem("hotproduct_info");
	localStorage.removeItem("hottour_info");
	localStorage.removeItem("starproduct_info");
	localStorage.removeItem("scienceproduct_info");
	localStorage.removeItem("specialproduct_info");
	localStorage.removeItem("relateproduct_info");
	localStorage.removeItem("popularproduct_info");
});

//当页面加载条数不够 页数重复为1时 添加信息
function addInfo(info) {
	//console.log('info');
	switch(info){
		case "hotstudytour_info":
			localStorage.setItem("hotstudytour_info",'repeat');
			break;
		case "studytour_info":
			localStorage.setItem("studytour_info",'repeat');
			break;
		case "community_info":
			localStorage.setItem("community_info",'repeat');
			break;
		case "hotproduct_info":
			localStorage.setItem("hotproduct_info",'repeat');
			break;	
		case "hottour_info":
			localStorage.setItem("hottour_info",'repeat');
			break;
		case "starproduct_info":
			localStorage.setItem("starproduct_info",'repeat');
			break;	
		case "scienceproduct_info":
			localStorage.setItem("scienceproduct_info",'repeat');
			break;
		case "specialproduct_info":
			localStorage.setItem("specialproduct_info",'repeat');
			break;
		case "relateproduct_info":
			localStorage.setItem("relateproduct_info",'repeat');
			break;
		case "popularproduct_info":
			localStorage.setItem("popularproduct_info",'repeat');
			break;						
		default:
			console.log('default');;
			break;

	}
}

//首页--热门  
//目的地-热门
function getHot() {
	//console.log("hot");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hotstudytour_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=6&value=132-2-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 6) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						if (k==0 || k==2) {	
							img = img+'w/307/h/457';
						}else if(k==1){
							img = img+'w/506/h/457';
						}else if(k==3 || k==5){
							img = img+'w/438/h/319';
						}else{
							img = img+'w/244/h/319';
						}
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 destination-item-'+j+'" style="display: block;  opacity: 1;">\
										<div class="item-box thumbnail">\
										<a class="peanutRoll_a" href="/p/'+v.id+'.html" title="'+v.title+'">\
											<figure>\
												<span class="item-hover">\
													<span class="overlay dark-5"></span>\
												</span>\
												<div class="item-box-overlay-title text-center text-title">\
													<h4 class="nomargin title">'+v.title+'</h4>\
												</div>\
												<img class="img-responsive" src="'+img+'"  alt="">\
											</figure>\
										</a>\
										</div>\
									</li>';					
				});
				$("#destination-ul").html(html);
			    page=page+1;
				localStorage.setItem("hotstudytour_page",page);
			}else{
				localStorage.setItem("hotstudytour_page",1);
				//getHot();

				if (null== localStorage.getItem("hotstudytour_info")) {
					getHot();
					addInfo('hotstudytour_info');
				}else{
					//console.log('no-repeat');
				}

			}

		}
	});
	
}
//首页--游学
function getTourStudy() {
	//console.log("youxue");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("studytour_page")) ;
	//console.log(page);
	/*if (isNaN(page) || null==page ) {
		page = 2 ;  
	}*/
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=4",
		success:function(dataResult){
			if (dataResult.data.length == 4) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						if (k==0 || k==3) {	
							img = img+'w/612/h/324';
							//console.log("1--4");
						}else{
							img = img+'w/508/h/324';
						}
					}
					var j = k+1;
					html+='<li class="mix development col-md-4 col-sm-4 studytour-item-'+j+'" style="display: block;  opacity: 1;">\
										<div class="item-box thumbnail">\
										<a class="peanutRoll_a" href="/p/'+v.id+'.html" title="'+v.title+'">\
											<figure>\
												<span class="item-hover">\
													<span class="overlay dark-5"></span>\
												</span>\
												<div class="item-box-overlay-title text-center text-title">\
													<h4 class="nomargin title">'+v.title+'</h4>\
												</div>\
												<img class="img-responsive" src="'+img+'"  alt="">\
											</figure>\
										</a>\
										</div>\
									</li>';					
				});
				$("#studytour-ul").html(html);
			    page=page+1;
				localStorage.setItem("studytour_page",page);
			}else{
				localStorage.setItem("studytour_page",1);
				//getTourStudy();
				
				if (null== localStorage.getItem("studytour_info")) {
					getHot();
					addInfo('studytour_info');
				}else{
					//console.log('no-repeat');
				}
		
			}

		}
	});
}
//首页--社区
function getCommunity() {
	var  html = '';
	var  img = '';
	var page = parseInt(localStorage.getItem("community_page")) ;
	//console.log(page);
	/*if (isNaN(page)) {
		page = 1 ;  
	}else if (null==page) {
		page = 1;
	}*/
	$.ajax({
		type:"get",
		url:"ajax/question?cid=124&page="+page+"&limit=4",
		success:function(dataResult){
			if (dataResult.data.length == 4) {
				$.each(dataResult.data,function(k,v){
					img = v.imgurl;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						if (k<3) {	
							img = img+'w/372/h/434';
						}else{
							img = img+'w/1140/h/514';
						}
					}

					if (k<3) {
						var j = k+1;
						html+= '<li class="mix development col-md-4 col-sm-4 community-item-'+j+'" style="display: block;  opacity: 1;">\
									<div class="item-box thumbnail">\
									<a class="peanutRoll_a" href="/mod/question/'+v.id+'.html" title="'+v.title+'">\
										<figure>\
											<span class="item-hover">\
												<span class="overlay dark-5"></span>\
											</span>\
											<div class="item-box-overlay-title text-center text-title">\
												<h4 class="nomargin title">'+v.title+'</h4>\
											</div>\
											<img class="img-responsive" src="'+img+'"  alt="">\
										</figure>\
									</a>\
									</div>\
								</li>';
					}else{
						html+= '<li class="mix development col-md-12 col-sm-12 community-item-4" style="display: block;  opacity: 1;">\
									<div class="item-box thumbnail">\
									<a class="peanutRoll_a" href="/mod/question/'+v.id+'.html" title="'+v.title+'">\
										<figure>\
											<span class="item-hover">\
												<span class="overlay dark-5"></span>\
											</span>\
											<div class="item-box-overlay-title text-center text-title">\
												<h4 class="nomargin title">'+v.title+'</h4>\
											</div>\
											<img class="img-responsive" src="'+img+'"  alt="">\
										</figure>\
									</a>\
									</div>\
								</li>';
						}
			    });
			    page=page+1;
				localStorage.setItem("community_page",page);
			   	$("#community").find("#community-ul").html(html);
			}else{
				localStorage.setItem("community_page",1);
				//getCommunity();

				if (null== localStorage.getItem("community_info")) {
					getCommunity();
					addInfo('community_info');
				}else{
					//console.log('no-repeat');
				}
			}

		}
	});
}
//目的地-热门产品
function getHotProduct(){
	//console.log("hotproduct");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hotproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=8&value=132-3-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 8) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/226/h/332';
					}
					var j = k+1;
					html+='<li class="mix development col-xs-3 studytour-item" style="display: block;  opacity: 1;">\
							    <div class="item-box thumbnail">\
							        <a href="/p/'+v.id+'.html" title="'+v.title+'">\
							            <figure>\
							                <span class="item-hover">\
							                    <span class="overlay dark-5"></span>\
							                </span>\
							                 <div class="item-box-overlay-title text-center text-title">\
                                    			<h4 class="nomargin title">'+v.title+'</h4>\
                                			</div>\
							                <img class="img-responsive" src="'+img+'"  alt="">\
							            </figure>\
							        </a>\
							    </div>\
							</li>';					
				});
				$("#studytour-ul").html(html);
			    page=page+1;
				localStorage.setItem("hotproduct_page",page);
			}else{
				localStorage.setItem("hotproduct_page",1);
				//getHotProduct();

				 if (null== localStorage.getItem("hotproduct_info")) {
					getHotProduct();
					addInfo('hotproduct_info');
				}else{
					//console.log('no-repeat');
				}
			}

		}
	});
}
//游学-明星产品
function getStarProduct() {
	//console.log("star");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("starproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=3&value=132-3-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 3) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					//console.log(v.description);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/324/h/433';
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 destination-item" style="display: block;  opacity: 1;">\
							    <div class="item-box thumbnail">\
							        <a href="/p/'+v.id+'.html" title="'+v.title+'">\
							            <figure>\
							                <span class="item-hover">\
							                    <span class="overlay dark-5"></span>\
							                </span>\
							                <div class="item-box-overlay-title text-center text-title">\
                                    			<h4 class="nomargin title">'+v.title+'</h4>\
                               				</div>\
							                <img class="img-responsive" src="'+img+'"  alt="">\
							            </figure>\
							        </a>\
							    </div>\
							</li>';					
				});
				$("#destination-ul").html(html);
			    page=page+1;
				localStorage.setItem("starproduct_page",page);
			}else{
				localStorage.setItem("starproduct_page",1);
				//getStarProduct();

				if (null== localStorage.getItem("starproduct_info")) {
					getStarProduct();
					addInfo('starproduct_info');
				}else{
					//console.log('no-repeat');
				}
			}

		}
	});		
}
//游学-学术类产品
function getScienceProduct() {
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("scienceproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=6&value=132-3-0-17-tourtype_0|tourfeature_1|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 6) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					//console.log(v.description);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/324/h/433';
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 studytour-item" style="display: block;  opacity: 1;">\
							    <div class="item-box thumbnail">\
							        <a href="/p/'+v.id+'.html" title="'+v.title+'">\
							            <figure>\
							                <span class="item-hover">\
							                    <span class="overlay dark-5"></span>\
							                </span>\
							                <div class="item-box-overlay-title text-center text-title">\
                                    			<h4 class="nomargin title">'+v.title+'</h4>\
                               				</div>\
							                <img class="img-responsive" src="'+img+'"  alt="">\
							            </figure>\
							        </a>\
							    </div>\
							</li>';					
				});
				$("#studytour-ul").html(html);
			    page=page+1;
				localStorage.setItem("scienceproduct_page",page);
			}else{
				localStorage.setItem("scienceproduct_page",1);
				//getScienceProduct();

				if (null== localStorage.getItem("scienceproduct_info")) {
					getScienceProduct();
					addInfo('scienceproduct_info');
				}else{
					//console.log('no-repeat');
				}
			}

		}
	});
}
//游学-特色类产品
function getSpecialProduct() {
	//console.log('tese');
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("specialproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=6&value=132-3-0-17-tourtype_0|tourfeature_2|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 6) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					//console.log(v.description);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/324/h/373';
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 community-item" style="display: block;  opacity: 1;">\
							    <div class="item-box thumbnail">\
							        <a href="/p/'+v.id+'.html" title="'+v.title+'">\
							            <figure>\
							                <span class="item-hover">\
							                    <span class="overlay dark-5"></span>\
							                </span>\
							                <div class="item-box-overlay-title text-center text-title">\
                                    			<h4 class="nomargin title">'+v.title+'</h4>\
                               				</div>\
							                <img class="img-responsive" src="'+img+'"  alt="">\
							            </figure>\
							        </a>\
							    </div>\
							</li>';					
				});
				$("#community-ul").html(html);
			    page=page+1;
				localStorage.setItem("specialproduct_page",page);
			}else{
				localStorage.setItem("specialproduct_page",1);
				//getSpecialProduct();
				
				if (null== localStorage.getItem("specialproduct_info")) {
					getSpecialProduct();
					addInfo('specialproduct_info');
				}else{
					//console.log('no-repeat');
				}
			
			}

		}
	});
}
//社区-热门
function getHotTour() {
	//console.log("hottour");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hottour_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=3&value=132-2-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 3) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						if (k==0 || k==2) {	
							img = img+'w/334/h/272';
						}else{
							img = img+'w/265/h/272';
						}
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 destination-item-'+j+'" style="display: block;  opacity: 1;">\
										<div class="item-box thumbnail">\
										<a class="peanutRoll_a" href="/p/'+v.id+'.html" title="'+v.title+'">\
											<figure>\
												<span class="item-hover">\
													<span class="overlay dark-5"></span>\
												</span>\
												<div class="item-box-overlay-title text-center text-title text-title">\
													<h4 class="nomargin title">'+v.title+'</h4>\
												</div>\
												<img class="img-responsive" src="'+img+'"  alt="">\
											</figure>\
										</a>\
										</div>\
									</li>';					
				});
				$("#destination-ul").html(html);
			    page=page+1;
				localStorage.setItem("hottour_page",page);
			}else{
				localStorage.setItem("hottour_page",1);
				//getHotTour();

				if (null== localStorage.getItem("hottour_info")) {
					getHotTour();
					addInfo('hottour_info');
				}else{
					//console.log('no-repeat');
				}
			}

		}
	});
	
}
//学校-相关产品 
function getRelate() {
	//console.log("hot");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("relateproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=8&value=132-0-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);
			//localStorage.setItem("relateproduct_page",2);//相关产品
			if (dataResult.data.length == 8) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/226/h/332';
					}
					var j = k+1;
					/*
					<li class="mix development col-xs-3 studytour-item">
					    <div class="item-box thumbnail">
					        <a href="{{v.name|get_url(v.id)}}" title="{{v.title}}">
					            <figure style="height: 332px;">
					                <span class="item-hover">
					                    <span class="overlay dark-5"></span>
					                </span>
					            	<div class="item-box-overlay-title text-center" style="height: 50px;">
					                    <h4 class="nomargin">{{v.title}}</h4>
					                </div>
					                <img class="img-responsive" src="{{v.cover_id|get_pic('m=1,w=226,h=332')}}"  alt="">
					            </figure>
					            <div class="item-box-overlay-title " style="height: 60px;background-color:#fff ">
					                <h5>{{v.description}}</h5>
					            </div>
					        </a>
					    </div>
					</li>
					 */
					html+='<li class="mix development col-md-3 col-sm-3 studytour-item" style="display: block;opacity: 1;">\
										<div class="item-box thumbnail">\
										<a class="peanutRoll_a" href="/p/'+v.id+'.html" title="'+v.title+'">\
											<figure  style="height: 332px;">\
												<span class="item-hover">\
													<span class="overlay dark-5"></span>\
												</span>\
												<div class="item-box-overlay-title text-center" style="height: 50px;">\
													<h4 class="nomargin">'+v.title+'</h4>\
												</div>\
												<img class="img-responsive" src="'+img+'"  alt="">\
											</figure>\
										</a>\
										</div>\
										<div class="item-box-overlay-title " style="height: 60px;background-color:#fff ">\
					               			<h5 style="overflow:hidden;height: 42px;overflow: hidden;">'+v.description+'</h5>\
					            		</div>\
									</li>';					
				});
				$("#studytour-ul").html(html);
			    page=page+1;
				localStorage.setItem("relateproduct_page",page);
			}else{
				localStorage.setItem("relateproduct_page",1);
				//getHot();

				if (null== localStorage.getItem("relateproduct_info")) {
					getHot();
					addInfo('relateproduct_info');
				}else{
					//console.log('no-repeat');
				}

			}

		}
	});
	
}
//产品详情-热门 
function getPopular() {
	//console.log("popular");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("popularproduct_page")) ;
	//console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=8&value=132-2-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			//console.log(dataResult);

			if (dataResult.data.length == 8) {
				//console.log(page);
				$.each(dataResult.data,function(k,v){
					//console.log(v.title+':'+v.view);
					img = v.cover_url;	
					if (0==img.length) {
						img = '/static/noimg.jpg';
					}
					if (img.indexOf('//oq39378n2.bkt.clouddn.com/')>=0) {
						img = img.split("w/")[0];
						img = img+'w/222/h/317';
					}
					var j = k+1;
					html+='<li class="mix development col-md-3 col-sm-3 destination-item-'+j+'" style="display: block;  opacity: 1;">\
										<div class="item-box thumbnail">\
										<a href="/p/'+v.id+'.html" title="'+v.title+'">\
											<figure>\
												<span class="item-hover">\
													<span class="overlay dark-5"></span>\
												</span>\
												<div class="item-box-overlay-title text-center text-title">\
													<h4 class="nomargin title">'+v.title+'</h4>\
												</div>\
												<img class="img-responsive" src="'+img+'"  alt="">\
											</figure>\
										</a>\
										</div>\
									</li>';					
				});
				$("#destination-ul").html(html);
			    page=page+1;
				localStorage.setItem("popularproduct_page",page);
			}else{
				localStorage.setItem("popularproduct_page",1);

				if (null== localStorage.getItem("hotstudytour_info")) {
					getPopular();
					addInfo('popularproduct_info');
				}else{
					//console.log('no-repeat');
				}

			}

		}
	});
	
}

$(".mix-grid").on("mouseenter","figure",function(){         
    if($(this).find(".text-title h4").hasClass("title")){
        $(this).find(".text-title h4").removeClass("title")                
    }
})
$(".mix-grid").on("mouseleave","figure",function(){
    //if($(this).find(".goup").hasClass("title")){
        $(this).find(".text-title h4").addClass("title")
    //}

})