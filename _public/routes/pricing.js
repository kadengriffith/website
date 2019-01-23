// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'pricing',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  tag: 'h1',
  class: 'title',
  contains: 'Services'
}) + $.getElement({
  class: 'grid',
  contains: $.getElement({
    class: 'grid outlined',
    contains: $.getElement({
      tag: 'h1',
      class: 'title',
      contains: 'Web App Development'
    }) + $.getElement({
      class: 'price',
      contains: '$9.99 per month<br>+<br>One-time installment starting at $99.99'
    }) + $.getElement({
      class: 'description',
      contains: 'Requesting a web development project with us only takes a few minutes.'
    }) + $.getElement({
      class: 'description',
      contains: 'This subscription will unlock full access to the Pro dashboard.'
    }) + $.getElement({
      class: 'description',
      contains: 'Multiple projects can be activated at one time through the dashboard.'
    }) + $.getElement({
      class: 'description',
      contains: 'Our mailing and our design services are available as an add-on.'
    }) + $.getElement({
      class: 'description',
      contains: 'All projects with us are updated regularly to comply with web standards.'
    }) + $.getElement({
      tag: 'a',
      "aria-label": 'Register',
      href: '/signup',
      alt: 'Register',
      class: 'btn',
      contains: 'Register'
    })
  }) + $.getElement({
    class: 'text',
    contains: 'To see our itemized list of 2019 services, view or download our' + $.getElement({
      tag: 'a',
      "aria-label": '2019 Pricing guide',
      href: 'https://firebasestorage.googleapis.com/v0/b/bytewave-wy.appspot.com/o/bytewave%2F2019_Pricing_Guide.pdf?alt=media&token=bf816914-55c4-4205-9fac-e90d5205134c',
      alt: 'Pricing guide',
      class: 'link inline',
      contains: `2019 Pricing guide`
    }) + '.'
  }) + $.getElement({
    class: 'grid',
    contains: $.getElement({
      tag: 'h1',
      class: 'title',
      contains: 'Graphic Design'
    }) + $.icon({
      icon: 'pen-fancy'
    }) + $.getElement({
      class: 'description',
      contains: 'We can design anything for your business.'
    }) + $.getElement({
      class: 'description',
      contains: 'Custom designed assets for any project.'
    }) + $.getElement({
      class: 'description',
      contains: 'Unlocks access to storage and a personalized dashboard.'
    }) + $.getElement({
      class: 'description',
      contains: 'Easily access your files and communicate with our designers.'
    }) + $.getElement({
      class: 'price',
      contains: 'Starting at $199.99'
    })
  }) + $.getElement({
    class: 'grid',
    contains: $.getElement({
      tag: 'h1',
      class: 'title',
      contains: 'Email Marketing'
    }) + $.icon({
      icon: 'envelope'
    }) + $.getElement({
      class: 'description',
      contains: 'Unlock our email marketing platform.'
    }) + $.getElement({
      class: 'description',
      contains: 'Send customized HTML emails to customers, clients, or business affiliates.'
    }) + $.getElement({
      class: 'description',
      contains: 'Save your templates.'
    }) + $.getElement({
      class: 'description',
      contains: 'Unlock unlimited cloud storage for images, and files.'
    }) + $.getElement({
      class: 'price',
      contains: 'Coming soon'
    })
  })
});

new Generator(Template, Name).build(File);