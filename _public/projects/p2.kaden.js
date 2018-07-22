// Author: Kaden Griffith
// Descr : Automated Pong

const $ = require('kbrew_hypertxt')();

module.exports = {
  Project2: () => {
    'use strict';

    const canvasName = '#Automated_Pong';

    if(!$.get(canvasName)) return;

    let canvas = $.get(canvasName),
      ctx = canvas.getContext("2d"),
      fontSize = 16,
      fontColor = '#f4f4f4',
      xSpacing = 15,
      aiSpeed = 5.2,
      p1y, p2y, bx, by, yv,
      ph = 70,
      br = 6,
      pt = 8,
      dy = 0,
      xv = 9,
      score1 = 0,
      score2 = 0;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
    }

    function reset_default() {
      let dir = xv;
      if(dir < 0) {
        bx = canvas.width / 4;
      } else {
        bx = 3 * canvas.width / 4;
      }
      by = canvas.height / 2;
      xv = -xv;
      yv = getRandomInt(-3, 3);
    }

    function reset() {
      p1y = canvas.height / 2 - ph / 2;
      p2y = canvas.height / 2 - ph / 2;
      bx = canvas.width / 2;
      by = canvas.height / 2;
      xv = -xv;
      yv = getRandomInt(-3, 3);
    }

    function update() {
      if(Math.abs(yv) < 0.5) {
        yv = getRandomInt(-3, 3);
      }

      if(by < br && yv < 0) {
        yv = -yv;
      }

      if(by > canvas.height - br && yv > 0) {
        yv = -yv;
      }

      if(p1y < 0) {
        p1y = 0;
      }

      if(p2y < 0) {
        p2y = 0;
      }

      if(p1y + ph > canvas.height) {
        p1y = canvas.height - ph;
      }

      if(p2y + ph > canvas.height) {
        p2y = canvas.height - ph;
      }

      if(bx < xSpacing + (2 * br) + pt) {
        if(by > p1y && by <= p1y + ph) {
          xv = -xv;
          dy = by - (p1y + ph / 2);
          yv = dy * (0.4);
        } else if(bx < xSpacing) {
          score2++;
          reset_default();
        }
      }

      if(bx > (canvas.width - xSpacing) - pt - (br / 2)) {
        if(by > p2y && by <= p2y + ph) {
          xv = -xv;
          dy = by - (p2y + ph / 2);
          yv = dy * (0.4);
        } else if(bx > canvas.width - xSpacing) {
          score1++;
          reset_default();
        }
      }

      bx += xv;
      by += yv;

      //player on the left
      if(p1y + ph / 2 < by && bx < 3 * canvas.width / 4) {
        if(xv > 0) {
          p1y += 0;
        } else if(p1y < 0 || p1y + ph > canvas.height && (by > (p1y + ph / 8) && by < p1y + (ph - ph / 8))) {
          p1y += (aiSpeed * 0.5);
        } else if(by > (p1y + ph / 3) && by < p1y + (ph - ph / 3)) {
          p1y += (aiSpeed * 0.2);
        } else if(bx < canvas.width / 10) {
          p1y += (aiSpeed * 0.75);
        } else if(bx < 2 * canvas.width / 10 && bx > canvas.width / 10) {
          p1y += (aiSpeed * 0.78);
        } else {
          p1y += (aiSpeed * 0.8);
        }
      } else if(p1y + ph / 2 > by && bx < 3 * canvas.width / 4) {
        if(xv > 0) {
          p1y -= 0;
        } else if(p1y < 0 || p1y + ph > canvas.height && (by > (p1y + ph / 8) && by < p1y + (ph - ph / 8))) {
          p1y -= (aiSpeed * 0.5);
        } else if(by > (p1y + ph / 3) && by < p1y + (ph - ph / 3)) {
          p1y -= (aiSpeed * 0.2);
        } else if(bx < canvas.width / 10) {
          p1y -= (aiSpeed * 0.75);
        } else if(bx < 2 * canvas.width / 10 && bx > canvas.width / 10) {
          p1y -= (aiSpeed * 0.78);
        } else {
          p1y -= (aiSpeed * 0.8);
        }
      }

      //player on the right
      if(p2y + ph / 2 < by && bx > canvas.width / 4) {
        if(xv < 0) {
          p2y += 0;
        } else if(p2y < 0 || p2y + ph > canvas.height && (by > (p2y + ph / 8) && by < p2y + (ph - ph / 8))) {
          p2y += (aiSpeed * 0.5);
        } else if(by > (p2y + ph / 3) && by < p2y + (ph - ph / 3)) {
          p2y += (aiSpeed * 0.2);
        } else if(bx > 9 * canvas.width / 10) {
          p2y += (aiSpeed * 0.75);
        } else if(bx > 8 * canvas.width / 10 && bx < 9 * canvas.width / 10) {
          p2y += (aiSpeed * 0.78);
        } else {
          p2y += (aiSpeed * 0.8);
        }
      } else if(p2y + ph / 2 > by && bx > canvas.width / 4) {
        if(xv < 0) {
          p2y -= 0;
        } else if(p2y < 0 || p2y + ph > canvas.height && (by > (p2y + ph / 8) && by < p2y + (ph - ph / 8))) {
          p2y -= (aiSpeed * 0.5);
        } else if(by > (p2y + ph / 3) && by < p2y + (ph - ph / 3)) {
          p2y -= (aiSpeed * 0.2);
        } else if(bx > 9 * canvas.width / 10) {
          p2y -= (aiSpeed * 0.75);
        } else if(bx > 8 * canvas.width / 10 && bx < 9 * canvas.width / 10) {
          p2y -= (aiSpeed * 0.78);
        } else {
          p2y -= (aiSpeed * 0.8);
        }
      }

      draw();
    }

    function draw() {
      function fRect(x, y, w, h) {
        x = parseInt(x);
        y = parseInt(y);
        ctx.fillRect(x, y, w, h);
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.strokeStyle = fontColor;
      fRect(xSpacing, p1y, pt, ph);
      fRect(((canvas.width - pt) - xSpacing), p2y, pt, ph);
      ctx.font = `${fontSize}px Ubuntu`;
      ctx.fillText(score1, 40, 30);
      ctx.fillText(score2, canvas.width - 50, 30);
      ctx.beginPath();
      ctx.ellipse(bx - br / 2, by - br / 2, br, br, 2 * Math.PI, Math.PI, 180);
      ctx.fill();
    }

    reset();
    setInterval(update, 1000 / 60);
  }
};