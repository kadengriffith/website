// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'profile',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid hidden',
  id: 'view-bill',
  contains: $.getElement({
    class: 'section-title',
    contains: 'Alert: You have an invoice waiting.'
  })
}) + $.getElement({
  class: 'grid-2',
  id: 'profile-grid',
  contains: $.getElement({
    id: 'information',
    class: 'grid-3',
    contains: $.getElement({
      id: 'gen-information',
      class: 'grid',
      contains: $.getElement({
        class: 'section-title',
        contains: 'Information'
      }) + $.getElement({
        class: 'text',
        contains: 'Loading...'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'First Last',
        class: 'input hidden',
        type: 'text',
        id: 'name',
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Email',
        class: 'input hidden',
        type: 'email',
        autocomplete: 'email',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}',
        id: 'email',
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Phone (example: 3076893456)',
        class: 'input hidden',
        type: 'text',
        autocomplete: 'phone',
        pattern: '[0-9]{10,10}',
        id: 'phone',
      })
    }) + $.getElement({
      id: 'bus-information',
      class: 'grid',
      contains: $.getElement({
        class: 'section-title',
        contains: 'Business'
      }) + $.getElement({
        class: 'text',
        contains: 'Loading...'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Business Name',
        class: 'input hidden',
        type: 'text',
        id: 'bus-name',
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Business Address',
        class: 'input hidden',
        type: 'text',
        id: 'bus-add',
      }) + $.getElement({
        tag: 'input',
        placeholder: 'City Location',
        class: 'input hidden',
        type: 'text',
        id: 'bus-city'
      })
    }) + $.getElement({
      class: 'grid',
      contains: $.getElement({
        class: 'section-title',
        contains: 'Files'
      }) + $.getElement({
        tag: 'a',
        href: '/files',
        id: 'assets',
        alt: 'Files',
        "aria-label": 'Files',
        contains: 'Checking for files...'
      })
    })
  }) + $.getElement({
    class: 'grid',
    contains: $.getElement({
      class: 'section-title',
      contains: 'Glance'
    }) + $.getElement({
      id: 'glance',
      contains: 'Calculating...'
    })
  }) + $.getElement({
    class: 'grid',
    contains: $.getElement({
      class: 'section-title',
      contains: 'Payment History'
    }) + $.getElement({
      id: 'payments',
      contains: 'Loading payment history...'
    })
  }) + $.getElement({
    class: 'grid',
    contains: $.getElement({
      class: 'section-title',
      contains: 'Projects'
    }) + $.getElement({
      id: 'projects',
      contains: 'Loading projects...'
    })
  })
});

new Generator(Template, Name).build(File);