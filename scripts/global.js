(function(window,document,$){
	var aj = {};
	aj.slides = {
		1:{
			init:function(){
				var $this = $(this);
				$this.data("pulsate",setInterval(function(){
					$this.animate({color:"#bada55"},2000,function() {
						$this.animate({color:"#fff"},2000)
					});
				},4000));			
			},
			open:function(e,ui) {
			},
			close:function(e,ui){
				clearInterval($(this).data("pulsate"));
				$(this).stop(1,1).css({color:"#000"});
			}

		},
		".slide":{
			init:function(e,ui){

			},
			open:function(e,ui){

			},
			close:function(e,ui){
				console.log("closed any slide");
			}
		},
		".penultimate":{
			init:function(e,ui){
				$(this).css("color","green");
			},
			open:function(e,ui){
				console.log(this,"opened slide with class penultimate");
			},
			close:function(e,ui){
				console.log(this,"closed slide with class penultimate");
			}
		}
	};
	window.aj = $.aj = aj;
})(window,document,jQuery);


$(document).ready(function(){
	var preso = $('#slides').presentation({
			slides:aj.slides,
			pager:true,
			prevNext:true,
			navigate:function(e,ui) {
				console.log("omg i navigated! hollaback!")
			}
		}),
		slides = preso.children(".slide");
});