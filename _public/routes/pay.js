// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'pay',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Pay Now.'
  }) + $.getElement({
    id: 'payment-container',
    contains: $.getElement({
      id: 'loading-payment',
      contains: 'Loading...'
    }) + $.getElement({
      class: 'section-title hidden',
      contains: 'Select your invoice.'
    }) + $.getElement({
      tag: 'select',
      id: 'payment-select',
      class: 'select hidden',
      onchange: "reloadPayment();",
      contains: $.getElement({
        tag: 'option',
        value: '',
        disabled: true,
        selected: true,
        style: 'display: none;',
        contains: 'Click to select.'
      })
    }) + $.getElement({
      id: 'payment-details',
      class: 'hidden'
    })
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Submit payment',
    alt: 'Submit payment',
    class: 'btn hidden',
    id: 'submit-button',
    contains: 'Pay'
  })
});

new Generator(Template, Name).build(File);