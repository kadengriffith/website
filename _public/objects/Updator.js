// Utilities

'use strict';

module.exports = class Updator {
  constructor(fn) {
    this.clock = {
      fps: 18,
      fpsInterval: null,
      startTime: null,
      now: null,
      then: null,
      elapsed: null,
      frameCount: 0,
      currentFPS: 0
    };

    this.update = fn;

    this.requestFrame = () => {
      window.requestAnimationFrame(this.requestFrame);
      this.clock.now = Date.now();
      this.clock.elapsed = this.clock.now - this.clock.then;
      if (this.clock.elapsed > this.clock.fpsInterval) {
        this.clock.then = this.clock.now - (this.clock.elapsed % this.clock.fpsInterval);
        let sinceStart = this.clock.now - this.clock.startTime;
        this.clock.currentFPS = Math.round(1000 / (sinceStart / ++this.clock.frameCount) * 100) / 100;
        this.update();
      }
    };
  }

  start(fps = this.clock.fps) {
    this.clock.fpsInterval = 1000 / fps;
    this.clock.then = Date.now();
    this.clock.startTime = this.clock.then;
    this.requestFrame();
  }
};