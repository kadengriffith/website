// Author: Kaden Griffith

require('../css/terms.scss');

module.exports = {
  load: fb => {
    toggleLoading(false);
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        $.add($.get('#root'), $.getElement({
          tag: 'a',
          "aria-label": 'Profile',
          id: 'profile',
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