(function(window,document,$){
	var aj = {};
	function pulsate($elem){
		$elem.switchClass("wonka-green","wonka-yellow",2000,function(){
			$elem.switchClass("wonka-yellow","wonka-magenta",2000,function(){
				$elem.switchClass("wonka-magenta","wonka-white",2000,function(){
					$elem.switchClass("wonka-white","wonka-green",2000,function(){
						pulsate($elem);
					});
				});
			});
		});
	}
	
	function swapActive() {
		$(this).toggleClass("ui-state-default ui-state-active");
	}
	
	aj.externalDialogOptions = {
		autoOpen:false,
		dialogClass:"box_shadow magenta_border external_dialog",
		height:500,
		width:"80%",
		modal:true
	};
	
	
		
        aj.slides = {
          1:{
              open:function(){
                     pulsate($("header",this));
                   },
              close:function(e,ui){
                      $("header",this).stop(1,1).clearQueue().addClass("wonka-green").removeClass("wonka-yellow wonka-magenta wonka-white");
                    }

            },
          2:{
              init:function(){
                     $("h1",this).hide();
                   },
              open:function(e,ui){
                     var slide = $(this),h1 = $("h1",this);
                     slide.children().hide();
                     (function fadein(jq){
                       jq.eq(0).fadeIn(500, function(){
                         (jq=jq.slice(1)).length ? fadein(jq) : setTimeout(function() { 
                           $("#awesome_jquery_plugins").fadeIn().animate({left:"50%",top:"25%",height:"500px",width:"50%"},2000,"easeOutSine")
                           .delay(5000)
                           .effect("explode",function(){
                             ui.presentation.navigate("next");
                           });
                         },1000);
                         //				        (jq=jq.slice(1)).length && fadein(jq);
                       });
                     })(h1);
                   },
              close:function(){
                      $(this).children().removeAttr("style").hide();
                    }
            },
          3:{
              init:function(e,ui){
                     $("#omg").one("click",function(e) {
                       $(this).wonkafy();
                     });
                   },
              open:function(e,ui){
                     $.fn.wonkafy = function(opts) {
                       var options = $.extend({color:"green"},opts);
                       return this.each(function(){
                         $(this).replaceWith(function(i,html){
                           return "<h1 class='wonka-"+options.color+"'>"+html+"</h1>";
                         });
                       });
                     };				
                   }
            },
          4:{
              init:function(e,ui){
                     $("ul li",this).hide();
                   },
              open:function(e,ui){
                     $(document)
                       .bind("click.slide4",function(e) {
                         var li = $("li:hidden:first",ui.selectedSlide);
                         li.length ? li.fadeIn() : $("li:gt(1)",ui.selectedSlide).addClass("wonka-red strikethrough");
                       });
                   },
              close:function(e,ui){
                      $(document).unbind("click.slide4");
                      $("ul li",this).hide();
                    }
            },
          6:{
              init:function(e,ui) {
                     $("ul",this).hide();
                   },
              open:function(e,ui) {
                     $(document).one("click.slide5",function(e) {
                       $("ul",ui.selectedSlide).show();
                     });
                   },
              close:function(e,ui){
                      $(document).unbind("click.slide5");
                      $("ul",this).hide();
                    }
            },
          7:{
              init:function(e,ui) {
                     $("img",this).hide();
                   },
              open:function(e,ui) {
                     setTimeout($.proxy(function() {
                       $("img",this).fadeIn(500,function() {	
                         setTimeout(function() {
                           ui.presentation.navigate("next");
                         },3000);
                       });
                     },this),1000);
                   },
              close:function(e,ui){
                      $("img",this).hide();
                    }
            },
          8:{
              init:function(e,ui) {
                     var d = $("#a_plugin_development_pattern").dialog($.extend({
                       title:"A Plugin Development Pattern"
                     },aj.externalDialogOptions));
                     $("span.ui-icon-link",this).click(function(e){
                       d.dialog("open");
                     })
                     .parent()
                       .hover(swapActive);
                   },
              open:function(e,ui) {
                     var slide = $(this);
                     $.fn.wonkafy = function(opts) {
                       //If there are no arguments, or the 'opts' arg is an object, init the plugin.
                       if (!arguments.length || $.isPlainObject(opts)) {
                         var options = $.extend({},$.fn.wonkafy.defaults,opts);
                         return this.each(function(){
                           var $this = $(this)
                           .data("pre-wonka.wonkafy",this)
                           .data("options.wonkafy",options)
                           .data("isWonka.wonkafy",true),
                                wonkaed = $("<h1 class='wonkafied wonka-"+options.color+"'" + (this.id ? " id='"+this.id+"'" : "") +">"+$this.html()+"</h1>")
                           .insertAfter(this);
                         //detach the element so that we don't lose the .data
                         $this.data("wonkaed.wonkafy",wonkaed).detach();

                         //copy the data to the proxy element
                         wonkaed.data($this.data()).click(function(){
                           $.fn.wonkafy.pulsate($(this));
                         });
                         });					
                       } 
                       //Otherwise, assume a method call, and delegate to the method.					
                       else if (typeof opts == "string") {
                         $.fn.wonkafy[opts](this);
                         return this;
                       }
                     };

                     $.fn.wonkafy.defaults = {
                       color:"green",
                       pulseColor:"yellow",
                       pulsated:$.noop
                     };

                     $.fn.wonkafy.destroy = function(elem) {
                       elem.data("wonkaed.wonkafy") && elem.data("wonkaed.wonkafy").replaceWith(elem.data("pre-wonka.wonkafy")).removeData(".wonkafy");
                     };

                     $.fn.wonkafy.pulsate = function(elem) {
                       var opts = elem.data("options.wonkafy"),
                           wonkaed = elem.data("wonkaed.wonkafy"),
                           isWonka = elem.data("isWonka.wonkafy");
                       if (isWonka) {
                         wonkaed.stop(1,1).switchClass("wonka-"+opts.color,"wonka-"+opts.pulseColor,2000,function(){
                           wonkaed.switchClass("wonka-"+opts.pulseColor,"wonka-"+opts.color,2000,opts.pulsated);
                         });
                       }
                     };

                     $("#omg2").one("click",function(e){
                       var wonkification = {
                         pulseColor:"blue",
                       pulsated:function(){
                         omg2.wonkafy("destroy").one("click",function(){
                           omg2.wonkafy(wonkification);
                         })
                       }
                       },
                       omg2 = $(this).wonkafy(wonkification);
                     });				

                   },
              close:function() {
                      $("#omg2").unbind("click").wonkafy("destroy");
                    }
            },
          ".goodbad":{
            init:function(e,ui) {
                   $("section.bad",this).hide();
                 },
            open:function(){
                   $(document).one("click.goodbad",$.proxy(function(){
                     $("section.bad",this).fadeIn();
                   },this));
                 },
            close:function() {
                    $(document).unbind("click.goodbad");
                    $("section.bad",this).hide();
                  }
          },
          10:{
               init:function(e,ui) {
                    },
               open:function() {
                      var slide = this;
                      (function(){	
                        function Wonkafy(elem,opts) {
                          var self = this; 
                          this.options = $.extend({
                            color:"green",
                            pulseColor:"yellow",
                            pulsated:$.noop
                          },opts);

                          this.pulse = function() {
                            self.wonkaed.stop(1,1).switchClass("wonka-"+this.options.color,"wonka-"+this.options.pulseColor,2000,function(){
                              $(this).switchClass("wonka-"+self.options.pulseColor,"wonka-"+self.options.color,2000,function(){ 
                                self.options.pulsated.call(this,self);
                              });
                            });							
                          };

                          this.destroy = function() {
                            self.wonkaed.remove();
                            self.element.show().removeData("wonkafy");
                          };


                          this.element = $(elem).data("wonkafy",this).hide();
                          this.wonkaed = $("<h1 class='wonkafied wonka-"+this.options.color+"'>"+this.element.html()+"</h1>")
                            .click(this.pulse)
                            .insertAfter(this.element);						
                          return this;					
                        }

                        // aww look at this little guy!
                        $.fn.wonkafy = function(opts) {
                          return this.each(function(){
                            !$(this).data("wonkafy") && new Wonkafy(this,opts);
                          });
                        }
                      })();			

                      $("#omg3").one("click",function(e) {
                        var pulsewait = function() {
                          setTimeout(function() {
                            omg3.data("wonkafy").pulse();
                          },500);						
                        },
                        wonkification = {
                          color:"orange",
                        pulseColor:"green",
                        pulsated:function(){
                          omg3.data("wonkafy").destroy();
                          omg3.one("click",function(){
                            omg3.wonkafy(wonkification);
                            pulsewait();
                          })
                        }
                        },
                        omg3 = $(this).wonkafy(wonkification);
                      pulsewait();

                      });			
                    },
               close:function() {
                       var d = $("#omg3").data("wonkafy");
                       d && d.destroy();
                     }
             },
          12:{
               init:function(e,ui) {
                      $(this).data("hidden",$("div.sh_wrapper,ul li",this).hide());
                      var vigetDialog = $("#viget_presentation_plugin").dialog($.extend({
                        title:"jQuery Presentation Plugin - Viget Labs"
                      },aj.externalDialogOptions));
                      $("span.ui-icon-link",this).hover(swapActive).click(function(e) {
                        e.stopPropagation();
                        vigetDialog.dialog("open");
                      });
                    },
               open:function(e,ui) {
                      $(document).bind("click.slide12",$.proxy(function() {
                        $(this).data("hidden").filter(":hidden").first().slideDown();
                      },this));
                    },
               close:function(e,ui) {
                       $(this).data("hidden").hide();
                       $(document).unbind("click.slide12");
                     }
             },
          13:{
               init:function(e,ui) {
                    },
               open:function(e,ui) {
                      var w = $(window).width(),
                      gt = $("#goldenticket"),
                      gtw = gt.width();

                      gt.show().css({opacity:0}).animate({left:((w-gtw)*.90)+"px",opacity:.7},2000)
                        .animate({left:((w-gtw)/2)+"px",opacity:1},1000);
                    },
               close:function(e,ui) {
                       $("#goldenticket").removeAttr("style");
                     }
             },
          14:{
               init:function() {
                      $("ul",this).hide();
                    },
               open:function() {
                      var slide = $(this), ul = slide.find("ul");
                      $(document).one("click.slide14",function(e){
                        $("#oompaloompa").show().css("opacity",0).animate({right:0,top:"50px",width:"33%",opacity:1},2000);
                        $(document).one("click.slide14",function() {
                          ul.slideDown(2000);
                        })				
                      })

                    },
               close:function() {
                       $("ul",this).hide();
                       $("#oompaloompa").removeAttr("style");
                     }
             },
          15:{
               init:function(e,ui) {

                    },
               open:function(e,ui) {
                      (function($){
                        // IMPORTANT!
                        // The "ui" namespace is reserved by jQuery UI!
                        // Use your own namespace please!
                        // The namespace jQuery.ww will automatically be created if it doesn't exist
                        $.widget("ww.wonkafy",{
                          options:{
                                    nickname:"dawg",
                        pulsated:$.noop // a jQuery utility function that does nothing.  (No Operation)
                                  },
                        _create:function() {
                                  // The _create method is called the first time the plugin is invoked
                                  // This is where most of your setup will happen
                                  // Two things are already available:
                                  // this.element -- a jQuery object of the element the widget was invoked on.
                                  // this.options --  the merged options hash
                                  this.element.addClass("wonkafied").bind("click.presentation",$.proxy(function(e) {
                                    alert("If I were awesome, I would pulsate right now.");
                                    //To trigger a callback, supply the callback name
                                    // Optionally supply an event object and a hash of data
                                    this._trigger("pulsated",e,{nickname:this.options.nickname})
                                  },this));
                                },
                        _setOption:function(key,value) {
                                     // Use the _setOption method to respond to changes to options
                                     switch(key) {
                                       case "nickname":
                                         alert("Changing nickname to "+value);
                                         break;
                                     }
                                     // Call the base _setOption method
                                     $.Widget.prototype._setOption.apply(this,arguments)
                                   },
                        destroy:function() {
                                  // Use the destroy method to reverse everything your plugin has applied
                                  this.element.removeClass("wonkafied")
                                    // After you do that, you still need to invoke the "base" destroy method
                                    // Does nice things like unbind all namespaced events							
                                    $.Widget.prototype.destroy.call(this);
                                }
                        });
                      })(jQuery);
                      $("#omg4").wonkafy({
                        foo:"bam",
                        pulsated:function(e,ui){
                          alert("But I'm not, "+ui.nickname);
                        }
                      });
                    },
               close:function(e,ui) {
                       $("#omg4").wonkafy("destroy");
                       $(this).contents().removeAttr("style");
                     }
             },
          16:{
               init:function(e,ui) {

                    },
               open:function(e,ui) {
                      (function($){
                        $.widget("ww.wonkafy",{
                          options:{
                                    color:"green",
                        pulseColor:"yellow",
                        pulsated:$.noop
                                  },
                        _create:function() {
                                  this.wonkaed = $("<h1 class='wonkafied wonka-"+this.options.color+"'>"+this.element.html()+"</h1>")
                          .bind("click.presentation",$.proxy(this.pulsate,this))
                          .insertAfter(this.element.hide());						
                                },
                        _setOption:function(key,value) {
                                     switch(key) {
                                       case "color":
                                         this.wonkaed.removeClass(this.options.color).addClass("wonka-"+value);
                                         break;
                                     }
                                     $.Widget.prototype._setOption.apply(this,arguments)							
                                   },
                        pulsate:function(){
                                  var self = this;
                                  self.wonkaed.stop(1,1).switchClass("wonka-"+this.options.color,"wonka-"+this.options.pulseColor,2000,function(){
                                    $(this).switchClass("wonka-"+self.options.pulseColor,"wonka-"+self.options.color,2000,function(){ 
                                      self.options.pulsated.call(this,self);
                                    });
                                  });							
                                },
                        destroy:function() {
                                  this.wonkaed.remove();
                                  this.element.show();
                                  // After you do that, you still need to invoke the "base" destroy method
                                  $.Widget.prototype.destroy.call(this);
                                }
                        });
                      })(jQuery);
                      $("#omfg").one("click",function() { 
                        $(this).wonkafy({
                          pulsated:function(e,ui){
                                     alert("I saw u in the chocolate factory, U wuz pulsin' liek crazy.");
                                   }
                        });	
                      });			
                    },
               close:function(e,ui) {
                       $("#omfg").wonkafy("destroy");
                     }
             },
          17:{
               init:function(e,ui) {
                      $(this).data("hidden",$("ul li",this).hide());					
                    },
               open:function(e,ui) {
                      $(document).bind("click.slide17",$.proxy(function() {
                        $(this).data("hidden").filter(":hidden").first().slideDown();
                      },this));
                    },
               close:function(e,ui) {
                       $(this).data("hidden").hide();
                       $(document).unbind("click.slide17");
                     }
             },
          18:{
               init:function(e,ui) {
                      $(this).data("hidden",$("ul li",this).hide());
                      var trDialog = $("#themeroller_dialog").dialog($.extend({
                        title:"jQuery UI Themeroller"
                      },aj.externalDialogOptions)),
                          frameworkDialog = $("#cssframework_dialog").dialog($.extend({
                            title:"jQuery UI CSS Framework"
                          },aj.externalDialogOptions));
                      $("#themeroller_trigger",this).hover(swapActive).click(function(e) {
                        e.stopPropagation();
                        trDialog.dialog("open");
                      });				
                      $("#cssframework_trigger",this).hover(swapActive).click(function(e) {
                        e.stopPropagation();
                        frameworkDialog.dialog("open");
                      });				
                    },
               open:function(e,ui) {
                      $(document).bind("click.slide18",$.proxy(function() {
                        $(this).data("hidden").filter(":hidden").first().slideDown();
                      },this));
                    },
               close:function(e,ui) {
                       $(this).data("hidden").hide();
                       $(document).unbind("click.slide18");
                     }
             },
          19:{
               init:function(e,ui){
                      var snuggieplease = $("#snuggieplease").dialog($.extend({
                        title:"I Want A Snuggie!"
                      },aj.externalDialogOptions));
                      $("#snuggie_trigger").hover(swapActive).click(function(e) {
                        e.stopPropagation();
                        snuggieplease.dialog("open");
                      });				
                    },
               close:function(e,ui) {
                       $(this).data("hidden").hide();
                       $(document).unbind("click.slide19");
                     }
             },
          22:{
               init:function() { 
                      $(this).data("tombstone",$("#tombstone").hide());
                    },
               open:function() {
                      $(this).data("tombstone").css("opacity",0).animate({right:0,top:"50px",width:"20%",opacity:1},5000);
                    }
             },
          23:{
               init:function() {
                      var data = "adam aaron apple alpha able amortize adamant alfajor amble".split(" ").sort();
                      $("#idgara_maxlength").autocomplete({source:data});
                      $("#respect_maxlength").autocomplete({
                        source:function(request,response) {
                                 var l = this.element.attr("maxlength") || 5;
                                 response($.ui.autocomplete.filter(
                                     $.grep(data,function(v) {
                                       return v.length <= l;
                                     }),request.term)
                                   );
                               }
                      });
                    }
             },
          24:{
               init:function() {
                  $.widget("ww.awesomecomplete",$.ui.autocomplete,{
                    options:{
                              maxlength:5
                    },
                    _create:function() {

                              // As it turns out, a simple test for truthiness of .attr("maxlength")
                              // is not sufficient, because different browsers return radically different results
                              // if there is no attribute. So we're gonna create a function to encapsulate testing it
                              // and this will also allow us to react to any options changes easily.

                              this.maxlength = this._getMaxlength();

                              // And then we use the 'super' method from the base autocomplete

                              $.ui.autocomplete.prototype._create.call(this);

                    },
                    _response:function(content) {

                              var l = this.maxlength;
                              content = $.grep(content,function(v) {
                                  return v.length <= l;
                              }); 
                  
                              //Invoke the 'super' method 'inherited' from ui.autocomplete,
                              //Passing it an array that's filtered against the element's maxlength or the default.

                              $.ui.autocomplete.prototype._response.call(this,content);
                            },
                    _getMaxlength:function() {
                        // IE, Opera == undefined
                        // Firefox == -1
                        // Webkit == A really high number (52488)

                        var max = this.element.attr("maxlength");
                        return max && max > -1 && max < 50000 ? max : this.options.maxlength;
                    },
                    _setOption:function(key,value) {
                         $.Widget.prototype._setOption.apply(this,arguments)
                         switch(key) {
                           case "maxlength":
                             this.maxlength = this._getMaxlength();
                             break;
                         }
                    }
                  });
                  $("input.backstreet").awesomecomplete({
                    source:"adam ape ab aaron apple amp alpha able amortize adamant alfajor amble".split(" ").sort()
                  });
               }
             },
          "#thxx":{
            open:function(e,ui) {
                   $("#thanks").show().css("opacity",0).animate({right:"50px",top:"50px",width:320,height:240,opacity:1},3000);				
                 }
          }

        };
	window.aj = $.extend($.aj,aj);
})(window,document,jQuery);

$(document).ready(function(){
	SyntaxHighlighter.all();	
 	var preso = $('#slides').presentation({
			slides:aj.slides, 
			pager:false,
			prevNext:true,
			themeswitcher:false
	});
});
