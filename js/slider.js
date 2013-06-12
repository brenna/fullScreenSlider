	/*
	* Full-screen image slider
	*/

	var slider = {
		options: {
			container: $('#gallery'),
			caption: true
		},
		init: function(options) {

			//allow custom options on init
			if (options && typeof(options) == 'object') {
				$.extend(slider.options, options);
			}

			slider.$container = slider.options.container;
			slider.$slideGroup = slider.$container.find('ul');
			slider.$slides = slider.$slideGroup.children('li');
			slider.$overlay = $('<div/>').attr('class', 'gallery-overlay').appendTo(slider.$container);
			slider.$dotNav = $('<ol />').attr('class', 'gallery-nav').appendTo(slider.$overlay);
			slider.$numSlides = slider.$slides.length;
			slider.$counter = 0;

			slider.setStyles();
			slider.generateNav();
			slider.loadImgs();

			if (slider.options.caption) {
				slider.$caption = $('<p/>').attr('class', 'gallery-caption').prependTo(slider.$overlay);
				slider.loadCaption(0);
			}
		},
		setStyles: function() {
			slider.$slideGroup.css('width', slider.$numSlides * 100 + '%');
			slider.$slides.css('width', 100 / slider.$numSlides + '%');
		},
		loadImgs: function() {
			slider.$slides.each(function(){
				$(this).css('background-image','url(' + $(this).data('img') + ')');
			});
		},
		loadCaption: function(i) {
			slider.$caption.text(slider.$slides.eq(i).data('caption'));
		},
		generateNav: function() {
			slider.$slides.each(function(index) {
				$('<li />').addClass(index === 0 ? 'current' : '').data('index', index++).appendTo(slider.$dotNav).click(slider.goToSlide);
			});
		},
		goToSlide: function() {
			var index = $(this).data('index'),
				offset = index - slider.$counter;
			slider.$slideGroup.animate({
				left: -(offset*100)+'%'
			});
			
			if (slider.options.caption) {
				slider.loadCaption(index);
			}
				
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
		}
	};

	$(document).ready(function() { slider.init(); });