// Pages
'use strict';

const $ = require('kbrew_hypertxt'),
  C = require('./Components'),
  u = require('./Util');

(() => {
  class Pages {
    index() {
      return $.getElement({
        class: 'wrapper',
        contains: $.getElement({
          id: 'hero',
          contains: $.getElement({
            tag: 'svg',
            viewbox: `0 0 1920 1080`,
            contains: $.getOpenElement({
              tag: 'polygon',
              class: 'background',
              alt: "Welcome to Byte Wave",
              points: `1920,1080 1596.1,1080 0,1080 0,0 852,0 1920,0`
            })
          }) + $.getElement({
            class: 'hero-container',
            contains: $.getElement({
              id: 'join',
              class: 'text-title',
              contains: 'Join the wave.'
            }) + $.getElement({
              class: 'hero-button hvr-bounce-to-top',
              contains: 'Register',
              alt: 'Registration Button',
              onclick: "showPage('register');"
            }) + $.getElement({
              class: 'hero-logo'
            })
          })
        }) + $.getElement({
          id: 'learn',
          contains: $.getElement({
            id: 'learn-1',
            class: 'lazy anim-right',
            contains: $.getElement({
              class: 'text-title',
              contains: 'Progressive Web Apps'
            }) + $.getElement({
              class: 'container',
              contains: $.getElement({
                class: 'container',
                contains: $.getElement({
                  class: 'text',
                  contains: `A website that can be downloaded on any device.`
                }) + $.getElement({
                  class: 'text',
                  contains: `Use your software as an installable application while also maintaining access to what you or your customers need from any device with internet access.`
                }) + $.getElement({
                  class: 'text',
                  contains: `The ${$.getElement({class: 'text-accent', contains: 'wave'})} of the future is upon us.`
                })
              }) + $.getElement({
                id: 'phone-promo'
              })
            })
          }) + $.getElement({
            id: 'learn-2',
            contains: $.getElement({
              class: 'container',
              contains: $.getElement({
                tag: 'ul ',
                contains: $.getElement({
                  tag: 'li',
                  class: 'lazy anim-left',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: `${$.icon({icon: 'bolt'})} Fast`
                  }) + '- Better integrated software improves usability and drives customer conversion.'
                }) + $.getElement({
                  tag: 'li',
                  class: 'lazy anim-left',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: `${$.icon({icon: 'thumbs-up'})} Reliable`
                  }) + '- Grow your market with engaging and repeatable actions.'
                }) + $.getElement({
                  tag: 'li',
                  class: 'lazy anim-left',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: `${$.icon({icon: 'life-ring'})} Secure`
                  }) + '- Ensure that data you rely on is protected.'
                }) + $.getElement({
                  tag: 'li',
                  class: 'lazy anim-left',
                  contains: $.getElement({
                    class: 'text-accent',
                    contains: `${$.icon({icon: 'fingerprint'})} Custom`
                  }) + '- Best of all. We use unique styling and components to encapsulate the design ideas you have for your business.'
                })
              })
            })
          }) + $.getElement({
            class: 'section',
            contains: $.getElement({
              class: 'container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: `${$.icon({icon: 'bolt'})} Fast`
              }) + $.getElement({
                class: 'text',
                contains: `Take advantage of the latest language capabilities and optimization to deliver the fastest speeds the web can offer.`
              }) + $.getElement({
                class: 'text',
                contains: `Any idea you can think of will come to life and outperform the majority of other websites.`
              })
            })
          }) + $.getElement({
            class: 'section',
            contains: $.getElement({
              class: 'container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: `${$.icon({icon: 'thumbs-up'})} Reliable`
              }) + $.getElement({
                class: 'text',
                contains: `Eliminate frustating layouts and let workflow designers make your life easier in every context.`
              }) + $.getElement({
                class: 'text',
                contains: `We make software that works for you and delivers a message that always puts your business in the spotlight.`
              }) + $.getElement({
                class: 'text',
                contains: `Byte Wave software is never out-of-date or incompatible for its users.`
              })
            })
          }) + $.getElement({
            class: 'section',
            contains: $.getElement({
              class: 'container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: `${$.icon({icon: 'life-ring'})} Secure`
              }) + $.getElement({
                class: 'text',
                contains: `We use the latest security and encryption by default.`
              }) + $.getElement({
                class: 'text',
                contains: `Rest easy knowing that your customer's data is always out of reach from the public. We only work through highly vetted third-parties and we never rely on unstable code.`
              })
            })
          }) + $.getElement({
            class: 'section',
            contains: $.getElement({
              class: 'container',
              contains: $.getElement({
                class: 'text-title lazy anim-grow',
                contains: `${$.icon({icon: 'fingerprint'})} Custom`
              }) + $.getElement({
                class: 'text',
                contains: `The engineers at Byte Wave build apps from the ground up. No templates.`
              }) + $.getElement({
                class: 'text',
                contains: `We produce the best in custom code. Made just how you need it.`
              })
            })
          }) + $.getElement({
            class: 'whale-container',
            contains: $.getElement({
              class: 'whale'
            }).repeat(3)
          }) + C.footer()
        })
      });
    }

    navMenuLink(options) {
      if(/signin/.test(options.preset)) {
        return $.getElement({
          class: 'link sign-in',
          contains: 'Sign in',
          onclick: "showPage('signin');"
        })
      } else if(/(profile|admin)/.test(options.preset)) {
        return $.getElement({
          class: 'link profile',
          contains: options.preset === 'profile' ? 'View Account' : 'Admin Panel',
          onclick: "showPage('profile');"
        });
      }
    }

    signin() {
      return $.getElement({
        class: 'form-container',
        contains: $.getElement({
          class: 'text-title lazy anim-grow',
          contains: 'Sign In'
        }) + $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: 'return signin();',
          class: 'lazy anim-grow',
          contains: $.getElement({
            tag: 'label',
            class: 'label',
            contains: $.getElement({
              tag: 'input',
              placeholder: 'Email',
              type: 'email',
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
          }) + $.getElement({
            class: 'container lazy anim-grow',
            contains: $.getElement({
              tag: 'button',
              type: 'submit',
              class: 'main-button',
              contains: 'Sign In'
            })
          })
        }) + $.getElement({
          class: 'container lazy anim-grow',
          contains: $.getElement({
            onclick: "showPage('account-services');",
            class: 'link',
            contains: 'Account Services'
          }) + $.icon({
            icon: 'life-ring'
          }) + $.getElement({
            onclick: "send('forgotPassword')",
            class: 'link',
            contains: 'Forgot Password?'
          })
        }) + $.dln()
      }) + $.getElement({
        class: 'form-container-end'
      });
    }

    register() {
      return $.getElement({
        class: 'form-container',
        contains: $.getElement({
          class: 'text-title lazy anim-grow',
          contains: 'Bytewave Registration'
        }) + $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: 'return register();',
          class: 'lazy anim-grow',
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
              type: 'email',
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
              placeholder: 'Phone (ex. 3074351234)',
              inputmode: 'numeric',
              pattern: '[0-9]{10,10}',
              class: 'input',
              id: 'phone',
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
            class: 'label small-text color-light',
            contains: 'Must have 8+ characters.' + $.ln() + 'Minimum 1 UPPERCASE, 1 lowercase letter.'
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
            class: 'container lazy anim-grow',
            contains: $.getElement({
              tag: 'button',
              type: 'submit',
              class: 'main-button',
              contains: 'Register'
            }) + $.dln()
          })
        }) + $.getElement({
          class: 'form-container-end'
        })
      });
    }

    account(user, asAdmin = false, unsubscribeButton) {
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
      details += $.getElement({
        class: 'text',
        contains: `${user.phone}`
      }) + $.dln();

      if(user.projects) {
        for(let project in user.projects) {
          if(!user.projects[project].subscribed) {
            subscriptions += $.getElement({
              class: 'subscription',
              contains: $.getElement({
                class: 'red',
                contains: `Not Active`
              }) + $.getElement({
                class: 'bold inline-name',
                contains: `${user.projects[project].name}`
              }) + $.getElement({
                onclick: asAdmin ? '' : `showPage('pay', '${user.projects[project].name}');`,
                class: `${asAdmin ? 'text' : 'main-button-green'}`,
                contains: asAdmin ? `Details: $${user.projects[project].yearly_cost} ${user.projects[project].plan.toUpperCase()}` : `Activate<br>$${user.projects[project].yearly_cost}`
              })
            })
          } else {
            let info = '';
            if(asAdmin) {
              info += $.getElement({
                class: 'bold inline-name',
                contains: `${user.projects[project].name}`
              }) + $.getElement({
                contains: `$${user.projects[project].yearly_cost}/year  ${user.projects[project].plan.toUpperCase()}`
              });
            } else {
              info += $.getElement({
                class: 'bold inline-name',
                contains: `${user.projects[project].name} -- ${user.projects[project].plan.toUpperCase()} $${user.projects[project].yearly_cost}/year`
              }) + unsubscribeButton;
            }
            subscriptions += $.getElement({
              class: 'subscription',
              contains: $.getElement({
                class: 'green',
                contains: `Active`
              }) + info
            })
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
          class: 'container',
          contains: $.getElement({
            onclick: "logout();",
            class: 'main-button-dark',
            contains: 'Log Out'
          })
        });
      }

      return $.getElement({
        class: 'text-container lazy anim-grow',
        contains: $.getElement({
          class: 'text-title',
          contains: 'Account View'
        }) + details
      }) + $.getElement({
        class: 'subscriptions-container',
        contains: $.getElement({
          class: 'text-title',
          contains: `${asAdmin ? user.first_name + "'s" : 'Your'} Subscriptions`
        }) + $.getElement({
          class: 'text',
          contains: subscriptions.length > 0 ? subscriptions : `No projects found.`
        }) + $.dln()
      });
    }

    admin(firebase, accounts) {
      let details = '';
      accounts.forEach(account => {
        details += $.getElement({
          class: 'link',
          contains: account.val().account_code,
          onclick: `showPage('account_query', '${account.val().account_code}')`
        }) + $.ln();
      });
      return $.getElement({
        class: 'text-container lazy anim-grow',
        contains: $.getElement({
          class: 'text-title',
          contains: 'Admin Panel'
        }) + $.getElement({
          class: 'text subtitle',
          contains: 'Active Account List:'
        }) + details
      }) + $.getElement({
        class: 'container',
        contains: $.getElement({
          onclick: "logout();",
          class: 'main-button-dark',
          contains: 'Log Out'
        }) + $.dln()
      }) + $.getElement({
        class: 'text-container',
        contains: $.getElement({
          class: 'text-title',
          contains: 'Actions'
        }) + $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: 'return activateAccount();',
          contains: $.getElement({
            class: 'text subtitle',
            contains: 'Activate Account:'
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
            tag: 'button',
            type: 'submit',
            class: 'main-button-dark',
            contains: 'Add'
          })
        }) + $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: 'return addSubscription();',
          contains: $.getElement({
            class: 'text subtitle',
            contains: 'Add a Subscription:'
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
            tag: 'select',
            class: 'select',
            id: 'subscription',
            contains: $.getElement({
              tag: 'option',
              contains: 'Subscription Type'
            }) + $.getElement({
              tag: 'option',
              value: 'max',
              contains: 'Max $1000'
            }) + $.getElement({
              tag: 'option',
              value: 'mid',
              contains: 'Mid $500'
            }) + $.getElement({
              tag: 'option',
              value: 'min',
              contains: 'Min $300'
            }) + $.getElement({
              tag: 'option',
              value: 'mid_family',
              contains: 'Mid - Family $200'
            }) + $.getElement({
              tag: 'option',
              value: 'mid_friend',
              contains: 'Mid - Friend $400'
            })
          }) + $.ln() + $.getElement({
            tag: 'label',
            class: 'label',
            contains: $.getElement({
              tag: 'input',
              placeholder: 'Project Name',
              pattern: '{1,}',
              class: 'alt-input',
              id: 'projectName',
              required: true
            }) + C.inputIndicator()
          }) + $.getElement({
            tag: 'button',
            type: 'submit',
            class: 'main-button-dark',
            contains: 'Add'
          })
        }) + $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: 'return activateSubscription();',
          contains: $.getElement({
            class: 'text subtitle',
            contains: 'Activate Subscription:'
          }) + $.getElement({
            tag: 'label',
            class: 'label',
            contains: $.getElement({
              tag: 'input',
              placeholder: 'Account Code',
              pattern: '[0-9]{5,}',
              class: 'alt-input',
              id: 'accountCode3',
              required: true
            }) + C.inputIndicator()
          }) + $.ln() + $.getElement({
            tag: 'label',
            class: 'label',
            contains: $.getElement({
              tag: 'input',
              placeholder: 'Project Name',
              class: 'alt-input',
              id: 'projectName2',
              required: true
            }) + C.inputIndicator()
          }) + $.getElement({
            tag: 'button',
            type: 'submit',
            class: 'main-button-dark',
            contains: 'Activate'
          })
        }) + $.dln()
      });
    }

    pay(user, project) {
      let details = '';

      function addDetail(label, value) {
        details += $.getElement({
          class: 'text',
          contains: `${label}: ${value}`
        }) + $.ln();
      }

      if(project) {
        addDetail('Account Code', project.account_code);
        addDetail('Project Name', project.name);
        addDetail('Subscription Plan', `${project.plan.toUpperCase()} $${project.yearly_cost}/year`);
        addDetail('Total Due for Activation', `$${project.yearly_cost}`);
      } else {
        showPage('profile');
      }

      let redirect = '';

      if(u.isStandalone() && u.isFullscreen()) {
        redirect += 'If you do not see a subscribe button click this link:' + $.ln() + $.getElement({
          tag: 'a',
          class: 'link',
          target: '_blank',
          href: window.location + '?p=signin',
          alt: 'View profile in browser.',
          contains: 'Open new window.'
        });
      }

      return $.getElement({
        class: 'text-container lazy anim-grow',
        contains: $.getElement({
          class: 'text-title',
          contains: 'Yearly Subscription'
        }) + $.getElement({
          class: 'subtitle',
          contains: 'Please Review:'
        }) + $.getElement({
          class: 'details',
          contains: details
        }) + $.getElement({
          class: 'small-text',
          contains: `You will be redirected to PayPal. Once your payment is recieved your account will be updated to reflect your activation.<br>${redirect}`
        })
      });
    }

    support() {
      return $.getElement({
        class: 'lazy anim-grow',
        contains: $.getElement({
          class: 'text-container',
          contains: $.getElement({
            class: 'text-title',
            contains: 'Support'
          })
        }) + $.getElement({
          id: 'support',
          class: 'text-container',
          contains: $.getElement({
            class: 'text',
            contains: 'For any questions or technical support please contact:' + $.dln() + 'Kaden Griffith, Founder & Lead Engineer' + $.ln() + $.getElement({
              tag: 'a',
              class: 'link',
              href: 'mailto:info@bytewave-apps.com',
              alt: 'Support Email',
              contains: 'info@bytewave-apps.com'
            })
          })
        })
      });
    }

    privacyPolicy() {
      return $.getElement({
        class: 'text-container',
        contains: $.getElement({
          class: 'text-title',
          contains: 'Privacy Policy'
        })
      }) + $.getElement({
        class: 'text-container',
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
            class: 'link inline',
            href: 'mailto:info@bytewave-apps.com',
            alt: 'Support Email',
            contains: 'info@bytewave-apps.com'
          }) + ` for further information.`
        })
      }) + $.dln() + C.footer();
    }
  }

  module.exports = new Pages();
})();