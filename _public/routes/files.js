// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'files',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Your Files.'
  }) + $.getElement({
    id: 'loading-files',
    contains: 'Loading...'
  }) + $.getElement({
    id: 'files-container',
    class: 'hidden'
  }) + $.getElement({
    tag: 'input',
    class: 'offscreen',
    type: 'file',
    name: 'file',
    id: 'file'
  }) + $.getElement({
    tag: 'label',
    id: 'file-label',
    for: 'file',
    contains: $.getElement({
      class: 'file-upload',
      contains: 'Upload'
    })
  })
});

new Generator(Template, Name).build(File);