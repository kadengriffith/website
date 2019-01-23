// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'shop',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  contains: 'shop'
});

new Generator(Template, Name).build(File);