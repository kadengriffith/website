// Util

'use strict';

module.exports = (() => {
  window.__internalClock = {
    fps: 30,
    fpsInterval: null,
    startTime: null,
    now: null,
    then: null,
    elapsed: null,
    frameCount: 0,
    currentFPS: 0,
    stop: false
  };

  window.__requestFrame = () => {
    if(window.__internalClock.stop) return;
    window.requestAnimationFrame(window.__requestFrame);
    window.__internalClock.now = Date.now();
    window.__internalClock.elapsed = window.__internalClock.now - window.__internalClock.then;
    if(window.__internalClock.elapsed > window.__internalClock.fpsInterval) {
      window.__internalClock.then = window.__internalClock.now - (window.__internalClock.elapsed % window.__internalClock.fpsInterval);
      let sinceStart = window.__internalClock.now - window.__internalClock.startTime;
      window.__internalClock.currentFPS = Math.round(1000 / (sinceStart / ++window.__internalClock.frameCount) * 100) / 100;
      if(typeof window.__draw === 'function') window.__draw();
    }
  }

  // Screen Update at specified framerate
  window.__update = (fps = window.__internalClock.fps) => {
    window.__internalClock.fpsInterval = 1000 / fps;
    window.__internalClock.then = Date.now();
    window.__internalClock.startTime = window.__internalClock.then;
    window.__requestFrame();
  }
})();