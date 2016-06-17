$(function(){
	$.ajax({
		type: "GET",
		url: "ajax/data.json",
		dataType: "json",
		success: function(data){
			for(var i in data.about_info){
				$("#about_info").append("<p>"+data.about_info[i]+"</p>");
			}
			$("#expertise_info").append("<p>"+data.expertise_info+"</p>");
			$(".expertise_int").append("<ul></ul>");
			for(var i in data.html){
				$("#expertise_int1 ul").append("<li>"+data.html[i]+"</li>");
			}
			for(var i in data.css){
				$("#expertise_int2 ul").append("<li>"+data.css[i]+"</li>");
			}
			for(var i in data.javaScript){
				$("#expertise_int3 ul").append("<li>"+data.javaScript[i]+"</li>");
			}
			for(var i in data.react){
				$("#expertise_int4 ul").append("<li>"+data.react[i]+"</li>");
			}
			for(var i in data.contact_info) {
				$("#contact_info").append("<p>"+data.contact_info[i]+"</p>");
			}
		}
	});
    $('#dowebok').fullpage({
		scrollingSpeed: 400,
		css3: true,
		resize: true,
		anchors: ["page1","page2","page3","page4","page5"],
		verticalCentered: false,
		afterRender: function(){
			$("#home").css({"display":"block"}).addClass("home_zoom");
			$("aside").css({"top":($(".active").height()-$("aside").height())/2});
			$("header").before("<div id='header' style='opacity:0'></div>");	
			$("#home_head").css({"margin-top":"150px"});
			$("header").animate({opacity:"1"},1000,function(){
				$("#header").css({"opacity":"0.3"});
				$("#home_info1").fadeIn(700,function(){
					$(this).next().animate({width:"800px"},700,function(){
						$("#home_info2").fadeIn(750,function(){
							$(this).next().fadeIn(750,function(){
								$("aside").fadeIn(300);
							});
						});
					});
				});
			});	
			$("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
		},
		afterLoad: function(anchorLink,index){
			if(index==1){
				$("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
			}
			if(index==2){
				$("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
				$("#about_content h1").after("<div class='title_en'></div>");
				$(".title_en").animate({width:"150px"}, 800);
				$("#about_info").animate({width:"800px",marginTop:"0",marginBottom:"0"},700,'easeOutElastic',function(){
					$("#about_info p").eq(0).animate({bottom:"0"}, 700,function(){
						$("#about_info p").eq(1).animate({bottom:"0"}, 700,function(){
							$("#about_info p").eq(2).animate({bottom:"0"}, 700,function(){
								$("#about_info p").eq(3).animate({bottom:"0"}, 700);
							});
						});
					});
				});	
			}
			if(index==3){
				$("aside a").eq(2).addClass("selected").siblings().removeClass("selected");
				$("#expertise_content h1").after("<div class='title_en'></div>");
				$(".title_en").animate({width:"140px"},800);	
				$(".expertise_list_content").addClass("expertise_scale");
			}
			if(index==4){
				$("aside a").eq(3).addClass("selected").siblings().removeClass("selected");
				$("#demo_content h1").after("<div class='title_en'></div>");
				$(".title_en").animate({width:"100px"},800);	
				var i =- 1;
				$(".demo_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
					   $this.addClass("b_to_t");
					   }, 200*i);
					}
				})
			}
			if(index==5){
				$("aside a").eq(4).addClass("selected").siblings().removeClass("selected");
				$("#contact_content h1").after("<div class='title_en'></div>");
				$(".title_en").animate({width:"170px"},800);	
				var i =- 1;
				$("#contact_head1 span").each(function(){
					var $this=$(this);
					if(!$this.hasClass("fade_in")){
						i++;
						setTimeout(function(){
					   $this.addClass("fade_in");
					   }, 200*i);
					}
				});
				var j =- 1;
				setTimeout(function(){
						$(".contact_scale").each(function(){
							var $this=$(this);
							if(!$this.hasClass("fade_in")){
								j++;
								setTimeout(function(){
					   				$this.addClass("fade_in");
					   			}, 350*j);
							}
						});
				}, 70);
			}
		},
		onLeave:function(index , nextIndex, direction){
			if(index==2||index==3||index==4||index==5){
				$(".title_en").remove();	
			}
		}
	});
});
//侧边导航文字切换
	$("aside a").hover(function(){
		$(this).find("b").fadeToggle(200,"easeInOutCubic");
	})
// 技能明细切换
	$(".expertise_icon").click(function(){
		$(".expertise_int").each(function(){
			if($(this).is(":visible")){
				$(this).slideUp(200);
				$(this).prev().removeClass("expertise_flag_scale");
			}
		});
		if($(this).siblings(".expertise_int").is(":hidden")){
			$(this).siblings(".expertise_int").slideDown(400);
			$(this).siblings(".expertise_flag").addClass("expertise_flag_scale");
		}else{
			$(this).siblings(".expertise_int").slideUp(200);
			$(this).siblings(".expertise_flag").removeClass("expertise_flag_scale");
		}
	})
// 点击留言
	$("#contact_message1").click(function(){
		$(this).fadeOut(200,function(){
			$("#contact_form").fadeIn(200);
		})
	});
// 提交表单
	$("#contact_submit").click(function(){
		$.get("ajax/get.php");
		$("#contact_form").fadeOut(200,function(){
			$("#contact_message2").fadeIn(200);
		});
	});
//内容适应居中
	$(window).resize(function(){
		var size = $(function(){
			$("aside").css({"top":($(".active").height()-$("aside").height())/2});
			$("#home_content").css({"padding-top":($(".active").height()-$("#home_content").height())/6});
			$("#about_content").css({"padding-top":($(".active").height()-$("#about_content").height())/6});
			$("#expertise_content").css({"padding-top":($(".active").height()-$("#expertise_content").height())/6});
			$("#demo_content").css({"padding-top":($(".active").height()-$("#demo_content").height())/6});;
		});
		size();
	});