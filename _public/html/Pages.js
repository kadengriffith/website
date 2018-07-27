// Pages

(() => {
  const $ = require('kbrew_hypertxt'),
    C = require('./Components');

  'use strict';

  class Pages {
    index() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
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
                class: 'hero-button disabled',
                contains: 'Browse',
                onclick: "showPage('browse')"
              }) + $.getElement({
                class: 'hero-button hvr-bounce-to-top',
                contains: 'Register',
                onclick: "showPage('register')"
              })
            }) + $.getElement({
              class: 'hero-logo'
            })
          })
        }) + $.getElement({
          class: 'tile-container',
          contains: $.getElement({
            class: 'tile lazy anim-right',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-title',
                contains: 'Progressive Web Apps'
              }) + $.getElement({
                class: 'tile-text',
                contains: `It's like a website but with app capabilities.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `Use your software as an installable application while also maintaining access to what you or your customers need from any device with internet access.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: 'The'
              }) + $.getElement({
                class: 'tile-text-accent',
                contains: 'wave'
              }) + $.getElement({
                class: 'tile-text',
                contains: 'of the future is upon us.'
              })
            }) + $.getElement({
              class: 'phone-promo-1'
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-ul lazy anim-left',
                contains: $.getElement({
                  class: 'tile-text-li',
                  contains: $.getElement({
                    class: 'tile-text-accent',
                    contains: $.icon({
                      icon: 'bolt'
                    }) + 'Fast'
                  }) + '- Better integrated software improves usability and drives customer conversion.'
                }) + $.getElement({
                  class: 'tile-text-li',
                  contains: $.getElement({
                    class: 'tile-text-accent',
                    contains: $.icon({
                      icon: 'thumbs-up'
                    }) + 'Reliable'
                  }) + '- Grow your market with engaging and repeatable actions.'
                }) + $.getElement({
                  class: 'tile-text-li',
                  contains: $.getElement({
                    class: 'tile-text-accent',
                    contains: $.icon({
                      icon: 'life-ring'
                    }) + 'Secure'
                  }) + '- Ensure that your data is protected with the most advanced encryption available.'
                }) + $.getElement({
                  class: 'tile-text-li',
                  contains: $.getElement({
                    class: 'tile-text-accent',
                    contains: $.icon({
                      icon: 'fingerprint'
                    }) + 'Custom'
                  }) + '- Best of all. We use custom styling and components to encapsulate the design ideas you have for your business.'
                })
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-title lazy anim-left',
                contains: $.icon({
                  icon: 'bolt'
                }) + 'Fast'
              }) + $.getElement({
                class: 'tile-text',
                contains: `We take advantage of the latest language capabilities and work with the highest grade optimizers to deliver the fastest speed the web can offer.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `Any idea you can think of can come to life and outperform most of the leading names in web software.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-title lazy anim-right',
                contains: $.icon({
                  icon: 'thumbs-up'
                }) + 'Reliable'
              }) + $.getElement({
                class: 'tile-text',
                contains: `Eliminate frustating workflows or layouts and let designers who know their way around user interfaces make your life easier.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `We make software that works for you, and delivers a message that always puts your business in the spotlight.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-title lazy anim-left',
                contains: $.icon({
                  icon: 'life-ring'
                }) + 'Secure'
              }) + $.getElement({
                class: 'tile-text',
                contains: `Use the latest security and encryption by default.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `Rest easy knowing that your customer's data is always out of reach from the public. We authorize online payments only through highly vetted third-parties and we never rely on unstable code.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `Bytewave-made software is never out-of-date or incompatible.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'tile-text-container',
              contains: $.getElement({
                class: 'tile-text-title lazy anim-right',
                contains: $.icon({
                  icon: 'fingerprint'
                }) + 'Custom'
              }) + $.getElement({
                class: 'tile-text',
                contains: `The engineers at Bytewave build apps from the ground up.`
              }) + $.dln() + $.getElement({
                class: 'tile-text',
                contains: `No templates. Always custom code. Made just for you.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'whale-container',
              contains: $.getElement({
                class: 'whale'
              }).repeat(3)
            })
          })
        }) + C.footer()
      });
    }

    signin() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'form-container',
          contains: $.getElement({
            class: 'tile-text-title lazy anim-to-bottom',
            contains: 'Sign In'
          }) + $.getElement({
            class: 'form lazy anim-to-bottom',
            contains: $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Email',
                class: 'input',
                id: 'emanresu',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Password',
                class: 'input',
                minlength: 8,
                type: 'password',
                id: 'drowssap',
                required: true
              }) + C.inputIndicator()
            })
          }) + $.getElement({
            class: 'container-centered lazy anim-left',
            contains: $.getElement({
              onclick: "signin();",
              class: 'main-button',
              contains: 'Sign In'
            })
          }) + $.getElement({
            class: 'container-centered-3 lazy anim-left',
            contains: $.getElement({
              onclick: "showScreen('accountServices');",
              class: 'link',
              contains: 'Account Services'
            }) + $.icon({
              icon: 'life-ring'
            }) + $.getElement({
              onclick: "send('forgotPassword')",
              class: 'link',
              contains: 'Forgot Password?'
            })
          })
        }) + $.getElement({
          class: 'form-container-end'
        })
      });
    }

    register() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'form-container',
          contains: $.getElement({
            class: 'tile-text-title lazy anim-to-bottom',
            contains: 'Bytewave Registration'
          }) + $.getElement({
            class: 'form lazy anim-to-bottom',
            contains: $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Account Code',
                pattern: '[0-9]{5,}',
                class: 'input',
                id: 'accountCode',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'First Name',
                class: 'input',
                id: 'first',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Last Name',
                class: 'input',
                id: 'last',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Email',
                pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}',
                class: 'input',
                id: 'email',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Password',
                minlength: 8,
                class: 'input',
                id: 'password',
                type: 'password',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              tag: 'label',
              class: 'label',
              contains: $.getElement({
                tag: 'input',
                placeholder: 'Repeat Password',
                class: 'input',
                minlength: 8,
                id: 'password-c',
                type: 'password',
                required: true
              }) + C.inputIndicator()
            }) + $.getElement({
              class: 'container-centered lazy anim-left',
              contains: $.getElement({
                onclick: "register();",
                class: 'main-button',
                contains: 'Register'
              }) + $.dln()
            })
          }) + $.getElement({
            class: 'form-container-end'
          })
        })
      });
    }

    account(user) {
      let details = '';
      details += $.getElement({
        id: 'profile-account',
        class: 'tile-text',
        contains: `Account Code: ${user.account_code}`
      }) + $.dln();
      details += $.getElement({
        id: 'profile-name',
        class: 'tile-text',
        contains: `${user.first_name} ${user.last_name}`
      }) + $.dln();
      details += $.getElement({
        class: 'tile-text',
        contains: `Registered Email: ${user.email}`
      });
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'profile-container lazy anim-to-bottom',
          contains: $.getElement({
            class: 'tile-text-container',
            contains: $.getElement({
              class: 'tile-text-title',
              contains: 'Account View'
            }) + details + $.getElement({
              class: 'container-centered lazy anim-left',
              contains: $.getElement({
                onclick: "logout();",
                class: 'main-button-dark',
                contains: 'Log Out'
              })
            })
          })
        }) + $.getElement({
          class: 'profile-container lazy anim-to-bottom',
          contains: $.getElement({
            class: 'tile-text-container',
            contains: $.getElement({
              class: 'tile-text-title',
              contains: 'History'
            }) + $.getElement({
              class: 'tile-text',
              contains: `No applications found.`
            }) + $.dln()
          })
        }) + C.footer()
      });
    }
  }

  module.exports = new Pages();
})();