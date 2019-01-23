// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/index.scss');

module.exports = {
  load: (fb) => {
    toggleLoading(false);
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        $.add($.get('#root'), $.getElement({
          tag: 'a',
          id: 'profile',
          "aria-label": 'Profile',
          class: 'link',
          href: '/profile',
          alt: 'Profile',
          contains: $.icon({
            icon: 'user-circle'
          })
        }));
      }
    });
  }
};