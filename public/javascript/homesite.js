$(document).ready(function() {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var s = skrollr.init({forceHeight: false});
  }
  setTimeout(function(){
    $('#sideNav').css('opacity',1)},
    800
  );

  Splitting();

  var offset = 300;
	var offset_opacity = 1300;
	var scroll_top_duration = 700;
  var $back_to_top = $('.cd-top');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

  var hellos = {
    strings: ["^1000Hello!", "你好!", "Salut!", "안녕!", "привет!", "Hola!", "नमस्ते!", "What's good?"]
  }
  $(".greeting").typed(hellos);

  $('.title').on('click', function (){
    var href = $(this).attr('href');
    $('body, HTML').animate({
      scrollTop: $(href).offset().top
    }, 500);
  });

  //automagick
  var vis = ['adirondack','theroadgoeseveron','briana','reminiscent','bos','jzsmoke','sophie','butterfly','league','fouryears','sujit','ferrari','fanboy','lookup','ked','edemame','summerdreamin','nemo','painter','pumpkins','shoesoptional','parrot','castaway','jz2','fountain','roadtothetop','wesley','bigbeach','hocr','rain','pianokeys','statesswim','demboiz','packing','grandmaster','speared','mya','thomas','commave','bu'];
  var invis = ['riho','bobert','bee','bronze','flower','georgelaughing','guru','josephnyc','karina','peekingred','tsdlau','pistachio','raspberrysnowman','justchillin','zenbonsakura','sarah','shadowlight','snowsalt','snowmiri','flowerA1','pumpkinsale','graduation','flowerA2','wendy','mokanero'];

  function automagick(){
    var nextImage = Math.random().toFixed(5);
    var vanish = vis[Math.floor(nextImage*vis.length)];
    var vanishIndex = vis.indexOf(vanish);
    var appear = invis[0];
    var appearIndex=invis.indexOf(appear);

    if (vanishIndex > -1){
      vis.splice(vanishIndex, 1);
    }

    if (appearIndex > -1){
      invis.splice(appearIndex, 1);
    }

    vis.push(appear);
    invis.push(vanish);

    var appearLeft = $('#'+vanish).css("left");
    var appearTop = $('#'+vanish).css("top");

    $('#'+appear).css({
      left: appearLeft,
      top: appearTop,
      border: "1px solid black",
      display: "inline"
    }).animate({
      opacity: 1.0},{duration: 1000
      },"easeIn");

    $('#'+vanish).animate({
      opacity: 0},{duration: 1000},"easeOut").delay(1200).queue(function(magicks){
        $(this).css({
          border: "none",
          display: "none"
        });
        magicks();
      });

      console.log(appear); //names of photos, as they appear
    setTimeout(automagick, 1500);
  }
  automagick();

  //rue and gilt bubbles (who doesn't love bubbly)
  $('.ruelala-link').mouseenter(function(){
    $('.main-container').stop().addClass('rue-bubbly');
    setTimeout(function(){
      $('.main-container').removeClass('rue-bubbly');
    }, 3000)
  });

  $('.gilt-link').mouseenter(function(){
    $('.main-container').stop().addClass('gilt-bubbly');
    setTimeout(function(){
      $('.main-container').removeClass('gilt-bubbly');
    }, 3000)
  });
});
