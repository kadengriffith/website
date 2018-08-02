// Author: Kaden Griffith
// Descr : Window Functions

const $ = require('kbrew_hypertxt'),
  Pages = require('./html/Pages'),
  firebase = require('firebase/app');

require('firebase/database');
require('firebase/auth');

module.exports = {
  load: () => {
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
        toggleSignedIn(true);
        if(/(profile)/.test(getParameterByName('p'))) {
          showPage(getParameterByName('p'));
        }
        if(!user.emailVerified) {
          firebase.database().ref(`users/${user.uid}`).once('value').then(account => {
            if(!account.val().verification_sent) {
              user.sendEmailVerification().then(() => {
                firebase.database().ref(`users/${user.uid}`).update({
                  verification_sent: true
                }).then(() => {
                  displayMessage(`w:Please check ${user.email} for a link to verify your account.`);
                }).catch(err => {
                  displayMessage(`e:Error ${err.message}`);
                });
              }).catch(err => {
                displayMessage(`e:Error ${err.message}`);
              });
            }
          }).catch(err => {
            displayMessage(`e:Error ${err.message}`);
          });
        }
      }
    });

    function toggleSignedIn(state) {
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
        firebase.database().ref(`users/${user.key}`).update({
          times_visited: user.val().times_visited ? user.val().times_visited + 1 : 1
        }).then(() => {
          for(let el of $.queryAll('.signedinstate')) {
            $.clear(el);
            if(user.val().administrator) {
              $.add(el, Pages.navMenuLink({
                preset: 'admin'
              }));
            } else if(state) {
              $.add(el, Pages.navMenuLink({
                preset: 'profile'
              }));
            } else {
              $.add(el, Pages.navMenuLink({
                preset: 'signin'
              }));
            }
          }
        }).catch(err => {
          displayMessage(`e:Error: ${err.message}`);
        });
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
          displayMessage(`e:Error: ${err.message}`);
        }
      });
    };

    window.logout = () => {
      firebase.auth().signOut().then(() => {
        showPage('learn');
      });
    };

    window.showPage = (whichPage, options) => {
      toggleLoading(true);

      function end() {
        runLazyLoadingStartup();
        toggleLoading(false);
      }

      toggleMenu(false);

      if(firebase.auth().currentUser && !firebase.auth().currentUser.emailVerified) {
        whichPage = /learn/.test(whichPage) ? whichPage : '';
        displayMessage(`w:Please check ${firebase.auth().currentUser.email} for a link to verify your account.`);
      } else {
        $.query('body').style.backgroundColor = '#f4f4f4';
        $.clear($.get('.wrapper'));
      }

      if(!navigator.onLine) {
        displayMessage(`w:No network connection detected.<br>Please connect to the internet to access full functionality.`);
        whichPage = !/(support|privacy-policy)/.test(whichPage) ? 'learn' : whichPage;
      }

      if(/learn/.test(whichPage)) {
        if(getParameterByName('p')) {
          window.location = '/';
        } else {
          window.location.reload();
        }
      } else if(/signin/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Sign In';
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('.wrapper'), Pages.signin());
        end();
      } else if(/register/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Register';
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('.wrapper'), Pages.register());
        end();
      } else if(/profile/.test(whichPage)) {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
          if(user.val().administrator) {
            $.get('#title').innerHTML = `Admin Panel`;
            firebase.database().ref(`active_accounts`).once('value').then(accounts => {
              $.add($.get('.wrapper'), Pages.admin(firebase, accounts));
              end();
            }).catch(err => {
              displayMessage(`e:Error: ${err.message}`);
              end();
            });
          } else {
            $.get('#title').innerHTML = user.val().times_visited > 5 ? `Welcome back, ${user.val().first_name}` : `Welcome, ${user.val().first_name}`;
            $.add($.get('.wrapper'), Pages.account(user.val()));
          }
          end();
        }).catch(err => {
          displayMessage(`e:Error: ${err.message}`);
          end();
        });
      } else if(/account_query/.test(whichPage)) {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(admin => {
          if(admin.val().administrator) {
            firebase.database().ref(`users`).once('value').then(users => {
              let _user;
              users.forEach(user => {
                if(user.val().account_code === options) {
                  _user = user.val();
                }
              });
              if(_user) {
                $.get('#title').innerHTML = `${_user.first_name}'s Account`;
                $.add($.get('.wrapper'), Pages.account(_user, true));
              } else {
                firebase.database().ref(`active_accounts`).once('value').then(accounts => {
                  $.get('#title').innerHTML = `Admin Panel`;
                  $.add($.get('.wrapper'), Pages.admin(firebase, accounts));
                  displayMessage(`w:User not found.`);
                  end();
                }).catch(err => {
                  displayMessage(`e:Error: ${err.message}`);
                  end();
                });
              }
              end();
            }).catch(err => {
              displayMessage(`e:Error: ${err.message}`);
              end();
            });
          } else {
            displayMessage(`e:Error: Access denied.`);
            end();
          }
        }).catch(err => {
          displayMessage(`e:Error: ${err.message}`);
          end();
        });
      } else if(/pay/.test(whichPage)) {
        $.query('body').style.backgroundColor = '#368ca3';
        $.get('#title').innerHTML = `Byte Wave  |  Subscribe`;
        let name_to_search = options;
        name_to_search = name_to_search.replace(/\|/g, '');
        name_to_search = name_to_search.replace(/ /g, '');
        console.log(name_to_search);
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
          firebase.database().ref(`users/${firebase.auth().currentUser.uid}/projects/${name_to_search}`).once('value').then(project => {
            firebase.database().ref(`paypal_buttons/${project.val().plan}`).once('value').then(payButton => {
              $.add($.get('.wrapper'), Pages.pay(user.val(), project.val()) + $.getElement({
                class: 'lazy anim-grow pay-container',
                contains: payButton.val()
              }));
              end();
            });
          });
        });
      } else if(/(support|account-services)/.test(whichPage)) {
        $.get('#title').innerHTML = `Byte Wave  |  Support`;
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('.wrapper'), Pages.support());
        end();
      } else if(/privacy-policy/.test(whichPage)) {
        $.get('#title').innerHTML = `Privacy Policy | 2018`;
        $.add($.get('.wrapper'), Pages.privacyPolicy());
        end();
      } else {
        end();
      }
    };

    function getParameterByName(name, url) {
      if(!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if(!results) return null;
      if(!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    if(/(signin|register|support|privacy-policy)/.test(getParameterByName('p'))) {
      showPage(getParameterByName('p'));
    }

    window.register = () => {
      // Request registration API
      import( /* webpackChunkName: "registration" */ './register').then(register => {
        register.createUser(firebase);
      });
    };

    window.activateAccount = () => {
      let account_code = $.get('#accountCode').value;
      if(account_code.length < 5) {
        displayMessage(`e:Error: Account code most be at least 5 digits.`);
      } else {
        firebase.database().ref(`active_accounts`).once('value').then(accounts => {
          let verified = true;
          accounts.forEach(account => {
            if(account.val().account_code === account_code) {
              return verified = false;
            }
          });
          if(verified) {
            firebase.database().ref(`active_accounts`).push().set({
              account_code
            }).then(() => {
              showPage('profile');
              displayMessage(`s:Account #${account_code} has been added to the active accounts.`);
            }).catch(err => {
              displayMessage(`e:Error: ${err.message}`);
            });
          } else {
            displayMessage(`e:Error: Account has already been activated!`);
          }
        });
      }
    };

    window.activateSubscription = () => {
      let account_code = $.get('#accountCode3').value,
        name = $.get('#projectName2').value;
      console.log(name);
      if(account_code.length < 5) {
        displayMessage(`e:Error: Account code most be at least 5 digits.`);
      } else if(name.length === 0) {
        displayMessage(`e:Error: Project name needed for search.`);
      } else {
        firebase.database().ref(`users`).once('value').then(users => {
          let found = false;
          users.forEach(user => {
            if(user.val().account_code === account_code) {
              found = user.val().account_id;
            }
          });
          if(found) {
            firebase.database().ref(`users/${found}/projects`).once('value').then(projects => {
              projects.forEach(project => {
                if(project.val()['name'] === name) {
                  firebase.database().ref(`users/${found}/projects/${project.key}`).update({
                    subscribed: true
                  }).then(() => {
                    displayMessage(`s:Subscription has been activated.`);
                  }).catch(err => {
                    displayMessage(`e:Error: ${err.message}`);
                  });
                }
              });
            }).catch(err => {
              displayMessage(`e:Error: ${err.message}`);
            });
          } else {
            displayMessage(`e:Error: Project not found.`);
          }
        }).catch(err => {
          displayMessage(`e:Error: ${err.message}`);
        });;
      }
    };

    window.addSubscription = () => {
      let account_code = $.get('#accountCode2').value;
      if(account_code.length < 5) {
        displayMessage(`e:Error: Account code most be at least 5 digits.`);
      } else {
        firebase.database().ref('paypal_values').once('value').then(plans => {
          let project = {
            name: $.get('#projectName').value.length > 0 ? $.get('#projectName').value.replace(/ /g, '_') : 'PWA',
            account_code: $.get('#accountCode2').value,
            plan: $.get('#subscription').value,
            yearly_cost: plans.val()[$.get('#subscription').value],
            subscribed: false,
            date: new Date()
          };

          firebase.database().ref('users').once('value').then(users => {
            let found;
            users.forEach(user => {
              if(user.val().account_code === project.account_code) {
                found = user;
              }
            });
            if(found) {
              firebase.database().ref(`users/${found.key}/projects/${project.name}`).set(project).then(() => {
                displayMessage(`s:Subscription has been added.`);
              }).catch(err => {
                displayMessage(`e:Error: ${err.message}`);
              });
            } else {
              displayMessage(`e:Error: No user found.`);
            }
          }).catch(err => {
            displayMessage(`e:Error: ${err.message}`);
          });
        }).catch(err => {
          displayMessage(`e:Error: ${err.message}`);
        });
      }
    };

    window.send = what => {
      if(/forgotPassword/.test(what)) {
        let email = $.get('#emanresu').value;
        if(email.length === 0) {
          displayMessage(`e:Error: Please enter your email address.`);
        } else {
          firebase.auth().sendPasswordResetEmail(email).then(() => {
            displayMessage(`s:Check your email to reset your password.`);
          }).catch(err => {
            displayMessage(`e:Error: ${err.message}`);
          });
        }
      }
    };

    window.download = () => {
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if(choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    };

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
    });
  }
};