// Author: Kaden Griffith

const $ = require('kbrew_hypertxt'),
  io = require('socket.io-client'),
  socket = io('https://pay.bytewave-apps.com');

require('../css/pay.scss');
require('https://js.braintreegateway.com/web/dropin/1.14.1/js/dropin.min.js');

module.exports = {
  load: fb => {
    toggleLoading(false);
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        $.add($.get('#root'), $.getElement({
          tag: 'a',
          "aria-label": 'Profile',
          id: 'profile',
          class: 'link',
          href: '/profile',
          alt: 'Profile',
          contains: $.icon({
            icon: 'user-circle'
          })
        }));

        fb.search({
          collection: 'users',
          key: 'email',
          value: fb.auth.currentUser.email
        }).then(Users => {
          fb.search({
            collection: 'pending-transactions',
            key: 'account',
            value: Users[0].key
          }).then(transactions => {
            let ts = '';
            if (transactions.length > 0) {
              $.clear($.get('#loading-payment'));
              transactions.forEach(transaction => {
                ts += $.getElement({
                  tag: 'option',
                  value: transaction.key,
                  contains: `${transaction.data.name} - $${transaction.data.amount} USD`
                });
              });

              $.add($.get('#payment-select'), ts);

              $.get('#payment-container').childNodes.forEach(el => {
                el.classList.remove('hidden');
              });
            } else {
              displayMessage('e:Could not find any payments to make.');
              setTimeout(() => {
                location.href = '/profile'
              }, 5000);
            }
          });
        });
      } else {
        displayMessage('e:Could not find user.');
        setTimeout(() => {
          location.href = '/login'
        }, 2000);
      }
    });

    window.reloadPayment = () => {
      removeElement($.get('#dropin-container'));
      $.get('#submit-button').classList.add('hidden');
      assignPayment(getSelected());
    };

    function removeElement(el) {
      if (el) el.parentNode.removeChild(el);
    }

    function getSelected(el = $.get('#payment-select')) {
      return el.options[el.selectedIndex].value;
    }

    function assignPayment(payment) {
      fb.read('pending-transactions', payment).then(transaction => {
        $.clear($.get('#payment-details'));
        $.add($.get('#payment-details'), $.getElement({
          class: 'section-title',
          contains: 'Review Your Payment'
        }) + $.getElement({
          class: 'text',
          contains: `Invoice #: ${transaction.id}`
        }) + $.getElement({
          class: 'text',
          contains: `Description: ${transaction.data().name}`
        }) + $.getElement({
          class: 'text',
          contains: `Amount Due: $${transaction.data().amount} USD`
        }));
        let extendedData = transaction.data();
        extendedData.id = transaction.id;
        $.add($.get('#payment-container'), $.getElement({
          id: 'requesting',
          contains: 'Requesting secure payment...'
        }));
        requestPaymentObject(extendedData);
      });
    }

    socket.on('payment-ready', data => {
      const button = $.get('#submit-button');

      removeElement($.get('#requesting'));

      $.add($.get('#payment-container'), $.getElement({
        id: 'dropin-container'
      }));

      braintree.dropin.create({
        authorization: data.token,
        container: '#dropin-container',
        paypal: {
          flow: 'vault'
        },
        googlePay: {
          merchantId: '11461549278336998999',
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: data.transaction.amount,
            currencyCode: 'USD'
          },
          cardRequirements: {
            billingAddressRequired: true
          }
        },
        venmo: {}
      }, (createErr, instance) => {
        if (!createErr) {
          button.classList.remove('hidden');
          button.innerHTML = `Pay $${data.transaction.amount}`;

          button.addEventListener('click', () => {
            button.classList.add('hidden');
            toggleLoading(true, 'Processing...');
            instance.requestPaymentMethod((err, payload) => {
              if (!err) {
                // Submit payload.nonce server
                fb.search({
                  collection: 'users',
                  key: 'email',
                  value: fb.auth.currentUser.email
                }).then(results => {
                  socket.emit('payment-finalize', {
                    method: payload.nonce,
                    transaction: data.transaction,
                    client: results[0].data
                  });
                });
              } else {
                toggleLoading(false);
                button.classList.remove('hidden');
                displayMessage('e:Error processing payment information.');
              }
            });
          });
        } else {
          console.error(createErr);
        }
      });
    });

    socket.on('payment-finalized', data => {
      const button = $.get('#submit-button');

      $.clear($.get('#payment-container'));
      button.classList.add('hidden');

      toggleLoading(false);

      if (!data.err && data.result) {
        displayMessage('s:Payment made!');
        $.add($.get('#payment-container'), $.getElement({
          id: 'process',
          contains: 'Updating your account...'
        }));
        setTimeout(() => {
          fb.getCollectionLength('transactions').then(length => {
            data.order = length + 1;
            data.transaction.timestamp = new Date();
            fb.addToCollection('transactions', data.transaction).then(() => {
              fb.delete(data.transaction.id, 'pending-transactions').then(() => {
                toggleLoading(true, 'Redirecting...');
                setTimeout(() => {
                  location.href = '/profile';
                }, 5000);
              }).catch(err => {
                $.get('#process').innerHTML = 'There was a problem.';
                displayMessage(`e:Could not update account.<br>Please contact info@bytewave-apps.com to resolve your payment.`);
              });
            }).catch(err => {
              $.get('#process').innerHTML = 'There was a problem.';
              console.error(err);
              displayMessage(`e:Could not update account.<br>Please contact info@bytewave-apps.com to resolve your payment.`);
            });
          });
        }, 2000);
      } else {
        displayMessage(`e:Payment declined.`);
        $.add($.get('#payment-container'), $.getElement({
          id: 'process',
          contains: 'Your payment was not approved... ಠ╭╮ಠ<br>You are being redirected. Please try again with a different method of payment.'
        }));
        setTimeout(() => {
          location.href = "/pay";
        }, 5000);
      }
    });

    function requestPaymentObject(transaction) {
      if (!transaction) {
        displayMessage("e:Error: No payment details.");
      } else {
        fb.search({
          collection: 'users',
          key: 'email',
          value: fb.auth.currentUser.email
        }).then(results => {
          if (results.length > 0) {
            let Client = {
              transaction
            };
            if (results[0].data.merchantId) {
              Client.clientId = results[0].data.merchantId;
            }
            socket.emit('generate-token', Client);
          } else {
            displayMessage('e:Could not find user.');
            setTimeout(() => {
              location.href = '/login'
            }, 1000);
          }
        }).catch(() => {
          displayMessage('s:No payments to make!');
          setTimeout(() => {
            location.href = '/profile'
          }, 3000);
        });
      }
    }
  }
};