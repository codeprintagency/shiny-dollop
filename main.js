var _loadedImages = 0,
_imageArray = new Array('_5MinutesLockup.svg','actorPortrayal.svg','arrow.svg','bg01.jpg','bg02.png','bg03.jpg','copyDisc.svg','copyQuestions01.svg','copyQuestions02.svg','copyQuestions03.svg','headline01_1.svg','headline01_2.svg','headline01_3.svg','headline01_4.svg','headline02_1.svg','headline02_2.svg','headline02_3.svg','headline03_1.svg','headline03_2.svg','headline03_3.svg','logoGenentech.svg','logoPhesgo.svg'),
_expandedFlag = false;

var _tl,_tl2,
    _isiText = document.getElementById('isi-text'),
    _container = document.getElementById('isi'),
    _isiControls = document.getElementById('isi-controls'),
    _scrollerBeingDragged = false,
    _scroller,_scrollerline,_arrowUp,_arrowDown,
    _normalizedPosition,
    _topPosition,
    _contentPosition = 0,
    _percentY,
    autoScroll,//Interval
    autoScrollSpeed = 80,//
    scrollStep = 1,//Arrow click seek
    _textScrollHeight,

    _isiFullTime = 450,
    _isiFullHeight,
    _isiHeight;

this.addEventListener('DOMContentLoaded', preloadImages);

function preloadImages() {
    for (var i = 0; i < _imageArray.length; i++) {
        var _tempImage = new Image();
        _tempImage.addEventListener('load', trackProgress);
        _tempImage.src = _imageArray[i];
    }
}

function trackProgress(){
    _loadedImages++;
    if(_loadedImages == _imageArray.length) loadGSPA();
}

function loadGSPA(){
    ipGSPA = document.createElement('script');
    ipGSPA.setAttribute('type', 'text/javascript');
    ipGSPA.setAttribute('src', 'https://s0.2mdn.net/ads/studio/cached_libs/gsap_3.2.4_min.js');
    // ipGSPA.setAttribute('src', 'gsap_3.0.1_min.js'); /* For local use */
    document.getElementsByTagName('head')[0].appendChild(ipGSPA);

    ipGSPA.addEventListener('load', loadSTP, false);
}

function loadSTP(){
    ipSTP = document.createElement('script');
    ipSTP.setAttribute('type', 'text/javascript');
    ipSTP.setAttribute('src', 'https://s0.2mdn.net/ads/studio/cached_libs/scrolltoplugin_3.2.4_min.js');
    document.getElementsByTagName('head')[0].appendChild(ipSTP);

    ipSTP.addEventListener('load', loadFonts, false);
}

function loadFonts(){
  var ipFont = document.createElement( 'link' );
  ipFont.setAttribute( 'rel', 'stylesheet' );
  ipFont.setAttribute( 'type', 'text/css' );
  ipFont.setAttribute( 'href', 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;500;600;700&display=swap' );
  document.getElementsByTagName('head')[0].appendChild(ipFont);

    ipFont.addEventListener('load', init, false);
}

function init(){
  var css = document.createElement( 'link' );
  css.setAttribute( 'rel', 'stylesheet' );
  css.setAttribute( 'type', 'text/css' );
  css.setAttribute( 'href', 'style.css' );
  document.getElementsByTagName('head')[0].appendChild(css);

  elem('#btnExpand').addEventListener('click', expandedByClick)
  elem('#btnIcon').addEventListener('click', expandedByClick)

  //***** Start - Scroll creation and events registering
  createScroll(false, true);

  _tl = gsap.timeline();
  _tl2 = gsap.timeline();

  css.addEventListener('load', initAnimations, false);

  document.addEventListener('touchstart', touchHandler, true);
  document.addEventListener('touchmove', touchHandler, true);
  document.addEventListener('touchend', touchHandler, true);
  document.addEventListener('touchcancel', touchHandler, true);
}


function initAnimations(){
  console.time('animationTotalTime');
  console.time('TotalTime');

  _isiFullHeight = _isiText.scrollHeight;

  _tl
  .to('.banner',{duration:.25,opacity:1})

  .addLabel('F1')
  .to('#_5MinutesLockup',{duration:.5,opacity:0,ease:'power2.inOut'
    ,onStart:function(){
      console.timeLog('animationTotalTime','<= F1');
    }
  },'+=1.7')

  .addLabel('F2')
  .fromTo('.headline01',{x:-gsap.getProperty('#headline01','width')/2,opacity:0},{duration:.5,x:0,opacity:1,ease:'power2.Out',stagger:.25})
  .to('.F2',{duration:.5,opacity:0,ease:'power2.inOut'
    ,onStart:function(){
      console.timeLog('animationTotalTime','<= F2');
    }
  },'+=1.7')

  .addLabel('F3')
  .fromTo('.headline02',{x:-gsap.getProperty('#headline02','width')/2,opacity:0},{duration:.5,x:0,opacity:1,ease:'power2.Out',stagger:.25})
  .to('#graph',{duration:.75,opacity:1,ease:'power2.inOut'},'-=.25')
  .fromTo('#_5Minutes_Bar',{opacity:0,attr:{width:0}},{duration:.5,opacity:1,attr:{width:31},ease:'power2.inOut'},'-=.25')
  .fromTo('#_grayBar',{opacity:0,attr:{width:0}},{duration:1,opacity:1,attr:{width:880.3},ease:'power2.inOut'},"-=.25")
  .fromTo('#_5Minutes',{opacity:0},{duration:.75,opacity:1,ease:'power2.inOut'},'-=.25')
  .fromTo('#_hours_for_PERJETA_Herceptin_infusion',{opacity:0},{duration:.75,opacity:1,ease:'power2.inOut'},'-=.75')
  .to('#copyDisc',{duration:.75,opacity:1,ease:'power2.inOut'},'-=.5')
  .to('.F3',{duration:.75,opacity:0,ease:'power2.inOut'
    ,onStart:function(){
      console.timeLog('animationTotalTime','<= F3');
    }
  },'+=2')

  .addLabel('F4')
  .fromTo('.headline03',{x:-gsap.getProperty('#headline03','width')/2,opacity:0},{duration:.5,x:0,opacity:1,ease:'power2.Out',stagger:.25},'-=.25')
  .fromTo('.questions',{opacity:0},{duration:.9,opacity:1,ease:'power2.inOut'
    ,onStart:function(){
      console.timeLog('animationTotalTime','<= F4');
    }
  },'-=.25')

  .call(function(){console.timeEnd('animationTotalTime','<= End Frame')})
  .call(function(){
    console.timeEnd('TotalTime');
    toggleExpanded();
  },null,'+=1.8')

  ;
}

function expandedByClick () {
  _expandedFlag = true;
  toggleExpanded();
}

function toggleExpanded () {
  var isiHeight = gsap.getProperty('#isi', 'height');

  if (isiHeight < 603 && !gsap.isTweening('#isi')) {
    gsap.to('#isi',{duration: .8, height: 1835, top:81});
    gsap.to('#header_ISI',{duration: .8,top:0});
    gsap.to('.scroller',{duration: .8, height: 602});
    gsap.set(elem('#header_ISI #btnIcon'),{scaleY: -1});
    _isiText.scrollTop= 0; // Reset ISI scroll to init position
    elem('#btnExpand').innerHTML = 'Collapse';
    _tl.pause();

    TweenMax.delayedCall(1, function() {
      var isiHeight = gsap.getProperty('#isi', 'height');
      if (isiHeight != 1835 && !gsap.isTweening('#isi')) {
        gsap.to('#isi',{duration: .8, height: 1835, top:81});
        gsap.to('#header_ISI',{duration: .8,top:0});
        gsap.to('.scroller',{duration: .8, height: 602});
        _isiText.scrollTop= 0; // Reset ISI scroll to init position
        gsap.set(elem('#header_ISI #btnIcon'),{scaleY: -1});
        elem('#btnExpand').innerHTML = 'Collapse';
        _tl.pause();
      }
    });

  } else if (isiHeight == 1835 && !gsap.isTweening('#isi')) {
    gsap.to('#isi',{duration: .8, height: 602, top:1316});
    gsap.to('#header_ISI',{duration: .8,top:1200});
    gsap.to('.scroller',{duration: .8, height: 74});
    _isiText.scrollTop= 0; // Reset ISI scroll to init position
    gsap.set(['#header_ISI #btnIcon'],{scaleY: 1});

    if (_tl.totalDuration >= 15 ) {
        console.log('EF')
    }else{
        _tl.play();
    }

    _isiText.scrollTop = 0; // Reset ISI scroll to init position
    elem('#btnExpand').innerHTML = 'Expand';
  }
}

//***** Scrolling functions *****//
function createScroll(hasArrows,hasScroller){//***** Scrolling function - Creation(init)
    hasArrows = typeof hasArrows !== 'undefined' ? hasArrows: true;
    hasScroller = typeof hasScroller !== 'undefined' ? hasScroller: true;
    if (hasArrows){
        _arrowUp= document.createElement('div');
        _arrowUp.id = 'arrowUp';
        _arrowUp.className = 'retina';
        _isiControls.appendChild(_arrowUp);
    }

    if (hasScroller){
        _scrollerline= document.createElement('div');
        _scrollerline.className = hasArrows? 'isiLineWithArrows': 'isiLineNoArrows';
        _isiControls.appendChild(_scrollerline);

        _scroller = document.createElement('div');
        _scroller.className = 'scroller';
        _scrollerline.appendChild(_scroller);
    }

    if (hasArrows){
        _arrowDown= document.createElement('div');
        _arrowDown.id = 'arrowDown';
        _arrowDown.className = 'retina';
        _isiControls.appendChild(_arrowDown);
    }

//Listeners
    if (hasScroller){
        _isiText.addEventListener('scroll',moveScroller);
        _scroller.addEventListener('mousedown',startDrag);
        _scrollerline.addEventListener('click',seekTo);
        window.addEventListener('mousemove',scrollBarScroll);

    }

    if (hasArrows){
        _arrowUp.addEventListener('mousedown',scrollUp);
        _arrowDown.addEventListener('mousedown',scrollDown);
        _arrowUp.addEventListener('mouseup',scrollStop);
        _arrowDown.addEventListener('mouseup',scrollStop);
    }
    _isiText.addEventListener('wheel',scrollStop);
    window.addEventListener('mouseup',stopDrag);
}

function touchHandler(event) {
  console.log('hola');
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent({
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup'
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    // event.preventDefault();
}

function seekTo(evt){//***** Scrolling function - Seeks to an specific point
    var normalPosition = (evt.clientY - _isiControls.offsetParent.offsetTop - _scrollerline.offsetTop) / _scrollerline.clientHeight;
    _textScrollHeight = _isiText.scrollHeight - _container.offsetHeight;//gets the text height(offset) to scroll
    _isiText.scrollTop = normalPosition * _textScrollHeight;
    scrollStop();
}

function startDrag(evt) {//***** Scrolling function - Starts dragging when holds scroller button
    _scrollerline.removeEventListener('click',seekTo);
    _normalizedPosition = evt.clientY - _scrollerline.scrollTop;
    _contentPosition = _isiText.scrollTop;
    _scrollerBeingDragged = true;
    scrollStop();
}

function stopDrag(evt) {//***** Scrolling function - Stops dragging when releases scroller button
    if (typeof buttonPress != 'undefined' && buttonPress)
    scrollStop(buttonPress);
    _scrollerBeingDragged = false;
}

function scrollBarScroll(evt) {//***** Scrolling function - Moves text up/down
        evt.preventDefault();
    if (_scrollerBeingDragged === true) {
        var mouseDifferential = evt.clientY - _normalizedPosition;
        var scrollEquivalent = mouseDifferential * (_isiText.scrollHeight / _scrollerline.clientHeight);
        _isiText.scrollTop = _contentPosition + scrollEquivalent;
    }
}

function moveScroller(evt) {//***** Scrolling function - Moves scroller button up/down
    evt.preventDefault();
    _textScrollHeight = _isiText.scrollHeight - _container.offsetHeight;//gets the text height(offset) to scroll
    var remainOffsetHieght = _textScrollHeight - _isiText.scrollTop;//when scrolling,it gets the remaining height(top offset)
    var percentHeigh = 1 - remainOffsetHieght/_textScrollHeight;//transform to a percentage
    _scroller.style.top = Math.abs((_scrollerline.offsetHeight -_scroller.offsetHeight) * percentHeigh) + 'px';//To equivalent scroller line height
}

function scrollUp(){//***** Scrolling function - Sets text a step up
    console.log('up');
    scrollStop();
    buttonPress = setInterval(function(){_isiText.scrollTop-=scrollStep},100);
}

function scrollDown(){//***** Scrolling function - Sets text a step down
    console.log('down')
    scrollStop();
    buttonPress = setInterval(function(){_isiText.scrollTop+=scrollStep},100);
}

function scrollStop(){//***** Scrolling function - Clears buttons interval
    _tl.killTweensOf(_isiText);
}

function elem(id){return document.querySelector(id)};
