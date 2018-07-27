// Author: Kaden Griffith
// Descr : Window Functions

const $ = require('kbrew_hypertxt'),
  Pages = require('./html/Pages'),
  anime = require('animejs'),
  firebase = require('firebase/app');

require('https://use.fontawesome.com/releases/v5.1.0/css/all.css');
require('https://www.paypalobjects.com/api/checkout.js');
require('firebase/database');
require('firebase/auth');

module.exports = {
  load: () => {
    $.get('#messages').addEventListener('click', () => {
      clearTimeout($$.messageTimeout);
      clearMessage();
    });

    firebase.initializeApp({
      apiKey: "AIzaSyAv8iyQlhk0IJR5n65vq2g4lUkMk8e-D9A",
      authDomain: "bytewave-wy.firebaseapp.com",
      databaseURL: "https://bytewave-wy.firebaseio.com",
      projectId: "bytewave-wy",
      storageBucket: "bytewave-wy.appspot.com",
      messagingSenderId: "710300398584"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        toggleSignIn(false);
        toggleViewAccount(true);
      } else {
        toggleSignIn(true);
        toggleViewAccount(false);
      }
    });

    function animateStartup() {
      anime({
        targets: '.background',
        points: [{
            value: '1920,1080 1596.1,1080 0,1080 0,0 464,133 960,691'
          },
          {
            value: '1655,1080 757,1080 0,1080 0,683 395,883 973,856'
          },
          {
            value: '1655,1130 727,1154 0,1080 0,946 346,1064 861,1130'
          },
          {
            value: '1655,1130 727,1154 -43,1094 -13,1135 340,1201 861,1130'
          }
        ],
        easing: 'easeInOutBack',
        duration: 1500,
        loop: false
      });

      anime({
        targets: '.hero-logo',
        easing: 'easeInOutBack',
        translateX: -1 * window.innerWidth * 2,
        elasticity: 200,
        opacity: 0,
        duration: 1200,
        direction: 'reverse',
        delay: 200,
        rotate: '4turn',
        complete: amin => {
          anime({
            targets: '.hero-text',
            duration: 600,
            opacity: 1,
            easing: 'easeInOutBack',
          });

          anime({
            targets: '.hero-button',
            duration: 900,
            opacity: 1,
            easing: 'easeInOutBack',
          });

          spinLogo();
        }
      });
    }

    animateStartup();

    function spinLogo() {
      anime({
        targets: '.hero-logo',
        rotate: '4turn',
        delay: 5000,
        duration: 5000,
        loop: true,
        easing: 'easeInOutBack',
        direction: 'alternate',
        run: anim => {
          runAnimations(anim);
        }
      });
    }

    function runAnimations(a) {
      function typeWord() {
        if(!$.get('.hero-text')) return;
        let words = ['Ride', 'Catch', 'See', 'Feel', 'Become', 'Join', 'Share'],
          index = Math.floor(Math.random() * words.length),
          r = $.get('.hero-text').innerHTML;

        if(new RegExp(words[index]).test(r)) {
          if(index === 0) {
            index++;
          } else {
            index--;
          }
        }

        let a = Array.from(words[index]),
          i = a.length - 1;

        $.get('.hero-text').innerHTML = r.replace(/(Ride|Catch|See|Feel|Become|Join|Share)/, '');;

        function Loop() {
          setTimeout(() => {
            $.get('.hero-text').innerHTML = `${a[i]}${$.get('.hero-text').innerHTML}`;
            i--;
            if(i >= 0) Loop();
          }, 100)
        }

        Loop();
      }

      function Loop(what) {
        setTimeout(() => {
          $.get('.hero-text').innerHTML = `${a[i]}${$.get('.hero-text').innerHTML}`;
          i--;
          if(i >= 0) Loop();
        }, 100)
      }

      function moveWhales() {
        if(!$.queryAll('.whale')[0]) return;
        anime({
          targets: $.queryAll('.whale')[0],
          rotate: '2turn',
          easing: 'easeInSine',
          elasticity: 6000,
          duration: 4000
        });

        anime({
          targets: $.queryAll('.whale')[1],
          rotate: '2turn',
          easing: 'easeInSine',
          delay: 75,
          elasticity: 6000,
          duration: 4000
        });

        anime({
          targets: $.queryAll('.whale')[2],
          rotate: '2turn',
          easing: 'easeInSine',
          delay: 150,
          elasticity: 6000,
          duration: 4000
        });
      }

      if(a.progress === 100) {
        moveWhales();
        typeWord();
      }
    }

    window.showPage = whichPage => {
      function end() {
        runLazyLoadingStartup();
        toggleLoading(false);
      }

      toggleMenu(false);
      toggleLoading(true);
      $.clear($.get('#root'));
      if(/learn/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Learn';
        $.add($.get('#root'), Pages.index());
        animateStartup();
        end();
      } else if(/signin/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Sign In';
        $.add($.get('#root'), Pages.signin());
        end();
      } else if(/register/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Register';
        $.add($.get('#root'), Pages.register());
        end();
      } else if(/profile/.test(whichPage)) {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
          $.get('#title').innerHTML = `Byte Wave  |  ${user.val().first_name}'s Account`;
          $.add($.get('#root'), Pages.account(user.val()));
          end();
        });
      }
    };

    function toggleSignIn(state) {
      $.queryAll('.sign-in').forEach(link => {
        link.style.display = state ? 'block' : 'none';
      });
    }

    function toggleViewAccount(state) {
      $.queryAll('.profile').forEach(link => {
        link.style.display = state ? 'block' : 'none';
      });
    }

    window.signin = () => {
      toggleLoading(true);
      let email = $.get('#emanresu').value,
        password = $.get('#drowssap').value;

      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        showPage('profile');
      }).catch(err => {
        if(err) {
          toggleLoading(false);
          displayMessage(`Error: ${err.message}`);
        }
      });
    };

    window.logout = () => {
      firebase.auth().signOut().then(() => {
        window.location.reload();
      });
    };

    window.register = () => {
      let user = {
          Account_Code: $.get('#accountCode').value,
          First_Name: $.get('#first').value,
          Last_Name: $.get('#last').value,
          Email: $.get('#email').value,
          Password: $.get('#password').value,
          Repeat_Password: $.get('#password-c').value
        },
        errorMessage = 'Failed to register user.';

      function validatedEmail(email) {
        let r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !r.test(String(email).toLowerCase());
      }

      function validatedData() {
        for(let prop in user) {
          if(!user[prop].length > 0) return displayMessage(errorMessage + `<br>Reason:<br>${prop.replace('_', ' ')} is empty.`);
        }
        if(validatedEmail(user.Email)) {
          displayMessage(errorMessage + `<br>Reason:<br>Email is not valid.`);
        } else if(user.Password !== user.Repeat_Password) {
          displayMessage(errorMessage + `<br>Reason:<br>Passwords do not match.`);
        } else if(!user.Password.length >= 8) {
          displayMessage(errorMessage + `<br>Reason:<br>Password is too short.`);
        } else if(!/[a-z]/.test(user.Password)) {
          displayMessage(errorMessage + `<br>Reason:<br>Password does not contain lower-case letter(s).`);
        } else if(!/[A-Z]/.test(user.Password)) {
          displayMessage(errorMessage + `<br>Reason:<br>Password does not contain upper-case letter(s).`);
        }
        return !$$.isError();
      }

      if(validatedData()) {
        toggleLoading(true);
        firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).then(() => {
          delete user['Password'];
          delete user['Repeat_Password'];
          let d = {
            account_id: firebase.auth().currentUser.uid
          };
          for(let prop in user) {
            let p = prop.toLowerCase();
            d[p] = user[prop];
          }
          firebase.database().ref('users/' + d.account_id).set(d);
          showPage('profile');
        }).catch(err => {
          toggleLoading(false);
          displayMessage(`We're currently unable to create your account.<br>Please try again later.<br>Error Code: ${err.code}`);
        });
      }
    };

    window.__$ = () => {
      return $.getElement({
        id: 'paypal-container'
      });
      let amt = Number($.get('.amount-text').innerHTML);
      paypal.Button.render({
        env: 'production',
        style: {
          layout: 'vertical',
          size: 'medium',
          shape: 'rect',
          color: 'silver'
        },
        funding: {
          allowed: [paypal.FUNDING.CARD, paypal.FUNDING.CREDIT]
        },
        client: {
          sandbox: `ASrkKYmRH3eD027wqYDAbaHwVwwKrFU3_M2kyLB2oeHcdyLgW7_s30YQaMQA7DniO9WghPsSrPegvXKu`,
          production: `ARzt2LSntzEGwv_djVtWEeGNv8L7gOEb4fh1QzjdLZywIcDZ3HMUMLRPJW1CWuyHo5Ko5_qJDukJZBW1`
        },
        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [{
                amount: {
                  total: amt,
                  currency: 'USD'
                },
                description: 'Coffee Money'
              }]
            }
          });
        },
        onAuthorize: (data, actions) => {
          return actions.payment.execute().then(() => {
            hidePopover();
            displayPopover('Thank you for being awesome!');
          });
        }
      }, '#paypal-container');
    };

    window.download = () => {
      $$.installPrompt.prompt();
    };
  }
};