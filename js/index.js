var stage = 1;
// code for sky drawing is from http://codepen.io/AlienPiglet/pen/hvekG
function drawing() {
	var c = document.getElementById('sky');
	var ctx = c.getContext('2d');
	var xMax = c.width = window.screen.availWidth;
	var yMax = c.height = window.screen.availHeight;

	var hmTimes = Math.round(xMax + yMax);	
	
	for(var i=0; i<=hmTimes; i++) {
	  var randomX = Math.floor((Math.random()*xMax)+1);
	  var randomY = Math.floor((Math.random()*yMax)+1);
	  var randomSize = Math.floor((Math.random()*2)+1);
	  var randomOpacityOne = Math.floor((Math.random()*9)+1);
	  var randomOpacityTwo = Math.floor((Math.random()*9)+1);
	  var randomHue = Math.floor((Math.random()*360)+1);
    if(randomSize>1) {
      ctx.shadowBlur = Math.floor((Math.random()*15)+5);
      ctx.shadowColor = "white";
	  }
    ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
	  ctx.fillRect(randomX, randomY, randomSize, randomSize);
	}
  
}
function about() {
     var text1 = $('#lang').text();

   if(stage == 1){
        text1 += " I make websites, ";
    } else if(stage == 2){
        text1 += " play the piano, ";
    } else if(stage == 3){
        text1 += " and love Astronomy!";          
    } else if(stage == 4){
        text1 += " Check out my works and research... ";    
    } else if(stage == 5){
        text1 += " or contact me! ";     
        $('.s1h2').css('padding', '30px 10px');
        
        $('.sky-bg').show()
        $('.ar').fadeOut(1000)
    } 
    
    circref = "#c" + (stage+1).toString();
    $(circref).removeClass('fa-circle-o');
    $(circref).addClass('fa-circle');
    stage += 1;
    $('#lang').text(text1);
    
}
drawing();

$('.s1').click(function() {
    about()
   
});
$('#sky ').click(function() {
    about()
   
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
    if ( scrolldist > 200){
        $('.navi').css("position", "fixed")
        //$('.navi').css("background", "#256188")
    } else if ( scrolldist < 200){
        $('.navi').css("position", "absolute")
        //$('.navi').css("background", "#fff")
    }
});

