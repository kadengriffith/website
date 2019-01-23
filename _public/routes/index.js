// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'index',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid background',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Join the wave.'
  }) + $.getElement({
    class: 'grid-2',
    contains: $.getElement({
      "aria-label": 'Contact',
      tag: 'a',
      href: '/contact',
      alt: 'Contact',
      class: 'btn',
      contains: 'Contact Us'
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
    contains: 'Already have an account? ' + $.getElement({
      tag: 'a',
      "aria-label": 'Login',
      class: 'link',
      href: '/login',
      alt: 'Login',
      contains: 'Login'
    })
  }) + $.getElement({
    id: 'hero-end',
    contains: $.getElement({
      class: 'grid',
      contains: $.getElement({
        tag: 'span',
        class: 'section-title',
        contains: 'Progressive Web Apps'
      }) + $.getElement({
        tag: 'p',
        class: 'text',
        contains: 'A website that can be downloaded on any device.'
      }) + $.getElement({
        tag: 'p',
        class: 'text',
        contains: 'Use your software as an installable application while also maintaining access to what you or your customers need from any device with internet access.'
      }) + $.getElement({
        tag: 'p',
        class: 'text',
        contains: 'The wave of the future is upon us.'
      })
    }) + $.getElement({
      id: 'phone'
    })
  })
}) + $.getElement({
  class: 'section',
  contains: $.getElement({
    class: 'grid',
    contains: $.getElement({
      class: 'feature-box',
      contains: $.getElement({
        tag: 'span',
        class: 'section-title',
        contains: 'Why web apps?'
      }) + $.getElement({
        class: 'text',
        contains: $.icon({
          icon: 'bolt'
        }) + $.getElement({
          class: 'alt',
          contains: 'Fast'
        }) + '- Better integrated software improves usability and drives customer conversion.'
      }) + $.getElement({
        class: 'text',
        contains: $.icon({
          icon: 'thumbs-up'
        }) + $.getElement({
          class: 'alt',
          contains: 'Reliable'
        }) + '- Grow your market with engaging and repeatable actions.'
      }) + $.getElement({
        class: 'text',
        contains: $.icon({
          icon: 'life-ring'
        }) + $.getElement({
          class: 'alt',
          contains: 'Secure'
        }) + '- Ensure that data you rely on is protected.'
      }) + $.getElement({
        class: 'text',
        contains: $.icon({
          icon: 'fingerprint'
        }) + $.getElement({
          class: 'alt',
          contains: 'Custom'
        }) + '- We use unique styling and components to encapsulate the design ideas you have for your business.'
      })
    }) + $.getElement({
      tag: 'span',
      class: 'title',
      contains: $.icon({
        icon: 'bolt'
      }) + 'Fast'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'Take advantage of the latest language capabilities and optimization to deliver the fastest speeds the web can offer.'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'Any idea you have will come to life and outperform other websites.'
    }) + $.getElement({
      class: 'title',
      contains: $.icon({
        icon: 'thumbs-up'
      }) + 'Reliable'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'Eliminate frustating layouts and let workflow designers make your life easier.'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'We make software that works for you and delivers a message that always puts your business in the spotlight.'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'Byte Wave built software is never out of date or incompatible for its users.'
    }) + $.getElement({
      class: 'title',
      contains: $.icon({
        icon: 'life-ring'
      }) + 'Secure'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'We use the latest security and encryption by default.'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: `Rest easy knowing that your customer's data is always out of reach from the public. We only work through highly vetted third-parties and we never rely on unstable code.`
    }) + $.getElement({
      class: 'title',
      contains: $.icon({
        icon: 'fingerprint'
      }) + 'Custom'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: 'The engineers at Byte Wave build apps from the ground up. No templates.'
    }) + $.getElement({
      tag: 'p',
      class: 'text',
      contains: `We produce the best in custom web development. Made just how you need it.`
    }) + $.getElement({
      class: 'grid-3',
      contains: $.getElement({
        class: 'whale'
      }).repeat(3)
    })
  })
});

new Generator(Template, Name).build(File);