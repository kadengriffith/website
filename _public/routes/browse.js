// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'browse',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'title',
  contains: 'Past Clients'
}) + $.getElement({
  class: 'grid',
  contains: $.getElement({
    class: 'client',
    contains: $.getElement({
      class: 'details',
      contains: $.getElement({
        class: 'title',
        contains: 'Wyo Pruitt Writing'
      }) + $.getElement({
        class: 'location',
        contains: 'Sheridan, Wyoming'
      }) + $.getElement({
        class: 'date',
        contains: 'Started in 2018.'
      }) + $.getElement({
        class: 'description',
        contains: 'Wyo Pruitt Writing is a content delivery site meant for blogging.'
      })
    }) + $.getElement({
      class: 'preview',
      contains: $.getElement({
        tag: 'iframe',
        src: 'https://wyopruittwriting.com'
      })
    })
  }) + $.getElement({
    class: 'client',
    contains: $.getElement({
      class: 'details',
      contains: $.getElement({
        class: 'title',
        contains: 'Broken Heart Stables'
      }) + $.getElement({
        class: 'location',
        contains: 'Gillette, Wyoming'
      }) + $.getElement({
        class: 'date',
        contains: 'Started in 2015.'
      }) + $.getElement({
        class: 'description',
        contains: 'Broken Heart Stables is a horse boarding service.'
      }) + $.getElement({
        class: 'description',
        contains: 'This site was created to be a simple 1 page connection for directions and pricing information.'
      })
    }) + $.getElement({
      class: 'preview',
      contains: $.getElement({
        tag: 'iframe',
        src: 'https://brokenheartstables.com'
      })
    })
  })
});

new Generator(Template, Name).build(File);