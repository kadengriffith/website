// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'add',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  tag: 'h1',
  class: 'title',
  contains: 'Add A Project.'
}) + $.getElement({
  id: 'step-1',
  class: 'grid screen',
  contains: $.getElement({
    class: 'section-title',
    contains: "Let's get started."
  }) + $.getElement({
    class: 'info',
    contains: 'Once you submit a project request, a Byte Wave representative will contact you to negotiate a schedule for delivery. If special requests are provided, it can affect the schedule and price.'
  }) + $.getElement({
    id: 'project-type',
    class: 'grid-2',
    contains: $.getElement({
      tag: 'a',
      "aria-label": 'Web application',
      id: 'application',
      alt: 'Web application',
      class: 'btn',
      onclick: `chooseType('web app');`,
      contains: 'Web App'
    }) + $.getElement({
      tag: 'a',
      "aria-label": 'Graphic design',
      id: 'graphic',
      alt: 'Graphic design',
      class: 'btn',
      onclick: `chooseType('graphic design');`,
      contains: 'Graphic Design'
    })
  })
}) + $.getElement({
  id: 'step-2',
  class: 'grid screen hidden',
  contains: $.getElement({
    id: 'step-2-title',
    class: 'section-title',
    contains: "Basic Information"
  }) + $.getElement({
    class: 'grid-2',
    contains: $.getElement({
      tag: 'label',
      for: 'project-name',
      class: 'label',
      id: 'wl-enabled-0',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Project Name'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Project Name',
        class: 'input',
        minLength: 1,
        id: 'project-name',
      })
    }) + $.getElement({
      tag: 'label',
      for: 'project-url',
      class: 'label',
      id: 'wl-enabled-1',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Preferred Url'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Url (example: bytewave-apps.com)',
        class: 'input',
        minLength: 1,
        id: 'project-url'
      })
    }) + $.getElement({
      tag: 'label',
      for: 'project-pages',
      class: 'label',
      id: 'wl-enabled-2',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Number Of Pages'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Number Of Pages (default: 1)',
        class: 'input',
        type: 'number',
        value: 1,
        min: 1,
        max: 25,
        id: 'project-pages',
      })
    }) + $.getElement({
      tag: 'label',
      for: 'project-keywords',
      class: 'label',
      id: 'wl-enabled-3',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Keywords'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Keywords (example: books, store, local)',
        class: 'input',
        minLength: 1,
        id: 'project-keywords',
      })
    })
  }) + $.getElement({
    tag: 'textarea',
    "data-gramm": false,
    placeholder: 'Project Description',
    class: 'input-textarea',
    minLength: 1,
    id: 'project-description',
  }) + $.getElement({
    tag: 'textarea',
    "data-gramm": false,
    placeholder: 'Special Requests / Requirements',
    class: 'input-textarea',
    minLength: 1,
    id: 'project-requests',
  })
}) + $.getElement({
  id: 'step-3',
  class: 'grid screen hidden',
  contains: $.getElement({
    class: 'section-title',
    contains: 'Select or indicate color preferences.'
  }) + $.getElement({
    class: 'grid-2',
    id: 'color-input',
    contains: $.getElement({
      tag: 'label',
      for: 'project-color',
      class: 'label',
      id: 'wl-enabled-4',
      contains: $.getElement({
        class: 'word-label',
        contains: 'Custom Color'
      }) + $.getElement({
        tag: 'input',
        placeholder: 'Color (example: #368ca3)',
        class: 'input',
        minLength: 1,
        id: 'project-color',
      })
    }) + $.getElement({
      id: 'add',
      alt: 'Add Color',
      class: 'btn',
      onclick: 'addCustomColor();',
      contains: 'Add Color'
    })
  }) + $.getElement({
    id: 'color-selection'
  }) + $.getElement({
    class: 'section-title',
    contains: 'Your palette:'
  }) + $.getElement({
    id: 'colors-selected'
  })
}) + $.getElement({
  id: 'step-4',
  class: 'grid screen hidden',
  contains: $.getElement({
    class: 'section-title',
    contains: 'Select Your Add-ons'
  }) + $.getElement({
    id: 'add-ons',
    contains: $.getElement({
      class: 'add-on',
      onclick: 'toggleAddOn(this);',
      contains: $.getElement({
        class: 'sale'
      }) + $.getElement({
        class: 'add-on-title',
        contains: 'Custom Domain Email'
      }) + $.getElement({
        tag: 'span',
        class: 'orig-price',
        contains: '19.99 / mo'
      }) + $.getElement({
        class: 'add-on-price',
        contains: '14.99 / mo',
        id: 14.99
      })
    }) + $.getElement({
      class: 'add-on',
      onclick: 'toggleAddOn(this);',
      contains: $.getElement({
        class: 'add-on-title',
        contains: 'Google Business Setup'
      }) + $.getElement({
        class: 'add-on-price',
        contains: '19.99',
        id: 19.99
      })
    }) + $.getElement({
      class: 'add-on',
      onclick: 'toggleAddOn(this);',
      contains: $.getElement({
        class: 'add-on-title',
        contains: 'Google Maps Integration'
      }) + $.getElement({
        class: 'add-on-price',
        contains: '9.99',
        id: 9.99
      })
    }) + $.getElement({
      class: 'add-on',
      onclick: 'toggleAddOn(this);',
      contains: $.getElement({
        class: 'add-on-title',
        contains: 'Location Photography'
      }) + $.getElement({
        class: 'add-on-price',
        contains: '4.99 / photo',
        id: 4.99
      })
    })
  })
}) + $.getElement({
  id: 'review',
  class: 'hidden'
}) + $.getElement({
  id: 'buttons',
  contains: $.getElement({
    tag: 'a',
    "aria-label": 'Back',
    id: 'back',
    alt: 'Back',
    class: 'link hidden',
    onclick: 'goBack();',
    contains: 'Back'
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Next',
    id: 'next',
    alt: 'Next',
    class: 'btn hidden',
    onclick: 'nextStep();',
    contains: 'Next'
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Finish',
    id: 'finish',
    class: 'btn hidden',
    onclick: 'finish();',
    contains: `Finish`
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Submit',
    id: 'upload',
    class: 'btn hidden',
    onclick: 'submitForReview();',
    contains: `Submit`
  })
});
new Generator(Template, Name).build(File);