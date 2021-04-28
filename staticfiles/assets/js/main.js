(function ($) {

	'use strict';

	// Check if element exists
	$.fn.elExists = function () {
		return this.length > 0;
	};

	// Variables

	var $body = $('body'),
		$overlay = $('.global-overlay');



	/***** Sticky Header *******/

	function stickyHeader(selectors) {
		var { main } = selectors;
		var $headerPosition = (main.elExists()) ? main.offset().top : '';
		var $mainHeaderHeight = (main.elExists()) ? main[0].getBoundingClientRect().height : 0;
		var $headerTotalHeight = $headerPosition + $mainHeaderHeight;


		$(window).on('scroll', function () {
			var $scroll = $(window).scrollTop();
			if ($scroll > $headerTotalHeight) {
				main.addClass('is-sticky');
			} else {
				main.removeClass('is-sticky');
			}
		});
	}




	$(window).on('load', function () {
		var mainSelectors = {
			main: $('.header')
		}
		stickyHeader(mainSelectors);
	});



	/***** Toolbar Button Click Function *******/

	$('.js-toolbar-btn').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var target = $this.data('target');
		$body.toggleClass('body-open');
		$(target).toggleClass('open');
		$($overlay).addClass('overlay-open');
		$this.toggleClass('open');
	});


	/***** Document Click Function *******/

	$body.on('click', function (e) {
		var $target = e.target;
		var dom = $('.wrapper').children();

		if (!$($target).is('.js-toolbar-btn') && !$($target).parents().is('.open')) {
			dom.removeClass('open');
			$body.removeClass('body-open');
			dom.find('.open').removeClass('open');
			$overlay.removeClass('overlay-open');
		}

	});


	/***** Close Button Click Function *******/

	$('.btn-close').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		$this.parents('.open').removeClass('open');
		$($overlay).removeClass('overlay-open');
	});

	/***** Contact Input Animation *******/

	$('.contact-form__input').on('change paste keyup', function (e) {
		const val = $(this).val();

		if (val) {
			$(this).parent().addClass('has-value')
		} else {
			$(this).parent().removeClass('has-value')
		}
	})

	/***** Feather Icons *******/

	feather.replace();


	/***** Instagram Feed *******/

	$(window).on('load', function () {
		$.instagramFeed({
			'username': 'rainbowit10',
			'container': "#instagram-feed",
			'display_profile': false,
			'display_biography': false,
			'display_gallery': true,
			'callback': null,
			'styling': true,
			'items': 6,
			'items_per_row': 3,
			'margin': 2,
			'lazy_load': true,
			'on_error': console.error
		});

		$.instagramFeed({
			'username': 'rainbowit10',
			'container': "#instagram-feed-2",
			'display_profile': false,
			'display_biography': false,
			'display_gallery': true,
			'callback': null,
			'styling': false,
			'items': 5,
			'lazy_load': true,
			'on_error': console.error
		});
	});


	/***** MailChimp *******/

	var subscribeUrl = $(".mc-form").attr('action');

	$('.mc-form').ajaxChimp({
		language: 'en',
		url: subscribeUrl,
		callback: mailChimpResponse
	});

	function mailChimpResponse(resp) {
		if (resp.result === 'success') {
			$('.mailchimp-success').html('' + resp.msg).fadeIn(900);
			$('.mailchimp-error').fadeOut(400);
			$(".mc-form").trigger('reset');
		} else if (resp.result === 'error') {
			$('.mailchimp-error').html('' + resp.msg).fadeIn(900);
		}
	}

	/***** Feature Slider  *******/

	new Swiper('.feature-slider', {
		slidesPerView: 3,
		spaceBetween: 30,
		autoHeight: true,
		autoplay: {
			delay: 3000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1
			}
		}
	});

	/***** Post Slider  *******/

	new Swiper('.post-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		autoplay: {
			delay: 3000
		}
	})

	/***** Contact Form Activation  *******/

	$(function () {

		// Get the form.
		var form = $('#contact-form-active');

		// Get the messages div.
		var formMessages = $('.form-messege-active');

		// Set up an event listener for the contact form.
		$(form).submit(function (e) {
			// Stop the browser from submitting the form.
			e.preventDefault();

			// Serialize the form data.
			var formData = $(form).serialize();

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
				.done(function (response) {
					// Make sure that the formMessages div has the 'success' class.
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');

					// Set the message text.
					$(formMessages).text(response);

					// Clear the form.
					$('#contact-form input,#contact-form textarea').val('');
				})
				.fail(function (data) {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');

					// Set the message text.
					if (data.responseText !== '') {
						$(formMessages).text(data.responseText);
					} else {
						$(formMessages).text('Oops! An error occured and your message could not be sent.');
					}
				});
		});

	});


	function scrollToTop() {
		var btn = $('#scrollToTOp');
		$(window).scroll(function () {
			if ($(window).scrollTop() > 300) {
				btn.addClass('show');
			} else {
				btn.removeClass('show');
			}
		});
		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, '300');
		});
	}
	scrollToTop();



})(jQuery);

