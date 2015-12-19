
// code for sky drawing is from http://codepen.io/AlienPiglet/pen/hvekG
function drawing() {
    var c = document.getElementById('sky');
    var ctx = c.getContext('2d');
    var xMax = c.width = window.screen.availWidth;
    var yMax = c.height = window.screen.availHeight;

    var hmTimes = Math.round(xMax + yMax);

    for (var i = 0; i <= hmTimes; i++) {
        var randomX = Math.floor((Math.random() * xMax) + 1);
        var randomY = Math.floor((Math.random() * yMax) + 1);
        var randomSize = Math.floor((Math.random() * 2) + 1);
        var randomOpacityOne = Math.floor((Math.random() * 9) + 1);
        var randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
        var randomHue = Math.floor((Math.random() * 360) + 1);
        if (randomSize > 1) {
            ctx.shadowBlur = Math.floor((Math.random() * 15) + 5);
            ctx.shadowColor = "white";
        }
        ctx.fillStyle = "hsla(" + randomHue + ", 30%, 80%, ." + randomOpacityOne + randomOpacityTwo + ")";
        ctx.fillRect(randomX, randomY, randomSize, randomSize);
    }

}

var stage = 0;

function about() {
    
    var text1 = $('#lang').html();

    for (i = 0; i < 7; i++) {
        circref0 = "#c" + (i).toString();
        $(circref0).removeClass('fa-circle');
        $(circref0).addClass('fa-circle-o');
    }
    
    if (stage == 0) {
        text1 = "<i class='fa fa-child'></i> <span id='lang'>Hello, my name is Dang. </span>";
    } else if (stage == 1) {
        text1 = "  I make websites <i class='fa fa-globe'></i> and computer programs <i class='fa fa-code'></i>, ";
    } else if (stage == 2) {
        text1 = "<span id='lang'>  play the piano <i class='fa fa-music'></i>, </span> ";
    } else if (stage == 3) {
        text1 = " <span id='lang'> and love Astronomy <i class='fa fa-star-half-full'></i>! </span> ";
    } else if (stage == 4) {
        text1 = " Check out my works and research <i class='fa fa-book'></i>, ";
    } else if (stage == 5) {
        text1 = " or contact me! <i class='fa fa-envelope'></i>";
    }
    circref = "#c" + (stage).toString();
    $(circref).removeClass('fa-circle-o');
    $(circref).addClass('fa-circle');    
    $('#lang').html(text1);
    
    
}
function ani(){
    $('#lang').css('position','relative');
    $('#lang').animate({
          left: '+=2000px'
    }, 500);
    $('#lang').animate({
          left: '-=20000px'
    }, 0);
    setTimeout(about, 500);
    $('#lang').animate({
          left: '0px'
    });
}
drawing();
$('#sky').click(function () {
    if (stage < 5) {
        stage += 1
        ani()
    }

});
$('#forward').click(function () {
    if (stage < 5) {
        stage += 1;
        ani()
    } else if (stage == 5){
        stage = 0;
        ani()
    }

});
$('#backward').click(function () {
    if (stage > 0) {
        stage -= 1;
        ani()
    } else if(stage == 0){
        stage = 5;
        ani()
    }

});
$('#c0').click(function () {
    stage = 0;
    ani()
});
$('#c1').click(function () {
    stage = 1;
    ani()
});
$('#c2').click(function () {
    stage = 2;
    ani()
});
$('#c3').click(function () {
    stage = 3;
    ani()
});
$('#c4').click(function () {
    stage = 4;
    ani()
});
$('#c5').click(function () {
    stage = 5;
    ani()
});

$('#researchlink').click(function () {
    $('html, body').animate({
        scrollTop: $('.projweb').offset().top - 190
    }, 1000);
});
$('#back').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});
$('#aboutlink').click(function () {
    $('html, body').animate({
        scrollTop: $(".sky-bg").offset().top + 190
    }, 1000);
});
$('#pianolink').click(function () {
    $('html, body').animate({
        scrollTop: $(".proj").offset().top - 190
    }, 1000);
});
$('#contactlink').click(function () {
    $('html, body').animate({
        scrollTop: $(".s3").offset().top
    }, 1000);
});
$('body center h1').each(function () {
    $(this).click(function () {
        $('html, body').animate({
            scrollTop: $(".navi").offset().top
        }, 1000);
    });
});
$(window).load(function () {
    var viewportWidth = $(window).width();
    $('.s3').css('top', $(document).height());
    $(document).height($(document).height() + 100);
    if (viewportWidth < 800) {
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');
    } else {
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">');
    }

});
$(window).resize(function () {
    var viewportWidth = $(window).width();
    $('.s3').css('top', $(document).height());
    $(document).height($(document).height() + 100);
    if (viewportWidth < 800) {
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');
    } else {
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">');
    }
});
$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');
$('head').append("<link href='http://fonts.googleapis.com/css?family=Slabo+13px' rel='stylesheet' type='text/css'>");
$('.s2s1').append('<iframe width="80%" height="300px" defer src="//www.youtube.com/embed/78hD6JIXBV8" frameborder="0" allowfullscreen></iframe><span><br><br>Chopin Nocturne in C Sharp Minor, Opus Posthumous</span>');
$('.s2s2').append('<iframe width="80%" height="300px" defer src="//www.youtube.com/embed/DmzoCIB3NWc" frameborder="0" allowfullscreen></iframe><span><br><br>Prelude no 14 Well Tempered Clavier 1 BWV 859, Bach </span>');
$('.s2s3').append('<iframe width="80%" height="300px" defer src="//www.youtube.com/embed/1wYI2f-fUmo" frameborder="0" allowfullscreen></iframe><span><br><br>Piano Cover for Demons-Imagine Dragons</span>');
var viewportWidth1 = $(window).width();
if (viewportWidth1 < 810) {
    $('head .r').remove();
    $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');
} else {
    $('head .r').remove();
    $('head').append('<link class="r" href="css/index.css" rel="stylesheet">');
}
$(window).scroll(function () {
    var scrolldist = $(window).scrollTop();
    if (scrolldist > 200) {
        $('.navi').css("position", "fixed")
            //$('.navi').css("background", "#256188")
    } else if (scrolldist < 200) {
        $('.navi').css("position", "absolute")
            //$('.navi').css("background", "#fff")
    }
});