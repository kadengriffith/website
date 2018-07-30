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
                contains: 'Browse'
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
              class: 'text-container',
              contains: $.getElement({
                class: 'text-title',
                contains: 'Progressive Web Apps'
              }) + $.getElement({
                class: 'text',
                contains: `A website that can be downloaded on most any device.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `Use your software as an installable application while also maintaining access to what you or your customers need from any device with internet access.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: 'The'
              }) + $.getElement({
                class: 'text-accent',
                contains: 'wave'
              }) + $.getElement({
                class: 'text',
                contains: 'of the future is upon us.'
              })
            }) + $.getElement({
              class: 'phone-promo-1'
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'text-container',
              contains: $.getElement({
                class: 'text-ul lazy anim-left',
                contains: $.getElement({
                  class: 'text-li',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: $.icon({
                      icon: 'bolt'
                    }) + 'Fast'
                  }) + '- Better integrated software improves usability and drives customer conversion.'
                }) + $.getElement({
                  class: 'text-li',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: $.icon({
                      icon: 'thumbs-up'
                    }) + 'Reliable'
                  }) + '- Grow your market with engaging and repeatable actions.'
                }) + $.getElement({
                  class: 'text-li',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: $.icon({
                      icon: 'life-ring'
                    }) + 'Secure'
                  }) + '- Ensure that data you rely on is protected.'
                }) + $.getElement({
                  class: 'text-li',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: $.icon({
                      icon: 'fingerprint'
                    }) + 'Custom'
                  }) + '- Best of all. We use unique styling and components to encapsulate the design ideas you have for your business.'
                })
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'text-container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: $.icon({
                  icon: 'bolt'
                }) + 'Fast'
              }) + $.getElement({
                class: 'text',
                contains: `We take advantage of the latest language capabilities and work with the highest grade of optimization to deliver the fastest speeds the web can offer.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `Any idea you can think of can come to life and outperform most of the leading names in web software.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'text-container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: $.icon({
                  icon: 'thumbs-up'
                }) + 'Reliable'
              }) + $.getElement({
                class: 'text',
                contains: `Eliminate frustating layouts and let designers who know their way around user interfaces and intense workflows make your life easier in every context.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `We make software that works for you, and delivers a message that always puts your business in the spotlight.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `Byte Wave software is never out-of-date or incompatible for its users.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'text-container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: $.icon({
                  icon: 'life-ring'
                }) + 'Secure'
              }) + $.getElement({
                class: 'text',
                contains: `We use the latest security and encryption by default.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `Rest easy knowing that your customer's data is always out of reach from the public. We only work through highly vetted third-parties and we never rely on unstable code.`
              })
            })
          }) + $.getElement({
            class: 'tile',
            contains: $.getElement({
              class: 'text-container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: $.icon({
                  icon: 'fingerprint'
                }) + 'Custom'
              }) + $.getElement({
                class: 'text',
                contains: `The engineers at Byte Wave build apps from the ground up. No templates.`
              }) + $.dln() + $.getElement({
                class: 'text',
                contains: `We produce gold standard custom code. Made just how you need it.`
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

    navMenuLink(options) {
      if(/signin/.test(options.preset)) {
        $.getElement({
          class: 'link sign-in',
          contains: 'Sign in',
          onclick: "showPage('signin');"
        })
      } else if(/profile/.test(options.preset)) {
        return $.getElement({
          class: 'link profile',
          contains: 'View Account',
          onclick: "showPage('profile');"
        });
      } else if(/admin/.test(options.preset)) {
        return $.getElement({
          class: 'link profile',
          contains: 'Admin Panel',
          onclick: "showPage('profile');"
        });
      }
    }

    signin() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'form-container',
          contains: $.getElement({
            class: 'text-title lazy anim-grow',
            contains: 'Sign In'
          }) + $.getElement({
            class: 'form lazy anim-grow',
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
            class: 'container-centered lazy anim-grow',
            contains: $.getElement({
              onclick: "signin();",
              class: 'main-button',
              contains: 'Sign In'
            })
          }) + $.getElement({
            class: 'container-centered-3 lazy anim-grow',
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
            class: 'text-title lazy anim-grow',
            contains: 'Bytewave Registration'
          }) + $.getElement({
            class: 'form lazy anim-grow',
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
              class: 'container-centered lazy anim-grow',
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

    account(user, asAdmin = false) {
      let details = '',
        subscriptions = '';
      details += $.getElement({
        id: 'profile-account',
        class: 'text',
        contains: `Account Code: ${user.account_code}`
      }) + $.dln();
      details += $.getElement({
        id: 'profile-name',
        class: 'text',
        contains: `${user.first_name} ${user.last_name}`
      }) + $.dln();
      details += $.getElement({
        class: 'text',
        contains: `${user.email}`
      }) + $.dln();

      if(user.billing_plan) {
        for(let project in user.billing_plan) {
          if(!user.billing_plan[project].subscribed) {
            subscriptions += $.getElement({
              class: 'text',
              contains: $.getElement({
                class: 'red inline',
                contains: `Not Active`
              }) + $.getElement({
                class: 'bold inline margin-sides-small',
                contains: `|  ${user.billing_plan[project].name}`
              }) + $.getElement({
                onclick: asAdmin ? '' : "showPage('pay', this);",
                class: `${asAdmin ? '' : 'text-accent link'} inline`,
                contains: `${asAdmin ? '' : 'Pay '}$${user.billing_plan[project].yearly_cost}/year`
              })
            }) + $.ln();
          } else {
            subscriptions += $.getElement({
              class: 'text',
              contains: $.getElement({
                class: 'green inline',
                contains: `Active`
              }) + $.getElement({
                class: 'bold inline margin-sides-small',
                contains: `|  ${user.billing_plan[project].name}`
              }) + `${user.billing_plan[project].yearly_cost}/year`
            }) + $.ln();
          }
        }
      } else {
        details += $.getElement({
          class: 'text',
          contains: `You will recieve an email when your billing plan is processed.`
        });
      }

      if(!asAdmin) {
        details += $.getElement({
          class: 'container-centered lazy anim-grow',
          contains: $.getElement({
            onclick: "logout();",
            class: 'main-button-dark',
            contains: 'Log Out'
          })
        });
      }

      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'profile-container lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title',
              contains: 'Account View'
            }) + details
          })
        }) + $.getElement({
          class: 'profile-container lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title',
              contains: `${asAdmin ? user.first_name + "'s" : 'Your'} Subscriptions`
            }) + $.getElement({
              class: 'text',
              contains: subscriptions.length > 0 ? subscriptions : `No projects found.`
            }) + $.dln()
          })
        })
      });
    }

    admin(firebase, accounts) {
      let details = '';
      accounts.forEach(account => {
        details += $.getElement({
          class: 'text link',
          contains: account.val().account_code,
          onclick: `showPage('account_query', '${account.val().account_code}')`
        }) + $.ln();
      });
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'profile-container lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title',
              contains: 'Admin Panel'
            }) + $.getElement({
              class: 'text subtitle',
              contains: 'Active account list:'
            }) + details
          })
        }) + $.getElement({
          class: 'profile-container lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title',
              contains: 'Actions'
            }) + $.getElement({
              class: 'container-centered lazy anim-grow',
              contains: $.getElement({
                class: 'text subtitle',
                contains: 'Activation:'
              }) + $.getElement({
                tag: 'label',
                class: 'label',
                contains: $.getElement({
                  tag: 'input',
                  placeholder: 'Account Code',
                  pattern: '[0-9]{5,}',
                  class: 'alt-input',
                  id: 'accountCode',
                  required: true
                }) + C.inputIndicator()
              }) + $.getElement({
                onclick: "activateAccount();",
                class: 'main-button-dark',
                contains: 'Activate'
              })
            }) + $.getElement({
              class: 'container-centered lazy anim-grow',
              contains: $.getElement({
                class: 'text subtitle',
                contains: 'Add a subscription:'
              }) + $.getElement({
                tag: 'label',
                class: 'label',
                contains: $.getElement({
                  tag: 'input',
                  placeholder: 'Account Code',
                  pattern: '[0-9]{5,}',
                  class: 'alt-input',
                  id: 'accountCode2',
                  required: true
                }) + C.inputIndicator()
              }) + $.ln() + $.getElement({
                tag: 'label',
                class: 'label',
                contains: $.getElement({
                  tag: 'input',
                  placeholder: 'Yearly $ Cost',
                  pattern: '[0-9]{1,}',
                  class: 'alt-input',
                  id: 'subscriptionAmount',
                  required: true
                }) + C.inputIndicator()
              }) + $.ln() + $.getElement({
                tag: 'label',
                class: 'label',
                contains: $.getElement({
                  tag: 'input',
                  placeholder: 'Name',
                  pattern: '{1,}',
                  class: 'alt-input',
                  id: 'projectName',
                  required: true
                }) + C.inputIndicator()
              }) + $.getElement({
                onclick: "addSubscription();",
                class: 'main-button-dark',
                contains: 'Add'
              })
            }) + $.dln() + $.getElement({
              class: 'container-centered lazy anim-grow',
              contains: $.getElement({
                onclick: "logout();",
                class: 'main-button-dark',
                contains: 'Log Out'
              }) + $.dln()
            })
          })
        })
      });
    }

    pay(user, project) {
      return $.getElement({
        class: 'wrapper',
        contains: user.first_name
      });
    }

    support() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title color-light',
              contains: 'Support'
            })
          }) + $.getElement({
            class: 'text-container container-centered',
            contains: $.getElement({
              class: 'text color-light',
              contains: 'For any questions or technical support please contact:' + $.dln() + 'Kaden Griffith, Founder & Lead Engineer' + $.ln() + $.getElement({
                tag: 'a',
                class: 'link',
                href: 'mailto:kaden@bytewave-apps.com',
                alt: 'Support Email',
                contains: 'kaden@bytewave-apps.com'
              })
            })
          })
        })
      });
    }

    privacyPolicy() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          class: 'lazy anim-grow',
          contains: $.getElement({
            class: 'text-container',
            contains: $.getElement({
              class: 'text-title',
              contains: 'Privacy Policy'
            })
          }) + $.getElement({
            id: 'policy',
            class: 'text-container container-centered',
            contains: $.getElement({
              class: 'text',
              contains: `This Privacy Policy details the access to and use of our services, including file creation, file management, email notifications, any affiliated application use, and other service instances link to this Policy collectively, and will be referred to as “Services” in this document. Any text, links, graphics, photos, audio, videos, information, or other materials or arrangements of materials uploaded, downloaded or appearing on the Services will be referred to as “Content." The words “you” and “your” as used in this Policy shall refer to any entity operating Byte Wave software.`
            }) + $.ln() + $.getElement({
              class: 'text',
              contains: `In order for Byte Wave to operate we record email addresses and personal information for authentication and so that we may better our communication with you. Absolutely all of the information Byte Wave collects is not shared, disclosed, read or sold to any party unless (i) it is necessary to share information in order to legally investigate or take action regarding illegal activities, suspected fraud, or any other threats that may harm the Services or the Content of others, (ii) any Byte Wave Entity deems necessary investigation of data, or (iii) you have authorized Byte Wave to view your information and in some cases alter mistakes or apply any refund, this may include and not be limited to any information you have shared with an Byte Wave Entity or any other Service.`
            }) + $.ln() + $.getElement({
              class: 'text',
              contains: `Cookies may be a necessary feature for Byte Wave software operation. A Cookie is a small amount of session data that is stored on your computer. This browser feature may inhibit user experience if inactive or blocked. Location data may be used as well to provide a better user experience, however you have the ability to disable this feature if you wish.`
            }) + $.ln() + $.getElement({
              class: 'text',
              contains: `Byte Wave uses third-party vendors to provide necessary hardware, software, networking, storage, and any other related technology or content required to run our Services. Byte Wave claims ownership of any code, database, and the Byte Wave software, although you own and retain all rights to your data and Content.`
            }) + $.ln() + $.getElement({
              class: 'text',
              contains: `If any change to this Policy occurs you may be notified via email notification. If you have any questions or concerns about our Privacy Policy please contact ` + $.getElement({
                tag: 'a',
                class: 'link',
                href: 'mailto:kaden@bytewave-apps.com',
                alt: 'Support Email',
                contains: 'kaden@bytewave-apps.com'
              }) + ` for further information.`
            })
          }) + $.dln()
        }) + C.footer()
      });
    }
  }

  module.exports = new Pages();
})();