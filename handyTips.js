$('body').append('	<svg id ="test_svg" width="100%" height="100%" style="z-index: 100000000000;position: absolute; "><path id="curve" d="M0 0" stroke="white" stroke-width="3" stroke-linecap="round" fill="none" ></path></svg><svg id="arrow" width="20" height="20" style="z-index: 100000000000; position: absolute; opacity:0;"><polygon points="0,10 17,0 17,20"fill="white" stroke="white" stroke-width="1" /></svg>')

			function svg(tx, ty, dx, dy, off){
			
	 

				var mpx = (tx + dx) * 0.5;
				var mpy = (ty + dy) * 0.5;
	 
				// angle of perpendicular to line:
				var theta = Math.atan2(dy - ty, dx - tx) - Math.PI / 2;
	 
				// distance of control point from mid-point of line:
				var offset = off;
	 
				// location of control point:
				var c1x = mpx + offset * Math.cos(theta);
				var c1y = mpy + offset * Math.sin(theta);
	 
				// show where the control point is:
				
	 
				// construct the command to draw a quadratic curve
				var curve = "M" + tx + " " + ty + " Q " + c1x + " " + c1y + " " + dx + " " + dy;
				var curveElement = document.getElementById("curve");
				curveElement.setAttribute("d", curve);
		 
			 }


			var itteration = 0; 

			function helpTip(target, i) {
			
				console.log(i)
				console.log(target[i])

				var targetCoord = $(target[i].nameTarget).offset();

				$('body').css('overflow', 'hidden')
				$("#test_svg").fadeIn(300)
				$("#arrow").fadeIn(300)
			
				
				$(function(){
					$("html, body").animate({scrollTop: ($(target[i].nameTarget).offset().top - 50)+"px"});
				});			


				var targetWidth = Math.ceil($(target[i].nameTarget).outerWidth());
				var targetHeight = $(target[i].nameTarget).outerHeight();
				$(target[i].nameTarget).css('z-index', '100001');
				var heightBottomBLock = $(window).outerHeight() - targetCoord['top'] + targetHeight + 5;
				var heightBottomBLock2 = $(window).outerHeight() - targetCoord['top'];

				$('body').append('<div class="topblock bg_help_block" style="height:'+ (targetCoord['top'] - 5)+'px;"></div>')
				$('body').append('<div class="bottomBlock bg_help_block" style="top:'+ (targetCoord['top'] + targetHeight + 5)+'px;"></div>')
				$('body').append('<div class="leftBlock bg_help_block" style="width:'+ (targetCoord['left'] - 5)+'px; height:'+ (targetHeight + 10) + 'px; top:' + (targetCoord['top'] - 5) + 'px"></div>')
				$('body').append('<div class="rightBlock bg_help_block" style="height:'+ (targetHeight + 10) + 'px; top:' + (targetCoord['top'] - 5) + 'px; left:' + (targetCoord['left'] + targetWidth + 7) +'px"></div>')

				var topblock = $('.topblock').height();
				var bottomblock = $('.bottomBlock').height();

				if (topblock > bottomblock) {
					$('body').append('<div class="help_desc" style="top: '+ (targetCoord['top'] - 150)+ 'px ">'+ target[i].deskTarget + '</div>')
				}
				else{
					$('body').append('<div class="help_desc" style="top: '+ (targetCoord['top'] + targetHeight + 150)+ 'px ">'+ target[i].deskTarget + '</div>')
				}
				
				var tx = $(".help_desc").offset().left ,
					ty = $(".help_desc").offset().top + $(".help_desc").outerHeight(),
					dx = targetCoord['left'] + targetWidth,
					dy = targetCoord['top']+targetHeight;
				if(ty < dy){
					if(tx>=dx){
						
						$("#test_svg").attr("width",Math.abs(tx -  dx - targetWidth/2 + 4) +"px").attr("height", dy -targetHeight-15-ty +"px");
						$("#test_svg").css('top', ty).css('left', dx - targetWidth/2);
						svg(tx, ty, dx - targetWidth/2, dy - targetHeight -15, -(dy-targetHeight -ty)/2);
					}else{
						if(tx+ $(".help_desc").outerWidth() < dx){
							
							$("#test_svg").attr("width",Math.abs(tx- dx +targetWidth + 19) +"px").attr("height", dy -targetHeight/2-ty +"px");
							$("#test_svg").css('top', ty).css('left', tx);
							svg(tx, ty, dx -targetWidth - 15 , dy - targetHeight/2, - (dy-targetHeight -ty)/2);
						}else{
							
							$("#test_svg").attr("width",Math.abs(dx + 19 -tx -$(".help_desc").outerWidth()) +"px").attr("height", dy -targetHeight/2-ty +"px");
							$("#test_svg").css('top', ty).css('left', dx+15);
							svg(tx + $(".help_desc").outerWidth(), ty, dx + 15 , dy - targetHeight/2, (dy-targetHeight -ty)/2);
						}
						
					}
				}else{
					if(tx>=dx){
						// +
						console.log(1)
						$("#test_svg").attr("width",Math.abs(tx- dx +targetWidth/2 + 4) +10+"px").attr("height", ty -$(".help_desc").outerHeight() -dy -15 + 10 +"px");
						$("#test_svg").css('top', dy + 17).css('left', dx -targetWidth/2 +4);
						$("#arrow").css("top", dy + 10).css('left', dx -targetWidth/2 +4).css('transform', 'rotate(90deg)');
						svg(Math.abs(tx- dx +targetWidth/2 + 4), ty -$(".help_desc").outerHeight() -dy -15, 10, 10, (ty -$(".help_desc").outerHeight() -dy -15)/2);
					}else{
						if(tx + $(".help_desc").outerWidth() < dx -targetWidth){
							// +
							console.log(2)
							$("#test_svg").attr("width",Math.abs(tx + $(".help_desc").outerWidth() - dx +targetWidth/2 + 4) +10+"px").attr("height", ty -$(".help_desc").outerHeight() -dy -15 + 10 +"px");
							$("#test_svg").css('top', dy + 17).css('left', tx +$(".help_desc").outerWidth() +4);
							$("#arrow").css("top", dy + 10).css('left', dx -targetWidth/2 +4).css('transform', 'rotate(90deg)');
							svg(0, ty -$(".help_desc").outerHeight() -dy -15, Math.abs(tx + $(".help_desc").outerWidth() - dx +targetWidth/2 + 4)+10, 10 ,-(ty -$(".help_desc").outerHeight() -dy -15)/2);
						}else{
							if(tx + $(".help_desc").outerWidth() < dx){
								// доработать
								console.log(3)
								$("#test_svg").attr("width",Math.abs(tx + $(".help_desc").outerWidth() - dx)+ (ty -$(".help_desc").outerHeight() -dy - 15 )/2 +"px").attr("height", ty -$(".help_desc").outerHeight() -dy + 15 + 10 +"px");
								$("#test_svg").css('top', dy  +27).css('left', tx + $(".help_desc").outerWidth());
								$("#arrow").css("top", dy + 10).css('left', tx + $(".help_desc").outerWidth()+Math.abs(tx + $(".help_desc").outerWidth() - dx)/2 -10).css('transform', 'rotate(90deg)');
								svg(0, ty -$(".help_desc").outerHeight() -dy - 15 - 10, Math.abs(tx + $(".help_desc").outerWidth() - dx)/2, 0, - (ty -$(".help_desc").outerHeight() -dy - 15 )/2);
							}else{
								// +
								$("#test_svg").attr("width",Math.abs(tx + $(".help_desc").outerWidth() - dx - 15 +(ty -$(".help_desc").outerHeight() -dy +targetHeight/2)/2) +"px").attr("height", ty -$(".help_desc").outerHeight() -dy +targetHeight/2 + 10+"px");
								$("#test_svg").css('top', dy - targetHeight/2 -10).css('left', dx + 27);
								$("#arrow").css("top", dy - targetHeight/2 -10).css('left', dx + 10).css('transform', 'none');
								svg(Math.abs(tx + $(".help_desc").outerWidth() - dx - 11), ty -$(".help_desc").outerHeight() -dy +targetHeight/2, 0, 10, - (ty -$(".help_desc").outerHeight() -dy +targetHeight/2)/2);
							}
							
						}
						
					}
				
				}



				function nextTip(){
					$('body').children(".bg_help_block").remove()
					$('body').children(".help_desc").remove()
					$('body').css('overflow-y', 'auto')
					$("#test_svg").fadeOut(300)
					$("#arrow").fadeOut(300)	
					console.log('размер массива ' + target.length)
					console.log('номер ' + itteration)
					itteration = itteration + 1;	

				}




				function delayRun(){
					helpTip(targetArray, itteration);
				}

				$(window).resize(function(){
					$('body').children(".bg_help_block").remove()
					$('body').children(".help_desc").remove()
					$('body').css('overflow-y', 'auto')
					$("#test_svg").fadeOut(300)
					$("#arrow").fadeOut(300)
				
					helpTip(targetArray, itteration);
				});

				$(target[i].nameTarget).click(function(){
					
					nextTip()
					if (target.length > itteration) {
						setTimeout(delayRun, 1000);
					}
					
				})
				
			}		












