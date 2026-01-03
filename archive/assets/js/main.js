$('.nav a').on('click', function() {

    var scrollAnchor = $(this).attr('id'),
        scrollPoint = $('section[id="' + scrollAnchor + '"]').offset().top + 15;

    $('body,html').animate({
        scrollTop: scrollPoint
    }, 500);

    return false;

})

$(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 120) {
        $('.wrapper section').each(function(i) {
            if ($(this).position().top <= windscroll - 20) {
                $('.nav a.active').removeClass('active');
                $('.nav a').eq(i).addClass('active');
            }
        });

    } else {
        $('.nav a.active').removeClass('active');
        $('.nav a:first').addClass('active');
    }

}).scroll();

// $('body,html').animate({
//     scrollTop: $("#top").offset().top + 18
// }, 500);