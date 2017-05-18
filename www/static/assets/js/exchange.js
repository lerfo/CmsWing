
$(function(){
	console.log("EXCHANGE");
	localStorage.setItem("hotstudytour_page",2);//热门
	localStorage.setItem("studytour_page",2);//游学
	localStorage.setItem("community_page",2);//社区
	localStorage.setItem("hotproduct_page",2);//热门产品
	localStorage.setItem("hottour_page",2);//热门

});

//首页--热门  
//目的地-热门
function getHot() {
	console.log("hot");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hotstudytour_page")) ;
	console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=6&value=132-2-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			console.log(dataResult);

			if (dataResult.data.length == 6) {
				console.log(page);
				$.each(dataResult.data,function(k,v){
					console.log(v.title+':'+v.view);
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
												<div class="item-box-overlay-title text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">\
													<h4 class="nomargin">'+v.title+'</h4>\
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
				getHot();
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
	console.log(page);
	/*if (isNaN(page) || null==page ) {
		page = 2 ;  
	}*/
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=4",
		success:function(dataResult){
			if (dataResult.data.length == 4) {
				console.log(page);
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
												<div class="item-box-overlay-title text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">\
													<h4 class="nomargin">'+v.title+'</h4>\
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
				getTourStudy();
			}

		}
	});
}
//首页--社区
function getCommunity() {
	var  html = '';
	var  img = '';
	var page = parseInt(localStorage.getItem("community_page")) ;
	console.log(page);
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
											<div class="item-box-overlay-title text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">\
												<h4 class="nomargin">'+v.title+'</h4>\
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
											<div class="item-box-overlay-title text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">\
												<h4 class="nomargin">'+v.title+'</h4>\
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
				getCommunity();
			}

		}
	});
}
//游学-明星产品
function getStarProduct() {
		
}
//游学-学术类产品
function getScienceProduct() {
	
}
//游学-特色类产品
function getSpecialProduct() {
	
}
//目的地-热门产品
function getHotProduct(){
	console.log("hotproduct");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hotproduct_page")) ;
	console.log(page);
	$.ajax({
		type:"get",
		url:"/ajax/topic?q=&page="+page+"&limit=8&value=132-3-0-17-tourtype_0|tourfeature_0|tourdest_0|tourdays_0|tourmonth_0",
		success:function(dataResult){
			console.log(dataResult);

			if (dataResult.data.length == 8) {
				console.log(page);
				$.each(dataResult.data,function(k,v){
					console.log(v.title+':'+v.view);
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
							            <figure style="height: 332px;">\
							                <span class="item-hover">\
							                    <span class="overlay dark-5"></span>\
							                </span>\
							                <img class="img-responsive" src="'+img+'"  alt="">\
							            </figure>\
							            <div class="item-box-overlay-title text-center" style="height: 100px;background-color:#fff ">\
							                <h4 class="nomargin show-two" style="font-size: 14px; color: #414141; text-overflow:ellipsis;font-weight: 600;height: 24px;">'+v.title+'</h4>\
							                <h5>'+v.description+'</h5>\
							            </div>\
							        </a>\
							    </div>\
							</li>';					
				});
				$("#studytour-ul").html(html);
			    page=page+1;
				localStorage.setItem("hotproduct_page",page);
			}else{
				localStorage.setItem("hotproduct_page",1);
				 getHotProduct();
			}

		}
	});
}
//社区-热门
function getHotTour() {
	console.log("hottour");
	var html = '';
	var img = '';
	var page = parseInt(localStorage.getItem("hottour_page")) ;
	console.log(page);
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
												<div class="item-box-overlay-title text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">\
													<h4 class="nomargin">'+v.title+'</h4>\
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
				getHotTour();
			}

		}
	});
	
}