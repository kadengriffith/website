// Author: Kaden Griffith
// Descr : Rendering HTML and JS client-side source

const $ = require('kbrew_hypertxt').get,
  $q = require('kbrew_hypertxt').query,
  $qA = require('kbrew_hypertxt').queryAll,
  u = require('./objects/Util'),
  anime = require('animejs'),
  __internalClock = {
    fps: 24,
    fpsInterval: null,
    startTime: null,
    now: null,
    then: null,
    elapsed: null,
    frameCount: 0,
    currentFPS: 0,
    stop: false
  };

require('./css/app.scss');
require('intersection-observer');
require('./$assets/fonts/raleway.css');
require('./$assets/favicons/favicons');
require('https://use.fontawesome.com/releases/v5.1.0/css/all.css');

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).catch(err => console.warn('service-worker.js is not registered in this domain.'));
}

// Device Information
window.$$ = {
  io: null,
  intersectionObserverFreq: 20,
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
  checkMessages();
  if(u.isStandalone() && u.isFullscreen() && u.verifyOrientation() === 'portrait') {
    $('.nav').style.top = '-130px';
    $('#root').style.top = '80px';
    $('#messages').style.top = '80px';
  } else if(u.isStandalone() && u.isFullscreen() && u.verifyOrientation() === 'landscape') {
    $('.nav').style.top = '-160px';
    $('#root').style.top = '0px';
    $('#messages').style.top = '50px';
  }
}

window.toggleMenu = state => {
  if(state) {
    $('.menu').style.display = 'flex';
    anime({
      targets: '.menu',
      duration: 350,
      translateY: u.isStandalone() && u.isFullscreen() && u.verifyOrientation() === 'portrait' ? 30 : 0,
      easing: 'easeInSine'
    });
    setTimeout(() => {
      $('.wrapper').style.display = 'none';
    }, 750);
  } else {
    $('.wrapper').style.display = 'block';
    anime({
      targets: '.menu',
      translateY: -1 * window.screen.height,
      duration: 100,
      easing: 'easeInSine',
      complete: anim => {
        $('.menu').style.display = 'none';
      }
    });
  }
};

toggleMenu(false);

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
            duration: 800,
            direction: 'reverse',
            delay: 80,
            blur: 0,
            translateX: /(anim-left)/.test(entry.target.classList.value) ? -900 : 900,
            begin: () => {
              anime({
                targets: entry.target,
                easing: 'easeInSine',
                duration: 900,
                opacity: 1
              });
            }
          });
        } else if(/anim-grow/.test(entry.target.classList.value)) {
          anime({
            targets: entry.target,
            easing: 'easeInSine',
            duration: 1000,
            scale: 1,
            opacity: 1,
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

  import( /* webpackChunkName: "animate" */ './animation').then(animations => {
    animations.run();

    toggleLoading(false, 425);
  });

  if(!navigator.onLine) {
    displayMessage(`w:No network connection detected.<br>Please connect to the internet to access full functionality.`);
  }

  // Request functionality
  import( /* webpackChunkName: "app" */ './app-full').then(fullApp => {
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
  // Messages prefixed e: are errors, s: success, w: warning
  $$.messages.push({
    msg
  });
}

window.clearMessage = () => {
  $$.messages.shift();
  $('#messages').innerHTML = '';
  $('#messages').style.display = 'none';
};