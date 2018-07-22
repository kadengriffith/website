// Author: Kaden Griffith
// Descr : Simple Math Game

const $ = require('kbrew_hypertxt')();

module.exports = {
  Project3: () => {
    'use strict';

    const canvasName = '#Simple_Math_Game';

    if(!$.get(canvasName)) return;

    fixHtml();

    window.addEventListener('keypress', (e) => {
      keyPressed = e.key;
    });

    let canvas = $.get(canvasName),
      ctx = canvas.getContext("2d"),
      textInitialPosition = 13,
      textIndent = 13,
      lineNumber = 1,
      fontSize = 16,
      fontColor = '#f4f4f4',
      score = 0,
      point = [1, "point"],
      a,
      b,
      keyPressed,
      ops = [{
          sign: "+",
          method: (a, b) => a + b
        },
        {
          sign: "-",
          method: (a, b) => a - b
        },
        {
          sign: "*",
          method: (a, b) => a * b
        }
      ],
      operator,
      answer,
      word = [],
      preventTouch = false,
      gameDelay = 10000,
      keyFrame = 0;

    canvas.addEventListener('touchstart', (e) => {
      keyPressed = 'Enter';
    });

    function setup() {
      preventTouch = false;
      ctx.font = `${fontSize}px Monospace`;
      selectProblem();
      answer = operator.method(a, b);
      if(answer < 0) return setup();
      keyFrame = 0;
    }

    setInterval(update, 1000 / 60);

    function update() {
      keyFrame++;
      if(keyFrame === gameDelay * 60 / 1000) {
        keyFrame = 0;
        selectProblem();
      }
      if(keyPressed) {
        if(keyPressed !== 'Enter') {
          word.push(keyPressed);
          writeChar(keyPressed);
        } else {
          textIndent = textInitialPosition;
          lineNumber++;
          game();
        }
        keyPressed = undefined;
      }
    }

    function game() {
      let _input = Number(word.join().replace(/,/g, ''));
      word = [];
      preventTouch = true;
      if(_input === answer) {
        write(`That's correct!`);
        score++;
        setup();
      } else {
        write('Incorrect.');
        setTimeout(setup, 1000);
      }
    }

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function calcY(a, b, c) {
      return b * c + a;
    }

    function selectProblem() {
      clear();
      a = getRandomInteger(1, 10);
      b = getRandomInteger(1, 10);
      operator = ops[Math.floor(Math.random() * ops.length)];
      reportScore();
      write(`Solve ${a} ${operator.sign} ${b} = ?`);
    }

    function reportScore() {
      write(score === 1 ? `Score: ${score} ${point[1]}` : `Score: ${score} ${point[1]}s`);
    }

    function write(what) {
      ctx.fillStyle = fontColor;

      let _y = calcY(textInitialPosition, lineNumber, fontSize);

      if(_y > canvas.height - fontSize) {
        return selectProblem();
      }

      ctx.fillText(what, textInitialPosition, _y);
      lineNumber++;
    }

    function writeChar(what) {
      ctx.fillStyle = fontColor;
      let _y = calcY(textInitialPosition, lineNumber, fontSize);
      ctx.fillText(what, textIndent, _y);
      textIndent += fontSize / 2;
    }

    function clear() {
      lineNumber = 1;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setup();
  }
};

window.showKeyboard = () => {
  $.get('#show-the-world-a-secret').focus();
};

function fixHtml() {
  $.add($.get('.demo-addons'), $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:showKeyboard();",
    contains: 'Show Keyboard'
  }) + $.getElement({
    tag: 'input',
    type: 'number',
    inputmode: 'numeric',
    pattern: '[0-9]*',
    style: 'position:absolute;left:-9999px;top:-9999px;',
    id: 'show-the-world-a-secret'
  }));
}