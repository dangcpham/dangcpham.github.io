
var stage = 1;
$('.s1next').click(function() {
    var text = $('.s1h2').html();
    
    if (stage == 1){
        text += ", my name is Dang! ";
    } else if(stage == 2){
        text = "I make websites, ";
    } else if(stage == 3){
        text = "play the piano, ";
    } else if(stage == 4){
        text = "and love Astronomy!";          
    } else if(stage == 5){
        text = "Check out my works and projects... ";    
    } else if(stage == 6){
        text = "or contact me! ";    
    } else if(stage == 7){
        text = "Welcome!";    
        $(this).fadeOut(1000);
        $('.s1h2').css('padding', '30px 10px');
    } 
    
    stage += 1;
    $('.s1h2').html(text);
});
$('#researchlink').click(function() {
    $('html, body').animate({
        scrollTop: $(".projweb").offset().top
    }, 1000);
});
$('#back').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});
$('#aboutlink').click(function() {
    $('html, body').animate({
        scrollTop: $(".s1").offset().top
    }, 1000);
});
$('#pianolink').click(function() {
    $('html, body').animate({
        scrollTop: $(".proj").offset().top
    }, 1000);
});
$('#contactlink').click(function () {
    $('html, body').animate({
        scrollTop: $(".s3").offset().top
    }, 1000);
});
$('body center h1').each(function() {   
    $(this).click(function() {
        $('html, body').animate({
            scrollTop: $(".navi").offset().top
        }, 1000);           
    });
});
$(window).load(function() {
    var viewportWidth = $(window).width();
    $('.s3').css('top', $(document).height());
    $(document).height($(document).height()+100);
    if (viewportWidth < 650){
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');    
    } else{
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">'); 
    }
    
});
$(window).resize(function() {
    var viewportWidth = $(window).width();
    $('.s3').css('top', $(document).height());
    $(document).height($(document).height()+100);
    if (viewportWidth < 650){
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');    
    } else{
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
    if (viewportWidth1 < 810){
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');    
    } else{
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">'); 
}
$(window).scroll(function() {
    var scrolldist = $(window).scrollTop();
    $('head title').text(scrolldist);
    if ( scrolldist > 150){
        $('.navi').css("position", "fixed")
        //$('.navi').css("background", "#256188")
    } else if ( scrolldist < 150){
        $('.navi').css("position", "absolute")
        //$('.navi').css("background", "#fff")
    }
});

