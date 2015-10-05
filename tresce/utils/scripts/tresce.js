$(function() {
	var setratadetilogoLeftPos,
		setratadetilogoTopPos,
		setratadetibgleftLeftPos,
		setratadetibgleftTopPos = null;
	var screenWidth = screen.availWidth;
	var deviceType = null;
	var scrollOffset = null;
	if(screenWidth<400){
		deviceType = 'mobile';
		scrollOffset = 50;
	}else if(screenWidth<700){//mobile landscape
		deviceType = 'mobile-landscape';
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
		$("#arte-que-ilumina").clone().appendTo("#arte-que-ilumina-container");
		$("#arte-que-ilumina").clone().appendTo("#modal-arte-que-ilumina-container");
		$("#logo-setratadeti").appendTo("#logo-setratadeti-container");
		
		var logoTweens = new TimelineMax()
			.to("#nav-logo", .5, {left:"-500px",ease:Back.easeIn});
		switch(deviceType){
			case 'desktop':
			logoTweens.to("#svg7826", .5, {top: "14px",ease:Back.easeOut});
			setratadetilogoTopPos = "125px";
			setratadetilogoLeftPos = "356px";
			console.log('desktop...');
			break;
			case 'mobile':
			logoTweens.to("#svg7826", .5, {transform:"scale(0.5)",ease:Back.easeOut});
			logoTweens.to("#svg7826", .5, {top: "-44px", left: "200px",ease:Back.easeOut});
			setratadetilogoTopPos = "120px";
			setratadetilogoLeftPos = "80px";
			console.log('mobile...');
			break;
			
			case 'mobile-landscape':
			logoTweens.to("#svg7826", .5, {transform:"scale(0.5)",ease:Back.easeOut});
			logoTweens.to("#svg7826", .5, {top: "-44px", left: "520px",ease:Back.easeOut});
			setratadetilogoTopPos = "120px";
			setratadetilogoLeftPos = "80px";
			console.log('mobile...');
			break;

			default:
			logoTweens.to("#svg7826", .5, {top: "14px",ease:Back.easeOut});
			setratadetilogoTopPos = "125px";
			setratadetilogoLeftPos = "356px";
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
			.to("#setratadeti .contenido-seccion", .5, {opacity: 1})
			.to("#se-trata-de-ti-bg-left", .5, {left:1,delay:.5,opacity:1})
			if(deviceType!=='mobile'){
				setratadetiTweens.to("#se-trata-de-ti-bg-right", .5, {left:"459px",opacity:1})
				console.log('show bg right')
			}
			setratadetiTweens.to("#logo-setratadeti", .5, {left:setratadetilogoLeftPos, top:setratadetilogoTopPos})
			setratadetiTweens.to("#logo-setratadeti", .5, {opacity:1,transform:"scale(1.5)",transformOrigin:"50% 50%"})
			/*.to(["#info-container","#video-container"], .5, {opacity:0})*/
			
		var setratadetiScene = new ScrollMagic.Scene({
			triggerElement: "#setratadeti",
			offset: 0,
			duration: 0,
			reverse: true
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

		
		$("#btn-info").click(function(){
			//hideSeTrataDeTiIntro('info');
			$('#modalInfo').modal({})
		})

		$("#btn-video").click(function(){
			//hideSeTrataDeTiIntro('video');
			$('#modalVideo').modal({})	
		})

		$("#btn-camera").click(function(){
			//hideSeTrataDeTiIntro('video');
			$('#modalGaleria').modal({})	
		})
		

		function hideSeTrataDeTiIntro(targetScene){
			var setratadetiHideIntroTweens = new TimelineMax({onComplete:function(){
				switch(targetScene){
				case 'info':
					setratadetiHideIntroTweens.to("#video-container", .5, {opacity:0})
					/*showSeTratadetiInfo();*/
					TweenMax.to("#info-container", .5, {opacity:1});
				break;
				case 'video':
				setratadetiHideIntroTweens.to("#info-container", .5, {opacity:0})
				/*showSeTratadetiVideo();*/
				TweenMax.to("#video-container", .5, {opacity:1});
				break;
				case 'all':
				setratadetiHideIntroTweens.to(["#info-container","#video-container"], .5, {opacity:0})
				break;
				default:
					console.log('saliendo sin nada')
				break;
				}
			}})
			.to("#setratadeti #logo-setratadeti", .5, {opacity:0})
			.to("#se-trata-de-ti-bg-right", .5, {left:"-460px",opacity:0})
			.to("#se-trata-de-ti-bg-left", .5, {left:2000,opacity:0})
			setratadetiHideIntroTweens.restart();
		}


		function showSeTratadetiInfo(){
			 
			/*var setratadetiShowinfoTweens = new TimelineMax()
			.to("#info-container", .5, {opacity:1})
			setratadetiShowinfoTweens.restart();*/
		}

		function showSeTratadetiVideo(){
			TweenMax.to("#video-container", .5, {opacity:1});
			/*var setratadetiShowVideoTweens = new TimelineMax()
			.to("#video-container", .5, {opacity:1})
			setratadetiShowVideoTweens.restart();*/
		}

  				/*<span id="keyword-calidad">Calidad</span>
  				<span id="keyword-excelencia">Excelencia</span>*/
	}
});