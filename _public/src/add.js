// Author: Kaden Griffith
const $ = require('kbrew_hypertxt'),
  colorNames = require('../css/colors.json');

require('../css/add.scss');

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

    const colors = $.get('#color-selection'),
      colorList = Object.keys(colorNames);

    let Project;

    for (let j = 0; j < colorList.length; j++) {
      let hue = colorList[j],
        hueList = colorNames[hue];
      for (let color in hueList) {
        $.add(colors, $.getElement({
          class: 'color',
          style: `background-color:${hueList[color]};`,
          onclick: `addColor('${hueList[color].replace(/#/g, '')}');`
        }));
      }
    }

    window.addColor = color => {
      let selectedSquares = $.get('#colors-selected').children,
        hex = /#/g.test(color) ? color : `#${color}`;

      color = /#/g.test(color) ? color.replace(/#/g, '') : color;

      if (!$.get(hex)) {
        if (selectedSquares.length < 5) {
          $.add($.get('#colors-selected'), $.getElement({
            id: color,
            class: 'color',
            style: `background-color:${hex};`,
            onclick: `removeColor('${color}');`
          }));
        } else {
          displayMessage('w:Click a color in your palette to remove it.');
        }
      } else {
        displayMessage('e:That color is already in your palette.');
      }
      return false;
    };

    window.addCustomColor = () => {
      let color = $.get('#project-color').value;
      if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
        addColor(`${color}`);
      } else if (/^(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
        addColor(`#${color}`);
      } else {
        displayMessage('e:Invalid color.');
      }
      color = '';
    };

    window.removeColor = color => {
      $.get(`#${color}`).remove();
      return false;
    };

    let type,
      step = 1;

    function showStep() {
      scrollTo(0, 0);
      if (step === 1) {
        location.href = '/add';
      } else if (step === 2 && type === 'graphic design') {
        $.get('#step-1').classList.add('hidden');
        $.get('#step-3').classList.add('hidden');
        $.get('#step-2').classList.remove('hidden');
        $.get('#wl-enabled-1').classList.add('hidden');
        $.get('#wl-enabled-2').classList.add('hidden');
        $.get('#next').classList.remove('hidden');
        $.get('#back').classList.remove('hidden');
      } else if (step === 2 && type === 'web app') {
        $.get('#step-1').classList.add('hidden');
        $.get('#step-3').classList.add('hidden');
        $.get('#step-2').classList.remove('hidden');
        $.get('#wl-enabled-1').classList.remove('hidden');
        $.get('#wl-enabled-2').classList.remove('hidden');
        $.get('#next').classList.remove('hidden');
        $.get('#back').classList.remove('hidden');
      } else if (step === 3) {
        $.get('#step-2').classList.add('hidden');
        $.get('#step-4').classList.add('hidden');
        $.get('#review').classList.add('hidden');
        $.get('#upload').classList.add('hidden');
        $.get('#finish').classList.add('hidden');
        $.get('#step-3').classList.remove('hidden');
        $.get('#next').classList.remove('hidden');
      } else if (step === 4) {
        $.get('#step-3').classList.add('hidden');
        $.get('#step-4').classList.remove('hidden');
        $.get('#review').classList.add('hidden');
        $.get('#next').classList.add('hidden');
        $.get('#upload').classList.add('hidden');
        $.get('#finish').classList.remove('hidden');
      } else if (step === 5) {
        $.get('#step-3').classList.add('hidden');
        $.get('#finish').classList.add('hidden');
        $.get('#step-4').classList.add('hidden');
        $.get('#next').classList.add('hidden');
        $.get('#upload').classList.remove('hidden');
        $.get('#review').classList.remove('hidden');
        $.get('.title').innerHTML = 'Review & Submit';
      }
    }

    function checkInputs() {
      let confirmed = true;

      for (let i = 0; i < $.queryAll('label').length; i++) {
        if (!/hidden/gi.test($.get(`#wl-enabled-${i}`).classList)) {
          let el = $.get('.input', i);
          if (el.id !== 'project-color') {
            if (el.value.length === 0) {
              confirmed = false;
            }
          }
        }
      }

      $.queryAll('textarea').forEach(el => {
        if (el.value.length === 0) {
          confirmed = false;
        }
      });

      if (!confirmed) {
        displayMessage(`e:Please fill out all fields before continuing.`);
      }

      return confirmed;
    }

    window.toggleAddOn = el => {
      if (/selected/.test(el.classList)) {
        el.classList.remove('selected');
      } else {
        el.classList.add('selected');
      }
    };

    $.get('#project-pages').addEventListener('change', () => {
      if (Number($.get('#project-pages').value) <= 0) $.get('#project-pages').value = 1;
    }, false);

    window.chooseType = t => {
      type = t;
      step++;
      showStep();
    };

    window.nextStep = () => {
      step++;
      if (checkInputs()) {
        if (type === 'graphic design' && step === 4) {
          step = 5;
          showStep();
          $.get('#finish').click();
        } else {
          showStep();
        }
      }
    };

    window.goBack = () => {
      step--;
      if (type === 'graphic design' && step === 5) {
        step = 3;
        showStep();
      } else {
        showStep();
      }
    };

    window.finish = () => {
      step++;

      let baseCost = 99.99;

      Project = {
        name: $.get('#project-name').value,
        type: type,
        url: $.get('#project-url').value,
        pages: $.get('#project-pages').value,
        keywords: $.get('#project-keywords').value,
        description: $.get('#project-description').value,
        requests: $.get('#project-requests').value,
        colorPalette: [],
        addOns: [],
      };

      if (type === 'graphic design') {
        delete Project.url;
        delete Project.pages;
        delete Project.addOns;
        baseCost = 199.99;
      }

      Project.estimatedCost = baseCost + (49.99 * (Project.pages ? Project.pages - 1 : 0));

      $.get('#colors-selected').childNodes.forEach(el => {
        Project.colorPalette.push(`#${el.id}`);
      });

      $.get('#add-ons').childNodes.forEach((el, index) => {
        if (/selected/.test(el.classList)) {
          Project.addOns.push(`${$.get('.add-on-title', index).innerHTML} ${$.get('.add-on-price', index).innerHTML}`);
          if (Number($.get('.add-on-price', index).id)) {
            Project.estimatedCost += Number($.get('.add-on-price', index).id);
          }
        }
      });

      Project.estimatedCost = Project.estimatedCost.toFixed(2);

      $.clear($.get('#review'));

      for (let prop in Project) {
        if (prop === 'estimatedCost') {
          $.add($.get('#review'), $.getElement({
            class: 'section-title',
            contains: 'Estimated Total:'
          }) + $.getElement({
            class: 'total',
            contains: `$${Project[prop]}`
          }));
        } else if (prop === 'colorPalette') {
          $.add($.get('#review'), $.getElement({
            class: 'table-item',
            contains: 'Color Palette'
          }));
          $.add($.get('#review'), $.getElement({
            id: 'color-collection'
          }));
          for (let color of Project.colorPalette) {
            $.add($.get('#color-collection'), $.getElement({
              class: 'color',
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
            contains: Project[prop].join(`<br>`)
          }));
        } else {
          $.add($.get('#review'), $.getElement({
            class: 'table-item',
            contains: prop
          }));
          $.add($.get('#review'), $.getElement({
            class: 'text',
            contains: Project[prop]
          }));
        }
      }
      showStep();
    };

    function sendProjectPendingMessage() {
      const io = require('socket.io-client'),
        socket = io('https://mailing.bytewave-apps.com'),
        html = require('../objects/Emails').projectPending();

      socket.emit('single-email', {
        sender: 'Byte Wave Project Team',
        html,
        subject: '🎉 We received your request!',
        to: fb.auth.currentUser.email,
        plainText: 'We received your project request. A representative or designer will be in touch with scheduling options and a quote shortly. We appreciate your patience in this process. If you are having trouble displaying this email please open it in a browser.'
      });
    }

    window.submitForReview = () => {
      toggleLoading(true, 'Saving project...');
      fb.search({
        collection: 'users',
        key: 'email',
        value: fb.auth.currentUser.email
      }).then(results => {
        Project.account = results[0].key;
        Project.active = false;

        fb.addToCollection('projects', Project).then(() => {
          sendProjectPendingMessage();
          setTimeout(() => {
            socket.emit('single-email', {
              sender: 'Byte Wave Project Team',
              html: require('../objects/Emails').projectApprove(fb.auth.currentUser.email),
              subject: '📥 We received a request!',
              to: 'info@bytewave-apps.com',
              plainText: `We received a project request from <a href="https://bytewave-apps.com/admin" target="new" alt="New project">${fb.auth.currentUser.email}</a>. Please review.`
            });
            location.href = '/profile';
          }, 300);
        });
      });
    };
  }
};