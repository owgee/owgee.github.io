//ES6 Compliant
(($ => {
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
        if (target.length) {
            $('html, body').animate({
                scrollTop: (target.offset().top - 70)
            }, 1000, "easeInOutExpo");
            return false;
        }
    }
});

// Scroll to top button appear
$(document).scroll(function() {
    const scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});


// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
    target: '#mainNav',
    offset: 80
});


// Floating label headings for the contact form
$(() => {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
}).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
}).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
});
});
}))(jQuery);





