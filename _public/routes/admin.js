// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'admin',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    id: 'search-title',
    contains: 'Client Search.'
  }) + $.getElement({
    id: 'search-container',
    contains: $.getElement({
      tag: 'form',
      method: 'POST',
      onsubmit: 'return findUser();',
      autocomplete: 'on',
      contains: $.getElement({
        tag: 'label',
        for: 'search',
        class: 'label',
        id: 'wl-enabled-0',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Searching: Users'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Search',
          class: 'input',
          type: 'search',
          oninput: 'findUser();',
          minLength: 1,
          id: 'search',
        })
      })
    }) + $.getElement({
      id: 'loading-search',
      class: 'hidden',
      contains: 'Searching...'
    }) + $.getElement({
      id: 'results',
      class: 'hidden'
    })
  }) + $.getElement({
    tag: 'h1',
    id: 'client-title',
    class: 'title hidden',
    contains: 'Client View.'
  }) + $.getElement({
    id: 'user-buttons',
    class: 'hidden'
  }) + $.getElement({
    id: 'user',
    class: 'hidden'
  })
});

new Generator(Template, Name).build(File);