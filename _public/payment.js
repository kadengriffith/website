// Payments

const $ = require('kbrew_hypertxt'),
  paypal = require('https://www.paypalobjects.com/api/checkout.js');

module.exports = {
  render: () => {


    $.add($.get('.wrapper'), $.getElement({
      id: 'pay-container'
    }));

    paypal.Button.render({
      env: 'sandbox',
      style: {
        size: 'responsive',
        layout: 'vertical',
        size: 'medium',
        shape: 'rect',
        color: 'silver'
      },
      funding: {
        allowed: [paypal.FUNDING.CARD]
      },
      client: {
        sandbox: `ASrkKYmRH3eD027wqYDAbaHwVwwKrFU3_M2kyLB2oeHcdyLgW7_s30YQaMQA7DniO9WghPsSrPegvXKu`,
        production: `ELXA1ejgivSUt5HzhYd-dkvRZLy3OmhRoh0X6AU5Yi08sCQm2GiuQP_UHMK6dT9WEB1nV6xE1HKPdopO`
      },
      payment: (data, actions) => {
        return paypal.billingPlan.create({
          description: 'Byte Wave LLC application subscription.',
          merchant_preferences: {
            auto_bill_amount: 'yes',
            cancel_url: options.safeUrl,
            initial_fail_amount_action: 'continue',
            max_fail_attempts: 3,
            return_url: options.safeUrl
          },
          name: 'Application Subscription',
          payment_definitions: [{
            amount: {
              'currency': 'USD',
              'value': Number(options.amount)
            },
            frequency: 'YEAR',
            frequency_interval: '1',
            name: 'Byte Wave Application Subscription',
            type: 'INFINITE'
          }],
          type: 'INFINITE'
        }, (err, billingPlan) => {
          if(err) {
            displayMessage(`e:Error: ${err}`);
          } else {
            firebase.ref(`users/${firebase.auth().currentUser.uid}`).set({
              billing_plan
            });
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then(() => {
          displayMessage('s:Thank you for your payment!');
        });
      }
    }, '#pay-container');
  }
};