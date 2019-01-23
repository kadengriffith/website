// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'login',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    class: 'title',
    contains: 'Login'
  }) + $.getElement({
    tag: 'form',
    method: 'POST',
    onsubmit: 'return login();',
    autocomplete: 'on',
    contains: $.getElement({
      tag: 'label',
      for: 'login-email',
      class: 'label',
      id: 'wl-enabled-0',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Email'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Email',
        class: 'input',
        type: 'email',
        autocomplete: 'email',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}',
        id: 'login-email',
        required: true
      })
    }) + $.getElement({
      tag: 'label',
      for: 'login-password',
      class: 'label',
      id: 'wl-enabled-1',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Password'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Password',
        class: 'input',
        type: 'password',
        autocomplete: 'password',
        minLength: 8,
        id: 'login-password',
        required: true
      })
    }) + $.getElement({
      tag: 'button',
      type: 'submit',
      class: 'btn',
      onclick: 'login();',
      contains: `Log In`
    })
  }) + $.getElement({
    contains: $.getElement({
      tag: 'a',
      "aria-label": 'Reset password',
      class: 'link inline',
      onclick: 'resetPassword();',
      alt: 'Reset password',
      contains: 'Reset Password'
    }) + $.getElement({
      class: 'inline',
      contains: '|'
    }) + $.getElement({
      tag: 'a',
      "aria-label": 'Register',
      class: 'link inline',
      href: '/signup',
      alt: 'Register',
      contains: 'Register'
    })
  })
});

new Generator(Template, Name).build(File);