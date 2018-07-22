// Author: Kaden Griffith
// Descr : Snake

const $ = require('kbrew_hypertxt')();

module.exports = {
  Project5: () => {
    'use strict';

    const canvasName = '#Snake';

    if(!$.get(canvasName)) return;

    fixHtml();

    let canvas = $.get(canvasName),
      ctx = canvas.getContext("2d"),
      xv = 0,
      yv = 0,
      tail = 5,
      trail = [],
      px = 0,
      py = 0,
      fx = 0,
      fy = 0,
      score = 0,
      mult = 0,
      gameDifficulty = 8,
      grid = Math.floor(Math.sqrt(canvas.height)),
      tc = Math.floor(Math.sqrt(canvas.height));

    px = getRandomPosition(0, tc);
    py = getRandomPosition(0, tc);

    fx = getRandomPosition(0, tc);
    fy = getRandomPosition(0, tc);

    window.addEventListener('keypress', (e) => {
      if(/w/gi.test(e.key)) {
        xv = 0;
        yv = -1;
      } else if(/a/gi.test(e.key)) {
        xv = -1;
        yv = 0;
      } else if(/s/gi.test(e.key)) {
        xv = 0;
        yv = 1;
      } else if(/d/gi.test(e.key)) {
        xv = 1;
        yv = 0;
      }
    });

    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null,
      yDown = null;

    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
      if(!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].clientX,
        yUp = evt.touches[0].clientY,

        xDiff = xDown - xUp,
        yDiff = yDown - yUp;

      if(Math.abs(xDiff) > Math.abs(yDiff)) {
        if(xDiff > 0) {
          /* left swipe */
          xv = -1;
          yv = 0;
        } else {
          /* right swipe */
          xv = 1;
          yv = 0;
        }
      } else {
        if(yDiff > 0) {
          /* up swipe */
          xv = 0;
          yv = -1;
        } else {
          /* down swipe */
          xv = 0;
          yv = 1;
        }
      }
      xDown = null;
      yDown = null;
    }

    setInterval(update, 1000 / gameDifficulty);

    function update() {
      if(!$.get(canvasName)) return;
      draw();

      px += xv;
      py += yv;

      if(px < 0) {
        px = tc + 1;
      }
      if(px > tc + 1) {
        px = 0;
      }
      if(py < -0.5) {
        py = tc + 1;
      }
      if(py > tc + 1) {
        py = 0;
      }
    }

    function draw() {
      ctx.font = "16px Ubuntu";
      ctx.fillStyle = '#f4f4f4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#f4f4f4';
      ctx.beginPath();

      ctx.ellipse((fx * grid) + (grid / 2) - 1, (fy * grid) + (grid / 2) - 1, (grid / 2) - 2, (grid / 2) - 2, 2 * Math.PI, Math.PI, 180);

      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#aaa';

      for(let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * grid, trail[i].y * grid, grid - 2, grid - 2);
        if(trail[i].x === px && trail[i].y === py) {
          mult = 0;
          score = 0;
          gameDifficulty = 8;
          tail = 5;
        }
      }
      trail.push({
        x: px,
        y: py
      });

      while(trail.length > tail) {
        trail.shift();
      }

      ctx.fillStyle = '#111';
      ctx.fillText('Score: ' + score, 20, canvas.height - 50);
      ctx.fillText('Food Collected: ' + mult, 20, canvas.height - 25);

      if(fx === px && fy === py) {
        score = score + 20 * tail;
        mult = mult + tail / trail.length;
        gameDifficulty = gameDifficulty + 1;
        tail++;
        fx = getRandomPosition(0, tc);
        fy = getRandomPosition(0, tc);
      }
    }

    function getRandomPosition(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
};

window.preventScrolling = () => {
  if($.get('#popover').style.overflowY === 'hidden') {
    $.get('#wrapper').style.position = 'absolute';
    $.get('.project-scroller-container').style.overflowY = 'scroll';
    $.get('#popover').style.overflowY = 'scroll';
    $.get('.demo-code').style.overflow = 'scroll';
    $.get('.button-demo-extra').style.backgroundColor = 'transparent';
    $.get('.button-demo-extra').innerHTML = 'Disable Scroll';
  } else {
    $.get('#wrapper').style.position = 'fixed';
    $.get('.project-scroller-container').style.overflowY = 'hidden';
    $.get('#popover').style.overflowY = 'hidden';
    $.get('.demo-code').style.overflow = 'hidden';
    $.get('.button-demo-extra').style.backgroundColor = 'gold';
    $.get('.button-demo-extra').innerHTML = 'Enable Scroll';
  }
};

function fixHtml() {
  $.add($.get('.demo-addons'), $.getElement({
    class: 'button-demo-extra',
    onclick: "javascript:preventScrolling();",
    contains: 'Disable Scroll'
  }));
}