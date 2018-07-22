// Author: Kaden Griffith
// Descr : Color Viewer

const $ = require('kbrew_hypertxt')();

window.p6 = {
  internalColor: {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 100
  },
  font_shown: true,
  fontColor: 'black',
  backgroundColor: 'black'
};

module.exports = {
  Project6: () => {
    'use strict';

    let canvasName = '#Color_Viewer';

    let view,
      view_preview,
      canvas = $.get(canvasName),
      ctx = canvas.getContext("2d"),
      framerate = 1000 / 60;

    if(!$.get(canvasName)) return;

    fixHtml();

    setInterval(update, framerate);

    function update() {
      if(!$.get(canvasName)) return;

      p6.internalColor.red = $.get('.demo-range_r').value;
      p6.internalColor.green = $.get('.demo-range_g').value;
      p6.internalColor.blue = $.get('.demo-range_b').value;
      p6.internalColor.alpha = $.get('.demo-range_a').value;

      let rgba = colorString(),
        hex = hexString();

      $.get('#hidden-copy-color').value = rgba;
      $.get('#hidden-copy-hex').value = hex;

      if(!$.get('#currentColor').innerHTML.includes(rgba) || $.get('#backgroundColor').value !== p6.backgroundColor || $.get('#fontColor').value !== p6.fontColor) {
        $.get('#currentColor').innerHTML = `${rgba} ${hex}`;

        draw();
      }
    }

    function draw() {
      let _w = canvas.width,
        _h = canvas.height;

      p6.backgroundColor = $.get('#backgroundColor').value ? $.get('#backgroundColor').value : p6.backgroundColor;
      p6.fontColor = $.get('#fontColor').value ? $.get('#fontColor').value : p6.fontColor;

      ctx.beginPath();
      ctx.fillStyle = p6.backgroundColor;
      ctx.fillRect(0, 0, _w, _h);
      ctx.fillStyle = colorString();
      ctx.fillRect(0, 0, _w, _h);
      if(p6.font_shown) {
        ctx.font = `${ _w / 2}px 'Dancing Script', cursive`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = p6.fontColor;
        ctx.fillText('Foo', _w / 2, _h / 2);
      }
    }
  }
};

function hexString() {
  let componentToHex = (c) => {
    let hex = Number(c).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  }

  return `#${componentToHex(p6.internalColor.red)}${componentToHex(p6.internalColor.green)}${componentToHex(p6.internalColor.blue)}`;
}

function colorString() {
  return `rgba(${p6.internalColor.red}, ${p6.internalColor.green}, ${p6.internalColor.blue}, ${p6.internalColor.alpha / 100})`;
}

window.toggleFont = () => {
  p6.font_shown = !p6.font_shown;
  $.get('.button-demo-extra', 0).innerHTML = p6.font_shown ? 'Hide Font' : 'Show Font';
};

window.copyRgb = () => {
  let e = $.get('#hidden-copy-color');
  e.select();
  document.execCommand('copy');
  alert(`Copied: ${e.value}!`);
};

window.copyHex = () => {
  let e = $.get('#hidden-copy-hex');
  e.select();
  document.execCommand('copy');
  alert(`Copied: ${e.value}!`);
};

function fixHtml() {
  let demoSlider = (options) => {
    return $.getElement({
      contains: options.color,
      class: 'demo-label'
    }) + $.getElement({
      tag: 'input',
      type: 'range',
      min: options.min ? options.min : 0,
      max: options.max ? options.max : 255,
      value: p6.internalColor[options.color.toLowerCase()],
      class: `demo-range demo-range_${options.color.toLowerCase().charAt(0)}`
    });
  };

  $.add($.get('.demo-addons'), $.getElement({
    tag: 'input',
    type: 'text',
    id: 'hidden-copy-color',
    style: 'position:fixed;left:-9999px;top:-9999px;'
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    id: 'hidden-copy-hex',
    style: 'position:fixed;left:-9999px;top:-9999px;'
  }) + $.getElement({
    id: 'currentColor'
  }) + demoSlider({
    color: 'Red'
  }) + demoSlider({
    color: 'Green'
  }) + demoSlider({
    color: 'Blue'
  }) + demoSlider({
    color: 'Alpha',
    max: 100
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    placeholder: 'Font Color',
    id: 'fontColor'
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    placeholder: 'Background Color',
    id: 'backgroundColor'
  }) + $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:toggleFont();",
    contains: p6.font_shown ? 'Hide Font' : 'Show Font'
  }) + $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:copyRgb();",
    contains: $.icon({
      icon: 'copy'
    }) + ' RGB'
  }) + $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:copyHex();",
    contains: $.icon({
      icon: 'copy'
    }) + ' Hex'
  }));
}