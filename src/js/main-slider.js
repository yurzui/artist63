/*
  Main slider
*/
(function(){
  function Slider(container, options) {
    'use strict';

    if (!container) return;

    options = options || {};

    var slides, slidesCount,
        bgincrement = options.bgincrement || 50,
        interval = 8000,
        autoplay = true,
        current, pages,
        navNext, navPrev,
        isAnimating, bgpositer,
        cssAnimations,
        cssTransitions,
        slideshow;

    function move(elem, start, end, callback){
      if(start > end && parseInt(elem.style.left) > end || start < end && parseInt(elem.style.left) < end)
      {
        var left = parseInt(elem.style.left),
            nextPosition = start > end ? left - 1 : left + 1;
      
        elem.style.left = nextPosition + '%';
    
        setTimeout(function(){ move(elem, start, end, callback); }, 10);
      }
      else {
        callback();
      }
    }

    function init() {
      var navigation;
      slides = container.querySelectorAll('.slide');
      slidesCount = slides.length;

      current = options.current || 0;

      addClass(slides[current], 'slide-current');
      
      navigation = document.createElement('nav');
      navigation.className = 'dots';
      navigation.innerHTML = '<span>Портреты</span>' +
                             '<span>Картины</span>' +
                             '<span>Обучение</span>';

      container.appendChild(navigation);

      pages = container.querySelectorAll('nav.dots > span');
      navNext = container.querySelector('span.arrows-next');
      navPrev = container.querySelector('span.arrows-prev');

      isAnimating    = false;
      bgpositer      = 0;
      
      cssAnimations  = browser.testProp('animation');
      cssTransitions = browser.testProp('transition');

      if(!cssAnimations || !cssAnimations ) {
        addClass(container, 'main-slider-fb');
      }

      updatePage();
      loadEvents();

      autoplay && startSlideshow();
    }

    function updatePage() {
      for(var i = 0; i < pages.length; i++) {
        removeClass(pages[i], 'dots-current');
      }

      addClass(pages[current], 'dots-current');
    }

    function page (index) {
      if(index >= slidesCount || index < 0 ) {
        return false;
      }
      if(autoplay) {
        clearTimeout(slideshow);
        startSlideshow();
      }

      navigate(index);
    }

    function startSlideshow() {
      slideshow = setTimeout(function() {
          var page = (current < slidesCount - 1 ) ? page = current + 1 : page = 0;
          navigate(page, 'next');

          if(autoplay) {
            startSlideshow();
          }
      }, interval);
    }

    function navigate(page, dir) {
      var currentElem = slides[current], next;

      if(current === page || isAnimating) return false;

      isAnimating    = true;

      var classTo, classFrom, d;

      if(!dir) {
          (page > current ) ? d = 'next' : d = 'prev';
      } else {
          d = dir;
      }

      if(cssAnimations && cssAnimations ) {
        if(d === 'next') {
          classTo     = 'slide-toleft';
          classFrom   = 'slide-fromright';
          ++bgpositer;
        } else {
          classTo     = 'slide-toright';
          classFrom   = 'slide-fromleft';
          --bgpositer;
        }

        container.style.backgroundPosition = bgpositer * bgincrement + '% 0%';
      }

      current = page;

      next = slides[current];

      if(cssAnimations && cssAnimations ) {
        var rmClasses   = 'slide-toleft slide-toright slide-fromleft slide-fromright'.split(' ');

        for(var i = 0; i < rmClasses.length; i++) {
           removeClass(currentElem, rmClasses[i]);
           removeClass(next, rmClasses[i]);
        }

        addClass(currentElem, classTo);
        addClass(next, classFrom);

        removeClass(currentElem, 'slide-current');
        addClass(next, 'slide-current');
      }

      if(!cssAnimations || !cssAnimations) {
        currentElem.style.left = currentElem.style.left || 0;

        next.style.left = (d === 'next') ? '100%' : '-100%';

        move(next, (d === 'next') ? 100 : -100, 0, function(){
          isAnimating = false; 
        });

        move(currentElem, 0, -(d === 'next') ? -100 : 100, function(){
          removeClass(currentElem, 'slide-current'); 
        });
      }

      updatePage();
    }

    function loadEvents() {
      for(var i = 0; i < pages.length; i++) {
        pages[i].addEventListener('click', (function(index) { 
            return function() {
              page(index);
              return false;
            }
          })(i));
      }

      navNext.addEventListener('click', function() {
        if(autoplay ) {
          clearTimeout(slideshow);
          startSlideshow();
        }

        var page = (current < slidesCount - 1) ? page = current + 1 : page = 0;
        
        navigate(page, 'next');
        return false;
      });

      navPrev.addEventListener('click', function() {
        if(autoplay) {
          clearTimeout(slideshow);
          startSlideshow();
        }

        var page = (current > 0) ? page = current - 1 : page = slidesCount - 1;
        
        navigate(page, 'prev');
        return false;
      });

      if(cssTransitions) {
        if(!bgincrement ) {
          container.addEventListener('webkitAnimationEnd animationend OAnimationEnd', function(event) {
            if(event.originalEvent.animationName === 'toRightAnim4' || event.originalEvent.animationName === 'toLeftAnim4' ) {
                isAnimating = false;
            }
          });
        } else {
          var endTransitions   = 'webkitTransitionEnd transitionend OTransitionEnd'.split(' ');
          for(var t = 0; t < endTransitions.length; t++) {
            container.addEventListener(endTransitions[t], function(event) {
               if(event.target.id === container.id) {
                 isAnimating = false;
               }
            });
          }
          
        }
      }
    }

    init();
  }

  new Slider(document.getElementById('main-slider'));
})();
