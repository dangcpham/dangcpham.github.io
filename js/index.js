
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
        text = "Welcome! I am Dang Pham. ";    
        $(this).fadeOut(1000);
        $('.s1h2').css('padding', '30px 10px');
    } 
    
    stage += 1;
    $('.s1h2').html(text);
});
$('#projlink').click(function() {
    $('html, body').animate({
        scrollTop: $(".s2").offset().top
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

$(window).resize(function() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 810){
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');    
    } else{
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">'); 
    }
});
$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');
$('head').append("<link href='http://fonts.googleapis.com/css?family=Slabo+13px' rel='stylesheet' type='text/css'>");
var viewportWidth1 = $(window).width();
    if (viewportWidth1 < 810){
        alert('here');
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index-650.css" rel="stylesheet">');    
    } else{
        $('head .r').remove();
        $('head').append('<link class="r" href="css/index.css" rel="stylesheet">'); 
}

