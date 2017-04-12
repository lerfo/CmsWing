$(function(){
	$(".uc-order").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	//console.log("ok")
          	var html="";
     		$.ajax({
     			url:"/uc/order/query",
     			success:function(result){
     				console.log(result.data);
     				html=
	          			'<div class="order-handing">'+
							'<div class="order-title">'+
				              	'<img src="/uc/index/avatar"  class=" rounded" alt="'+result.data.username+'" style="width: 65px" />'+
					            '<span>'+result.data.username+'</span>'+
					            '<a class="btn btn-info apply" href="">申请成为商家</a>'+
				          	'</div>'+
				          	'<div class="order-content min-height">'+
				          		'<div class="table-list">'+
					                '<a class="all-order">全部订单</a>'+
					                '<a class="not-start">未出行</a>'+
					                '<a class="obligation-order">待付款</a>'+
					                '<a class="pending-evaluation">待评价</a>'+
				        		'</div>'+
				        		'<div class="table-responsive order-table">'								
				        		;
     				$.each(result.data,function(k,v){
     					var list = v.goods;
						//console.log(list)
						if(list.length<=1){
	     					html+=`
	     						<table>
									<tr>
										<td>
				                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
				                        </td>
				                        <td>姓名</td>
				                        <td>出发日期</td>
				                        <td>总金额</td>
				                        <td>订单状态</td>
				                        <td>操作</td>
									</tr><tr>
								`;
							
						
							$.each(list,function(k,goods){
								html+=`									
										<td>
				                          	<a class="goodsItem" href="">${v.title}</a>
				                        </td>
				                        <td>
											<a href="">${v.connect_name}</a>
				                        </td>
				                        <td>${v.create_time}</td>
				                        <td>￥${v.order_amount}</td>
						            `;
						        if(v.pay_status == 0 && v.delivery_status != 1 && v.status != 6 && v.status != 4){
						        	html+=`
											<td>
												<span class="text-warning">等待付款</span>
												<br />
												<a class="order-detail" href="">订单详情</a>
											</td>
							                <td>
												<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
							                </td>
											</tr>
											</table>													
						        	`;
						        }else if((v.pay_status == 1 || v.status ==3) && v.delivery_status != 1 && v.status != 6 && v.status != 4){
						        	html+=`
										<td>
											<span class="text-warning">等待发货</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
						                </td>
									</tr>	
									</table>												
						        	`;
						        }else if(v.delivery_status == 1 && v.status != 6 && v.status != 4){
						        	html+=`
										<td>
											<span class="text-success">等待收货</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											<a class="btn btn-success btn-xs confirm ajax-get" href="/uc/order/confirmreceipt/id/${v.id}"><i class="fa fa-cart-plus white"></i>确认收货 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }else if(v.status == 6){
						        	html+=`
										<td>
											<span class="text-danger">已取消</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }else if( v.status == 4){
						        	html+=`
										<td>
											<span class="text-default">已完成</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }					                   
							})
						}else if(list.length>1){
							$.each(list,function(k,goods){
								html+=`
								<table>
									<tr>
										<td>
				                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
				                        </td>
				                        <td>姓名</td>
				                        <td>出发日期</td>
				                        <td>总金额</td>
				                        <td>订单状态</td>
				                        <td>操作</td>
									</tr>
									<tr>	
										<td>
				                          	<a class="goodsItem" href="">${goods.title}</a>
				                        </td>
				                        <td>
											<a href="">${v.accept_name}</a>
				                        </td>
				                        <td>${v.create_time}</td>
				                        <td>￥${v.order_amount}</td>
						            `;
						        if(v.pay_status == 0 && v.delivery_status != 1 && v.status != 6 && v.status != 4){
						        	html+=`
											<td>
												<span class="text-warning">等待付款</span>
												<br />
												<a class="order-detail" href="">订单详情</a>
											</td>
							                <td>
												<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
							                </td>
											</tr>
											</table>													
						        	`;
						        }else if((v.pay_status == 1 || v.status ==3) && v.delivery_status != 1 && v.status != 6 && v.status != 4){
						        	html+=`
										<td>
											<span class="text-warning">等待发货</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
						                </td>
									</tr>	
									</table>												
						        	`;
						        }else if(v.delivery_status == 1 && v.status != 6 && v.status != 4){
						        	html+=`
										<td>
											<span class="text-success">等待收货</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											<a class="btn btn-success btn-xs confirm ajax-get" href="/uc/order/confirmreceipt/id/${v.id}"><i class="fa fa-cart-plus white"></i>确认收货 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }else if(v.status == 6){
						        	html+=`
										<td>
											<span class="text-danger">已取消</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }else if( v.status == 4){
						        	html+=`
										<td>
											<span class="text-default">已完成</span>
											<br />
											<a class="order-detail" href="">订单详情</a>
										</td>
						                <td>
											 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
						                </td>
									</tr>
									</table>													
						        	`;
						        }					                   
							})
						}
     				})
     				html+=`							
							</div>
			          	</div>
			        </div>
     				`;
     				$(".aside-right").html(html);

     				$(".obligation-order").on("click",function(e){
						e.preventDefault();
				      	window.event.returnValue=false;
				      	console.log("ok")
				      	var html="";
				          	$.ajax({
				          		url:"/uc/order/query",
				          		success:function(result){
				          			$.each(result.data,function(k,v){
				          				if(v.pay_status == 0 && v.delivery_status != 1 && v.status != 6 && v.status != 4){
				          					var list = v.goods;
				          					if(list.length<=1){
				          						html+=`
					     						<table>
													<tr>
														<td>
								                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
								                        </td>
								                        <td>姓名</td>
								                        <td>出发日期</td>
								                        <td>总金额</td>
								                        <td>订单状态</td>
								                        <td>操作</td>
													</tr>
													<tr>
												`;
												$.each(list,function(k,goods){
													html+=`									
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>
										                        <td>
																	<span class="text-warning">等待付款</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
												                </td>
															</tr>
														</table>	
										            `;
												})
				          					}else if(list.length>1){
				          						$.each(list,function(k,goods){
				          							html+=`
														<table>
															<tr>
																<td>
										                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
										                        </td>
										                        <td>姓名</td>
										                        <td>出发日期</td>
										                        <td>总金额</td>
										                        <td>订单状态</td>
										                        <td>操作</td>
															</tr>
															<tr>	
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>								      
																<td>
																	<span class="text-warning">等待付款</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
												                </td>
															</tr>
														</table>													
										        	`;         			
				          						})
				          					}
				          					
				          				}
				          			})
				          		$(".order-table").html(html)
				          		}
				          	})
					})
					$(".all-order").on("click",function(e){
						if(e&&e.preventDefault)
				          	e.preventDefault();
				          	window.event.returnValue=false;
				          	//console.log("ok")
				          	var html="";
				        $.ajax({
				        	url:"/uc/order/query",
				        	success:function(result){				        			          			
			     				$.each(result.data,function(k,v){
			     					var list = v.goods;
									//console.log(list)
									if(list.length<=1){
				     					html+=`
				     						<table>
												<tr>
													<td>
							                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
							                        </td>
							                        <td>姓名</td>
							                        <td>出发日期</td>
							                        <td>总金额</td>
							                        <td>订单状态</td>
							                        <td>操作</td>
												</tr><tr>
											`;
									
										$.each(list,function(k,goods){
											html+=`									
													<td>
							                          	<a class="goodsItem" href="">${goods.title}</a>
							                        </td>
							                        <td>
														<a href="">${v.accept_name}</a>
							                        </td>
							                        <td>${v.create_time}</td>
							                        <td>￥${v.order_amount}</td>
									            `;
									        if(v.pay_status == 0 && v.delivery_status != 1 && v.status != 6 && v.status != 4){
									        	html+=`
														<td>
															<span class="text-warning">等待付款</span>
															<br />
															<a class="order-detail" href="">订单详情</a>
														</td>
										                <td>
															<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
										                </td>
														</tr>
														</table>													
									        	`;
									        }else if((v.pay_status == 1 || v.status ==3) && v.delivery_status != 1 && v.status != 6 && v.status != 4){
									        	html+=`
													<td>
														<span class="text-warning">等待发货</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
									                </td>
												</tr>	
												</table>												
									        	`;
									        }else if(v.delivery_status == 1 && v.status != 6 && v.status != 4){
									        	html+=`
													<td>
														<span class="text-success">等待收货</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														<a class="btn btn-success btn-xs confirm ajax-get" href="/uc/order/confirmreceipt/id/${v.id}"><i class="fa fa-cart-plus white"></i>确认收货 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }else if(v.status == 6){
									        	html+=`
													<td>
														<span class="text-danger">已取消</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }else if( v.status == 4){
									        	html+=`
													<td>
														<span class="text-default">已完成</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }					                   
										})
									}else if(list.length>1){
										$.each(list,function(k,goods){
											html+=`
											<table>
												<tr>
													<td>
							                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
							                        </td>
							                        <td>姓名</td>
							                        <td>出发日期</td>
							                        <td>总金额</td>
							                        <td>订单状态</td>
							                        <td>操作</td>
												</tr>
												<tr>	
													<td>
							                          	<a class="goodsItem" href="">${goods.title}</a>
							                        </td>
							                        <td>
														<a href="">${v.accept_name}</a>
							                        </td>
							                        <td>${v.create_time}</td>
							                        <td>￥${v.order_amount}</td>
									            `;
									        if(v.pay_status == 0 && v.delivery_status != 1 && v.status != 6 && v.status != 4){
									        	html+=`
														<td>
															<span class="text-warning">等待付款</span>
															<br />
															<a class="order-detail" href="">订单详情</a>
														</td>
										                <td>
															<a class="btn btn-danger btn-xs" href="/uc/pay/pay?order=${v.id}" target="_blank"><i class="fa fa-credit-card white"></i>立即付款 </a>
										                </td>
														</tr>
														</table>													
									        	`;
									        }else if((v.pay_status == 1 || v.status ==3) && v.delivery_status != 1 && v.status != 6 && v.status != 4){
									        	html+=`
													<td>
														<span class="text-warning">等待发货</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
									                </td>
												</tr>	
												</table>												
									        	`;
									        }else if(v.delivery_status == 1 && v.status != 6 && v.status != 4){
									        	html+=`
													<td>
														<span class="text-success">等待收货</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														<a class="btn btn-success btn-xs confirm ajax-get" href="/uc/order/confirmreceipt/id/${v.id}"><i class="fa fa-cart-plus white"></i>确认收货 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }else if(v.status == 6){
									        	html+=`
													<td>
														<span class="text-danger">已取消</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }else if( v.status == 4){
									        	html+=`
													<td>
														<span class="text-default">已完成</span>
														<br />
														<a class="order-detail" href="">订单详情</a>
													</td>
									                <td>
														 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
									                </td>
												</tr>
												</table>													
									        	`;
									        }					                   
										})
									}
			     				})
			     				
			     				$(".order-table").html(html);
							}
				        })
					})
					$(".not-start").on("click",function(e){
						e.preventDefault();
				      	window.event.returnValue=false;
				      	console.log("ok")
				      	var html="";
				          	$.ajax({
				          		url:"/uc/order/query",
				          		success:function(result){
				          			$.each(result.data,function(k,v){
				          				if((v.pay_status == 1 || v.status ==3) && v.delivery_status != 1 && v.status != 6 && v.status != 4){
				          					var list = v.goods;
				          					if(list.length<=1){
				          						html+=`
					     						<table>
													<tr>
														<td>
								                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
								                        </td>
								                        <td>姓名</td>
								                        <td>出发日期</td>
								                        <td>总金额</td>
								                        <td>订单状态</td>
								                        <td>操作</td>
													</tr>
													<tr>
												`;
												$.each(list,function(k,goods){
													html+=`									
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>
										                       	<td>
																	<span class="text-warning">等待发货</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
												                </td>
															</tr>	
														</table>		
										            `;
												})
				          					}else if(list.length>1){
				          						$.each(list,function(k,goods){
				          							html+=`
														<table>
															<tr>
																<td>
										                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
										                        </td>
										                        <td>姓名</td>
										                        <td>出发日期</td>
										                        <td>总金额</td>
										                        <td>订单状态</td>
										                        <td>操作</td>
															</tr>
															<tr>	
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>								      
																<td>
																	<span class="text-warning">等待发货</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	<a class="btn btn-warning btn-xs" href="#"><i class="fa fa-cart-plus white"></i>提醒发货 </a>
												                </td>
															</tr>	
														</table>									
										        	`;         			
				          						})
				          					}
				          					
				          				}
				          			})
				          		$(".order-table").html(html)
				          		}
				          	})
					})
					$(".pending-evaluation").on("click",function(e){
						e.preventDefault();
				      	window.event.returnValue=false;
				      	console.log("ok")
				      	var html="";
				          	$.ajax({
				          		url:"/uc/order/query",
				          		success:function(result){
				          			$.each(result.data,function(k,v){
				          				if(v.status == 4){
				          					var list = v.goods;
				          					if(list.length<=1){
				          						html+=`
					     						<table>
													<tr>
														<td>
								                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
								                        </td>
								                        <td>姓名</td>
								                        <td>出发日期</td>
								                        <td>总金额</td>
								                        <td>订单状态</td>
								                        <td>操作</td>
													</tr>
													<tr>
												`;
												$.each(list,function(k,goods){
													html+=`									
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>
										                       <td>
																	<span class="text-default">已完成</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
												                </td>
															</tr>
														</table>
										            `;
												})
				          					}else if(list.length>1){
				          						$.each(list,function(k,goods){
				          							html+=`
														<table>
															<tr>
																<td>
										                          	订单号：<a href="#" target="_blank">${v.order_no}</a>
										                        </td>
										                        <td>姓名</td>
										                        <td>出发日期</td>
										                        <td>总金额</td>
										                        <td>订单状态</td>
										                        <td>操作</td>
															</tr>
															<tr>	
																<td>
										                          	<a class="goodsItem" href="">${goods.title}</a>
										                        </td>
										                        <td>
																	<a href="">${v.accept_name}</a>
										                        </td>
										                        <td>${v.create_time}</td>
										                        <td>￥${v.order_amount}</td>								      
																<td>
																	<span class="text-default">已完成</span>
																	<br />
																	<a class="order-detail" href="">订单详情</a>
																</td>
												                <td>
																	 <a class="btn btn-default btn-xs" href="#"><i class="fa fa-cart-plus white"></i>再次购买 </a>
												                </td>
															</tr>
														</table>							
										        	`;         			
				          						})
				          					}
				          					
				          				}
				          			})
				          		$(".order-table").html(html)
				          		}
				          	})
					})
					$(".order-detail").on("click",function(e){
						if(e&&e.preventDefault)
				          	e.preventDefault();
				          	window.event.returnValue=false;
				          	//console.log("ok")
				          	var html="";
				          	$.ajax({
				          		url:"/uc/order/query",
				          		success:function(result){
				          			html+=`
										<div class="detail-box">
									        <div>
									            <div class="detail-title">
									              订单详情
									            </div>
									            <div class="detail-content clear">
									              <div class="order-state">
									                <p>订单状态:未提交 </p>
									                <p>订单编号:1111111111111111</p>
									              </div>
									              <div class="order-select">
									                <button>继续预定</button> 
									                <br>                            
									                <button>取消订单</button> 
									              </div>             
									            </div>
									          </div>
									          <div>
									            <div class="detail-title">
									              <span>订单信息</span>
									            </div>
									            <div class="detail-content order-information">
									              <p>
									                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
									              </p>
									              <p>
									                <span>出发城市上海</span>
									                <span>出发日期2017-02-22</span>
									                <span>返回日期2017-05-11</span>
									                <span>2成人</span>
									                <span>金额:￥11111</span>
									              </p>
									            </div>
									          </div>
									          <div>
									            <div class="detail-title">
									              <span>联系人</span>
									            </div>
									            <div class="detail-content">
									              <ul>
									                <li>
									                  <b>姓名</b>
									                  <span>xxx</span>
									                </li>
									                <li>
									                  <b>Email</b>
									                  <span>123456789@qq.com</span>
									                </li>
									                <li>
									                  <b>手机号码</b>
									                  <span>111111111111</span>
									                </li>
									              </ul>
									            </div>
									          </div>
									          <div>
									            <div class="detail-title">
									              <span>旅客</span>
									            </div>
									            <div class="detail-content">

									              <div>
									                <div class="traveller-num">
									                  <p>旅客</p>
									                  <span>成人</span>
									                </div>             
									                <ul>
									                  <li>
									                    <b>中文姓名</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>英文姓名</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>国籍</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>证件类型</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>性别</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>出生日期</b><span>xxxxxxx</span>
									                  </li>
									                  <li>
									                    <b>联系电话</b><span>xxxxxxx</span>
									                  </li>
									                </ul>
									              </div>

									            </div>
									          </div>
									        </div>
				          			`;
				          		$(".aside-right").html(html);
				          		}
				          	})				          	
					})
     			}
     		})	
	})
	
	$(".uc-archives").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	$.ajax({
          		url:"/uc/seting/query",
          		success:function(data){
          			//console.log(data)
          			html+=`
						<div class="person-archives">
							<div class="archives-header">
			                	个人档案
			            	</div>
							<div class="archives min-height">
				              	<div class="tab-pane fade in active" id="info">
				                	<form role="form" action="/uc/seting/updateinfo" method="post" class="form-horizontal form-info">
				                  		<div class="form-group">
				                    		<label class="col-md-2 control-label">昵称</label>
					                    	<div class="col-md-10">
					                      		<p class="form-control-static uname">${data.username}</p>
					                    	</div>
				                  		</div>	                  
				                  		<div class="form-group">
				                    		<label class="col-md-2 control-label">姓名</label>
				                    		<div class="col-md-4">
				                    			<input type="text" placeholder="真实姓名" class="form-control" name="real_name" value="">
				                    		</div>
				                  		</div>
				        `;
				    if(data.sex==1){
				    	html+=`
							<div class="form-group">
	                    		<label class="col-md-2 control-label">性别</label>
	                    		<div class="col-md-10">
									<label class="radio" style="margin-top: 3px;padding-top: 3px">
			                        	<input type="radio" checked="checked" value="1" name="sex">
			                        	<i></i> 男
		                      		</label>
		                      		<label class="radio" style="margin-top: 3px;padding-top: 3px">
		                      			<input type="radio" value="2" name="sex">
		                      			<i></i> 女
		                    		</label>
	                    		</div>
	                  		</div>
				    	`;
				    }else if(data.sex==2){
				    	html+=`
							<div class="form-group">
	                    		<label class="col-md-2 control-label">性别</label>
	                    		<div class="col-md-10">
									<label class="radio" style="margin-top: 3px;padding-top: 3px">
			                        	<input type="radio" value="1" name="sex">
			                        	<i></i> 男
		                      		</label>
		                      		<label class="radio" style="margin-top: 3px;padding-top: 3px">
		                      			<input type="radio" checked="checked" value="2" name="sex">
		                      			<i></i> 女
		                    		</label>
	                    		</div>
	                  		</div>
				    	`;
				    }
				    html+=`     		
		                  		<div class="form-group">
				                    <label class="col-md-2 control-label">生日</label>
				                    <div class="col-md-4">
				                      	<input type="text" name="birthday" value="" class="form-control masked" data-format="9999-99-99" data-placeholder="_" placeholder="年-月-日">
				                    </div>
		                  		</div>
			                  	<div class="form-group">
			                    	<label class="col-md-2 control-label">手机号码</label>
			                    	<div class="col-md-4">
			                      		<input type="text" name="mobile" value="${data.mobile}" class="form-control masked" data-format="99999999999" data-placeholder="X" placeholder="手机号码">
			                    	</div>
			                    </div>
		                  		<div class="form-group">
		                    		<label class="col-md-2 control-label">固定电话</label>
		                    		<div class="col-md-10   landline-telephone">
		                      			<input type="text" name="phone_zone" value="${data.phone_zone}" class="area"  data-placeholder="区号" placeholder="区号">
		                      			<input type="text" name="phone_number" value="${data.phone_number}" class="telephone"  data-placeholder="电话" placeholder="电话">
		                      			<input type="text" name="phone_ext" value="${data.phone_ext}" class="extension"  data-placeholder="分机" placeholder="分机">
		                    		</div>
		                  		</div>
								<div class="form-group">
			                    		<label class="col-md-2 control-label">常用出发城市</label>
			                    		<div class="col-md-10">
				                      		<select class="form-control pointer  " id="start_province1" name="start_province" style="width: 150px;display: inline-block">
				                        		<option value="">--- 省份/直辖市 ---</option>
				                        		{% for val in start_province %}
				                        		<option value="{{val.id}}" {% if userInfo.start_province == val.id %} selected {% endif%}>{{val.name}}</option>
				                        		{% endfor %}
				                      		</select>
				                      		<select class="form-control pointer  " id="start_city1" name="start_city" style="width: 150px;display: inline-block">
				                        		{% for val in start_city %}
				                        		<option value="{{val.id}}" {% if userInfo.start_city == val.id %} selected {% endif%}>{{val.name}}</option>
				                        		{% else %}
				                        		<option value="">--- 市 ---</option>
				                        		{% endfor %}
				                      		</select>
			                    		</div>
			                  		</div> 		
			                  		<div class="form-group margin-top-30">
			                    		<div class="col-md-4 col-md-offset-2">
			                      			<button class="btn btn-primary ajax-post" target-form="form-info" type="submit" ><i class="fa fa-check"></i>保存更改 </button>
			                     		</div>
									</div>
			                	</form>
			              	</div>
						</div>	
			        </div>
			       		`;
				$(".aside-right").html(html);
          		}
          	})
	})
	
	$(".uc-portrait").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	$.ajax({
          		url:"/uc/seting/query",
          		success:function(data){
          			html=`
						<div class="head-title">
              头像设置
            </div>
            <div class="add-picture min-height">
              

                <div class="" id="avatar-modal" aria-labelledby="avatar-modal-label" >
                  <div class="">
                    <div class="">
                      <form class="avatar-form" action="/uc/seting/updateavatar" enctype="multipart/form-data" method="post">

                        <div class="modal-body">
                          <div class="avatar-body">
                            <div class="avatar-upload">
                              <input class="avatar-src" name="avatar_src" type="hidden">
                              <input class="avatar-data" name="avatar_data" type="hidden">

                              </div>
                            <div class="fancy-file-upload fancy-file-primary">
                              <b class="upload">头像</b>
                              
                              <input type="file" class="form-control avatar-input" id="avatarInput" name="file" onchange="jQuery(this).next('input').val(this.value);" />
                              
                              <span class="button">上传图片</span>
                              <span class="upload">仅支持jpg.gif.png格式图片,且文件小于2M</span>
                            </div>
                            <div class="row">

                              <div class="col-md-6 col-md-offset-1">
                                <div class="avatar-wrapper"></div>
                              </div>
                              <div class="col-md-4" style="vertical-align: bottom">
                                <div class="avatar-preview preview-lg"><img src="/uc/index/avatar"  alt="${data.username}" /></div>
                                <div class="avatar-preview preview-md"><img src="/uc/index/avatar"  alt="${data.username}" /></div>
                                <div class="avatar-preview preview-sm"><img src="/uc/index/avatar"  alt="${data.username}" /></div>
                              </div>

                            </div>
                            <div class="row avatar-btns">
                              <div class="col-md-3">
                                <button class="btn btn-primary btn-block avatar-save" type="submit"><i class="fa fa-save"></i> 保存修改</button>
                              </div>
                              <div class="col-md-9">
                                <div class="btn-group">
                                  <button class="btn" data-method="rotate" data-option="-90" type="button" title="Rotate -90 degrees"><i class="fa fa-undo"></i> 向左旋转</button>
                                </div>
                                <div class="btn-group">
                                  <button class="btn" data-method="rotate" data-option="90" type="button" title="Rotate 90 degrees"><i class="fa fa-repeat"></i> 向右旋转</button>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
            
            </div>
		          	`;
		          	$(".aside-right").html(html);
          		}
          	})
          	
          	
	})
	$(".uc-community").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
	})
	$(".uc-account").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	html=`
		          <div class="security-title">
		            账号安全
		          </div>
		          <div class="security-box min-height">
		            <div class="alter">
		              修改登录密码
		            </div>
		            <form class="form-password form-horizontal" action="/uc/seting/updatepassword" method="post">

		                    <div class="form-group">
		                      <label class="control-label col-md-2">旧密码</label>
		                      <div class="col-md-4">
		                      <input type="password" class="form-control" name="oldpassword" placeholder="输入旧密码">
		                      </div>
		                    </div>
		                    <div class="form-group">
		                      <label class="control-label col-md-2">新密码</label>
		                      <div class="col-md-4">
		                      <input type="password" class="form-control" name="password" placeholder="密码长度6-20个字符">
		                        </div>
		                    </div>
		                    <div class="form-group">
		                      <label class="control-label col-md-2">确认密码</label>
		                      <div class="col-md-4">
		                      <input type="password" class="form-control" name="repassword" placeholder="密码长度6-20个字符">
		                        </div>
		                    </div>

		                    <div class="form-group margin-top-30">
		                      <div class="col-md-4 col-md-offset-2">
		                        <button class="btn btn-primary ajax-post" target-form="form-password" type="submit" ><i class="fa fa-check"></i> 确认修改 </button>
		                      </div>

		                    </div>
		            </form>
		          </div>
       
	          	`;
	          	$(".aside-right").html(html);
	})
	$(".uc-collection").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
	})
	$(".uc-traveller").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	$.ajax({
          		url:"/uc/traveller/query",
          		success:function(result){
          			//console.log(result);
          			html+=`
				           <div class="information-title">
				               <span>旅客姓名</span>
				              <input type="text" placeholder="中文/英文">
				              <button>查询</button>
				              <button>新增</button>
				           </div>
				           <div class="information min-height">
				              <div class="table-responsive">
				              <table class="table table-bordered table-striped table-vertical-middle">
				                <thead>
				                <tr>
				                  <th>中文姓名</th>
				                  <th>英文姓名</th>
				                  <th>国际</th>
				                  <th>证件</th>
				                  <th>手机</th>
				                  <th>类型</th>
				                  <th>操作</th>
				                </tr>
				                </thead> 
				                <tbody>
          			`;
          			$.each(result.data,function(k,v){
          				html+=`												               
				                <tr>
				                  <td>${v.name_zh}</td>
				                  <td>${v.name_en_last} ${v.name_en_first}</td>
				                  <td>${v.country}</td>
				                  <td>${v.credentials_type_name}:${v.credentials_value}</td>
				                  <td>${v.phone}</td>
				                  <td>${v.type_name}</td>
				                  <td><a class="btn btn-default btn-xs" data-toggle="ajaxModal" href="/uc/traveller/editaddrmodal/id/${v.id}/type/1"><i class="fa fa-edit white"></i>编辑 </a>
				                    <a class="btn btn-default btn-xs confirm ajax-get" href="/uc/traveller/deladdr/id/${v.id}"><i class="fa fa-times white"></i>删除 </a></td>
				                </tr>

				               
          				`;
          			})
          			html+=`
					 		</tbody>
			              </table>
			            </div>
			         </div>
          			`;
          		$(".aside-right").html(html);	
          		}
          	})
	})
	$(".uc-address").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	$.ajax({
          		url:"/uc/address/query",
          		success:function(result){
          			console.log(result)
          			html+=`
						 <div class="address-title">
				            <span>关键字</span>
				            <input type="text" placeholder="地址收件人/简称">
				            <button>查询</button>
				            <button>新增</button>
				        </div>
				        <div class="address-list min-height">
				            <div class="table-responsive">
				              <table class="table table-bordered table-striped table-vertical-middle">
				                <thead>
				                <tr>
				                  <th >收货人</th>
				                  <th>所在地区</th>
				                  <th>街道地址</th>
				                  <th>邮编</th>
				                  <th>手机</th>
				                  <th></th>
				                  <th>操作</th>
				                </tr>
				                </thead>
				                <tbody>
          			`;
          			$.each(result.data,function(k,v){
          				html+=`        			                			          
			                <tr>
			                  <td>${v.accept_name}</td>
			                  <td>${v.province},${v.city},${v.county}</td>
			                  <td>${v.addr}</td>
			                  <td>
			                    ${v.zip}
			                  </td>
			                  <td>
			                 	${v.mobile}
			                  </td>
			             `;
			            if(v.is_default == 1){
			            	html+=` 
				            	<td><span class="label label-primary">默认地址 </span></td>
				                  <td><a class="btn btn-default btn-xs" data-toggle="ajaxModal" href="/uc/address/editaddrmodal/id/${v.id}/type/1"><i class="fa fa-edit white"></i>编辑 </a>
				                    <a class="btn btn-default btn-xs confirm ajax-get" href="/uc/address/deladdr/id/${v.id}"><i class="fa fa-times white"></i>删除 </a></td>
				                </tr>			              				                    
          					`;
			            }else{
			            	html+=` 
				            	<td><a class="btn btn-default btn-xs ajax-get" href="/uc/address/addrisdefault/id/${v.id}"><i class="fa fa-check white"></i>设为默认地址 </a></td>
				                  <td><a class="btn btn-default btn-xs" data-toggle="ajaxModal" href="/uc/address/editaddrmodal/id/${v.id}/type/1"><i class="fa fa-edit white"></i>编辑 </a>
				                    <a class="btn btn-default btn-xs confirm ajax-get" href="/uc/address/deladdr/id/${v.id}"><i class="fa fa-times white"></i>删除 </a></td>
				                </tr>			              				                 
          					`;
			            }
			                 
          			})
          			html+=`
						 </tbody>
			              </table>
			            </div>
			          </div>   
          			`;
          		$(".aside-right").html(html);	
          		}
          	})
	})
	$(".uc-coupon").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
          	html=`
				<div class="coupon-title clear">
		            <span>优惠券</span>
		            <div>
		              <span class="add">添加新的优惠券</span>
		              <input type="text" placeholder="输入16位优惠券验证码">
		              <button>添加</button>
		            </div>
		         </div>
		         <div class="coupon-content">
		            <div class="table-list coupon-list">
		                  <a>序列号/卡号</a>
		                  <a>面值/折扣</a>
		                  <a>节奏有效时间</a>
		                  <a>使用状态</a>
		            </div>
		            
		            <div class="table-responsive coupon min-height">
		              <div class="coupon-count">
		                <b>所有优惠券</b>
		                <span>(共<a href=""> N </a>个,可用优惠券<a href=""> N </a>个)</span>
		              </div>
		              <table>
		                <tr>
		                  <td>123456789</td>
		                  <td>￥100</td>
		                  <td>2017-11-01</td>
		                  <td> <a href="">可用</a> </td>
		                </tr>
		              </table>
		              <table>
		                <tr>
		                  <td>3453765688</td>
		                  <td>￥46</td>
		                  <td>2017-04-11</td>
		                  <td> <a href="">已失效</a> </td>
		                </tr>
		              </table>
		           </div>
		         </div>
          	`;
          	$(".aside-right").html(html);
	})
	$(".uc-message").on("click",function(e){
		if(e&&e.preventDefault)
          	e.preventDefault();
          	window.event.returnValue=false;
          	var html="";
	})
})