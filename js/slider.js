(function(window, document, undefined){ 
	var slider = {
		init : function(){
			slider.createDots( document.querySelectorAll('#slider .slide') );
			slider.setConfig()
			slider.setState(slider.config.slide);
			slider.addClickHandler( slider.config.slides );
			slider.addOverHandler( slider.config.slides );
			slider.addOutHandler( slider.config.slides );
			slider.progressBar( slider.config.slides );
		},
		setConfig : function(){
			slider.config = {
				sliderInterval : null,
				intervalLength : 30,
				progressCounter : 0,
				slides : document.querySelectorAll( '#slider .slide' ),
				dots : document.querySelectorAll( '.slider-dots li' ),
				addActives : function(){
					slider.config.activeSlide = document.querySelector("#slider .slide.active");
					slider.config.activeDot = document.querySelector(".slider-dots li.active");
				}
			}
	},
		createDots : function(slides) {
			var i;
			var dots = document.querySelector( '.slider-dots' );
			dots.innerHTML = '';
			for(i = 0; i < slides.length; i++) {
				dots.innerHTML =
					dots.innerHTML +
					'<li><a href="javascript:void(0);"></a></li>';
			}
		},
		setState : function( slides, clickEls ){
			if( !( slider.config.activeSlide ) ) { // active slider
					slider.setActive(slider.config.slides[0], slider.config.dots[0]);
					slider.config.addActives();
			} else if( clickEls ){ // maintain event
					slider.changeSlide(	clickEls[0], clickEls[1] );
			} else if(!slider.config.activeSlide.nextElementSibling){ // checks if the slide is the last one
					slider.changeSlide(slider.config.slides[0], slider.config.dots[0]);
			 }else { // changes slide to another one
					slider.changeSlide(slider.config.activeSlide.nextElementSibling,
									slider.config.activeDot.nextElementSibling);
				}
		},
		addClickHandler : function( slides ){
			document.querySelector(".container").addEventListener('click', function(e){
				e.preventDefault();
				var i;
				var clickEls = [];
				clickEls = slider.checkArrows(e.target.parentElement);
				for(i=0;i<document.querySelectorAll('.slider-dots li').length;++i){
					if(e.target.parentElement===slider.config.dots[i] &&
						!e.target.parentElement.classList.contains('active')){
						clickEls[0] = slider.config.slides[i];
						clickEls[1] = slider.config.dots[i];
					}
				}
				if(clickEls[0] !== undefined){
					slider.setState(slides, clickEls);
					slider.resetProgress( slides );
				}
			}, true);
		},
		addOverHandler : function ( slides ) {
			document.querySelector('.slides').
			addEventListener('mouseover', function(){
				clearInterval(slider.config.sliderInterval);
			}, true)},
		addOutHandler : function(slides){
			document.querySelector('.slides').
			addEventListener('mouseout', function(){
				console.log(00)
				slider.progressBar(slides);
			}, true)
		},
		progressBar : function( slides ){
			slider.config.sliderInterval = setInterval( function(){
				if( slider.config.progressCounter === 100 ){
					slider.setState( slides );
				} else {
					++slider.config.progressCounter;
					document.querySelector( '.slider-progressbar' ).style.width = 
											slider.config.progressCounter + '%';
				}
			}, slider.config.intervalLength );
		},
		checkArrows : function( el ){
			if(el.classList.contains('prev-arrow')){
				if(slider.config.activeSlide.previousElementSibling){
					return [slider.config.activeSlide.previousElementSibling,
							slider.config.activeDot.previousElementSibling];
				} else {
					return [slider.config.slides[slider.config.slides.length-1],
							slider.config.dots[slider.config.dots.length-1]];
				}
			} else if(el.classList.contains('next-arrow')){
				if(slider.config.activeSlide.nextElementSibling){
					return [slider.config.activeSlide.nextElementSibling,
						slider.config.activeDot.nextElementSibling];
				} else {
					return [slider.config.slides[0],
					slider.config.dots[0]];
				}
			}
			return [undefined];
		},
		resetProgress : function( slides ){
			clearInterval(slider.config.sliderInterval);
			slider.config.progressCounter = 0;
			slider.progressBar( slides );
		},

		changeSlide : function(slide, dot){
			slider.setActive(slide, dot);
			slider.removeActive();
			slider.resetProgress(slider.config.slides);
		},
		setActive : function(slide, dot){
			slide.classList.add('active');
			dot.classList.add('active');
		},
		removeActive : function(){
			slider.config.activeSlide.classList.remove('active');
			slider.config.activeDot.classList.remove('active');
			slider.config.addActives();
		}
	};
	window.onload = function() {
		slider.init(); }
	}(window, document));