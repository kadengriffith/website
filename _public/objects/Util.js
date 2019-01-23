// Utilities

'use strict';
(() => {
  class Util {
    constructor() {
      this.orientation = null;
    }

    verifyOrientation() {
      if (window.matchMedia("(orientation: portrait)").matches) {
        this.orientation = 'portrait';
      }

      if (window.matchMedia("(orientation: landscape)").matches) {
        this.orientation = 'landscape';
      }
      return this.orientation;
    }

    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    }

    isStandalone() {
      return (window.matchMedia('(display-mode: standalone)').matches || 'standalone' in navigator);
    }

    isFullscreen() {
      return window.innerWidth == screen.width && window.innerHeight == screen.height || window.innerWidth == screen.height && window.innerHeight == screen.width;
    }
  }

  module.exports = new Util();
})();