// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/admin.scss');

module.exports = {
  load: fb => {
    toggleLoading(false);
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        fb.search({
          collection: 'users',
          key: 'email',
          value: user.email
        }).then(Users => {
          let User = Users[0];
          if (!User.data.administrator) {
            location.href = '/profile';
          }
          registerInputLabels();
        }).catch(err => {
          location.href = '/profile';
        })
        // Add a logout button
        showLogout();
      } else {
        location.href = '/login';
      }
    });

    window.findUser = () => {
      backgroundSearch();
      return false;
    };

    function backgroundSearch() {
      $.get('#results').classList.add('hidden');
      $.get('#loading-search').classList.remove('hidden');

      let input = $.get('#search').value;
      if (input.length > 0) {
        fb.searchForRelated({
          collection: 'users',
          value: input
        }).then(results => {
          $.clear($.get('#results'));

          if (results.length > 0) {
            results.forEach(result => {
              $.add($.get('#results'), $.getElement({
                class: 'result',
                onclick: `viewProfile('${result.data.email}');`,
                contains: `${result.data.first} ${result.data.last}<br>${result.data.email}`
              }));
            });
            $.add($.get('#results'), $.getElement({
              class: 'end',
              contains: 'End of Results.'
            }));
          } else {
            $.add($.get('#results'), $.getElement({
              class: 'end',
              contains: 'No results.'
            }));
          }

          $.get('#loading-search').classList.add('hidden');
          $.get('#results').classList.remove('hidden');
        });
      } else {
        $.get('#loading-search').classList.add('hidden');
        $.get('#results').classList.add('hidden');
      }

      return false;
    }


    function showLogout() {
      $.add($.get('#root'), $.getElement({
        tag: 'a',
        "aria-label": 'Sign out',
        id: 'profile',
        class: 'link',
        alt: 'Sign out',
        contains: $.icon({
          icon: 'sign-out-alt'
        })
      }));

      $.get('#profile').addEventListener('click', () => {
        fb.logout();
      }, false);
    }

    window.viewProfile = email => {
      removeElement($.get('#search-title'));
      removeElement($.get('#search-container'));

      $.get('#client-title').classList.remove('hidden');
      $.get('#user').classList.remove('hidden');

      fb.search({
        collection: 'users',
        key: 'email',
        value: email
      }).then(users => {
        if (users.length > 0) {
          let User = users[0];
          $.add($.get('#user-buttons'), $.getElement({
            tag: 'a',
            "aria-label": 'Search',
            id: 'back',
            alt: 'Search',
            href: '/admin',
            class: 'link',
            contains: 'Back',
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'User information',
            alt: 'User information',
            class: 'link',
            contains: 'Information',
            onclick: `reloadUserInformation('${email}');`
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'User transactions',
            alt: 'User transactions',
            class: 'link',
            contains: 'Payments',
            onclick: `showUserPastTransactions('${User.key}');`
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'User invoices',
            alt: 'User invoices',
            class: 'link',
            contains: 'Invoices',
            onclick: `showUserPendingTransactions('${User.key}');`
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'User projects',
            alt: 'User projects',
            class: 'link',
            contains: 'Projects',
            onclick: `showUserProjects('${User.key}');`
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'User assets',
            alt: 'User assets',
            class: 'link',
            contains: 'Assets',
            onclick: `showUserAssets('${User.key}');`
          }) + $.getElement({
            tag: 'a',
            "aria-label": 'Send user a message',
            alt: 'Send user a message',
            class: 'link',
            contains: 'Message',
            onclick: `showEmailMaker('${User.key}');`
          }));
          $.get('#user-buttons').classList.remove('hidden');
          showUserInformation(User);
        } else {
          displayMessage(`e:No user found.`);
          setTimeout(() => {
            location.href = '/admin';
          }, 5000);
        }
      }).catch(err => {
        displayMessage(`e:${err}`);
      });
      return false;
    };

    window.reloadUserInformation = email => {
      $.clear($.get('#user'));
      fb.search({
        collection: 'users',
        key: 'email',
        value: email
      }).then(users => {
        if (users.length > 0) {
          let User = users[0];
          showUserInformation(User);
        } else {
          displayMessage(`e:No user found.`);
          setTimeout(() => {
            location.href = '/admin';
          }, 5000);
        }
      }).catch(err => {
        displayMessage(`e:${err}`);
      });
    };

    window.showUserInformation = user => {
      $.clear($.get('#user'));
      $.add($.get('#user'), $.getElement({
        class: 'grid',
        contains: $.getElement({
          class: 'section-title',
          contains: 'Profile information.'
        }) + $.getElement({
          id: 'general',
        }) + $.getElement({
          id: 'business',
        })
      }));

      const general = $.get('#general'),
        business = $.get('#business');

      $.add(general, $.getElement({
        class: 'text',
        contains: `<b>CUSTOMER</b>: ${user.data['first']} ${user.data['last']}`
      }));

      let skipped = ['first', 'last', 'transactions', 'analytics', 'timestamp', 'order', 'files'],
        filtered = Object.keys(user.data)
        .filter(key => !skipped.includes(key))
        .reduce((obj, key) => {
          obj[key] = user.data[key];
          return obj;
        }, {});

      for (let prop in filtered) {
        if (!/bus/.test(prop)) {
          $.add(general, $.getElement({
            class: 'text',
            contains: `<b>${prop.toUpperCase()}</b>: ${user.data[prop]}`
          }));
        }
      }

      if (filtered['bus-name']) {
        $.add(business, $.getElement({
          class: 'section-title',
          contains: 'Business information.'
        }));
        $.add(business, $.getElement({
          class: 'text',
          contains: `<b>BUSINESS</b>: ${user.data['bus-name']}`
        }));
      }

      if (filtered['bus-add']) {
        $.add(business, $.getElement({
          class: 'text',
          contains: `<b>ADDRESS</b>: ${user.data['bus-add']}`
        }));
      }

      if (filtered['bus-city']) {
        $.add(business, $.getElement({
          class: 'text',
          contains: `<b>CITY</b>: ${user.data['bus-city']}`
        }));
      }

      if (general.childNodes.length <= 1) {
        $.add(general, $.getElement({
          class: 'text',
          contains: 'Not Available.'
        }));
      }

      if (business.childNodes.length <= 1) {
        business.remove();
      }
      return false;
    };

    window.showUserPastTransactions = account => {
      $.clear($.get('#user'));
      fb.search({
        collection: 'transactions',
        key: 'account',
        value: account,
        orderBy: ['order']
      }).then(transactions => {
        if (transactions.length > 0) {
          transactions.forEach(transaction => {
            $.add($.get('#user'), $.getElement({
              class: 'payment-container',
              contains: $.getElement({
                class: 'payment-title',
                contains: transaction.data.name
              }) + $.getElement({
                class: 'payment-amount',
                contains: `$${transaction.data.amount} USD`
              }) + $.getElement({
                class: 'payment-date',
                contains: transaction.data.timestamp.toDate()
              })
            }));
          });
          $.add($.get('#user'), $.getElement({
            class: 'end',
            contains: 'End of record.'
          }));

        } else {
          $.add($.get('#user'), $.getElement({
            class: 'end',
            contains: 'No Payment History.'
          }));
        }
      }).catch(err => {
        displayMessage(`e:${err}`);
      });
      return false;
    };

    window.showUserPendingTransactions = account => {
      $.clear($.get('#user'));
      fb.search({
        collection: 'pending-transactions',
        key: 'account',
        value: account,
        orderBy: ['order']
      }).then(transactions => {
        if (transactions.length > 0) {
          transactions.forEach(transaction => {
            $.add($.get('#user'), $.getElement({
              class: 'payment-container',
              contains: $.getElement({
                class: 'payment-title',
                contains: transaction.data.name
              }) + $.getElement({
                class: 'payment-amount',
                contains: `$${transaction.data.amount} USD`
              }) + $.getElement({
                class: 'payment-date',
                contains: transaction.data.timestamp.toDate()
              }) + $.icon({
                icon: 'trash-alt',
                class: 'file-delete',
                onclick: `deleteInvoice('${transaction.key}', '${account}');`
              })
            }));
          });
          $.add($.get('#user'), $.getElement({
            class: 'end',
            contains: 'End of record.'
          }));
        } else {
          $.add($.get('#user'), $.getElement({
            class: 'end',
            contains: 'No Pending Transactions.'
          }));
        }

        $.add($.get('#user'), $.getElement({
          tag: 'a',
          "aria-label": 'Create invoice',
          alt: 'Create invoice',
          class: 'btn',
          onclick: `showInvoiceCreate('${account}');`,
          contains: 'Create Invoice'
        }));
      }).catch(err => {
        displayMessage(`e:${err}`);
      });
      return false;
    };

    window.deleteInvoice = (id, account) => {
      if (confirm('Deleting is permanent. Are you sure?')) {
        toggleLoading(true, 'Deleting...');
        fb.delete(id, 'pending-transactions').then(() => {
          showUserPendingTransactions(account);
          toggleLoading(false);
          displayMessage('s:Invoice deleted.');
        });
      }
      return false;
    };

    window.showUserProjects = account => {
      let el = $.get('#user');
      $.clear(el);
      fb.read('users', account)
        .then(User => {
          fb.search({
            collection: 'projects',
            key: 'account',
            value: account
          }).then(projects => {
            if (projects.length > 0) {
              projects.forEach(project => {
                let activeClass = 'project-container';
                if (project.data.active) {
                  activeClass += ' active';
                }
                $.add(el, $.getElement({
                  onclick: `showProject('${project.key}', '${User.data().email}');`,
                  class: activeClass,
                  contains: $.getElement({
                    class: 'project-title',
                    contains: project.data.name
                  }) + $.getElement({
                    class: 'project-type',
                    contains: project.data.type
                  }) + $.getElement({
                    class: 'project-completion',
                    contains: project.data.completion ? project.data.completion.toDate() : 'Awaiting approval...'
                  })
                }));
              });
              $.add(el, $.getElement({
                class: 'end',
                contains: 'End of record.'
              }));
            } else {
              $.add(el, $.getElement({
                class: 'end',
                contains: 'No Projects Found.'
              }));
            }
          }).catch(err => {
            displayMessage(`e:${err}`);
          });
        });
      return false;
    };

    window.showInvoiceCreate = account => {
      let el = $.get('#user');
      $.clear(el);
      $.add(el, $.getElement({
        id: 'section-title',
        class: 'section-title',
        contains: 'Choose invoice type.'
      }) + $.getElement({
        id: 'invoice-type',
        class: 'grid-2',
        contains: $.getElement({
          tag: 'a',
          "aria-label": 'Web application subscription',
          alt: 'Web spplication subscription',
          class: 'btn',
          onclick: `chooseType('service-fee', '${account}');`,
          contains: 'Subscription'
        }) + $.getElement({
          tag: 'a',
          "aria-label": 'Web app subscription with custom email',
          alt: 'Web app subscription with custom email',
          class: 'btn',
          onclick: `chooseType('service-fee-email', '${account}');`,
          contains: 'Subscription w/ Email'
        }) + $.getElement({
          tag: 'a',
          "aria-label": 'Generic payment',
          id: 'generic-payment',
          alt: 'Generic payment',
          class: 'btn',
          onclick: `chooseType('generic-payment', '${account}');`,
          contains: 'Generic Payment'
        })
      }));
      return false;
    };

    window.chooseType = (type, account) => {
      if (type === 'generic-payment') {
        $.get('#section-title').innerHTML = 'Payment request.';
        $.clear($.get('#invoice-type'));
        $.get('#invoice-type').style.setProperty('grid-template-columns', '1fr');
        $.add($.get('#invoice-type'), $.getElement({
          tag: 'form',
          method: 'POST',
          onsubmit: `return requestPayment('${account}');`,
          autocomplete: 'on',
          class: 'grid',
          contains: $.getElement({
            tag: 'label',
            for: 'amount',
            class: 'label',
            id: 'wl-enabled-1',
            contains: $.getElement({
              class: 'word-label',
              contains: 'Requested Amount'
            }) + $.getElement({
              tag: 'input',
              placeholder: '0.00',
              class: 'input',
              type: 'number',
              minLength: 1,
              id: 'amount',
            })
          }) + $.getElement({
            tag: 'textarea',
            "data-gramm": false,
            placeholder: 'Description',
            class: 'input-textarea',
            minLength: 1,
            id: 'description',
          })
        }) + $.getElement({
          tag: 'button',
          class: 'btn',
          type: 'submit',
          onclick: `requestPayment('${account}');`,
          contains: 'Request'
        }));
        registerInputLabels();
      } else {
        let types = [{
            type: 'service-fee',
            amount: '9.99',
            name: 'Service Fee'
          },
          {
            type: 'service-fee-email',
            amount: '24.98',
            name: 'Service Fee w/ Custom Email'
          }
        ];
        for (let invoice of types) {
          if (invoice.type === type) {
            if (confirm('Complete payment request?')) {
              fb.getCollectionLength('pending-transactions').then(length => {
                invoice.account = account;
                invoice.timestamp = new Date();
                invoice.order = length + 1;
                fb.addToCollection('pending-transactions', invoice).then(id => {
                  invoice.id = id;
                  sendInvoice(invoice);
                }).catch(err => {
                  displayMessage(`e:${err}`);
                });
              })
            } else {
              showUserPendingTransactions(account);
            }
            break;
          }
        }
      }
      return false;
    };

    window.requestPayment = account => {
      const amount = $.get('#amount').value,
        description = $.get('#description').value.replace(/\n\r?/g, '<br>');

      if (!account) {
        displayMessage('e:Could not retreive account.');
        return;
      }

      if (confirm('Complete payment request?')) {
        if (amount && amount.length > 0 && description.length > 0) {
          fb.getCollectionLength('pending-transactions').then(length => {
            const invoice = {
              account,
              amount: Number(amount).toFixed(2),
              name: 'Development Fee',
              description,
              type: 'generic-payment',
              timestamp: new Date(),
              order: length + 1
            };

            fb.addToCollection('pending-transactions', invoice).then(id => {
              invoice.id = id;
              sendInvoice(invoice);
            }).catch(err => {
              displayMessage(`e:${err}`);
            });
          });
        } else {
          displayMessage('e:Check input.');
        }
      } else {
        showUserPendingTransactions(account);
      }
      return false;
    };

    window.showEmailMaker = account => {
      $.clear($.get('#user'));
      $.add($.get('#user'), $.getElement({
        class: 'section-title',
        contains: 'Send a message.'
      }) + $.getElement({
        tag: 'form',
        method: 'POST',
        onsubmit: `return constructPreview('${account}');`,
        class: 'grid',
        contains: $.getElement({
          tag: 'textarea',
          "data-gramm": false,
          placeholder: 'Message',
          class: 'input-textarea',
          minLength: 1,
          id: 'content'
        })
      }) + $.getElement({
        tag: 'button',
        class: 'btn',
        type: 'submit',
        onclick: `constructPreview('${account}');`,
        contains: 'Preview'
      }));
      return false;
    };

    window.constructPreview = account => {
      const content = $.get('#content').value.replace(/\n\r?/g, '<br>');
      if (!$.get('#preview')) {
        $.add($.get('#user'), $.getElement({
          tag: 'iframe',
          id: 'preview'
        }) + $.getElement({
          tag: 'a',
          "aria-label": 'Send',
          alt: 'Send',
          class: 'btn',
          onclick: `sendMessage('${account}');`,
          contains: 'Send'
        }));
      }
      fb.read('users', account).then(user => {
        let User = user.data(),
          html = require('../objects/Emails').custom(content, User);
        $.get('#preview').setAttribute("srcdoc", html);
        $.get('#content').value = content;
      });
      return false;
    };

    function sendInvoice(invoice) {
      toggleLoading(true, 'Sending email...');

      const io = require('socket.io-client'),
        socket = io('https://mailing.bytewave-apps.com');
      fb.read('users', invoice.account).then(user => {
        let User = user.data(),
          html = require('../objects/Emails').invoice(User, invoice);
        socket.emit('single-email', {
          html,
          subject: `Invoice #: ${invoice.id} is waiting for your review.`,
          to: User.email,
          plainText: `Invoice #: ${invoice.id} | Your project has been reviewed. If you do not agree to the amount presented on this invoice ($${invoice.amount} USD) please reply to this email. Please visit your Byte Wave profile to pay. If you are having trouble displaying this email please open it in a browser and consider updating your email client.`
        });

        socket.on('mail-sent', data => {
          toggleLoading(false);

          if (!data.err) {
            showUserPendingTransactions(invoice.account);
            displayMessage('s:Invoice sent successfully.');
          } else {
            displayMessage(`e:Mail not sent.${data.err}`);
          }
        });
      });
    }

    window.sendMessage = account => {
      const content = $.get('#content').value;
      toggleLoading(true, 'Sending email...');

      const io = require('socket.io-client'),
        socket = io('https://mailing.bytewave-apps.com');
      fb.read('users', account).then(user => {
        let User = user.data(),
          html = require('../objects/Emails').custom(content, User);
        socket.emit('single-email', {
          sender: 'Kaden @ Byte Wave',
          html,
          subject: '🚀 You have a message',
          to: User.email,
          plainText: 'You have a message from a Byte Wave LLC representative. If you are having trouble displaying this email please open it in a browser.'
        });

        socket.on('mail-sent', data => {
          toggleLoading(false);

          if (!data.err) {
            showEmailMaker(account);
            displayMessage('s:Message sent successfully.');
          } else {
            displayMessage(`e:Mail not sent.`);
          }
        });
      });
      return false;
    };

    window.showProject = (key, email) => {
      fb.search({
        collection: 'users',
        key: 'email',
        value: email
      }).then(Users => {
        fb.search({
          collection: 'projects',
          key: 'account',
          value: Users[0].key
        }).then(results => {
          results.forEach(Project => {
            if (Project.key === key) {
              let deleteButton = '',
                activateButton = '';
              if (!Project.data.active) {
                deleteButton = $.getElement({
                  tag: 'a',
                  "aria-label": 'Delete project',
                  id: 'delete',
                  alt: 'Delete project',
                  class: 'btn',
                  contains: 'Delete Project',
                  onclick: `deleteProject('${Project.key}', '${Users[0].key}');`
                });
                activateButton = $.getElement({
                  tag: 'a',
                  "aria-label": 'Activate project',
                  id: 'activate',
                  alt: 'Activate project',
                  class: 'btn',
                  contains: 'Activate',
                  onclick: `showActivateProject('${Project.key}', '${Users[0].key}');`
                });
              }
              $.clear($.get('#user'));
              $.add($.get('#user'), $.getElement({
                class: 'section-title',
                contains: 'Project details.'
              }) + $.getElement({
                id: 'review'
              }));
              delete Project.data.account;
              for (let prop in Project.data) {
                if (prop === 'colorPalette') {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: 'Color Palette'
                  }));
                  $.add($.get('#review'), $.getElement({
                    id: 'color-collection'
                  }));
                  for (let color of Project.data.colorPalette) {
                    $.add($.get('#color-collection'), $.getElement({
                      class: 'color',
                      onclick: `copyColor('${color}');`,
                      style: `background-color: ${color}`
                    }));
                  }
                } else if (prop === 'addOns') {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: 'Add Ons'
                  }));
                  $.add($.get('#review'), $.getElement({
                    class: 'text',
                    contains: Project.data[prop].join(`<br>`)
                  }));
                } else if (prop === 'estimatedCost') {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: 'Estimation'
                  }));
                  $.add($.get('#review'), $.getElement({
                    class: 'text',
                    contains: Project.data[prop]
                  }));
                } else if (prop === 'active') {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: 'Activated'
                  }));
                  $.add($.get('#review'), $.getElement({
                    class: 'text',
                    contains: Project.data[prop] ? 'Active' : 'Not Active'
                  }));
                } else if (prop === 'completion') {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: 'Estimated Completion'
                  }));
                  $.add($.get('#review'), $.getElement({
                    class: 'text',
                    contains: Project.data[prop].toDate()
                  }));
                } else {
                  $.add($.get('#review'), $.getElement({
                    class: 'table-item',
                    contains: prop
                  }));
                  $.add($.get('#review'), $.getElement({
                    class: 'text',
                    contains: Project.data[prop]
                  }));
                }
              }

              if (!Project.data.active) {
                $.add($.get('#user'), $.getElement({
                  class: 'grid-2',
                  contains: deleteButton + activateButton
                }));
              }
            }
          });
        });
      });
      return false;
    };

    window.deleteProject = (projectKey, userKey) => {
      if (confirm('Are you sure?')) {
        toggleLoading(true, 'Deleting project...');
        fb.delete(projectKey, 'projects').then(() => {
          showUserProjects(userKey);
          toggleLoading(false, 100);
        });
      }
      return false;
    };

    window.copyColor = color => {
      $.add($.get('#root'), $.getElement({
        tag: 'textarea',
        class: 'offscreen',
        id: 'copy'
      }));
      $.get('#copy').setAttribute('readonly', 'readonly');
      $.get('#copy').innerHTML = color;
      $.get('#copy').select();
      document.execCommand('copy');
      removeElement($.get('#copy'));
      displayMessage('s:Color copied to clipboard!');
      return false;
    };

    window.showActivateProject = (key, account) => {
      const el = $.get('#user');
      $.clear(el);
      $.add(el, $.getElement({
        tag: 'form',
        method: 'POST',
        onsubmit: `return activateProject('${key}', '${account}');`,
        class: 'grid',
        contains: $.getElement({
          tag: 'label',
          for: 'amount',
          class: 'label',
          id: 'wl-enabled-1',
          contains: $.getElement({
            class: 'word-label',
            contains: 'Delivery Date'
          }) + $.getElement({
            tag: 'input',
            placeholder: '01/14/2019',
            class: 'input',
            type: 'date',
            minLength: 1,
            id: 'date'
          })
        })
      }) + $.getElement({
        tag: 'button',
        class: 'btn',
        type: 'submit',
        onclick: `activateProject('${key}', '${account}');`,
        contains: 'Activate'
      }));
      return false;
    };

    window.activateProject = (key, account) => {
      if (confirm('Are you sure?')) {
        if ($.get('#date').value.length === 0) {
          displayMessage('e:Check input.');
        } else {
          const d = new Date($.get('#date').value);

          toggleLoading(true, 'Activating project...');
          fb.update('projects', key, {
            active: true,
            completion: d
          }).then(() => {
            sendProjectActivatedMessage(account, d);
            showUserProjects(account);
            toggleLoading(false);
          });
        }
      }
    };

    function sendProjectActivatedMessage(account, date) {
      const io = require('socket.io-client'),
        socket = io('https://mailing.bytewave-apps.com'),
        html = require('../objects/Emails').projectActivated(date);

      fb.read('users', account).then(user => {
        socket.emit('single-email', {
          sender: 'Byte Wave Project Team',
          html,
          subject: '📅 Mark your calendar! Your project has been activated.',
          to: user.data().email,
          plainText: `Your project review is complete. Your project has been activated. Your estimated date of delivery is ${date}. If you are having trouble displaying this email please open it in a browser.`
        });
      });
    }

    window.showUserAssets = account => {
      $.clear($.get('#user'));
      fb.read('users', account).then(result => {
        if (result.data().files && result.data().files.length > 0) {
          result.data().files.forEach(file => {
            $.add($.get('#user'), $.getElement({
              class: 'file',
              contains: $.getElement({
                class: 'file-name',
                contains: file.name
              }) + $.icon({
                icon: 'info-circle',
                class: 'file-date',
                "data-time": `Uploaded On: ${file.timestamp.toDate()}`
              }) + $.getElement({
                class: 'grid',
                contains: $.icon({
                  icon: 'trash-alt',
                  class: 'file-delete',
                  onclick: `deleteFile('${file.path}', '${account}');`
                }) + $.icon({
                  icon: 'download',
                  class: 'file-download',
                  onclick: `downloadFile('${file.path}');`
                })
              })
            }));
          });
        } else {
          $.add($.get('#user'), $.getElement({
            class: 'end',
            contains: 'No Files Found.'
          }));
        }
      }).catch(err => {
        $.add($.get('#user'), $.getElement({
          class: 'end',
          contains: 'No Files Found.'
        }));
        displayMessage('e:Could not load files.');
      });
      return false;
    };

    window.downloadFile = path => {
      fb.storage.ref(path)
        .getDownloadURL()
        .then(downloadURL => {
          $.add($.get('#root'), $.getElement({
            tag: 'a',
            "aria-label": 'Download link',
            alt: 'Download link',
            class: 'offscreen',
            href: downloadURL,
            id: 'download-link',
            download: path.split('/')[1] ? path.split('/')[1] : '0'
          }));
          $.get('#download-link').click();
          removeElement($.get('#download-link'));
          displayMessage('s:Download starting...');
        }).catch(err => {
          displayMessage('e:Could not download file.');
        });
      return false;
    };

    window.deleteFile = (path, account) => {
      if (confirm('Deleting is permanent.Are you sure?')) {
        toggleLoading(true, 'Deleting...');
        fb.storage.ref().child(path).delete().then(() => {
          fb.read('users', account).then(result => {
            if (result) {
              let User = result.data(),
                userFiles = User.files;

              userFiles = userFiles.filter(i => i.path != path);

              fb.update('users', result.id, {
                files: userFiles
              }).then(() => {
                showUserAssets(account);
                toggleLoading(false);
                displayMessage(`s:File was deleted.`);
              }).catch(err => {
                toggleLoading(false);
                displayMessage(`e:${err.message}`);
              });
            }
          }).catch(err => {
            toggleLoading(false);
            displayMessage(`e:Could not update account.`);
          });
        }).catch(err => {
          toggleLoading(false);
          displayMessage(`e:Could not delete file.`);
        });
      }
      return false;
    };

    function removeElement(el) {
      if (el) el.parentNode.removeChild(el);
    }
  }
};