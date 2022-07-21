(function ($) {
	"use strict";

	// preloader start
	$(window).on('load', function () {
		$('.preloader').delay(350).fadeOut('slow');
		$('body').delay(350).css({ 'overflow': 'visible' });

	})
	// preloader end
	if ($(".backtotop").length) {
		// back to top start
		$(window).scroll(function() {
			if ($(this).scrollTop() > 200) {
			$('.backtotop:hidden').stop(true, true).fadeIn();
			} else {
			$('.backtotop').stop(true, true).fadeOut();
			}
		});
		$(function() {
			$(".scroll").on('click', function() {
			$("html,body").animate({scrollTop: 0}, "slow");
			return false
			});
		});
	}

	// preloader js start
	function loader() {
		$(window).on('load', function () {
			$('#ctn-preloader').addClass('loaded');
			$("#loading").fadeOut(500);
			// Una vez haya terminado el preloader aparezca el scroll

			if ($('#ctn-preloader').hasClass('loaded')) {
				// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
				$('#preloader').delay(900).queue(function () {
					$(this).remove();
				});
			}
		});
	}
	loader();

	  /*================================== start Utilities ========================================*/

	  window.onload = function () {
		// Dark
		const toggleSwitch = document.querySelector(
		  '.theme-switch-box__input'
		);
		const currentTheme = localStorage.getItem("theme");
		if (currentTheme) {
		  document.documentElement.setAttribute("data-theme", currentTheme);
		  if (currentTheme === "dark") {
			toggleSwitch.checked = true;
		  }
		}
		function switchTheme(e) {
		  if (e.target.checked) {
			document.documentElement.setAttribute("data-theme", "dark");
			localStorage.setItem("theme", "dark");
		  } else {
			document.documentElement.setAttribute("data-theme", "light");
			localStorage.setItem("theme", "light");
		  }
		}
		if (toggleSwitch) {
		  toggleSwitch.addEventListener("change", switchTheme, false);
		}
	  };

	// mobile menu start
	$('#mobile-menu-active').metisMenu();

	$('#mobile-menu-active .dropdown > a').on('click', function (e) {
		e.preventDefault();
	});

	$(".hamburger_menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").toggleClass("show");
		$("body").addClass("on-side");
		$('.body-overlay').addClass('active');
		$(this).addClass('active');
	});

	$(".close-mobile-menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.body-overlay').removeClass('active');
		$('.hamburger_menu > a').removeClass('active');
	});

	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.hamburger-menu > a').removeClass('active');
	});
	// mobile menu end


	//data background
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})

	// data bg color
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));

	});


	$('.header-post-active').owlCarousel({
		nav: false,
		loop: true,
		margin: 30,
		dots: true,
		autoplay: false,
		autoplaySpeed: 2200,
		autoWidth:true,
		autoplayHoverPause: true,
		mouseDrag:false,
		slideTransition: 'linear',
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			}
		}
	});

	
  	//Trending post
	  $(".trending-slide").owlCarousel({
		loop:true,
		animateIn: 'fadeIn',
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		nav:false,
		margin:30,
		dots:false,
		mouseDrag:false,
		slideSpeed:1000,
		items : 1,
	});
	
	// trending post start
	function trendingTopicActive($scope, $) {
		$('.trending__post-slide').owlCarousel({
			loop: true,
			autoplay: true,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			margin: 30,
			autoplayTimeout: 6000,
			navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
			nav: true,
			dots: false,
			items: 1,
		});
	}

	// product carousel active
	$('.product__carousel').owlCarousel({
		loop: true,
		margin: 30,
		items: 4,
		autoplay: true,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		nav: false,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:2
			},
			992:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});

	// carousel active
	function postListActive($scope, $) {
		$('.carousel-post__active').owlCarousel({
			loop: true,
			margin: 30,
			items: 3,
			autoplay: true,
			autoplayTimeout:5000,
			smartSpeed: 800,
			autoplayHoverPause:true,
			navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				},
				992:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});
	}
	
	// brand active
	function sponsorActive($scope, $) {
		$('.brand__active').owlCarousel({
			loop: true,
			margin: 30,
			items: 6,
			autoplay: true,
			autoplayTimeout:5000,
			smartSpeed: 800,
			autoplayHoverPause:true,
			nav: false,
			dots: false,
			responsive:{
				0:{
					items:2
				},
				767:{
					items:3
				},
				992:{
					items:4
				},
				1200:{
					items:6
				}
			}
		});
	}

	// category post
	function catPostSliderActive($scope, $) {
		$('.category-post__slide').owlCarousel({
			loop: true,
			margin: 0,
			items: 4,
			autoplay: true,
			autoplayTimeout:5000,
			smartSpeed: 800,
			autoplayHoverPause:true,
			navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				},
				992:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});
	}

	// sports post
	$('.sports-post__slide').owlCarousel({
		loop: true,
		items: 1,
		autoplay: true,
		autoplayHoverPause:true,
		nav: false,
		dots: true,
	});
	function dailyBlogcActive($scope, $) {
		// daily blogs
		$('.daily-blogs__slide').owlCarousel({
			loop: true,
			margin: 30,
			items: 3,
			autoplay: true,
			autoplayTimeout:5000,
			smartSpeed: 800,
			autoplayHoverPause:true,
			navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
			nav: true,
			dots: false,
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				},
				992:{
					items:3
				}
			}
		});
	}

	// politics post slide
	$('.politics-post__slide').owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		autoplay: true,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		dots: false
	});

	// politics post slide
	$('.testimonial__slide-active').owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		autoplay: true,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		dots: true
	});

	// politics post slide
	$('.politics-post-slide').owlCarousel({
		loop: true,
		margin: 30,
		items: 2,
		autoplay: false,
		autoplayTimeout:5000,
		smartSpeed: 800,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		mouseDrag:false,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:2
			},
			992:{
				items:2
			},
			1200:{
				items:2
			}
		}
	});

	$('.tags-slide').owlCarousel({
		loop: true,
		margin: 15,
		items: 3,
		autoWidth:true,
		autoplay: false,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		mouseDrag:false,
		dots: false,
	});

	// online voating slide
	$('.online-voating-slide').owlCarousel({
		loop: true,
		margin: 30,
		items: 1,
		autoplay: false,
		autoplayTimeout:5000,
		smartSpeed: 800,
		animateIn: 'fadeIn',
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		mouseDrag:false,
		dots: false,
	});

	// post nav
	$('.post-slide__active').owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		autoplay: false,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		mouseDrag:false,
		dots: false,
	});

	// post nav
	$('.tags-slide').owlCarousel({
		loop: true,
		margin: 16,
		items: 3,
		autoWidth:true,
		autoplay: false,
		autoplayTimeout:5000,
		smartSpeed: 800,
		autoplayHoverPause:true,
		navText:['<i class="far fa-angle-left"></i>','<i class="far fa-angle-right"></i>'],
		nav: true,
		mouseDrag:false,
		dots: false,
	});





	

	// slider start
    function homeSlider() {
        var slider = $('.hero-post__active');
        slider.owlCarousel({
            loop: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            autoplay: true,
			items: 1,
            nav: true,
            dots: false,
            navText: ['<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>'],
            smartSpeed: 1200,
			mouseDrag:false,
            autoplayTimeout: 9000,
        });
        slider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var slider_animation = $(this).data('animation');
                $(this).removeClass('animated ' + slider_animation).css('opacity', '0');
            });
        });
        $("[data-delay]").each(function () {
            var animation_delay = $(this).data('delay');
            $(this).css('animation-delay', animation_delay);
        });
        $("[data-duration]").each(function () {
            var animation_dutation = $(this).data('duration');
            $(this).css('animation-duration', animation_dutation);
        });
        slider.on('translated.owl.carousel', function () {
            var layer = slider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var slider_animation = $(this).data('animation');
                $(this).addClass('animated ' + slider_animation).css('opacity', '1');
            });
        });
    }
    homeSlider();
	// slider end

	/* magnificPopup img view */
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/* magnificPopup video view */
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

	  /*-------------------------------------
    theiaStickySidebar
    -------------------------------------*/
	if (typeof $.fn.theiaStickySidebar !== "undefined") {
		$(".sticky-coloum-wrap .sticky-coloum-item").theiaStickySidebar({
		  additionalMarginTop: 130,
		});
	  }



	// Accordion Box
	if ($(".accordion-box").length) {
		$(".accordion-box").on("click", ".acc-btn", function () {
		var outerBox = $(this).parents(".accordion-box");
		var target = $(this).parents(".accordion");

		if ($(this).next(".acc-content").is(":visible")) {
			$(this).removeClass("active");
			$(this).next(".acc-content").slideUp(300);
			$(outerBox).children(".accordion").removeClass("active-block");
		} else {
			$(outerBox).find(".accordion .acc-btn").removeClass("active");
			$(this).addClass("active");
			$(outerBox).children(".accordion").removeClass("active-block");
			$(outerBox).find(".accordion").children(".acc-content").slideUp(300);
			target.addClass("active-block");
			$(this).next(".acc-content").slideDown(300);
		}
		});
	}
	
	$('.main-menu nav > ul > li').slice(-2).addClass('menu-last');

	// inhover active start
	$(".product__item").on('mouseenter', function () {
		$(".product__item").removeClass("active");
		$(this).addClass("active");
	});
	// nhover active start

	
    /*------------------------------------------
        = VERTICAL MENU FOR HEADER CAT
    -------------------------------------------*/
    if($(".vertical-menu").length) {
		var $verticalMenu = $(".vertical-menu");
		var $btn = $(".vertical-menu > button");
		var $menu = $(".vertical-menu-list");

		$menu.hide();

		$btn.on("click", function(e) {
			$menu.slideToggle();
			$verticalMenu.toggleClass("rotate-arrow");
		});
	}

	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
		
		$('.search-popup .color-layer').on('click', function() {
			$('body').removeClass('search-active');
		});
	}

	if ($(".audio-player").length) { 

		const audioPlayer = document.querySelector(".audio-player");
		const audio = new Audio(
		"https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
		);
		//credit for song: Adrian kreativaweb@gmail.com


		audio.addEventListener(
		"loadeddata",
		() => {
			audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
			audio.duration
			);
			audio.volume = .75;
		},
		false
		);

		//click on timeline to skip around
		const timeline = audioPlayer.querySelector(".timeline");
		timeline.addEventListener("click", e => {
		const timelineWidth = window.getComputedStyle(timeline).width;
		const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
		audio.currentTime = timeToSeek;
		}, false);

		//click volume slider to change volume
		const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
		volumeSlider.addEventListener('click', e => {
		const sliderWidth = window.getComputedStyle(volumeSlider).width;
		const newVolume = e.offsetX / parseInt(sliderWidth);
		audio.volume = newVolume;
		audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
		}, false)

		//check audio percentage and update time accordingly
		setInterval(() => {
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
		audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
			audio.currentTime
		);
		}, 500);

		//toggle between playing and pausing on button click
		const playBtn = audioPlayer.querySelector(".controls .toggle-play");
		playBtn.addEventListener(
		"click",
		() => {
			if (audio.paused) {
			playBtn.classList.remove("play");
			playBtn.classList.add("pause");
			audio.play();
			} else {
			playBtn.classList.remove("pause");
			playBtn.classList.add("play");
			audio.pause();
			}
		},
		false
		);

		audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
		const volumeEl = audioPlayer.querySelector(".volume-container .volume");
		audio.muted = !audio.muted;
		if (audio.muted) {
			volumeEl.classList.remove("icono-volumeMedium");
			volumeEl.classList.add("icono-volumeMute");
		} else {
			volumeEl.classList.add("icono-volumeMedium");
			volumeEl.classList.remove("icono-volumeMute");
		}
		});

		//turn 128 seconds into 2:08
		function getTimeCodeFromNum(num) {
		let seconds = parseInt(num);
		let minutes = parseInt(seconds / 60);
		seconds -= minutes * 60;
		const hours = parseInt(minutes / 60);
		minutes -= hours * 60;

		if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
		return `${String(hours).padStart(2, 0)}:${minutes}:${String(
			seconds % 60
		).padStart(2, 0)}`;
		}
	}

	// Accordion Box start
	if ($(".accordion_box").length) {
		$(".accordion_box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion_box");
			var target = $(this).parents(".accordion");

			if ($(this).next(".acc_body").is(":visible")) {
				$(this).removeClass("active");
				$(this).next(".acc_body").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			} else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc_body").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc_body").slideDown(300);
			}
		});
	}
	// Accordion Box end

	
	// inhover active start
	$(".news-block").on('mouseenter', function () {
		$(".news-block").removeClass("active");
		$(this).addClass("active");
	});


	$(".contact-info__item").on('mouseenter', function () {
		$(".contact-info__item").removeClass("active");
		$(this).addClass("active");
	});
	// nhover active end

	/*------------------------------------------
        = SHOP PAGE GRID VIEW TOGGLE
    -------------------------------------------*/  
    if($(".woocommerce-toolbar-top").length) {
        var products = $(".products"),
            allButton = $(".products-sizes a"),
            grid4 = $(".grid-4"),
            grid3 = $(".grid-3"),
            listView = $(".list-view");

        allButton.each(function() {
            var $this = $(this);
            $this.on("click", function(e) {
                e.preventDefault();
                $this.addClass("active").siblings().removeClass('active');
                e.stopPropagation();
            })
        });

        grid4.on("click", function(f) {
            products.removeClass("list-view three-column");
            products.addClass("default-column");
            f.stopPropagation();
        });

        grid3.on("click", function(g) {
            products.removeClass("default-column list-view");
            products.addClass("three-column");
            g.stopPropagation();
        });

        listView.on("click", function(h) {
            products.removeClass("default-column three-column");
            products.addClass("list-view");
            h.stopPropagation();
        });
    }

	/*----------------------------
	= SHOP PRICE SLIDER
    ------------------------------ */
    if($("#slider-range").length) {
        $("#slider-range").slider({
            range: true,
            min: 12,
            max: 200,
            values: [0, 100],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });

        $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
    }

	    /*------------------------------------------
        = TOUCHSPIN FOR PRODUCT SINGLE PAGE
    -------------------------------------------*/
    if ($("input.product-count").length) {
        $("input.product-count").TouchSpin({
            min: 1,
            max: 1000,
            step: 1,
            buttondown_class: "btn btn-link",
            buttonup_class: "btn btn-link",
        });
    }  

	/*------------------------------------------
        = PRODUCT ARES QUICK VIEW
    -------------------------------------------*/
    if($("ul.products").length) {

        var product = $("ul.products li.product");

        product.each(function() {
            var quickViewLink = product.find('a[title="Quick view!"]');
            var closeQuickView = product.find(".quick-view-single-product-close-btn");
            var singleProduct = $(".quick-view-single-product");

            var owlStage = $(".owl-stage") ? $(".owl-stage") : null;
            var owlStageOuter = $(".owl-carousel .owl-stage-outer") ? $(".owl-carousel .owl-stage-outer") : null ;

            quickViewLink.on("click", function(e) {
                e.preventDefault();
                $(this).closest(".product").find(".quick-view-single-product").addClass("activve-quick-view-single-product");

                owlStage.addClass("transform-none");
                owlStageOuter.addClass("transform-none");
                return false;
            })

            closeQuickView.on("click", function(f) {
                singleProduct.removeClass("activve-quick-view-single-product");
                owlStage.removeClass("transform-none");
                owlStageOuter.removeClass("transform-none");
                return false;
            })
        })
    }

	/*------------------------------------------
        = woocommerce
    -------------------------------------------*/
    if($(".checkout-section").length) {
        var showLogInBtn = $(".woocommerce-info > a");
        var showCouponBtn = $(".showcoupon");
        var shipDifferentAddressBtn = $("#ship-to-different-address");
        var loginForm = $("form.login");
        var couponForm = $(".checkout_coupon");
        var shippingAddress = $(".shipping_address");

        loginForm.hide();
        couponForm.hide();
        shippingAddress.hide();

        showLogInBtn.on("click", function(event) {
            event.preventDefault();
            loginForm.slideToggle();
            event.stopPropagation();
        });

        showCouponBtn.on("click", function(event2) {
            event2.preventDefault();
            couponForm.slideToggle();
            event2.stopPropagation();
        })

        shipDifferentAddressBtn.on("click", function(event3) {
            shippingAddress.slideToggle();
            event3.stopPropagation();
        })
    }


    $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/mgz-trendtopic-slid.default', trendingTopicActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/mgz-post-grid-v2-carousel.default', dailyBlogcActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/mgz-post-grid-carousel.default', catPostSliderActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/mgz-sponsor-carousle.default', sponsorActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/mgz-post-list-carousel.default', postListActive);
	});
	




})(jQuery);



