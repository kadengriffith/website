// Registration

const $ = require('kbrew_hypertxt').get;

module.exports = {
  createUser: (firebase) => {
    function register() {
      toggleLoading(true);
      let user = {
          Account_Code: $('#accountCode').value,
          First_Name: $('#first').value,
          Last_Name: $('#last').value,
          Phone: $('#phone').value,
          Email: $('#email').value,
          Password: $('#password').value,
          Repeat_Password: $('#password-c').value
        },
        errorMessage = 'Failed to register user.';

      function validatedEmail(email) {
        let r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !r.test(String(email).toLowerCase());
      }

      let ph = user.Phone;
      user['Phone'] = `(${ph.substring(0, 3)}) ${ph.substring(3, 6)}-${ph.substring(6, 10)}`;

      function validatedData() {
        for(let prop in user) {
          if(!user[prop].length > 0) return displayMessage(`e:${errorMessage}<br>Reason:<br>${prop.replace('_', ' ')} is empty.`);
        }
        if(validatedEmail(user.Email)) {
          displayMessage(`e:${errorMessage}<br>Reason:<br>Email is not valid.`);
        } else if(user.Password !== user.Repeat_Password) {
          displayMessage(`e:${errorMessage}<br>Reason:<br>Passwords do not match.`);
        } else if(!user.Password.length >= 8) {
          displayMessage(`e:${errorMessage}<br>Reason:<br>Password is too short.`);
        } else if(!/[a-z]/.test(user.Password)) {
          displayMessage(`e:${errorMessage}<br>Reason:<br>Password does not contain lower-case letter(s).`);
        } else if(!/[A-Z]/.test(user.Password)) {
          displayMessage(`e:${errorMessage}<br>Reason:<br>Password does not contain upper-case letter(s).`);
        }

        // Window device object Form validation
        return !$$.isError();
      }

      if(validatedData()) {
        firebase.database().ref(`active_accounts`).once('value').then(accounts => {
          let true_account = false;
          accounts.forEach(account => {
            if(account.val().account_code === user.Account_Code) {
              true_account = account.val().activated ? false : true;
              return;
            }
          });
          if(true_account) {
            firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).then(() => {
              // Remove data that should not be in the database
              delete user['Password'];
              delete user['Repeat_Password'];
              // Reformat the data
              let d = {
                account_id: firebase.auth().currentUser.uid
              };
              for(let prop in user) {
                let p = prop.toLowerCase();
                d[p] = user[prop];
              }

              // Save
              firebase.database().ref(`users/${d.account_id}`).set(d);
              firebase.database().ref(`active_accounts`).once('value').then(accounts => {
                accounts.forEach(account => {
                  // Activating restricts others from setting an account.
                  if(account.val().account_code === user.Account_Code) {
                    return firebase.database().ref(`active_accounts/${account.key}`).update({
                      activated: true
                    });
                  }
                });
                showPage('learn');
                displayMessage(`s:Your account is ready!`);
              });
            }).catch(err => {
              toggleLoading(false);
              displayMessage(`e:We're currently unable to create your account.<br>Please try again later.<br>Error: ${err.message}`);
            });
          } else {
            toggleLoading(false);
            displayMessage(`e:The account code #${user.Account_Code} is not valid.`);
          }
        });
      } else {
        toggleLoading(false);
      }
    }

    register();
  }
};