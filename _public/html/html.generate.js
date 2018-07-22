// author: Kaden Griffith
// descr : Generate HTML and create full index.html before packing

(() => {
  'use strict';

  // Dependencies
  const fs = require('fs'),
    path = require('path'),
    C = require('./Components')(),
    $ = require('kbrew_hypertxt')(),
    _url = 'index.html';

  String.prototype.splice = (idx, rem, str) => {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  // Grabs index.html
  const _Index = (_file = path.join(__dirname, _url)) => {
    return new Promise(resolve => {
      resolve(fs.readFileSync(_file, 'utf8'));
    });
  };

  // Main entry point and operation
  async function generate_index() {
    const result = await _Index();
    rewriteIndex(result);
  }

  // Write the correct caching array to file before Firebase deploy
  function rewriteIndex(indexContent) {
    console.log(`A new index.html is being written...\n`);
    const root = C.menu() + C.navbar() + C.spacer() + $.getElement({
      class: 'wrapper',
      contains: $.getElement({
        id: 'popover',
        contains: $.getElement({
          class: 'popover-loading',
          contains: $.getElement({
            class: 'loading-indicator rotating'
          })
        })
      }) + $.getElement({
        class: 'main',
        contains: $.getElement({
          tag: 'svg',
          viewbox: '0 0 1920 1080',
          contains: $.getOpenElement({
            tag: 'polygon',
            class: 'background',
            alt: "Welcome to Byte Wave",
            points: '1920,1080 1596.1,1080 0,1080 0,0 852,0 1920,0'
          })
        }) + $.getElement({
          class: 'hero-content',
          contains: $.getElement({
            class: 'hero-text',
            contains: 'Join the wave.'
          }) + $.getElement({
            class: 'hero-button-container',
            contains: $.getElement({
              class: 'hero-button hvr-bounce-to-top',
              contains: 'Browse',
              onclick: "showScreen('browse')"
            }) + $.getElement({
              class: 'hero-button hvr-bounce-to-top',
              contains: 'Register',
              onclick: "showScreen('register')"
            })
          }) + $.getElement({
            class: 'hero-logo'
          })
        })
      }) + $.getElement({
        class: 'tile-container',
        contains: $.getElement({
          class: 'tile',
          contains: $.getElement({
            class: 'tile-text',
            contains: 'test text'.repeat(40)
          }) + $.getElement({
            class: 'phone-promo-1',
          })
        }) + $.getElement({
          class: 'tile',
          contains: $.getElement({
            class: 'laptop-promo-1',
          })
        }) + $.getElement({
          class: 'tile',
          contains: $.bIcon({
            icon: 'twitter',
            class: 'display-icon'
          }).repeat(3)
        }) + $.getElement({
          class: 'tile',
          contains: $.bIcon({
            icon: 'twitter',
            class: 'display-icon'
          }).repeat(3)
        })
      }) + C.footer()
    });

    let ex = /<div id="root">/g;

    ex.test(indexContent);

    const rightContext = RegExp.rightContext.toString(),
      leftContext = RegExp.leftContext.toString(),
      final = `${leftContext}<div id="root">${root}${rightContext}`;

    fs.unlinkSync(path.join(__dirname, _url));
    fs.writeFileSync(path.join(__dirname, _url), final);

    console.log(`...done\n`);
  }

  return generate_index().catch(err => console.error(err));
})();