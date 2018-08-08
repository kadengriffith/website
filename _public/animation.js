// Animations

const $ = require('kbrew_hypertxt').get,
  qA = require('kbrew_hypertxt').queryAll,
  anime = require('animejs');

module.exports = {
  run: () => {
    function animateStartup() {
      anime({
        targets: '.background',
        points: [{
            value: '1920,1080 1596.1,1080 0,1080 0,0 464,133 960,691'
          },
          {
            value: '1655,1080 757,1080 0,1080 0,683 395,883 973,856'
          },
          {
            value: '1655,1130 727,1154 0,1080 0,946 346,1064 861,1130'
          },
          {
            value: '1655,1130 727,1154 -43,1094 -13,1135 340,1201 861,1130'
          }
        ],
        easing: 'easeInOutBack',
        duration: 1500
      });

      anime({
        targets: '.hero-logo',
        easing: 'easeInSine',
        translateX: -1 * window.innerWidth * 2,
        elasticity: 500,
        opacity: 0,
        duration: 1000,
        direction: 'reverse',
        delay: 425,
        rotate: '4turn',
        complete: amin => {
          anime({
            targets: '.hero-button',
            duration: 900,
            opacity: 1,
            easing: 'easeInSine',
          });

          anime({
            targets: '.hero-logo',
            rotate: '4turn',
            delay: 5000,
            duration: 5000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutBack',
            run: anim => {
              runIndexAnimations(anim);
            }
          });
        }
      });

      anime({
        targets: '.hero-container .text-title',
        duration: 1000,
        delay: 400,
        opacity: 1,
        easing: 'easeInSine',
      });
    }

    function runIndexAnimations(animation) {
      function typeWord() {
        if($('#join')) {
          let words = ['Ride', 'Catch', 'See', 'Feel', 'Become', 'Join', 'Share'],
            index = Math.floor(Math.random() * words.length),
            r = $('#join').innerHTML;

          if(new RegExp(words[index]).test(r)) {
            index = index === 0 ? index + 1 : index - 1;
          }

          let a = Array.from(words[index]),
            i = a.length - 1;

          $('#join').innerHTML = r.replace(/(Ride|Catch|See|Feel|Become|Join|Share)/, '');;

          function Loop() {
            setTimeout(() => {
              $('#join').innerHTML = `${a[i]}${$('#join').innerHTML}`;
              i--;
              if(i >= 0) Loop();
            }, 100)
          }

          Loop();
        }
      }

      function moveWhales() {
        for(let i = 0; i < qA('.whale').length; i++) {
          anime({
            targets: qA('.whale')[i],
            rotate: '2turn',
            easing: 'easeInSine',
            delay: i * 75,
            elasticity: 6000,
            duration: 4000
          });
        }
      }

      if(animation.progress === 100) {
        moveWhales();
        typeWord();
      }
    }
    animateStartup();
  }
};