// Author: Kaden Griffith
// Descr : Rendering HTML and JS client-side source

const $ = require('kbrew_hypertxt').get,
  $qA = require('kbrew_hypertxt').queryAll,
  anime = require('animejs'),
  __internalClock = {
    fps: 10,
    fpsInterval: null,
    startTime: null,
    now: null,
    then: null,
    elapsed: null,
    frameCount: 0,
    currentFPS: 0,
    stop: false
  };

require('intersection-observer');
require('./$assets/fonts/raleway.css');
require('./$assets/favicons/favicons');
require('./css/Components.css');
require('./css/app.css');

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
  io: null,
  intersectionObserverFreq: 1,
  messages: [],
  isError: () => {
    return $$.messages.length === 0 ? false : true;
  }
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

function __update(fps = __internalClock.fps) {
  __internalClock.fpsInterval = 1000 / fps;
  __internalClock.then = Date.now();
  __internalClock.startTime = __internalClock.then;
  __requestFrame();
}

function __draw() {
  verifyOrientation();
  checkMessages();
  if($$.fullscreen !== isFullscreen()) $$.fullscreen = isFullscreen();
  if(isStandalone() && $$.fullscreen) {
    if($$.deviceOrientation === 'portrait') {
      $('.head-spacer').style.height = '100px';
      $('.nav').style.top = '-130px';
      $('.head-spacer', 1).style.height = $('.main') ? '1px' : '0';
      $('#messages').style.top = '80px'
      $('.hero-content').style.top = '114px';
    } else {
      $('#messages').style.top = '50px'
      $('.head-spacer').style.height = '50px';
      $('.nav').style.top = '-160px';
    }
  }
}


window.toggleMenu = state => {
  if(state) {
    $('.menu').style.display = 'flex';
    anime({
      targets: '.menu',
      duration: 250,
      translateY: isStandalone() && $$.fullscreen ? 40 : 0,
      easing: 'easeInSine',
      run: anim => {
        if(anim.progress === 100) {
          $('.nav').style.display = 'none';
          $('.wrapper').style.display = 'none';
        }
      },
      complete: anim => {
        $('.menuCue-off').style.display = 'block';
      }
    });
  } else {
    $('.nav').style.display = 'block';
    $('.wrapper').style.display = 'block';
    anime({
      targets: '.menu',
      translateY: -1 * $$.deviceHeight,
      duration: 130,
      easing: 'easeInSine',
      complete: anim => {
        $('.menuCue-off').style.display = 'none';
        $('.menu').style.display = 'none';
      }
    });
  }
};

window.toggleLoading = (state, delay = 250) => {
  if(state) {
    if($('.loading').style.display === 'none') {
      $('.loading').style.display = 'block';
    }
  } else if(!state) {
    setTimeout(() => $('.loading').style.display = 'none', delay);
  }
};

window.runLazyLoadingStartup = () => {
  $$.io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        if(/(anim-left|anim-right)/.test(entry.target.classList.value)) {
          anime({
            targets: entry.target,
            easing: 'easeInSine',
            duration: 1000,
            opacity: 0,
            direction: 'reverse',
            translateX: /(anim-left)/.test(entry.target.classList.value) ? -900 : 900,
            blur: 0
          });
        } else if(/anim-grow/.test(entry.target.classList.value)) {
          anime({
            targets: entry.target,
            elasticity: 4000,
            easing: 'easeInSine',
            opacity: 1,
            duration: 1000,
            scale: 1,
            blur: 0
          });
        }
        entry.target.classList.add('visible');
        $$.io.unobserve(entry.target);
      }
    });
  });

  $$.io.POLL_INTERVAL = $$.intersectionObserverFreq;

  $qA('.lazy').forEach(lazyBackground => {
    if(!/visible/.test(lazyBackground.classList)) {
      $$.io.observe(lazyBackground);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  runLazyLoadingStartup();
  __update();

  toggleMenu(false);
  import( /* webpackChunkName: "animate" */ './animation').then(animations => {
    animations.run();
    toggleLoading(false, 350);
  });

  if(!navigator.onLine) {
    displayMessage(`w:No network connection detected.<br>Please connect to the internet to access full functionality.`);
  }

  // Request functionality
  import( /* webpackChunkName: "app" */ './app-full').then(fullApp => {
    if(navigator.onLine) require('https://use.fontawesome.com/releases/v5.1.0/css/all.css');
    fullApp.load();
  });
});

function checkMessages() {
  let m = $$.messages[0] ? $$.messages[0].msg : false;
  if($('#messages').innerHTML === '' && m) {
    $('#messages').innerHTML = m.substring(2);
    $('#messages').style.color = m.charAt(0) === 'e' ? '#f4f4f4' : '#263238';
    $('#messages').style.backgroundColor = m.charAt(0) === 'e' ? '#ec644b' : '#26c281';
    $('#messages').style.backgroundColor = m.charAt(0) === 'w' ? '#eccc68' : $('#messages').style.backgroundColor;
    $('#messages').style.display = 'block';
    $$.messageTimeout = setTimeout(() => {
      if($('#messages').style.display === 'block') clearMessage();
    }, 6000);
  }
}

$('#messages').addEventListener('click', () => {
  clearTimeout($$.messageTimeout);
  clearMessage();
});

window.displayMessage = msg => {
  // Messages prefixed e: are errors, s: success
  $$.messages.push({
    msg
  });
}

window.clearMessage = () => {
  $$.messages.shift();
  $('#messages').innerHTML = '';
  $('#messages').style.display = 'none';
};

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