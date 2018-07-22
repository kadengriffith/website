// Author: Kaden Griffith
// Descr : Rendering HTML and JS client-side source

const $ = require('kbrew_hypertxt')().get,
  $qA = require('kbrew_hypertxt')().queryAll,
  __internalClock = {
    fps: 30,
    fpsInterval: null,
    startTime: null,
    now: null,
    then: null,
    elapsed: null,
    frameCount: 0,
    currentFPS: 0,
    stop: false
  },
  anime = require('animejs');

require('intersection-observer');
require('./$assets/fonts/raleway.css');
require('./$assets/favicons/favicons');
require('./css/Components.css');
require('./css/app.css');

// Register the service worker wherever it's supported
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).catch(err => console.log('service-worker.js is not registered in this domain.'));
}

// Device Information
window.$$ = {
  deviceWidth: window.screen.width,
  deviceHeight: window.screen.height,
  deviceOrientation: null,
  installPrompt: null,
  fullscreen: null,
  intersectionObserverFreq: 40,
  app_debug: false,
  preventScrolling: false
};

function __requestFrame() {
  if(__internalClock.stop) return;
  window.requestAnimationFrame(__requestFrame);
  __internalClock.now = Date.now();
  __internalClock.elapsed = __internalClock.now - __internalClock.then;
  if(__internalClock.elapsed > __internalClock.fpsInterval) {
    __internalClock.then = __internalClock.now - (__internalClock.elapsed % __internalClock.fpsInterval);
    let sinceStart = __internalClock.now - __internalClock.startTime;
    __internalClock.currentFPS = Math.round(1000 / (sinceStart / ++__internalClock.frameCount) * 100) / 100;
    __draw();
  }
}

// Screen Update at specified framerate
function __update(fps = __internalClock.fps) {
  __internalClock.fpsInterval = 1000 / fps;
  __internalClock.then = Date.now();
  __internalClock.startTime = __internalClock.then;
  __requestFrame();
}

function __draw() {
  verifyOrientation();
  $$.fullscreen = isFullscreen();

  // This is the statusbar fix using 30 fps update
  if(isStandalone() && $$.fullscreen) {
    if($$.deviceOrientation === 'portrait') {
      $('.head-spacer').style.height = '90px';
      $('.nav').style.top = '-120px';
    } else {
      $('.head-spacer').style.height = '50px';
      $('.nav').style.top = '-160px';
    }
    $('#popover').style.top = '14%';
  }

  if($$.app_debug) {
    $.clear($('.footer-link-area'));
    $.add($('.footer-link-area'), `<div>fps: ${__internalClock.currentFPS}</div>`);
    for(let prop in $$) {
      $.add($('.footer-link-area'), `<div>${prop}: ${$$[prop]}</div>`);
    }
    $.add($('.footer-link-area'), `<div>windowWidth: ${window.innerWidth}</div><div>windowHeight: ${window.innerHeight}</div>`);
  }
}

window.toggleMenu = state => {
  if(state) {
    anime({
      targets: '.menu',
      translateY: isStandalone() && $$.fullscreen ? 40 : 0,
      easing: 'easeOutSine',
      duration: 400,
      run: anim => {
        $('.menu').style.display = 'block';
        $('.nav').style.display = 'none';
        $('.wrapper').style.display = 'none';
      },
      complete: anim => {
        setTimeout(() => $('.menuCue-off').style.display = 'block', 200);
      }
    });
  } else {
    $('.nav').style.display = 'block';
    $('.wrapper').style.display = 'block';
    anime({
      targets: '.menu',
      translateY: -1 * $$.deviceHeight,
      duration: 300,
      easing: 'easeInOutSine',
      complete: anim => {
        $('.menuCue-off').style.display = 'none';
        $('.menu').style.display = 'none';
      }
    });
  }
};

window.toggleLoading = (state, delay = 40) => {
  if(state) {
    if($('.loading').style.display === 'none') {
      $('.loading').style.display = 'block';
    }
  } else if(!state) {
    setTimeout(() => $('.loading').style.display = 'none', delay);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images with classname .lazy-background
  let io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  });

  io.POLL_INTERVAL = $$.intersectionObserverFreq;

  $qA('.lazy-background').forEach(lazyBackground => {
    io.observe(lazyBackground);
  });

  __update();

  toggleMenu(false);
  toggleLoading(false, 200);

  // Request functionality
  import( /* webpackChunkName: "app-full" */ './app-full').then(fullApp => {
    fullApp.load();
  });
});

function verifyOrientation() {
  $$.deviceOrientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
}

function isStandalone() {
  return(window.matchMedia('(display-mode: standalone)').matches || 'standalone' in navigator);
}

function isFullscreen() {
  if($$.deviceOrientation === 'portrait') {
    return $$.deviceHeight == window.innerHeight && $$.deviceWidth == window.innerWidth;
  } else if($$.deviceOrientation === 'landscape') {
    return $$.deviceHeight == window.innerWidth && $$.deviceWidth == window.innerHeight;
  }
}