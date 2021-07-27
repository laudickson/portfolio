$(document).ready(function() {
  Splitting();

  const mainContainer = document.querySelector('.main-container');
  const backToTop = document.querySelector('.cd-top');
  const currentChapter = document.getElementById('current-chapter');
  const sideNav = document.getElementById('sideNav');
  let ticking = false;
  
  function getNormalizedScrollPos() {
    return mainContainer.scrollTop * 100 / mainContainer.scrollHeight;
  }
  function showScrollToTop() {
    ( mainContainer.scrollTop > 300 ) ?
        backToTop.classList.add('cd-is-visible') : backToTop.classList.remove('cd-is-visible', 'cd-fade-out');
		if( $('.main-container').scrollTop > 1300 ) {
			backToTop.classList.add('cd-fade-out');
		}
  }

  function scrollCurrentChapter(scrollPos) {
    currentChapter.style.transform = `rotate(270deg) translateY(calc(170px - ${scrollPos}%))`
  }
  
  // fade in menu when document is loaded
  setTimeout(function() {
    sideNav.style.opacity = 1},
    800
  );

  //optimized scroll event listener
  mainContainer.addEventListener('scroll', function(e) {
    normalizedScrollPos = getNormalizedScrollPos();
    if (!ticking) {
      window.requestAnimationFrame(function() {
        showScrollToTop();
        scrollCurrentChapter(normalizedScrollPos);
        ticking = false;
      });

      ticking = true;
    }
  });

  // scroll back to top invocation
  backToTop.onclick = function toTheTop(e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView();
  }

  // ensure that current chapter moves out of way when menu is open
  sideNav.addEventListener('mouseover', function(e) {
    scrollCurrentChapter(5000);
  }, false);
  sideNav.addEventListener('mouseleave', function(e) {
    scrollCurrentChapter(getNormalizedScrollPos())
  }, false);

  // hola bitches
  const hellos = {
    strings: ["^1000Hello!", "你好!", "Salut!", "안녕!", "привет!", "Hola!", "नमस्ते!", "What's good?"]
  }
  $(".greeting").typed(hellos);

  $('.title').on('click', function () {
    const href = $(this).attr('href');
    document.querySelector(href).scrollIntoView();
  });

  //automagick
  const vis = ['adirondack','theroadgoeseveron','briana','reminiscent','bos','jzsmoke','sophie','butterfly','league','fouryears','sujit','ferrari','fanboy','lookup','ked','edemame','summerdreamin','nemo','painter','pumpkins','shoesoptional','parrot','castaway','jz2','fountain','roadtothetop','wesley','bigbeach','hocr','rain','pianokeys','statesswim','demboiz','packing','grandmaster','speared','mya','thomas','commave','bu'];
  const invis = ['riho','bobert','bee','bronze','flower','georgelaughing','guru','josephnyc','karina','peekingred','tsdlau','pistachio','raspberrysnowman','justchillin','zenbonsakura','sarah','shadowlight','snowsalt','snowmiri','flowerA1','pumpkinsale','graduation','flowerA2','wendy','mokanero', 'moka2','sheep','kaylarado'];

  function automagick(){
    const nextImage = Math.random().toFixed(5);
    const vanish = vis[Math.floor(nextImage*vis.length)];
    const vanishIndex = vis.indexOf(vanish);
    const appear = invis[0];
    const appearIndex=invis.indexOf(appear);

    if (vanishIndex > -1){
      vis.splice(vanishIndex, 1);
    }

    if (appearIndex > -1){
      invis.splice(appearIndex, 1);
    }

    vis.push(appear);
    invis.push(vanish);

    const appearLeft = $('#'+vanish).css("left");
    const appearTop = $('#'+vanish).css("top");

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

      // console.log(appear); //names of photos, as they appear
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
