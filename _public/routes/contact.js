// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'contact',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    contains: 'Contact'
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Send an email',
    alt: 'Send an email',
    href: 'mailto:info@bytewave-apps.com',
    class: 'btn',
    contains: 'Send An Email'
  }) + $.getElement({
    class: 'text inline',
    contains: "1 (307) 689 3456"
  }) + $.getElement({
    class: 'text',
    contains: "Open: 9am-5pm M-F"
  }) + $.getElement({
    class: 'text',
    contains: "Byte Wave LLC is based in Sheridan, WY."
  })
});

new Generator(Template, Name).build(File);