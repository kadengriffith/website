// Author: Kaden Griffith
// Descr : Rendering HTML and JS client-side source

const $ = {
    get: require('kbrew_hypertxt').get,
    query: require('kbrew_hypertxt').query,
    queryAll: require('kbrew_hypertxt').queryAll,
  },
  fb = require('./objects/Client'),
  Updator = require('./objects/Updator'),
  u = require('./objects/Util'),
  anime = require('animejs');

require('intersection-observer');
require('./$assets/favicons/favicons');
require('https://use.fontawesome.com/releases/v5.1.0/css/all.css');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).catch(err => console.warn('service-worker.js is not registered in this domain.'));
}

// Device Information
window.$$ = {
  io: null,
  intersectionObserverFreq: 40,
  messages: [],
  isError: () => {
    return $$.messages.length === 0 ? false : true;
  }
};

new Updator(() => {
  fixNav();

  checkMessages();
}).start();

function checkMessages() {
  let m = $$.messages[0] ? $$.messages[0].msg : false;
  if ($.get('#messages').innerHTML === '' && m) {
    $.get('#messages').innerHTML = m.substring(2);
    $.get('#messages').style.backgroundColor = m.charAt(0) === 'e' ? '#ec644b' : '#26c281';
    $.get('#messages').style.backgroundColor = m.charAt(0) === 'w' ? '#eccc68' : $.get('#messages').style.backgroundColor;
    $.get('#messages').style.display = 'block';
    $$.messageTimeout = setTimeout(() => {
      if ($.get('#messages').style.display === 'block') clearMessage();
    }, 6000);
  }
}

function checkNav() {
  if (isSticky()) {
    return false;
  } else if (window.innerWidth > 900) {
    return false;
  } else if (window.pageYOffset < $.get('#nav-links').offsetTop) {
    return false;
  } else if (window.pageYOffset <= $.get('#nav-logo').scrollHeight) {
    return false;
  } else {
    return true;
  }
}

function isSticky() {
  return /sticky/gi.test($.get('#nav-links').classList);
}

function fixNav() {
  if (u.isStandalone() && u.isFullscreen() && u.verifyOrientation() === 'portrait') {
    // Portrait View
    // Downloaded fullscreen app
    $.get('#messages').style.setProperty('top', '128px');

    if ($.get('#profile')) $.get('#profile').style.setProperty('top', '50px');

    $.get('#nav').style.setProperty('padding-top', '36px');
    $.get('#nav').style.setProperty('top', 0);

    $.get('#nav-links').style.setProperty('padding-top', 0);
    $.get('#nav-links').style.setProperty('width', '100vw');

    if (checkNav()) {
      // Pin nav-links
      $.get('#nav-links').classList.add("sticky");
    } else if (isSticky() && window.pageYOffset <= $.get('#nav-logo').scrollHeight || window.innerWidth > 900) {
      $.get('#nav-links').classList.remove("sticky");
    }

    if (isSticky() && $.get('#nav-links').style.paddingTop != '40px') {
      $.get('#nav-links').style.setProperty('padding-top', '40px');
      $.get('#messages').style.setProperty('top', '80px');
    }
  } else if (u.isStandalone() && u.isFullscreen() && u.verifyOrientation() === 'landscape') {
    // Landscape View
    // Downloaded fullscreen app
    $.get('#messages').style.setProperty('top', '100px');

    if ($.get('#profile')) $.get('#profile').style.setProperty('top', '0.5em');

    $.get('#nav').style.setProperty('padding-top', 0);
    $.get('#nav').style.setProperty('top', 0);

    $.get('#nav-links').style.setProperty('width', '100vw');
    $.get('#nav-links').style.setProperty('padding-top', 0);

    if (checkNav()) {
      // Pin nav-links
      $.get('#nav-links').classList.add("sticky");
    } else if (isSticky() && window.pageYOffset <= $.get('#nav-logo').scrollHeight || window.innerWidth > 900) {
      $.get('#nav-links').classList.remove("sticky");
    }

    if (isSticky() && $.get('#messages').style.top != '42px') {
      $.get('#messages').style.setProperty('top', '42px');
    }
  }
}

$.get('#messages').addEventListener('click', () => {
  clearTimeout($$.messageTimeout);
  clearMessage();
});

window.displayMessage = msg => {
  // Messages prefixed e: are errors, s: success, w: warning
  $$.messages.push({
    msg
  });
};

window.clearMessage = () => {
  $$.messages.shift();
  $.get('#messages').innerHTML = '';
  $.get('#messages').style.display = 'none';
};

window.toggleLoading = (state, message = 'Loading...', delay = 250) => {
  if (state) {
    if ($.get('.loading').style.display === 'none') {
      $.get('.loading-text').innerHTML = message;
      $.get('.loading').style.display = 'block';
    }
  } else if (!state) {
    runLazyLoadingStartup();
    setTimeout(() => $.get('.loading').style.display = 'none', delay);
  }
};

window.runLazyLoadingStartup = () => {
  $$.io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (/(anim-left|anim-right)/.test(entry.target.classList.value)) {
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
        } else if (/anim-grow/.test(entry.target.classList.value)) {
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

  $.queryAll('.lazy').forEach(lazyBackground => {
    if (!/visible/.test(lazyBackground.classList)) {
      $$.io.observe(lazyBackground);
    }
  });
};

function elementIndex(el, parent, index) {
  // Create array of the parent of the target's children
  let ref = [].slice.call(parent.children);
  // Report index of the target within the given list
  return ref.indexOf($.get(el, index));
}

window.registerInputLabels = () => {
  if ($.queryAll('.input')) {
    $.queryAll('.input').forEach((el, index) => {
      if ($.get('.word-label', index)) {
        // Target associated word-label class
        let elIndex = elementIndex('.word-label', el.parentNode, index),
          elParentChildren = el.parentNode.childNodes,
          target = elParentChildren[elIndex];

        if (el.value.length === 0) {
          // Input is not empty, show the label on start
          target.style.opacity = '0';
        } else {
          target.style.opacity = '1';
        }

        // If valid green, otherwise red
        if (el.checkValidity()) {
          target.style.borderLeftColor = '#26c281';
        } else {
          target.style.borderLeftColor = '#ec644b';
        }

        el.addEventListener('input', () => {
          // Do not repeat visibility toggle
          function setAlpha(t) {
            if (el.value.length === 0) {
              // Input is empty, hide the label
              t.style.opacity = '0';
            } else {
              let toggleOn = t.style.opacity === '0' || t.style.opacity.length === 0;
              if (toggleOn) t.style.opacity = '1';
            }
          }

          // If valid green, otherwise red
          if (el.checkValidity()) {
            target.style.borderLeft = '1px solid #f4f4f4';
            target.style.borderLeftColor = '#26c281';
          } else {
            target.style.borderLeft = '1px solid #f4f4f4';
            target.style.borderLeftColor = '#ec644b';
          }

          setAlpha(target);
        });
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  registerInputLabels();

  if (!navigator.onLine) {
    displayMessage(`w:No network connection detected.<br>Please connect to the internet to access full functionality.`);
  }

  // Request functionality
  if (/install/.test(location.href)) {
    import( /* webpackChunkName: "install" */ './src/install').then(fullApp => {
      fullApp.load();
    });
  } else if (/browse/.test(location.href)) {
    import( /* webpackChunkName: "browse" */ './src/browse').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/pricing/.test(location.href)) {
    import( /* webpackChunkName: "pricing" */ './src/pricing').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/shop/.test(location.href)) {
    import( /* webpackChunkName: "shop" */ './src/shop').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/privacy/.test(location.href)) {
    import( /* webpackChunkName: "privacy" */ './src/privacy').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/terms/.test(location.href)) {
    import( /* webpackChunkName: "terms" */ './src/terms').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/contact/.test(location.href)) {
    import( /* webpackChunkName: "contact" */ './src/contact').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/profile/.test(location.href)) {
    import( /* webpackChunkName: "profile" */ './src/profile').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/add/.test(location.href)) {
    import( /* webpackChunkName: "add-project" */ './src/add').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/admin/.test(location.href)) {
    import( /* webpackChunkName: "admin" */ './src/admin').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/signup/.test(location.href)) {
    import( /* webpackChunkName: "signup" */ './src/signup').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/login/.test(location.href)) {
    import( /* webpackChunkName: "login" */ './src/login').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/auth/.test(location.href)) {
    import( /* webpackChunkName: "auth" */ './src/auth').then(fullApp => {
      fullApp.load(fb);
    });
  } else if (/files/.test(location.href)) {
    import( /* webpackChunkName: "files" */ './src/files').then(fullApp => {
      fullApp.load(fb);
      if (u.isMobile()) {
        displayMessage('w:Accessing or uploading files on a mobile device may result in unexpected behavior.');
      }
    });
  } else if (/pay/.test(location.href)) {
    import( /* webpackChunkName: "pay" */ './src/pay').then(fullApp => {
      fullApp.load(fb);
    });
  } else {
    // Default
    import( /* webpackChunkName: "index" */ './src/index').then(fullApp => {
      fullApp.load(fb);
    });
  }

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    showInstallButton();
  });

  function showInstallButton() {
    if (!$.get('#install')) return false;
    $.get('#install').style.display = 'grid';
    $.get('#install-to-device').addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      hideInstallButton();
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          hideInstallButton();
        }
        deferredPrompt = null;
      });
    });
  }

  window.hideInstallButton = () => {
    $.get('#install').style.display = 'none';
    return true;
  };
});