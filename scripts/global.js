(function(window,document,$){
	var aj = {};
	aj.slides = {
		1:{
			init:function(e,ui) {
				console.log(this)
				$(this).css("color","red")
			},
			close:function(e,ui){
				console.log(this,"closed the first slide");
			}

		},
		3:{
			init:function(e,ui){
				console.log(this);
				$(this).css("color","green");
			},
			open:function(e,ui){
				console.log(this,"opened the 3th slide");
			},
			close:function(e,ui){
				console.log(this,"closed the 3th slide");
			}
		}
	};
	window.aj = $.aj = aj;
})(window,document,jQuery);


$(document).ready(function(){
	var preso = $('#slides').presentation({
		changeSlide:function(e,ui) {
			var closed = !aj.slides[ui.visibleIndex] ? true : (aj.slides[ui.visibleIndex].close && aj.slides[ui.visibleIndex].close.call(ui.visible,e,ui) !== false),
				opened = !aj.slides[ui.selectedIndex] ? true : (aj.slides[ui.selectedIndex].open && aj.slides[ui.selectedIndex].open.call(ui.selected,e,ui) !== false);
			return closed && opened;
		}
	}),
	slides = preso.children();
	$.each(aj.slides,function(i,slide){
		slide.init && slide.init.call(slides.get(i-1))
	})
});