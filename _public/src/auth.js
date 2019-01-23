// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/auth.scss');

module.exports = {
  load: fb => {
    function getParameter(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    if (!getParameter('oobCode')) {
      location.href = '/profile';
    } else {
      toggleLoading(false);
    }

    if (getParameter('action') === 'recoverEmail') {
      $.get('.title').innerHTML = 'Recovering Email.';
      $.get('form').style.setProperty('display', 'none');
      recoverEmail();
    }

    function recoverEmail() {
      let restoredEmail = null;
      fb.auth.checkActionCode(getParameter('oobCode')).then(info => {
        restoredEmail = info['data']['email'];
        return auth.applyActionCode(getParameter('oobCode'));
      }).then(() => {
        displayMessage(`s:Your email has been reverted to ${restoredEmail}.`);
        auth.sendPasswordResetEmail(restoredEmail).then(() => {
          displayMessage(`s:Please check your email for a password reset link.<br>Redirecting...`);
          setTimeout(() => {
            location.href = '/login';
          }, 10000);
        }).catch(() => {
          displayMessage(`e:Could not send reset password link.<br>Please consider resetting your password via the login screen.<br>Redirecting...`);
          setTimeout(() => {
            location.href = '/login';
          }, 10000);
        });
      }).catch(() => {
        displayMessage('e:Your code has expired. Redirecting...');
        setTimeout(() => {
          location.href = '/login';
        }, 2000);
      });
    }

    window.resetPassword = () => {
      const password = $.get('#password').value,
        password2 = $.get('#new-password').value;

      if (password !== password2) {
        displayMessage('e:Passwords do not match.');
      } else {
        fb.auth.confirmPasswordReset(getParameter('oobCode'), password)
          .then(() => {
            displayMessage('s:Success! Redirecting...');
            setTimeout(() => {
              location.href = '/login';
            }, 2000);
          })
          .catch(() => {
            displayMessage('e:Your code has expired. Redirecting...');
            setTimeout(() => {
              location.href = '/login';
            }, 2000);
          });
      }
      return false;
    };
  }
};