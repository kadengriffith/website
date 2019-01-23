// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'auth',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    class: 'title',
    contains: 'Reset Password.'
  }) + $.getElement({
    tag: 'form',
    method: 'POST',
    onsubmit: 'return resetPassword();',
    autocomplete: 'on',
    contains: $.getElement({
      tag: 'label',
      for: 'password',
      class: 'label',
      id: 'wl-enabled-0',
      contains: $.getElement({
        class: 'word-label',
        contains: 'New Password'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'New Password',
        type: 'password',
        class: 'input',
        autocomplete: 'new-password',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$',
        id: 'password',
        required: true
      })
    }) + $.getElement({
      tag: 'label',
      for: 'new-password',
      class: 'label',
      id: 'wl-enabled-1',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Password'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Repeat Password',
        class: 'input',
        type: 'password',
        autocomplete: 'new-password',
        minLength: 8,
        id: 'new-password',
        required: true
      })
    }) + $.getElement({
      tag: 'button',
      type: 'submit',
      class: 'btn',
      contains: `Reset`
    })
  })
});

new Generator(Template, Name).build(File);