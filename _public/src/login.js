// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/login.scss');

module.exports = {
  load: fb => {
    toggleLoading(false);
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        location.href = '/profile';
      }
    });

    window.login = () => {
      fb.login($.get('#login-email').value, $.get('#login-password').value);
      return false;
    };

    window.resetPassword = () => {
      fb.resetPassword($.get('#login-email').value);
      return false;
    };
  }
};