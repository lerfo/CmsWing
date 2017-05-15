//固定浮动
$(document).ready(function(e) {			
	t = $('.float-box').offset().top;
	//console.log(t)
	var m =  document.body.scrollHeight;
		//console.log(m)
	//mh = $('.main').height();
	fh = $('.float-box').height();
	$(window).scroll(function(e){
		s = $(document).scrollTop();
		var b = m-s;
		//console.log(m-s)	
		if(s > t - 10){
			$('.float-box').css({'position':'fixed','top':'40px','background':'#fff','z-index':'130'});				
		}else{
			$('.float-box').css({'position':'','background':''});
		}
		if(b<975){
			$('.float-box').css({'position':'','background':''});
		}
	})
});

$(".under_tab_detail").find("img").addClass("imgWith");		
	
//分享
function share(){
	if($(".share-box").hasClass("out")){
		$(".share-box").removeClass("out").addClass("in")
	}else if($(".share-box").hasClass("in")){
		$(".share-box").removeClass("in").addClass("out")
	}
}
//隐藏分享
$("body").click(function(){
	if($(".share-box").hasClass("in")){
		$(".share-box").removeClass("in").addClass("out")
	}
})

//收藏
function collect(id){
	var type;
	/*
	$.ajax({
		url:"/ajax/focuslist?page="+1+"&limit="+200,
		async:false,
		success:function(result){
			var data = result.data.data;

			//console.log(data)
			var idArr = [];
			for(var i=0;i<data.length;i++){
				idArr.push(data[i].question_id)
			}
			//console.log(idArr)
			var a = $.inArray(id,idArr)
			//console.log(a)
			if(a == -1){
				type = 1;
			}else{
				type = 2
			}
		}
	})
	console.log(type)
	*/
	$.ajax({
		url:"/ajax/focus?id="+id+"&type="+1,
		success:function(result){
			console.log(result)
			if(result.errno != 0){
				alert("您未登录，请先登录！");
			}else{
				alert(result.data);
			}
			
		}
	})

}

//总体评分
$(document).ready(function(){
	var id = $(".proid").val()
	console.log(id);
	var allcount=0;
	$.ajax({
		url:"/uc/booking/getproductinfo/product_id/"+id,
		success:function(result){
			console.log(result)
			allcount = result.data.commentcount;
			if(result.data.commentcount != 0){
	        	var mark = result.data.score/result.data.commentcount;
	        	mark = mark.toFixed(1)
	  			$(".global-score p").html(mark);
	  			$(".allCount").html("("+allcount+")")
	        }
		}
	})
})
//评分统计
$(document).ready(function(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentall?productid="+id,
		success:function(result){
			// console.log(result)
			// console.log(result.data.data)
			var data = result.data.data;
			var count1=0,count2=0,count3=0,count4=0,count5=0,imgcount=0;
			for(var i=0;i<data.length;i++){
				if(data[i].score_total == 1){
					count1++;
				}else if(data[i].score_total == 2){
					count2++;
				}else if(data[i].score_total == 3){
					count3++;
				}else if(data[i].score_total == 4){
					count4++;
				}else if(data[i].score_total == 5){
					count5++;
				}
				if(data[i].comment_img !== "" && data[i].comment_img !== undefined && data[i].comment_img !== null){
					imgcount++;
				}
			}
			$(".count1").html("("+count1+")");
			$(".count2").html("("+count2+")");
			$(".count3").html("("+count3+")");
			$(".count4").html("("+count4+")");
			$(".count5").html("("+count5+")");
			$(".imgcount").html("("+imgcount+")");
		}
	})
})

//页面加载完之后异步加载点评信息
$(document).ready(function(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id,
		success:function(result){
			evaluatecontent(result);
		}
	})
})
//全部点评
function allevaluate(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//5分评价
function evaluate5(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&score="+5,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//4分评价
function evaluate4(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&score="+4,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//3分评价
function evaluate3(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&score="+3,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//2分评价
function evaluate2(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&score="+2,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//1分评价
function evaluate1(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&score="+1,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//有图评价
function evaluateimg(){
	var id = $(".proid").val();
	$.ajax({
		url:"/ajax/productcommentlist?page=1&productid="+id+"&has_img="+1,
		success:function(result){
			evaluatecontent(result);
		}
	})
}
//用户评价内容
function evaluatecontent(result){
	var html = "";


	var v = result.data.data;
	for(var i=0;i<v.length;i++){
		console.log(v[i])
		html+=`
			<div class="clear">
				<div class="evaluate-user clear">
					<p>
			`;
		if(v[i].score_total == 1){
			html+=`
				<i class="samll-solid"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
			`;
		}else if(v[i].score_total == 2){
			html+=`
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
			`;
		}else if(v[i].score_total == 3){
			html+=`
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-heart"></i>
				<i class="samll-heart"></i>
			`;
		}else if(v[i].score_total == 4){
			html+=`
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-heart"></i>
			`;
		}else if(v[i].score_total == 5){
			html+=`
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
				<i class="samll-solid"></i>
			`;
		}
		var ip = v[i].ip.toString();
		ip = ip.slice(0,3)+"******"+ip.slice(ip.length-3,ip.length)			
		html+=`
						<span>${ip}</span>
					</p>
				</div>
				<div class="evaluate-content clear">
					<div class="comment-score">${v[i].score_total}分</div>
					<div class="comment-evaluate clear">
						<div class="detaile-score">
			`

		if(v[i].score_guide !== null && v[i].score_guide !== undefined && v[i].score_guide!==""){
			html+=`
				<div>
					<span>导游讲解:</span>
			`;
			if(v[i].score_guide == 1){
				html+=`<span class="grade">很糟</span>`;
			}else if(v[i].score_guide == 2){
				html+=`<span class="grade">差</span>`
			}else if(v[i].score_guide == 3){
				html+=`<span class="grade">一般</span>`;
			}else if(v[i].score_guide == 4){
				html+=`<span class="grade">比较满意</span>`;
			}else if(v[i].score_guide == 5){
				html+=`<span class="grade">很满意</span>`;
			}
								
			html+=`
								</div>
				`
		}
		if(v[i].score_service!==null&&v[i].score_service!==undefined && v[i].score_service!==""){	
			html+=`						
				<div>
					<b></b>
					<span>领队服务:</span>
			`;
			if(v[i].score_service == 1){
				html+=`<span class="grade">很糟</span>`;
			}else if(v[i].score_service == 2){
				html+=`<span class="grade">差</span>`
			}else if(v[i].score_service == 3){
				html+=`<span class="grade">一般</span>`;
			}else if(v[i].score_service == 4){
				html+=`<span class="grade">比较满意</span>`;
			}else if(v[i].score_service == 5){
				html+=`<span class="grade">很满意</span>`;
			}
			html+=`
								</div>
					`;
		}
		if(v[i].score_traffic!==null&&v[i].score_traffic!==undefined&&v[i].score_traffic!==""){	
			html+=`				
				<div>
					<b></b>
					<span>交通路线:</span>
			`;
			if(v[i].score_traffic == 1){
				html+=`<span class="grade">很糟</span>`;
			}else if(v[i].score_traffic == 2){
				html+=`<span class="grade">差</span>`
			}else if(v[i].score_traffic == 3){
				html+=`<span class="grade">一般</span>`;
			}else if(v[i].score_traffic == 4){
				html+=`<span class="grade">比较满意</span>`;
			}else if(v[i].score_traffic == 5){
				html+=`<span class="grade">很满意</span>`;
			}	
			html+=`
					</div>
					`;
		}
		if(v[i].score_hotel!==null&&v[i].score_hotel!==undefined&&v[i].score_hotel!==""){
			html+=`				
				<div>
					<b></b>
					<span>住宿餐食:</span>
			`;
			if(v[i].score_hotel == 1){
				html+=`<span class="grade">很糟</span>`;
			}else if(v[i].score_hotel == 2){
				html+=`<span class="grade">差</span>`
			}else if(v[i].score_hotel == 3){
				html+=`<span class="grade">一般</span>`;
			}else if(v[i].score_hotel == 4){
				html+=`<span class="grade">比较满意</span>`;
			}else if(v[i].score_hotel == 5){
				html+=`<span class="grade">很满意</span>`;
			}	
			html+=`
					</div>
					`;
		}
		html+=`
				</div>
				<div class="comment">
					${v[i].comment_content}
				</div>
			`;
		if(v[i].comment_img!==""&&v[i].comment_img!==null&&v[i].comment_img!==undefined){
			var img = v[i].imgurls;
			//console.log(img)
			html+=`<div class="img-box">`;
			for(var i=0;i<img.length;i++){
				html+=`<img src="${img[i]}" alt="">`;
			}
			html+=`</div>`;
		}					
		html+=`
				<ul>
			`;
		if(v[i].comment_guide!==null&&v[i].comment_guide!==undefined&&v[i].comment_guide!==""){
			html+=`
				<li>
					<span>[导游讲解]</span>
					<b>${v[i].comment_guide}</b>
				</li>
			`;
		}								
		if(v[i].comment_service!==null&&v[i].comment_service!==undefined&&v[i].comment_service!==""){
			html+=`
					<li>
						<span>[领队服务]</span>
						<b>${v[i].comment_service}</b>
					</li>
			`;
		}
		if(v[i].comment_traffic!==null&&v[i].comment_traffic!==undefined&&v[i].comment_traffic!==""){
			html+=`						
				<li>
					<span>[交通路线]</span>
					<b>${v[i].comment_traffic}</b>
				</li>
			`;
		}
		if(v[i].comment_hotel!==null&&v[i].comment_hotel!==undefined&&v[i].comment_hotel!==""){
			html+=`
				<li>
					<span>[住宿餐食]</span>
					<b>${v[i].comment_hotel}</b>
				</li>
			`;
		}
		var newdate = new Date(v[i].add_time)
		var y = newdate.getFullYear();  
		var m = newdate.getMonth() + 1;  
		m = m < 10 ? ('0' + m) : m;  
		var d = newdate.getDate();  
		d = d < 10 ? ('0' + d) : d;  
		var h = newdate.getHours();  
		var minute = newdate.getMinutes();  
			minute = minute < 10 ? ('0' + minute) : minute;  
		var time = y + '-' + m + '-' + d+' '+h+':'+minute;
		html+=`	
						</ul>
						<div class="evaluate-time">
							${time}
						</div>
					</div>
				</div>
			</div>
		`;
	}
	$(".evaluate-box").html(html);
}
