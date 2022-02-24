/* DEFAULT SCRIPTS */
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var header = $('#sticky__header');

$(window).on('resize scroll', function() {
    if ($('.default_header').isInViewport()) {
        header.removeClass('header__fixed')
        header.addClass('header__hidden')

    } else {
        if ($('.blog_page').length != 0) {
            return false
        } else {
            header.addClass('header__fixed')
            header.removeClass('header__hidden')
        }
    }
});

$('.header__lang div').click(function() {
    var clickedLang = $(this).text();
    var clickedFlag = $(this).find('img').attr('src');

    $('#language').text(clickedLang);
    $('#language_sticky').text(clickedLang);
    $('#icon__flag').attr('src', clickedFlag)
    $('#icon__flag').attr('src', clickedFlag)
    if (clickedLang == 'Dutch') {

    }
})

$('.mb__header_lang').click(function() {
    $('.mb__header_language').toggleClass('mb__header_language_open')
})

$('.mb__header_block').click(function() {
    var clickedLang = $(this).attr('id').replace('lang_', '')
    $('.mb__header_icon').attr('src', $('#image__' + clickedLang).attr('src'))

    $('.mb__header_language').removeClass('mb__header_language_open')
})

$('.lang__wrapper').click(function() {
    $('.header__lang').toggleClass('header__lang_open')
    $('.header__down').toggleClass('header__down_open')
})

var mobileHeader = $('.mb__header_sticky');

$(window).on('resize scroll', function() {
    if ($('.default_header').isInViewport()) {
        mobileHeader.removeClass('mb_header__fixed')
        mobileHeader.addClass('mb_header__hidden')
    } else {
        mobileHeader.addClass('mb_header__fixed')
        mobileHeader.removeClass('mb_header__hidden')
    }
});

/* FEEDBACK POPUP */

var feedbackH = $('.feedback__popup').height()

$('.footer_contact').click(function() {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    setTimeout(() => {
        $('.feedback__popup').addClass('feedbackShow');
    }, 100);
})

$('.popup_close').click(function() {
    feedbackClose()
})
$('.feedback__send').click(function() {
    //  feedbackClose()
})
$('.feedback').click(function() {
    feedbackClose()
})

function feedbackClose() {
    $('.feedback__popup').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

/* FEEDBACK POPUP END */

/* DASHBOARD POPUP */

$('.footer_dashboard').click(function() {
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    $('.feedback').attr('style', 'display: block')
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    setTimeout(() => {
        $('.dashboard__popup').addClass('feedbackShow');
    }, 100);
})

$('.popup_close_dash').click(function() {
    dashboardClose()
    $('.dashboard__popup').removeClass('feedbackShow');
})
$('.feedback__send').click(function() {
    //  dashboardClose()
})
$('.feedback').click(function() {
    $('.dashboard__popup').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')
    dashboardClose()
})

function dashboardClose() {
    $('.dashboard__popup').addClass('feedbackShow1');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    $('.feedback').attr('style', 'display: none')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

/* DASHBOARD POPUP END */
/* REVIEWS SLIDER */

var numberSlider = 1;

setInterval(() => {
    var revItemWidth = 380;
    var firstSlide = $('#review-' + numberSlider).html()
    var translateWidth = numberSlider * revItemWidth;
    $('.reviews__items').attr('style', 'transform: translateX(-' + translateWidth + 'px)')
    $('.reviews__items').append("<div class='review__item' id='review-" + (numberSlider + 6) + "'>" + firstSlide + "</div>")
    numberSlider++
}, 3000);

/* REVIEWS SLIDER END */
$('.faq__item').click(function() {
    var currentFaq = $(this)
    currentFaq.find('.faq__item_answer').toggleClass('faq_ans_open')
    currentFaq.toggleClass('faq_open');

    if (currentFaq.hasClass('faq_open')) {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_minus.svg')
    } else {
        $(this).find('.faq__open').attr('src', 'img/homepage/faq_plus.svg')
    }
})

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


/* BLOG PAGE NAVIGATION */
var linksCount = $('h2').length;
let h2Counter = 1;

$.each($('h2'), function(key, value) {
    var innerText = value.innerText.replace(h2Counter + '.', '')
    $('.blog__navigation__links').append(`<a id="blog_link_` + h2Counter + `" href="#nav_link_` + h2Counter + `">
    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.756 4.82699L15.7743 0.278736C15.536 0.00657561 15.1776 -0.0748266 14.8663 0.0724768C14.5549 0.21978 14.3519 0.56679 14.3518 0.951741V3.83415C14.3518 3.96558 14.2585 4.07212 14.1435 4.07212H1.25001C0.559649 4.07212 0 4.71141 0 5.5C0 6.28859 0.559649 6.92788 1.25001 6.92788H14.1435C14.2585 6.92788 14.3518 7.03442 14.3518 7.16585V10.0483C14.3519 10.4332 14.5549 10.7802 14.8663 10.9275C15.1776 11.0748 15.536 10.9934 15.7743 10.7213L19.756 6.17301C20.0813 5.80128 20.0813 5.19872 19.756 4.82699Z"
            fill="#F8A35B" />
    </svg>
    <p>` + innerText + `</p>
    </a>`)
    $(value).attr('id', 'nav_link_' + h2Counter)



    if (h2Counter == 1) {
        $('#blog_link_' + h2Counter).addClass('blog__navigation_active')
    }

    h2Counter++
})

/* BLOG PAGE NAVIGATION END */

$('.blog__navigation__links a').click(function() {
    $('.blog__navigation__links a').removeClass('blog__navigation_active')
    $(this).addClass('blog__navigation_active')
})

$(document).ready(function() {
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        } // Конец, если
    });


    /* DEFAULT SCRIPTS END */


    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop() - 900;
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function() {
        $.each($('h2'), function(key, value) {
            if ($(this).isInViewport()) {
                var currentBlog = $(this).attr('id').replace('nav_link_', '')
                $('.blog__navigation__links a').removeClass('blog__navigation_active')
                $('#blog_link_' + currentBlog).addClass('blog__navigation_active')
            } else {}
        })

    });
});