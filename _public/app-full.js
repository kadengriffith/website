// Author: Kaden Griffith
// Descr : Window Functions

const $ = require('kbrew_hypertxt')(),
  anime = require('animejs');

require('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
require('https://www.paypalobjects.com/api/checkout.js');

module.exports = {
  load: () => {
    anime({
      targets: '.background',
      points: [{
          value: '1920,1080 1596.1,1080 0,1080 0,0 464,133 960,691'
        },
        {
          value: '1655,1080 757,1080 0,1080 0,683 395,883 973,856'
        },
        {
          value: '1655,1130 727,1154 0,1080 0,946 346,1064 861,1130'
        },
        {
          value: '1655,1130 727,1154 -43,1094 -13,1135 340,1201 861,1130'
        }
      ],
      easing: 'easeInOutBack',
      duration: 1500,
      loop: false
    });

    anime({
      targets: '.hero-logo',
      easing: 'easeInOutBack',
      translateX: -1 * window.innerWidth * 2,
      elasticity: 200,
      opacity: 0,
      duration: 1200,
      direction: 'reverse',
      delay: 200,
      rotate: '4turn',
      complete: amin => {
        anime({
          targets: '.hero-text',
          duration: 600,
          opacity: 1,
          easing: 'easeInOutBack',
        });
        anime({
          targets: '.hero-button',
          duration: 900,
          opacity: 1,
          easing: 'easeInOutBack',
        });
        let animationRunning = false;
        anime({
          targets: '.hero-logo',
          rotate: '4turn',
          delay: 5000,
          duration: 5000,
          loop: true,
          easing: 'easeInOutBack',
          direction: 'alternate',
          run: anim => {
            function typeWord() {
              let words = ['Ride', 'Catch', 'See', 'Feel', 'Become', 'Join', 'Share'],
                index = Math.floor(Math.random() * words.length),
                r = $.get('.hero-text').innerHTML;

              if(new RegExp(words[index]).test(r)) {
                if(index === 0) {
                  index++;
                } else {
                  index--;
                }
              }

              let a = Array.from(words[index]),
                i = a.length - 1;

              $.get('.hero-text').innerHTML = r.replace(/(Ride|Catch|See|Feel|Become|Join|Share)/, '');;

              function Loop() {
                setTimeout(() => {
                  $.get('.hero-text').innerHTML = `${a[i]}${$.get('.hero-text').innerHTML}`;
                  i--;
                  if(i >= 0) Loop();
                }, 100)
              }

              Loop();
            }

            if(anim.progress === 100) typeWord();
          }
        });
      }
    });

    // Shows overlay screen
    window.displayPopover = contains => {
      toggleMenu(false);
      $.add($.get('#popover'), $.getElement({
        class: 'popoverCue-off',
        onclick: "javascript:hidePopover();",
        contains: $.icon({
          icon: 'times'
        })
      }) + $.getElement({
        class: 'popover-content',
        contains: contains
      }));
      $.get('#popover').display = 'block';
    };

    window.hidePopover = () => {
      $.get('#popover').display = 'none';
      $.clear($.get('#popover'));
    };

    window.showScreen = () => {
      displayPopover($.getElement({
        class: 'amount',
        contains: $.getElement({
          class: 'amount-main',
          contains: $.getElement({
            class: 'amount-up',
            onclick: "javascript:amountUp();",
            contains: $.icon({
              icon: 'arrow-up'
            })
          }) + $.icon({
            icon: 'dollar-sign',
            style: 'font-size:32px;'
          }) + $.getElement({
            class: 'amount-text',
            contains: '5.00'
          }) + $.getElement({
            class: 'amount-down',
            onclick: "javascript:amountDown();",
            contains: $.icon({
              icon: 'arrow-down'
            })
          }) + $.getElement({
            class: 'amount-array',
            contains: $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`5.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '5.00'
            }) + $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`10.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '10.00'
            }) + $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`20.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '20.00'
            }) + $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`50.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '50.00'
            }) + $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`100.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '100.00'
            }) + $.getElement({
              class: 'amount-option',
              onclick: "javascript:amountChoose(`1000.00`);",
              contains: $.icon({
                icon: 'dollar-sign'
              }) + '1000.00'
            })
          })
        })
      }) + $.getElement({
        id: 'paypal-container'
      }));
      let amt = Number($.get('.amount-text').innerHTML);
      paypal.Button.render({
        env: 'production',
        style: {
          layout: 'vertical',
          size: 'medium',
          shape: 'rect',
          color: 'silver'
        },
        funding: {
          allowed: [paypal.FUNDING.CARD, paypal.FUNDING.CREDIT]
        },
        client: {
          sandbox: `ASrkKYmRH3eD027wqYDAbaHwVwwKrFU3_M2kyLB2oeHcdyLgW7_s30YQaMQA7DniO9WghPsSrPegvXKu`,
          production: `ARzt2LSntzEGwv_djVtWEeGNv8L7gOEb4fh1QzjdLZywIcDZ3HMUMLRPJW1CWuyHo5Ko5_qJDukJZBW1`
        },
        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [{
                amount: {
                  total: amt,
                  currency: 'USD'
                },
                description: 'Coffee Money'
              }]
            }
          });
        },
        onAuthorize: (data, actions) => {
          return actions.payment.execute().then(() => {
            hidePopover();
            displayPopover('Thank you for being awesome!');
          });
        }
      }, '#paypal-container');
    };

    window.download = () => {
      $$.installPrompt.prompt();
    };
  }
};