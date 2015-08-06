/*
 * jQuery infinitecarousel plugin
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.2.1
 * @date August 31, 2009
 * @category jQuery plugin
 * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-Share Alike 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 */

(function($){
	$.fn.extend({
		infiniteCarousel2: function(options)
		{
			var defaults =
			{
				transitionSpeed : 0,
				displayTime : 6000,
				textholderHeight : .2,
				displayProgressBar : 0,
				displayThumbnails: 1,
				displayThumbnailNumbers: 0,
				displayThumbnailBackground: 0,
				thumbnailWidth: '18px',
				thumbnailHeight: '18px',
				thumbnailFontSize: '12px',
				textSwitchPosition: 0
			};
		var options = $.extend(defaults, options);

    		return this.each(function() {
    			var randID = Math.round(Math.random()*100000000);
				var o=options;
				var obj = $(this);
				var curr = 1;

				var numImages = $('img', obj).length; // Number of images
				var imgHeight = $('img:first', obj).height();
				var imgWidth = $('img:first', obj).width();
				var autopilot = 1;

				$('p', obj).hide(); // Hide any text paragraphs in the carousel
				$(obj).width(imgWidth).height(imgHeight);

				// Build progress bar
				if(o.displayProgressBar){
					if(o.textSwitchPosition){
						$(obj).append('<div id="progress'+randID+'" style="position:absolute;bottom:0;background:#CCC;left:500px"></div>');
						$('#progress'+randID).width(400).height(5).css('opacity','.5');
					} else {
						$(obj).append('<div id="progress'+randID+'" style="position:absolute;bottom:0;background:#CCC;left:'+$(obj).css('paddingLeft')+'"></div>');
						$('#progress'+randID).width(imgWidth).height(5).css('opacity','.5');
					}
				}

				// Move last image and stick it on the front
				$(obj).css({'overflow':'hidden','position':'relative'});
				$('li:last', obj).prependTo($('ul', obj));
				$('ul', obj).css('left',-imgWidth+'px');
				$('ul',obj).width(9999);

				$('ul',obj).css({'list-style':'none','margin':'0','padding':'0','position':'relative'});
				$('li',obj).css({'display':'inline','float':'left'});

				// Build textholder div thats as wide as the carousel and 20%-25% of the height
				if(o.textSwitchPosition){
					$(obj).append('<div id="textholder'+randID+'" class="textholder" style="position:absolute;bottom:0px;margin-bottom:'+-imgHeight*o.textholderHeight+'px;left:500px"></div>');
				} else {
					$(obj).append('<div id="textholder'+randID+'" class="textholder" style="position:absolute;bottom:0px;margin-bottom:'+-imgHeight*o.textholderHeight+'px;left:'+$(obj).css('paddingLeft')+'"></div>');
				}

				var correctTHWidth = parseInt($('#textholder'+randID).css('paddingTop'));
				var correctTHHeight = parseInt($('#textholder'+randID).css('paddingRight'));

				if(o.textSwitchPosition){
					$('#textholder'+randID).width(400).height(imgHeight-40).css({'backgroundColor':'#000','opacity':'0.7','color':'#fff'});
				} else {
					$('#textholder'+randID).width(imgWidth-(correctTHWidth * 2)).height((imgHeight*o.textholderHeight)-(correctTHHeight * 2)).css({'backgroundColor':'#000','opacity':'0.7','color':'#fff'});
				}

				showtext($('li:eq(1) p', obj).html());

				// Prev/next button(img)
				//html = '<div id="btn_rt'+randID+'" style="position:absolute;right:0;top:'+((imgHeight/2)-15)+'px"><a href="javascript:void(0);"><img style="border:none;margin-right:2px" src="../rt.png" /></a></div>';
				//html += '<div id="btn_lt'+randID+'" style="position:absolute;left:0;top:'+((imgHeight/2)-15)+'px"><a href="javascript:void(0);"><img style="border:none;margin-left:2px" src="../lt.png" /></a></div>';
				//$(obj).append(html);

				// Pause/play button(img)
				html = '<a href="javascript:void(0);"><img id="pause_btn'+randID+'" src="http://bass.shoptopia.com/theme/global/images/content/pause.png" style="position:absolute;top:3px;right:3px;border:none" alt="Pause" /></a>';
				html += '<a href="javascript:void(0);"><img id="play_btn'+randID+'" src="http://bass.shoptopia.com/theme/global/images/content/play.png" style="position:absolute;top:3px;right:3px;border:none;display:none;" alt="Play" /></a>';
				// $(obj).append(html); // Disable pause/play buttons
				$('#pause_btn'+randID).css('opacity','.5').hover(function(){$(this).animate({opacity:'1'},250)},function(){$(this).animate({opacity:'.5'},250)});
				$('#pause_btn'+randID).click(function(){
					autopilot = 0;
					$('#progress'+randID).stop().fadeOut();
					clearTimeout(clearInt);
					$('#pause_btn'+randID).fadeOut(250);
					$('#play_btn'+randID).fadeIn(250);
					showminmax();
				});
				$('#play_btn'+randID).css('opacity','.5').hover(function(){$(this).animate({opacity:'1'},250)},function(){$(this).animate({opacity:'.5'},250)});
				$('#play_btn'+randID).click(function(){
					autopilot = 1;
					anim('next');
					$('#play_btn'+randID).hide();
					clearInt=setInterval(function(){anim('next');},o.displayTime+o.transitionSpeed);
					setTimeout(function(){$('#pause_btn'+randID).show();$('#progress'+randID).fadeIn().width(imgWidth).height(5);},o.transitionSpeed);
				});


				if(o.displayThumbnails)
				{
					// Build thumbnail viewer and thumbnail divs
					$(obj).after('<div class="fancyCarouselOuter"><div class="fancyCarouselLeftArrow" id="btn_lt'+randID+'" ><img src="http://images.shoptopia.com/theme-images/fancy-carousel/arrowLeft.gif" / alt="previous"></div><div class="fancyCarouselThumbs" id="thumbs'+randID+'"></div><div class="fancyCarouselRightArrow" id="btn_rt'+randID+'"><img src="http://images.shoptopia.com/theme-images/fancy-carousel/arrowRight.gif" / alt="next"></div></div>');
					$('#thumbs'+randID).width(imgWidth);
					for(i=0;i<=numImages-1;i++)
					{
						thumb = '';
						$('#thumbs'+randID).append('<div class="thumb carousel-nav-inactive" id="thumb'+randID+'_'+(i+1)+'" style="border:none;cursor:pointer;display:inline;width:'+o.thumbnailWidth+';height:'+o.thumbnailHeight+';padding:0;margin-right:4px;font-size:40px;">&bull;</div>');
						//if(i==0) $('#thumb'+randID+'_1').css({'color':'#8d528d'});
						if(i==0) $('#thumb'+randID+'_1').addClass('carousel-nav-active').removeClass('carousel-nav-inactive');
					}
					// Next two lines are a special case to handle the first list element which was originally the last
					thumb = '';
					$('#thumb'+randID+'_'+numImages).css({'background-image':'url('+thumb+')'});
					$('#thumbs'+randID+' div.thumb:not(:first)').css({'opacity':'.85'}); // makes all thumbs 65% opaque except the first one
					$('#thumbs'+randID+' div.thumb').hover(function(){$(this).animate({'opacity':.99},150)},function(){if(curr!=this.id.split('_')[1]) $(this).animate({'opacity':.85},250)}); // add hover to thumbs

					// Assign click handler for the thumbnails. Normally the format $('.thumb') would work but since it's outside of our object (obj) it would get called multiple times
					$('#thumbs'+randID+' div').bind('click', thumbclick); // We use bind instead of just plain click so that we can repeatedly remove and reattach the handler

					//if(!o.displayThumbnailNumbers) $('#thumbs'+randID+' div').text('');
					//if(!o.displayThumbnailBackground) $('#thumbs'+randID+' div').css({'background-image':'none'});
				}
				function thumbclick(event)
				{
					target_num = this.id.split('_'); // we want target_num[1]
					if(curr != target_num[1])
					{
						//$('#thumb'+randID+'_'+curr).css({'color':'#8d528d'});
						$('#thumb'+randID+'_'+curr).addClass('carousel-nav-active').removeClass('carousel-nav-inactive');
						$('#progress'+randID).stop().fadeOut();
						clearTimeout(clearInt);
						//alert(event.data.src+' '+this.id+' '+target_num[1]+' '+curr);
						$('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended
						autopilot = 0;
						setTimeout(function(){$('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					}
					if(target_num[1] > curr)
					{
						diff = target_num[1] - curr;
						anim('next',diff);
					}
					if(target_num[1] < curr)
					{
						diff = curr - target_num[1];
						anim('prev', diff);
					}
				}

				function showtext(t)
				{
					$('ul', obj).fadeIn();
					// the text will always be the text of the second list item (if it exists)
					if(t != null)
					{
						$('#textholder'+randID).html(t).animate({marginBottom:'0px'},500); // Raise textholder
						showminmax();
					}
				}
				function showminmax()
				{
					/*
						if(!autopilot)
						{
							html = '<img style="position:absolute;top:2px;right:18px;display:none;cursor:pointer" src="http://www.catchmyfame.com/jquery/down.png" title="Minimize" alt="minimize" id="min" /><img style="position:absolute;top:2px;right:18px;display:none;cursor:pointer" src="http://www.catchmyfame.com/jquery/up.png" title="Maximize" alt="maximize" id="max" />';
							html += '<img style="position:absolute;top:2px;right:6px;display:none;cursor:pointer" src="http://www.catchmyfame.com/jquery/close.png" title="Close" alt="close" id="close" />';
							$('#textholder'+randID).append(html);
							$('#min').fadeIn(250).click(function(){$('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+24+'px'},500,function(){$("#min,#max").toggle();});});
							$('#max').click(function(){$('#textholder'+randID).animate({marginBottom:'0px'},500,function(){$("#min,#max").toggle();});});
							$('#close').fadeIn(250).click(function(){$('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+'px'},500);});
						}
						*/
				}
				function borderpatrol(elem)
				{
//					$('#thumbs'+randID+' div').css({'color':'#999'}).animate({opacity: 0.85},500);
					$('#thumbs'+randID+' div').addClass('carousel-nav-inactive').removeClass('carousel-nav-active').animate({opacity: 0.85},500);
//					setTimeout(function(){elem.css({'color':'#8d528d'}).animate({'opacity': .99},500);},o.transitionSpeed);
					setTimeout(function(){elem.addClass('carousel-nav-active').removeClass('carousel-nav-inactive').animate({'opacity': .99},500);},o.transitionSpeed);
				}
				function anim(direction,dist)
				{
					// Fade left/right arrows out when transitioning
					//$('#btn_rt'+randID).fadeOut(500);
					//$('#btn_lt'+randID).fadeOut(500);

					// animate textholder out of frame
					$('#textholder'+randID).animate({marginBottom:(-imgHeight*o.textholderHeight)-(correctTHHeight * 2)+'px'},1);

					//?? Fade out play/pause?
					$('#pause_btn'+randID).fadeOut(250);
					$('#play_btn'+randID).fadeOut(250);

					if(direction == "next")
					{
						if(curr==numImages) curr=0;
						if(dist>1)
						{
							borderpatrol($('#thumb'+randID+'_'+(curr+dist)));
							$('li:lt(2)', obj).clone().insertAfter($('li:last', obj));
							$('ul', obj).fadeOut(function(){
								$('li:lt(2)', obj).remove();
								for(j=1;j<=dist-2;j++)
								{
									$('li:first', obj).clone().insertAfter($('li:last', obj));
									$('li:first', obj).remove();
								}
								//$('#btn_rt'+randID).fadeIn(500);
								//$('#btn_lt'+randID).fadeIn(500);
								$('#play_btn'+randID).fadeIn(250);
								showtext($('li:eq(1) p', obj).html());
								$(this).css({'left':-imgWidth});
								curr = curr+dist;
								$('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
							});
						}
						else
						{
							borderpatrol($('#thumb'+randID+'_'+(curr+1)));
							$('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended
							// Copy leftmost (first) li and insert it after the last li
							$('li:first', obj).clone().insertAfter($('li:last', obj));
							// Update width and left position of ul and animate ul to the left
							$('ul', obj)
								.fadeOut(function(){
									$('li:first', obj).remove();
									$('ul', obj).css('left',-imgWidth+'px');
									//$('#btn_rt'+randID).fadeIn(500);
									//$('#btn_lt'+randID).fadeIn(500);
									if(autopilot) $('#pause_btn'+randID).fadeIn(250);
									showtext($('li:eq(1) p', obj).html());
									if(autopilot)
									{

										$('#progress'+randID).width(imgWidth).height(5);
										$('#progress'+randID).animate({'width':0},o.displayTime,function(){
											$('#pause_btn'+randID).fadeOut(50);
											setTimeout(function(){$('#pause_btn'+randID).fadeIn(250)},o.transitionSpeed)
										});
									}
									curr=curr+1;
									$('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
								});
						}
					}
					if(direction == "prev")
					{
						if(dist>1)
						{
							borderpatrol($('#thumb'+randID+'_'+(curr-dist)));
							$('li:gt('+(numImages-(dist+1))+')', obj).clone().insertBefore($('li:first', obj));

							$('ul', obj)
								.fadeOut()
								.css({'left':(-imgWidth*(dist+1))})
								.animate({left:-imgWidth},o.transitionSpeed,function(){
								$('li:gt('+(numImages-1)+')', obj).remove();
								//$('#btn_rt'+randID).fadeIn(500);
								//$('#btn_lt'+randID).fadeIn(500);
								$('#play_btn'+randID).fadeIn(250);
								showtext($('li:eq(1) p', obj).html());
								curr = curr - dist;
								$('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
							});
						}
						else
						{
							borderpatrol($('#thumb'+randID+'_'+(curr-1)));
							$('#thumbs'+randID+' div').css({'cursor':'default'}).unbind('click'); // Unbind the thumbnail click event until the transition has ended

							// Copy rightmost (last) li and insert it after the first li
							$('li:last', obj).clone().insertBefore($('li:first', obj));
							// Update width and left position of ul and animate ul to the right
							$('ul', obj)
								.fadeOut()
								.css('left',-imgWidth*2+'px')
								.animate({left:-imgWidth},o.transitionSpeed,function(){
									$('li:last', obj).remove();
									//$('#btn_rt'+randID).fadeIn(500);
									//$('#btn_lt'+randID).fadeIn(500);
									if(autopilot) $('#pause_btn'+randID).fadeIn(250);
									showtext($('li:eq(1) p', obj).html());
									curr=curr-1;
									if(curr==0) curr=numImages;
									$('#thumbs'+randID+' div').bind('click', thumbclick).css({'cursor':'pointer'});
								});
						}
					}
				}

				// Left and right arrow image button actions
				$('#btn_rt'+randID).css('opacity','.80').click(function(){
					autopilot = 0;
					$('#progress'+randID).stop().fadeOut();
					anim('next');
					setTimeout(function(){$('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					clearTimeout(clearInt);
				}).hover(function(){$(this).animate({opacity:'1'},250)},function(){$(this).animate({opacity:'.80'},250)});

				$('#btn_lt'+randID).css('opacity','.80').click(function(){
					autopilot = 0;
					$('#progress'+randID).stop().fadeOut();
					anim('prev');
					setTimeout(function(){$('#play_btn'+randID).fadeIn(250);},o.transitionSpeed);
					clearTimeout(clearInt);
				}).hover(function(){$(this).animate({opacity:'1'},250)},function(){$(this).animate({opacity:'.80'},250)});
				var clearInt = setInterval(function(){anim('next');},o.displayTime+o.transitionSpeed);
				$('#progress'+randID).animate({'width':0},o.displayTime+o.transitionSpeed,function(){
					$('#pause_btn'+randID).fadeOut(100);
					setTimeout(function(){$('#pause_btn'+randID).fadeIn(250)},o.transitionSpeed)
				});
  		});
    	}
	});
})(jQuery);
