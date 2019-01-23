// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'privacy',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Privacy Policy'
  }) + $.getElement({
    class: 'bold text',
    contains: 'Effective: 6 September 2018'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'How does this site collect data about me?'
  }) + $.getElement({
    class: 'text',
    contains: 'Byte Wave, LLC ("Bytewave") collects data about you:' + $.getElement({
      tag: 'ul',
      contains: $.getElement({
        tag: 'li',
        contains: 'when you submit e-mail addresses for newsletter sign-ups'
      }) + $.getElement({
        tag: 'li',
        contains: 'when you contact Bytewave by e-mail for support or other help'
      })
    })
  }) + $.getElement({
    class: 'text',
    contains: 'Bytewave does not buy or otherwise receive data about you from data brokers.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'What data does Bytewave collect about me, and why?'
  }) + $.getElement({
    class: 'text',
    contains: 'Bytewave software collects data about visits to its web interface(s).'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'Bytewave uses data about how you use this website to:' + $.getElement({
      tag: 'ul',
      contains: $.getElement({
        tag: 'li',
        contains: `optimize the website, so it's quick and easy to use`
      }) + $.getElement({
        tag: 'li',
        contains: 'diagnose and debug technical errors'
      }) + $.getElement({
        tag: 'li',
        contains: 'defend the website from abuse and technical attacks'
      }) + $.getElement({
        tag: 'li',
        contains: 'compile statistics on the kinds of software and computers visitors use'
      })
    })
  }) + $.getElement({
    class: 'text bold',
    contains: 'Bytewave does not make any of this data public and will not sell or allow access to any of the information collected, unless instructed by Law.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'Bytewave uses your e-mail address to:' + $.getElement({
      tag: 'ul',
      contains: $.getElement({
        tag: 'li',
        contains: `announce new versions of Terms or Policies, software, and services`
      }) + $.getElement({
        tag: 'li',
        contains: 'reset your password and help keep your account secure in the case that accounts are necessary for use of the Services'
      }) + $.getElement({
        tag: 'li',
        contains: 'contact you in special circumstances related to your account'
      }) + $.getElement({
        tag: 'li',
        contains: 'contact you about legal requests'
      })
    })
  }) + $.getElement({
    class: 'text',
    contains: 'Bytewave keeps your e-mail address until notified by you to remove it from our systems and Services.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'How can I make choices about data collection?'
  }) + $.getElement({
    class: 'text',
    contains: `You're free to visit any Bytewave entity or site of Service without logging in. You may also configure your web browser to disable cookies when visiting Bytewave websites, however this may limit your ability to interact with the software as intended.`
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'You can opt out of Google Analytics using a browser extension.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Where does Bytewave store data about me?'
  }) + $.getElement({
    class: 'text',
    contains: 'Bytewave stores account data (if applicable), data about website use, on servers in the United States of America.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'You can cancel your Bytewave software subscription or newsletter connection at any time. Your created data will be disposed of, which could take a few days.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Does Bytewave share data about me with others?'
  }) + $.getElement({
    class: 'text',
    contains: 'Bytewave does not sell or give information about you to other companies or services. However, Bytewave does use services from other companies to provide some services, content delivery networks, and to distribute software. The companies behind those services may collect data about you on their own, for their own purposes. Some of these services may be used to collect information about your online activities across different websites. All of these services are based in the United States.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Still have questions?'
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Contact',
    href: '/contact',
    alt: 'Contact',
    class: 'btn',
    contains: 'Contact Us'
  })
});

new Generator(Template, Name).build(File);