// Author: Kaden Griffith
// Descr : Window Functions

const $ = require('kbrew_hypertxt'),
  Pages = require('./html/Pages'),
  firebase = require('firebase/app');

require('firebase/database');
require('firebase/auth');

module.exports = {
  load: () => {
    import( /* webpackChunkName: "animate" */ './animation').then(animations => {
      animations.run();
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
        toggleSignedIn(true);
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
        window.location.reload();
      });
    };

    window.showPage = (whichPage, options) => {
      toggleLoading(true);

      function end() {
        runLazyLoadingStartup();
        toggleLoading(false);
      }

      toggleMenu(false);

      $.query('body').style.backgroundColor = '#f4f4f4';
      $.clear($.get('#root'));

      if(!navigator.onLine) {
        displayMessage(`w:No network connection detected.<br>Please connect to the internet to access full functionality.`);
        whichPage = 'learn';
      }

      if(/learn/.test(whichPage)) {
        window.location.reload();
      } else if(/signin/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Sign In';
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('#root'), Pages.signin());
        end();
      } else if(/register/.test(whichPage)) {
        $.get('#title').innerHTML = 'Byte Wave  |  Register';
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('#root'), Pages.register());
        end();
      } else if(/profile/.test(whichPage)) {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
          if(user.val().administrator) {
            $.get('#title').innerHTML = `Admin Panel`;
            firebase.database().ref(`active_accounts`).once('value').then(accounts => {
              $.add($.get('#root'), Pages.admin(firebase, accounts));
              end();
            }).catch(err => {
              displayMessage(`e:Error: ${err.message}`);
              end();
            });
          } else {
            $.get('#title').innerHTML = `Welcome back, ${user.val().first_name}`;
            $.add($.get('#root'), Pages.account(user.val()));
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
                $.add($.get('#root'), Pages.account(_user, true));
              } else {
                firebase.database().ref(`active_accounts`).once('value').then(accounts => {
                  $.get('#title').innerHTML = `Admin Panel`;
                  $.add($.get('#root'), Pages.admin(firebase, accounts));
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
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(user => {
          $.get('#title').innerHTML = `Byte Wave  |  Subscribe`;
          let name_to_search = options.parentNode.childNodes[Array.prototype.indexOf.call(options.parentNode.childNodes, options) - 1].innerHTML;
          name_to_search = name_to_search.replace(/\|/g, '');
          name_to_search = name_to_search.replace(/ /g, '');
          let project = user.val().billing_plan[name_to_search];
          // Request payment API
          import( /* webpackChunkName: "paypal" */ './payment').then(paypal => {
            $.add($.get('#root'), Pages.pay(user.val(), project));
            paypal.render();
          });
          end();
        });
      } else if(/support/.test(whichPage)) {
        $.get('#title').innerHTML = `Byte Wave  |  Support`;
        $.query('body').style.backgroundColor = '#368ca3';
        $.add($.get('#root'), Pages.support());
        end();
      } else if(/privacy-policy/.test(whichPage)) {
        $.get('#title').innerHTML = `Privacy Policy | 2018`;
        $.add($.get('#root'), Pages.privacyPolicy());
        end();
      }
    };

    window.register = () => {
      // Request registration API
      import( /* webpackChunkName: "registration" */ './register').then(register => {
        register.createUser(firebase);
      });
    };

    window.activateAccount = () => {
      let account_code = $.get('#accountCode').value;
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
    };

    window.addSubscription = () => {
      let project = {
        name: $.get('#projectName').value.length > 0 ? $.get('#projectName').value : 'PWA',
        account_code: $.get('#accountCode2').value,
        yearly_cost: $.get('#subscriptionAmount').value,
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
          firebase.database().ref(`users/${found.key}/billing_plan/${project.name}`).set(project).then(() => {
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
    };

    window.download = () => {
      $$.installPrompt.prompt();
    };
  }
};