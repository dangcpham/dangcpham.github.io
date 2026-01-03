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

window.addEventListener('DOMContentLoaded', () => {
    $("#header").load("../header.html");
    $("#footer").load("../footer.html");
});


// $('body,html').animate({
//     scrollTop: $("#top").offset().top + 18
// }, 500);

// if (localStorage.getItem('dark-mode') === 'true') {
//     document.body.classList.add('dark-mode');
//   }

//   function updateDarkEmoji() {
//     const btn = document.getElementById('toggle-dark');
//     if (btn) {
//       const isDark = document.body.classList.contains('dark-mode');
//       btn.textContent = isDark ? '☀️' : '🌙';
//       btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
//     }
//   }

// window.addEventListener('DOMContentLoaded', () => {
//     // Load header and footer
//     $("#header").load("../header.html", () => {
//       const toggleBtn = document.getElementById('toggle-dark');
//       if (!toggleBtn) return;

//       toggleBtn.addEventListener('click', () => {
//         document.body.classList.toggle('dark-mode');
//         localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
//         updateDarkEmoji();
//       });

//       updateDarkEmoji(); // run after header is loaded
//     });

//     $("#footer").load("../footer.html");
// });