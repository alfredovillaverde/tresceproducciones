$(function() {
	var screenWidth = screen.availWidth;
	var deviceType = null;
	var scrollOffset = null;
	if(screenWidth<400){
		deviceType = 'mobile';
		scrollOffset = 50;
	}else if(screenWidth<700){//mobile landscape
		deviceType = 'mobile';
		scrollOffset = 50;
	}else if(screenWidth<768){
		deviceType = 'mobile';
		scrollOffset = 50;
	}else if(screenWidth<1024){
		deviceType = 'mobile';
		scrollOffset = 50;
	}else{
		deviceType = 'desktop';
		scrollOffset = 110;
		
	}
	//init controller
	var controller = new ScrollMagic.Controller();
	
	//init ScrollTo feature
	// Change behavior of controller
	// to animate scroll instead of jump
	controller.scrollTo(function(target) {

	  TweenMax.to(window, 0.5, {
	    scrollTo : {
	      y : target-scrollOffset, // scroll position of the target along y axis
	      autoKill : true // allows user to kill scroll action smoothly
	    },
	    ease : Cubic.easeInOut
	  });

	});

	//  Bind scroll to anchor links
	$(document).on("click", "a[href^=#]", function(e) {
	  var id = $(this).attr("href");

	  if($(id).length > 0) {
	    e.preventDefault();

	    // trigger scroll
	    controller.scrollTo(id);

	    // If supported by the browser we can also update the URL
	    if (window.history && window.history.pushState) {
	      history.pushState("", document.title, id);
	    }
	  }

	});

	

	/*var sceneProyectos = new ScrollMagic.Scene({
		triggerElement: "#contenedor-setratadeti",
		duration: 480
	}).setPin("#button-setratadeti").addIndicators().addTo(controller);
*/

	$.get("/tresce/assets/images/svgs/images.svg")
    .then(injectSvgs)
    .always(prepSVGAnimations);
	
	function injectSvgs(svgDoc){
		var svg = $(svgDoc).find("svg").each(function(){
			$(this).appendTo("#svgcontainer");
		});
	}

	function prepSVGAnimations(){
		$("#logo-tresce-svg").appendTo("#logo-container");
		$("#arte-que-ilumina").appendTo("#arte-que-ilumina-container");
		$("#logo-setratadeti").appendTo("#logo-setratadeti-container");
		
		var logoTweens = new TimelineMax()
			.to("#nav-logo", .5, {left:"-500px",ease:Back.easeIn});
			console.log('setting up logo tweens')
		switch(deviceType){
			case 'desktop':
			logoTweens.to("#svg7826", .5, {top: "14px",ease:Back.easeOut});
			console.log('desktop...');
			break;
			case 'mobile':
			logoTweens.to("#svg7826", .5, {transform:"scale(0.5)",ease:Back.easeOut});
			logoTweens.to("#svg7826", .5, {top: "-44px", left: "200px",ease:Back.easeOut});
			console.log('mobile...');
			break;
			default:
			logoTweens.to("#svg7826", .5, {top: "14px",ease:Back.easeOut});
			console.log('default desktop...');
			break;
		}
		logoTweens.to("#path10064", .5, {transform:"scale(1.3)", transformOrigin:"50% 50%", repeat:2, yoyo: true})
			.to("#back-to-top", .5, {bottom:"0px",opacity:1});

		var sceneLogo = new ScrollMagic.Scene({
			offset: 610,
			reverse: true
		}).setTween(logoTweens).addTo(controller);//.addIndicators({name: "timeline"})

		


		var mainLogoTweens = new TimelineMax()
			.to("#logo-tresce-svg", .5, {opacity: 1, delay:1})
			.to("#path3339", .5,{transform:"scale(1.3)", transformOrigin:"50% 50%", repeat:3, yoyo: true});
		
		var mainLogoScene = new ScrollMagic.Scene({
			offset: 0,
			reverse: true
		}).setTween(mainLogoTweens).addTo(controller);

		/*CONTENT SCENES*/

		/*TRESCE*/
		var tresceTweens = new TimelineMax()
			.fromTo("#tresce .contenido-seccion", .5, {opacity: 0}, {opacity: 1})
			.fromTo("#tresce .contenido-seccion h2", .5, {transform:"scale(0)"}, {transform:"scale(1)"})
			
		var tresceScene = new ScrollMagic.Scene({
			triggerElement: "#tresce",
			duration: 0
		}).setTween(tresceTweens).addTo(controller);

		/*PROYECTOS*/
		var proyectosTweens = new TimelineMax()
			.fromTo("#proyectos .contenido-seccion", .5, {opacity: 0}, {opacity: 1})
			.fromTo("#proyectos .contenido-seccion h2", .5, {transform:"scale(0)"}, {transform:"scale(1)"})
			
		var proyectosScene = new ScrollMagic.Scene({
			triggerElement: "#proyectos",
			offset: 20,
			duration: 0
		}).setTween(proyectosTweens).addTo(controller);

		/*Se Trata de Ti*/
		var setratadetiTweens = new TimelineMax()
			.fromTo("#setratadeti .contenido-seccion", .5, {opacity: 0}, {opacity: 1})
			.fromTo("#setratadeti .contenido-seccion h2", .5, {transform:"scale(0)"}, {transform:"scale(1)"})
			
		var setratadetiScene = new ScrollMagic.Scene({
			triggerElement: "#setratadeti",
			duration: 0
		}).setTween(setratadetiTweens).addTo(controller);

		/*NOSOTROS*/
		var arteQueIluminaTweens = new TimelineMax()
			.to("#nosotros h2", 1, {opacity:1})
			.to("section#nosotros .contenido-seccion p", 0.5, {opacity:1})
			.to(["#path12845","#path12849","#path12853","#path12857"], .3, {transform:"scale(1.3)", transformOrigin:"50% 50%",fill: "#ffffff", repeat:1, yoyo: true})//ARTE
			.to(["#path12861","#path12865","#path12869"], .3, {transform:"scale(1.3)", transformOrigin:"50% 50%",fill: "#ffffff", repeat:1, yoyo: true})//QUE
			.to(["#path12873","#path12877","#path12881","#path12885","#path12889","#path12893","#path12897","#path12805","#path12801"], .3, {transform:"scale(1.3)", transformOrigin:"50% 50%",fill: "#ffffff", repeat:1, yoyo: true})//ILUMINA
			.to(["#keyword-calidad","#keyword-excelencia","#keyword-arte"], 2, {opacity:1})

		var arteQueIluminaScene = new ScrollMagic.Scene({
			triggerElement: "#nosotros",
			duration:0
		}).setTween(arteQueIluminaTweens).addTo(controller);


		/*HOLA*/
		var holaTweens = new TimelineMax()
			.fromTo("#hola .contenido-seccion", .5, {opacity: 0}, {opacity: 1})
			.fromTo("#hola .contenido-seccion h2", .5, {transform:"scale(0)"}, {transform:"scale(1)"})
			
		var proyectosScene = new ScrollMagic.Scene({
			triggerElement: "#hola",
			offset: 20,
			duration: 0
		}).setTween(holaTweens).addTo(controller);


		function turnOnSceneNavLink(navLinkId){
		
		$("#nav ul a").each(function(){
			console.log(navLinkId);
			if($(this).attr("href") == navLinkId){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			}
		});
		}
		
		$("#svg7826").click(function(){
			controller.scrollTo("#home");
		})

		
		$("button").click(function(){
			arteQueIluminaTweens.restart();
		})

  				/*<span id="keyword-calidad">Calidad</span>
  				<span id="keyword-excelencia">Excelencia</span>*/
	}
});