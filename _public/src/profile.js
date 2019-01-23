// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/profile.scss');

module.exports = {
  load: fb => {
    const general = $.get('#gen-information'),
      business = $.get('#bus-information'),
      assets = $.get('#assets'),
      glance = $.get('#glance');

    fb.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        fb.search({
          collection: 'users',
          key: 'email',
          value: user.email
        }).then(Users => {
          let User = Users[0];
          if (User.data.administrator) {
            window.location = '/admin';
          } else {
            toggleLoading(false);
          }
          // Information
          populateInformation(User);
          // Assets Section
          $.clear(assets);
          $.add(assets, $.getElement({
            class: 'end',
            contains: `${User.data.files ? User.data.files.length : '0'} File(s).`
          }));
          // Glance Section
          $.clear(glance);
          if (User.data.analytics) {
            User.data.analytics.forEach(project => {
              $.add(glance, $.getElement({
                class: 'glance-container',
                contains: $.getElement({
                  class: 'glance-title',
                  contains: project.name
                }) + $.getElement({
                  class: 'glance-graph',
                  contains: 'A Graph'
                })
              }));
            });
          } else {
            $.add(glance, $.getElement({
              class: 'end',
              contains: 'No Data. Check back later.'
            }));
          }
          // Payments Section
          fb.search({
            collection: 'pending-transactions',
            key: 'account',
            value: User.key
          }).then(queryResults => {
            if (queryResults.length > 0) {
              $.add($.get('#view-bill'), $.getElement({
                tag: 'a',
                href: '/pay',
                alt: 'Pay now',
                "aria-label": 'Pay now',
                class: 'btn',
                contains: 'View Bill'
              }));
              $.get('#view-bill').classList.remove('hidden');
            }
          });
          fb.search({
            collection: 'transactions',
            key: 'account',
            value: User.key
          }).then(results => {
            let payments = $.get('#payments');
            $.clear(payments);
            if (results.length > 0) {
              payments.style.setProperty('justify-content', 'flex-start');
              results.forEach(transaction => {
                $.add(payments, $.getElement({
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

              $.add(payments, $.getElement({
                class: 'end',
                contains: 'End of record.'
              }));
            } else {
              $.add(payments, $.getElement({
                class: 'end',
                contains: 'No Payments Found.'
              }));
            }
          });

          // Projects Section
          $.clear(projects);
          fb.search({
            collection: 'projects',
            key: 'account',
            value: User.key
          }).then(results => {
            const projects = $.get('#projects');
            if (results.length > 0) {
              projects.style.setProperty('justify-content', 'flex-start');
              results.forEach(project => {
                let activeClass = 'project-container';
                if (project.data.active) {
                  activeClass += ' active';
                }
                $.add(projects, $.getElement({
                  onclick: `showProject('${project.key}');`,
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
              // Add a new project button
              showAddProject();
            } else {
              $.add(projects, $.getElement({
                class: 'end',
                contains: 'No Projects Found.'
              }));
              // Add a new project button
              showAddProject();
              displayMessage(`s:To get started, click ${$.getElement({
                tag: 'a',
                "aria-label": 'Add project',
                alt: 'Add project',
                href: '/add',
                class: 'link',
                contains: 'add'
              })} in the project section.`);
            }
          });
          // Add a logout button
          showLogout();
        }).catch(() => {
          location.href = '/login';
        });
      } else {
        location.href = '/login';
      }
    });

    function showAddProject() {
      $.add(projects, $.getElement({
        tag: 'a',
        "aria-label": 'Add a project',
        href: '/add',
        class: 'btn link',
        alt: 'Add a project',
        contains: 'Add'
      }));
    }

    function showLogout() {
      $.add($.get('#root'), $.getElement({
        tag: 'a',
        "aria-label": 'Profile',
        id: 'profile',
        class: 'link',
        alt: 'Profile',
        contains: $.icon({
          icon: 'sign-out-alt'
        })
      }));

      $.get('#profile').addEventListener('click', () => {
        fb.logout();
      }, false);
    }

    function hideEdit(user) {
      $.queryAll('.input').forEach(el => {
        el.classList.add('hidden');
      });

      $.queryAll('.text.hidden').forEach((el, index) => {
        if (index === 0) {
          el.innerHTML = `${user.first} ${user.last}`;
        } else if (index === 1) {
          el.innerHTML = user.email;
        } else if (index === 2) {
          el.innerHTML = user.phone;
        } else if (index === 3) {
          el.innerHTML = user['bus-name'];
        } else if (index === 4) {
          el.innerHTML = user['bus-add'];
        } else if (index === 5) {
          el.innerHTML = user['bus-city'];
        }
        el.classList.remove('hidden');
      });
    }

    function showEdit(user) {
      $.queryAll('.text').forEach(el => {
        el.classList.add('hidden');
      });

      $.queryAll('.input.hidden').forEach(el => {
        el.classList.remove('hidden');
      });

      $.get('#name').value = `${user.data.first} ${user.data.last}`;
      $.get('#email').value = user.data.email;
      $.get('#phone').value = user.data.phone;

      if (user.data['bus-name']) {
        $.get('#bus-name').value = user.data['bus-name'];
      }
      if (user.data['bus-add']) {
        $.get('#bus-add').value = user.data['bus-add'];
      }
      if (user.data['bus-city']) {
        $.get('#bus-city').value = user.data['bus-city'];
      }
    }

    function populateInformation(user) {
      general.children[1].remove();
      business.children[1].remove();

      $.add(general, $.getElement({
        class: 'text',
        contains: `${user.data['first']} ${user.data['last']}`
      }));

      let skipped = ['first', 'last', 'transactions', 'analytics', 'merchantId', 'timestamp', 'order', 'files', 'agree'],
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
            contains: user.data[prop]
          }));
        }
      }

      if (filtered['bus-name']) {
        $.add(business, $.getElement({
          class: 'text',
          contains: user.data['bus-name']
        }));
      }

      if (filtered['bus-add']) {
        $.add(business, $.getElement({
          class: 'text',
          contains: user.data['bus-add']
        }));
      }

      if (filtered['bus-city']) {
        $.add(business, $.getElement({
          class: 'text',
          contains: user.data['bus-city']
        }));
      }

      if (general.childNodes.length <= 1) {
        $.add(general, $.getElement({
          class: 'text',
          contains: 'Not Available.'
        }));
      }

      if (!filtered['bus-name']) {
        business.classList.add('hidden');
        let el = $.get('#information');
        el.classList.add('grid-2');
        el.classList.remove('grid-3');
        $.add(general, $.getElement({
          id: 'edit',
          class: 'link',
          alt: 'Edit',
          onclick: 'toggleEdit();',
          contains: 'Edit'
        }));
      } else {
        $.add(business, $.getElement({
          id: 'edit',
          class: 'link',
          alt: 'Edit',
          onclick: 'toggleEdit();',
          contains: 'Edit'
        }));
      }
    }

    window.toggleEdit = () => {
      fb.search({
        collection: 'users',
        key: 'email',
        value: fb.auth.currentUser.email
      }).then(Users => {
        let el = $.get('#edit') ? $.get('#edit') : null,
          User = Users[0];

        if (!el) return;

        function checkMode(el) {
          $.clear(el);
          $.add(el, /edit/gi.test(el.classList) ? 'Done' : 'Edit');
          if (!/edit/gi.test(el.classList) && !/saved/gi.test(el.classList)) {
            el.classList.add('edit');
          } else if (/edit/gi.test(el.classList)) {
            el.classList.remove('edit');
            el.classList.add('saved');
          } else if (/saved/gi.test(el.classList)) {
            el.classList.remove('saved');
            el.classList.add('edit');
          }
        }

        if (!/edit/gi.test(el.classList) && !/saved/gi.test(el.classList)) {
          checkMode(el);
        }

        if (/edit/gi.test(el.classList)) {
          checkMode(el);
          showEdit(User);
        } else {
          if (confirm('Are you sure?')) {
            let updated = {
              first: $.get('#name').value.split(' ')[0],
              last: $.get('#name').value.split(' ')[1]
            };

            $.queryAll('.input').forEach(el => {
              if (el.id != 'name' && el.checkValidity()) {
                updated[el.id] = el.value;
              }
            });

            if (updated.phone.length != 10) {
              displayMessage('e:Error: Please check your phone number.');
              return;
            }
            if (fb.auth.currentUser.email != updated.email) {
              fb.auth.currentUser.updateEmail(updated.email)
                .then(() => {
                  fb.update('users', User.key, updated).then(() => {
                    hideEdit(updated);
                    populateInformation(User);
                    displayMessage('s:Updated successfully.');
                    checkMode(el);
                  }).catch(err => {
                    displayMessage(`e:${err}`);
                  });
                }).catch(err => {
                  displayMessage(`e:${err}`);
                });
            } else {
              fb.update('users', User.key, updated).then(() => {
                hideEdit(updated);
                displayMessage('s:Updated successfully.');
                checkMode(el);
              }).catch(err => {
                console.log(err);
                displayMessage(`e:${err}`);
              });
            }
          }
        }
      });
    };

    window.showProject = key => {
      fb.search({
        collection: 'users',
        key: 'email',
        value: fb.auth.currentUser.email
      }).then(Users => {
        fb.search({
          collection: 'projects',
          key: 'account',
          value: Users[0].key
        }).then(results => {
          results.forEach(Project => {
            if (Project.key === key) {
              let deleteButton = '';
              if (!Project.data.active) {
                deleteButton = $.getElement({
                  tag: 'a',
                  "aria-label": 'Delete project',
                  id: 'delete',
                  alt: 'Delete project',
                  class: 'btn',
                  contains: 'Delete Project'
                });
              }

              $.get('#profile-grid').style.setProperty('grid-template-columns', '1fr');
              $.clear($.get('#profile-grid'));
              $.add($.get('#profile-grid'), $.getElement({
                tag: 'h1',
                class: 'title',
                contains: 'Project Details.'
              }) + $.getElement({
                id: 'review'
              }));

              delete Project.data.account;
              delete Project.data.active;
              delete Project.data.estimatedCost;

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
                      style: `background-color:${color}`
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

              $.add($.get('#profile-grid'), $.getElement({
                id: 'buttons',
                contains: $.getElement({
                  tag: 'a',
                  href: '/profile',
                  id: 'back',
                  alt: 'Back',
                  "aria-label": 'Back',
                  class: 'link',
                  contains: 'Back'
                }) + deleteButton
              }));

              if ($.get('#delete')) {
                $.get('#delete').addEventListener('click', () => {
                  if (confirm('Are you sure?')) {
                    toggleLoading('Deleting project...');
                    fb.delete(Project.key, 'projects').then(() => {
                      location.href = '/profile';
                    });
                  }
                }, false);
              } else {
                $.get('#buttons').style.setProperty('grid-template-columns', '1fr');
                $.get('#back').style.setProperty('margin', 0);
              }
            }
          })
        });
      });
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
      displayMessage(`s:Color copied to clipboard!`);
      return false;
    };

    function removeElement(el) {
      if (el) el.parentNode.removeChild(el);
    }

    window.showUserAssets = () => {
      location.href = '/files';
      return false;
    };
  }
};