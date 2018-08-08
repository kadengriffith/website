// Utilities

'use strict';
(() => {
  class util {
    verifyOrientation() {
      const orientation = window.matchMedia('(orientation: portrait)').matches || window.innerHeight > window.innerwidth ? 'portrait' : 'landscape';
      if(orientation === 'portrait' && this.isStandalone()) {
        window.innerHeight = window.screen.height;
      } else if(orientation === 'landscape' && this.isStandalone()) {
        window.innerHeight = window.screen.width;
      }
      return orientation;
    }

    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    }

    isStandalone() {
      return(window.matchMedia('(display-mode: standalone)').matches || 'standalone' in navigator);
    }

    isFullscreen() {
      return window.innerWidth == screen.width && window.innerHeight == screen.height || window.innerWidth == screen.height && window.innerHeight == screen.width;
    }
  }

  module.exports = new util();
})();