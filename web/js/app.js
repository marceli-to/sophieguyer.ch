'use strict';


(function(){
	// Details
	$('.accordion').on('click', 'summary', function(e){
		e.preventDefault();
		let currentIsOpen = false;
		if($(this).parent().attr('open') === 'open'){
			currentIsOpen = true;
		}
		$('details').removeAttr('open');
		if(currentIsOpen === false){
			$(this).parent().attr('open', true);
		}else{
			$(this).parent().removeAttr('open');
		}
	});
})();

let lastKnownScrollPosition = 0;
let ticking = false;

let offset = 200;

// element animation
activateElementsInViewport();
document.addEventListener('scroll', () => {
	lastKnownScrollPosition = window.scrollY;

	if(!ticking) {
		window.requestAnimationFrame(() => {
			activateElementsInViewport()
			ticking = false;
		});
		ticking = true;
	}
});

function activateElementsInViewport(){
	$('main > *').each(function(index, e){
		var top_of_element = $(e).offset().top;
		var bottom_of_element = $(e).offset().top + $(e).outerHeight();
		var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
		var top_of_screen = $(window).scrollTop();

		if ((bottom_of_screen - offset > top_of_element)){
			// the element is visible, do something
			$(e).removeClass('hidden');
			$(e).addClass('visible');
		}
	})
}
