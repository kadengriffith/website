// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/signup.scss');

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
      }
    });

    let stepNumber = 0,
      personal = false;

    function showMessage() {
      let info = [
          "Please enter your contact information.",
          "Please choose the purpose for this account.",
          "Please enter your business's information.",
          "Choose a password.<br>Requirements:<ul><li>one UPPERCASE letter,</li><li>one lowercase letter,</li><li>one number,</li><li>one special character (example: !@#$%^&*_=+-)</li><li>must be at least 8 digits</li></ul>"
        ],
        infoEl = $.get('.info', 0);

      $.clear(infoEl);
      $.add(infoEl, info[stepNumber]);
    }

    function checkIfValid() {
      let valid = true;
      for (let el of $.queryAll('input')) {
        if (!el.parentNode.parentNode.classList.contains('hidden')) {
          if (!el.value.length > 0) {
            valid = false;
          } else if (!el.checkValidity()) {
            valid = false;
          }
        }
      }
      if (!valid) displayMessage(`e:Please check your input.`);
      return valid;
    }

    function showStep() {
      let steps = [
        $.get('#general-information'),
        $.get('#account-type'),
        $.get('#bus-information'),
        $.get('#passwords')
      ];
      showMessage();
      for (let el of $.query('form').children) {
        hide(el);
      }
      if (stepNumber === 1 || stepNumber === 3) {
        if (stepNumber === 3) show($.get('#finish'));
      } else {
        show($.get('#next'));
      }
      show(steps[stepNumber]);
    }

    function hide(el) {
      if (el && !el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    }

    function show(el) {
      if (el && el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      }
    }

    window.nextStep = () => {
      if (checkIfValid()) {
        stepNumber++;
        showStep();
      }
    };

    window.chooseType = (t) => {
      if (t === 'personal') {
        personal = true;
        stepNumber = 3;
        showStep();
      } else {
        personal = false;
        stepNumber++;
        showStep();
      }
    };

    window.goBack = () => {
      if (stepNumber === 0) {
        history.back();
      } else if (personal && stepNumber === 3) {
        stepNumber -= 2;
        showStep();
      } else {
        stepNumber--;
        showStep();
      }
    };

    window.register = () => {
      if ($.get('#agree').checked) {
        if (checkIfValid()) {
          fb.registerUser();
        }
      } else {
        displayMessage('e:You must agree to the terms to create an account.');
      }
      return false;
    };

    showMessage();
  }
};