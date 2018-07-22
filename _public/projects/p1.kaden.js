// Author: Kaden Griffith
// Descr : Shape Recursion

const $ = require('kbrew_hypertxt')(),
  rc = require('../$assets/lib/randomColor');

module.exports = {
  Project1: () => {
    'use strict';

    const canvasName = '#Fractal_Pattern_Generation';

    if(!$.get(canvasName)) return;

    fixHtml();

    let canvas = $.get(canvasName),
      ctx = canvas.getContext('2d'),
      framerate = Math.floor(1000 / 60),
      bgColor,
      seconds = 0,
      seconds_half = 0,
      paused_state = false,
      speed = 200,
      color_options = null;

    let percentile_right,
      percentile_left,
      percentile_down,
      percentile_up,
      percentile_rand1;

    let diameter_factor,
      initial_d_value,
      minimum_diameter;

    let Circle,
      Square,
      Hourglass,
      Bowtie,
      Cross,
      Diagonal_1,
      Diagonal_2;

    $.get('.button_play').style.backgroundColor = '#C0D890';
    $.get('.button_play').style.color = '#333';
    setInterval(update, framerate);

    function update() {
      if(!$.get(canvasName)) return;
      if(!paused_state) {
        bgColor = $.get('#BgColor').value.length > 0 ? $.get('#BgColor').value.toLowerCase() : 'black';
        initial_d_value = $.get('#InitialD').value;

        color_options = {
          hue: $.get('#Hue').value.length > 0 ? $.get('#Hue').value.toLowerCase() : '',
          luminosity: $.get('#Luminosity').value.length > 0 ? $.get('#Luminosity').value.toLowerCase() : '',
          alpha: 1
        };

        diameter_factor = Number($.get('#Diameterfactor').value) * 0.01;
        minimum_diameter = $.get('#MinDiameter').value;

        percentile_right = $.get('#Right').value;
        percentile_left = $.get('#Left').value;
        percentile_down = $.get('#Down').value;
        percentile_up = $.get('#Up').value;
        percentile_rand1 = $.get('#Random').value;

        Circle = $.get('#Circle').value;
        Square = $.get('#Square').value;
        Hourglass = $.get('#Hourglass').value;
        Bowtie = $.get('#Bowtie').value;
        Cross = $.get('#Cross').value;
        Diagonal_1 = $.get('#Diagonal_1').value;
        Diagonal_2 = $.get('#Diagonal_2').value;

        drawShape(canvas.width / 2, canvas.height / 2, initial_d_value);
      }
    }

    function drawShape(x, y, d) {
      if(d === initial_d_value) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.beginPath();
      ctx.strokeStyle = rc.randomColor(color_options);

      if(getRandomInt(0, 100) >= (100 - Square)) {
        ctx.rect(x - (d / 2), y - (d / 2), d, d);
      } else if(getRandomInt(0, 100) >= (100 - Hourglass)) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y + (d / 2));
        ctx.lineTo(x + (d / 2), y + (d / 2));
        ctx.lineTo(x - (d / 2), y - (d / 2));
        ctx.lineTo(x + (d / 2), y - (d / 2));
        ctx.closePath();
      } else if(getRandomInt(0, 100) >= (100 - Cross)) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y - (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y - (d / 2));
      } else if(getRandomInt(0, 100) >= (100 - Diagonal_1)) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y - (d / 2));
      } else if(getRandomInt(0, 100) >= (100 - Diagonal_2)) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y - (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y + (d / 2));
      } else if(getRandomInt(0, 100) >= (100 - Bowtie)) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y - (d / 2));
        ctx.lineTo(x - (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y - (d / 2));
        ctx.lineTo(x + (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x + (d / 2), y + (d / 2));
        ctx.moveTo(x, y);
        ctx.lineTo(x - (d / 2), y + (d / 2));
      } else if(getRandomInt(0, 100) >= (100 - Circle)) {
        ctx.ellipse(x, y, (d / 2), (d / 2), 2 * Math.PI, 0, 2 * Math.PI);
      }

      ctx.stroke();

      if(d > minimum_diameter) {
        if(getRandomInt(0, 100) >= (100 - percentile_right)) {
          drawShape(x + (d * diameter_factor), y, d * diameter_factor);
        } // Right
        if(getRandomInt(0, 100) >= (100 - percentile_left)) {
          drawShape(x - (d * diameter_factor), y, d * diameter_factor);
        } // Left
        if(getRandomInt(0, 100) >= (100 - percentile_up)) {
          drawShape(x, y - (d * diameter_factor), d * diameter_factor);
        } // Up
        if(getRandomInt(0, 100) >= (100 - percentile_down)) {
          drawShape(x, y + (d * diameter_factor), d * diameter_factor);
        } // Down
        if(getRandomInt(0, 100) >= (100 - percentile_rand1)) {
          drawShape(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), d * diameter_factor);
        } // Random 1
      }
    }

    window.Pause = () => {
      $.get('.button_play').style.backgroundColor = 'transparent';
      $.get('.button_pause').style.backgroundColor = '#ED4337';
      $.get('.button_pause').style.color = '#333';
      $.get('.button_play').style.color = '#C0D890';
      paused_state = true;
    };

    window.Play = () => {
      $.get('.button_play').style.backgroundColor = '#C0D890';
      $.get('.button_play').style.color = '#333';
      $.get('.button_pause').style.backgroundColor = 'transparent';
      $.get('.button_pause').style.color = '#ED4337';
      paused_state = false;
    };

    window.PlusOneFrame = () => {
      paused_state = true;
      setTimeout(Play, 10);
      setTimeout(Pause, framerate * 1.5);
    };

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
    }
  }
};

function fixHtml() {
  $.add($.get('.demo-addons'), $.getElement({
    class: 'button_play',
    onclick: "javascript:Play();",
    contains: 'Play'
  }) + $.getElement({
    class: 'button_pause',
    onclick: "javascript:Pause();",
    contains: 'Pause'
  }) + $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:PlusOneFrame();",
    contains: 'Reframe'
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    placeholder: 'Background Color ( color | hex )',
    id: 'BgColor'
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    placeholder: 'Hue ( color | hex | monochrome )',
    id: 'Hue'
  }) + $.getElement({
    tag: 'input',
    type: 'text',
    placeholder: 'Luminocity ( bright | light | dark )',
    id: 'Luminosity'
  }) + $.getElement({
    contains: 'Zoom',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '1',
    max: '50',
    value: '50',
    class: 'demo-range demo-range_b',
    id: 'Diameterfactor'
  }) + $.getElement({
    contains: 'Reduction Factor',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '150',
    max: '950',
    value: '300',
    class: 'demo-range demo-range_b',
    id: 'InitialD'
  }) + $.getElement({
    contains: 'Miminum "Diameter"',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '10',
    max: '15',
    value: '10',
    class: 'demo-range demo-range_b',
    id: 'MinDiameter'
  }) + $.getElement({
    contains: 'Right',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range demo-range_g',
    id: 'Right',
    value: 100
  }) + $.getElement({
    contains: 'Left',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range demo-range_g',
    id: 'Left',
    value: 100
  }) + $.getElement({
    contains: 'Up',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range demo-range_g',
    id: 'Up'
  }) + $.getElement({
    contains: 'Down',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range demo-range_g',
    id: 'Down'
  }) + $.getElement({
    contains: 'Random Artifacts',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range demo-range_o',
    id: 'Random',
    value: 0
  }) + $.getElement({
    contains: 'Circle',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Circle',
    value: '100'
  }) + $.getElement({
    contains: 'Square',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Square',
    value: '0'
  }) + $.getElement({
    contains: 'Hourglass',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Hourglass',
    value: '0'
  }) + $.getElement({
    contains: 'Bowtie',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Bowtie',
    value: '0'
  }) + $.getElement({
    contains: 'Cross',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Cross',
    value: '0'
  }) + $.getElement({
    contains: 'Diagonal 1',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Diagonal_1',
    value: '0'
  }) + $.getElement({
    contains: 'Diagonal 2',
    class: 'demo-label'
  }) + $.getElement({
    tag: 'input',
    type: 'range',
    min: '0',
    max: '100',
    class: 'demo-range',
    id: 'Diagonal_2',
    value: '0'
  }));
}