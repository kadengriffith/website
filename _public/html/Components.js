// Components

(() => {
  const $ = require('kbrew_hypertxt');

  'use strict';

  class C {
    constructor() {
      this.build = $.jsonParseGrab(require('../../package'), 'version');
    }

    // Components
    navbar() {
      return $.getElement({
        class: 'nav',
        contains: $.getElement({
          class: 'nav-logo',
          onclick: "showPage('learn');"
        }) + $.getElement({
          class: 'menuCue',
          contains: $.icon({
            icon: 'bars',
            onclick: "toggleMenu(true);"
          })
        }) + this.links()
      });
    }

    menu() {
      return $.getElement({
        class: 'menu',
        contains: $.icon({
          class: 'menuCue-off',
          icon: 'times',
          onclick: "toggleMenu(false);"
        }) + this.links() + $.dln()
      });
    }

    messeges() {
      return $.getElement({
        id: 'messages'
      });
    }

    links() {
      return $.getElement({
        class: 'signedinstate',
        contains: $.getElement({
          class: 'link sign-in',
          contains: 'Sign in',
          onclick: "showPage('signin');"
        })
      });
    }

    footerLinks() {
      return $.getElement({
        tag: 'a',
        href: 'https://twitter.com/bytewave_apps',
        target: 'new',
        class: 'link-larger',
        alt: 'Byte Wave LLC Twitter',
        contains: $.bIcon({
          icon: 'twitter'
        })
      }) + $.getElement({
        tag: 'ul',
        class: 'link-footer-group',
        contains: $.getElement({
          tag: 'li',
          contains: $.getElement({
            class: 'link-footer',
            contains: 'Privacy Policy',
            onclick: "showPage('privacy-policy');"
          })
        })
      }) + $.getElement({
        tag: 'ul',
        class: 'link-footer-group',
        contains: $.getElement({
          tag: 'li',
          contains: $.getElement({
            class: 'link-footer',
            contains: 'Support',
            onclick: "showPage('support');"
          })
        })
      });
    }

    spacer() {
      return $.getElement({
        class: 'head-spacer'
      });
    }

    footer() {
      return $.getElement({
        class: 'footer',
        contains: $.getElement({
          class: 'footer-link-area',
          contains: this.footerLinks()
        }) + $.getElement({
          class: 'footer-end',
          contains: $.getElement({
            class: 'build-version',
            contains: 'Version ' + this.build
          }) + $.getElement({
            class: 'footer-copyright',
            contains: 'Byte Wave LLC (c) 2018, All rights reserved.'
          })
        })
      });
    }

    inputIndicator(options = {}) {
      let d = {
        w: options.width ? options.width : 20,
        h: options.height ? options.height : 20
      };
      return $.getElement({
        tag: 'svg',
        viewbox: `0 0 ${d.w} ${d.h}`,
        class: 'input-indicator',
        contains: $.getOpenElement({
          tag: 'path',
          d: `M0 0 L${d.w / 2} ${d.h / 2} L0 ${d.h}`
        })
      });
    }
  }

  module.exports = new C();
})();