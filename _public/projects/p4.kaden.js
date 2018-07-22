// Author: Kaden Griffith
// Descr : Guess The Number

const $ = require('kbrew_hypertxt')();

module.exports = {
  Project4: () => {
    'use strict';

    const canvasName = '#Guess_The_Number';

    if(!$.get(canvasName)) return;

    fixHtml();

    window.addEventListener('keypress', (e) => {
      keyPressed = e.key;
    });

    let canvas = $.get(canvasName),
      ctx = canvas.getContext("2d"),
      fontSize = 14,
      fontColor = '#f4f4f4',
      textInitialPosition = 13,
      textIndent = 13,
      lineNumber = 1,
      gameDelay = 10000,
      keyPressed,
      number,
      word = [],
      preventTouch = false,
      history = [];

    canvas.addEventListener('touchstart', (e) => {
      keyPressed = 'Enter';
    });

    function setup() {
      preventTouch = false;
      history = [];
      ctx.font = `${fontSize}px Monospace`;
      clear();
      number = getRandomInteger(1, 100);
      setInterval(update, 1000 / 60);
    }

    function update() {
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
      let _guess = Number(word.join().replace(/,/g, ''));
      if(!isNaN(_guess)) history.unshift(_guess);
      rewriteGuesses();
      word = [];
      if(_guess === number) {
        preventTouch = true;
        if(history.length > 1) {
          write(`That's correct!`);
          write(`You won in ${history.length} attempts.`);
        } else
        if(history.length === 1) {
          write(`You're a guessing master!`);
          write(`You won in 1 attempt!`);
        }
        setTimeout(setup, gameDelay);
      } else if(_guess < number) {
        write('Too low! Guess again.');
      } else if(_guess > number) {
        write('Too high! Guess again.');
      } else {
        write('Please guess a number.');
      }
    }

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function calcY(a, b, c) {
      return b * c + a;
    }

    function write(what) {
      ctx.fillStyle = fontColor;

      let _y = calcY(textInitialPosition, lineNumber, fontSize);

      if(_y > canvas.height - fontSize) {
        clear();
        _y = calcY(textInitialPosition, lineNumber, fontSize);
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

    function rewriteGuesses(addLine = false) {
      // Cover previous array
      ctx.fillStyle = 'black';
      ctx.fillRect(0, (3 * fontSize), canvas.width, 1.2 * fontSize);

      let _y = textInitialPosition + (3 * fontSize);
      ctx.fillStyle = fontColor;
      ctx.fillText(`[${history.join(', ').substring(0, canvas.width / fontSize)}]`, textIndent, _y);
      if(addLine) lineNumber++;
    }

    function clear() {
      lineNumber = 1;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      write('Welcome to the guessing game.');
      write('Guess a number between 1 and 100.');
      rewriteGuesses(true);
      lineNumber++;
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