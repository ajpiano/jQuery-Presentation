/*
 * Presentation Plugin - UI Widget
 * Copyright (c) 2010 adam j.sontag
 * 
 * Based on 
 * Presentation Plugin
 * Copyright (c) 2010 Trevor Davis
 * http://www.viget.com/
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 *
 * Example usage:
 * $('#slides').presentation({
 *   slide: '.slide',
 *   start: 2,
 *   pagerClass: 'nav-pager',
 *   prevNextClass: 'nav-prev-next',
 *   prevText: 'Previous',
 *   nextText: 'Next',
 *   transition: 'fade'
 * });
 */
(function($) {
	$.widget( "aj.presentation", {
		options: {
				slide: '.slide',
				pagerClass: 'nav-pager',
				prevNextClass: 'nav-prev-next',
				currentClass:"current",
				prevText: 'Previous',
				nextText: 'Next',
				transition: "fade",
				start: parseInt(window.location.hash.substr(1)) || 1,
				changeSlide:$.noop
		},
		_create: function() {
	        this.slides = this.element.find(this.options.slide);
			//Make sure the starting value isn't 0
			this.options.start = this.options.start || 1;
			//Set the current to the specified starting slide, a number in the url,
			this.current = this.slides.filter(":nth-child("+this.options.start+")");
			//Use 'count' to store the current slide number
			this.count = this.options.start;
	        //Hide everything except the hash or the first			
			this.slides.not(this.current[0]).hide()
	        this._addControls();

		},
		_addControls:function() {
			var self = this, pagerPages = [], i = 0, numSlides = this.slides.length;
	        //Add in the pager
	        this.pager = $('<ol class="'+this.options.pagerClass+'">');
	        for(i = 1; i < numSlides+1; i++) {
	          pagerPages.push('<li><a href="#'+i+'">'+i+'</a></li>');
	        }
			this.pager.html(pagerPages.join('')).appendTo(this.element);
			this.pagerPages = this.pager.children().find("a").click($.proxy(this._pagerClick,this)).end();
			this.pagerPages.eq(this.count-1).addClass(this.options.currentClass);
			

	        //Add in the previous/next links
	        this.prevNext = $('<ul class="'+this.options.prevNextClass+'"><li><a href="#prev" class="prev">'+this.options.prevText+'</a></li><li><a href="#next" class="next">'+this.options.nextText+'</a></li>').appendTo(this.element)
			this.prevNext.find("li a").click(function(e){
				self._navigate($(this).attr("class"),e)
			})


	        //When you hit the left arrow, go to previous slide
	        //When you hit the right arrow, go to next slide
	        $(document).bind("keyup.presentation",function(e) {
	          var action = "";
	          if(e.keyCode === 37) {
	            action = 'prev';
	          } else if(e.keyCode === 39) {
	            action = 'next';
	          }
	          action.length && this._navigate(action,e);
	        });			
		},
		_navigate:function(action,event){
			var ui = {visibleSlide:this.current,visibleSlideIndex:this.count};
			if (typeof action == "string"){
				action == "next" && this.count++;
				action == "prev" && this.count--;
			} else {
				this.count = action;
			}
			this.current = ui.selectedSlide = this.slides.eq(this.count-1);
			ui.selectedSlideIndex = this.count;
  	     	switch (this.options.transition) {
  	        	case 'show':
				case 'hide':
					ui.visibleSlide.hide();
					ui.selectedSlide.show();
					break;
				case 'slide':
					ui.visibleSlide.slideUp(500, function () {
					    ui.selectedSlide.slideDown(1000)
					});
					break;
				default:
					ui.visibleSlide.fadeOut(500,function() {
						ui.selectedSlide.fadeIn(500);
					});
			}
  			this.pagerPages.removeClass(this.options.currentClass).eq(this.count-1).addClass(this.options.currentClass);
		},
		_pagerClick:function(event) {
			event.preventDefault();
			this._navigate($(event.target).parent().prevAll().length+1,event);

		}
	});

}(jQuery));