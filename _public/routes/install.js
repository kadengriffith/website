// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'install',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  contains: 'install'
});

new Generator(Template, Name).build(File);