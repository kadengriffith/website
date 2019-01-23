// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'signup',
  Template = 'templates/index.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    class: 'title',
    contains: 'Register'
  }) + $.getElement({
    class: 'info',
  }) + $.getElement({
    tag: 'form',
    method: 'POST',
    onsubmit: 'return register();',
    autocomplete: 'on',
    contains: $.getElement({
      id: 'general-information',
      contains: $.getElement({
        tag: 'label',
        for: 'first',
        class: 'label',
        id: 'wl-enabled-0',
        contains: $.getElement({
          class: 'word-label',
          contains: 'First Name'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'First Name',
          class: 'input',
          minLength: 1,
          id: 'first',
          required: true
        })
      }) + $.getElement({
        tag: 'label',
        for: 'last',
        class: 'label',
        id: 'wl-enabled-1',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Last Name'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Last Name',
          class: 'input',
          minLength: 1,
          id: 'last',
          required: true
        })
      }) + $.getElement({
        tag: 'label',
        for: 'email',
        class: 'label',
        id: 'wl-enabled-2',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Email'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Email',
          class: 'input',
          type: 'email',
          autocomplete: 'email',
          pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}',
          id: 'email',
          required: true
        })
      }) + $.getElement({
        tag: 'label',
        for: 'phone',
        class: 'label',
        id: 'wl-enabled-3',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Phone'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Phone (example: 3076893456)',
          class: 'input',
          pattern: '[0-9]{10}',
          id: 'phone',
          required: true
        })
      })
    }) + $.getElement({
      id: 'bus-information',
      class: 'hidden',
      contains: $.getElement({
        tag: 'label',
        for: 'bus-name',
        class: 'label',
        id: 'wl-enabled-4',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Business Name'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Business Name',
          class: 'input',
          minLength: 1,
          id: 'bus-name',
        })
      }) + $.getElement({
        tag: 'label',
        for: 'bus-add',
        class: 'label',
        id: 'wl-enabled-5',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Business Address'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Business Address',
          class: 'input',
          minLength: 1,
          id: 'bus-add',
        })
      }) + $.getElement({
        tag: 'label',
        for: 'bus-city',
        class: 'label',
        id: 'wl-enabled-6',
        contains: $.getElement({
          class: 'word-label',
          contains: 'City'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'City',
          class: 'input',
          minLength: 1,
          id: 'bus-city',
        })
      })
    }) + $.getElement({
      id: 'passwords',
      class: 'hidden',
      contains: $.getElement({
        tag: 'label',
        for: 'password',
        class: 'label',
        id: 'wl-enabled-7',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Password'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Password',
          type: 'password',
          class: 'input',
          autocomplete: 'new-password',
          pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$',
          id: 'password',
          required: true
        })
      }) + $.getElement({
        tag: 'label',
        for: 'password-2',
        class: 'label',
        id: 'wl-enabled-8',
        contains: $.getElement({
          class: 'word-label',
          contains: 'Confirm Password'
        }) + $.getElement({
          tag: 'input',
          placeholder: 'Confirm Password',
          class: 'input',
          type: 'password',
          autocomplete: 'new-password',
          minLength: 1,
          id: 'password-2',
          required: true
        })
      }) + $.getElement({
        tag: 'label',
        class: 'checkbox-container',
        contains: 'I agree to the ' + $.getElement({
          tag: 'a',
          "aria-label": 'Terms',
          id: 'personal',
          alt: 'Terms',
          target: 'new',
          class: 'link',
          href: 'https://bytewave-apps.com/terms',
          contains: 'Terms'
        }) + '.' + $.getElement({
          tag: 'input',
          type: 'checkbox',
          id: 'agree'
        }) + $.getElement({
          tag: 'span',
          class: 'checkmark'
        })
      })
    }) + $.getElement({
      id: 'account-type',
      class: 'grid-2 hidden',
      contains: $.getElement({
        tag: 'a',
        "aria-label": 'Business account',
        id: 'business',
        alt: 'Business account',
        class: 'btn',
        onclick: "chooseType('business');",
        contains: 'Business Account'
      }) + $.getElement({
        tag: 'a',
        "aria-label": 'Personal account',
        id: 'personal',
        alt: 'Personal account',
        class: 'btn',
        onclick: "chooseType('personal');",
        contains: 'Personal Account'
      })
    }) + $.getElement({
      tag: 'a',
      "aria-label": 'Next',
      id: 'next',
      alt: 'Next',
      class: 'btn',
      onclick: 'nextStep();',
      contains: 'Next'
    }) + $.getElement({
      tag: 'button',
      id: 'finish',
      type: 'submit',
      class: 'btn hidden',
      onclick: 'register();',
      contains: `Finish`
    })
  }) + $.getElement({
    contains: $.getElement({
      tag: 'a',
      "aria-label": 'Back',
      id: 'back',
      class: 'link inline',
      alt: 'Back',
      onclick: 'goBack();',
      contains: 'Back'
    }) + $.getElement({
      class: 'inline',
      contains: '|'
    }) + $.getElement({
      tag: 'a',
      "aria-label": 'Login',
      href: '/login',
      class: 'link inline',
      alt: 'Login',
      contains: 'Login'
    })
  })
});

new Generator(Template, Name).build(File);