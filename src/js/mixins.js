var browser = {
  properties: {
    'transition': 'transitionProperty',
    'animation': 'animationName'
  },
  addEventListener: !!window.addEventListener,
  touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
  testProp: function(name) {
      return (function(temp) {
      if(temp.style[browser.properties[name]] !== undefined ) {
        return true; 
      }
     
      var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
          ucProp  = name.charAt(0).toUpperCase() + name.slice(1);

      for(var i = 0; i < domPrefixes.length; i++) {
         if(temp.style[ domPrefixes[i] + ucProp ] !== undefined) {
           return true;
         }
       }

      return false;
    })(document.createElement('art'))
  }
};

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

function scrollTo(element, duration) {
    var e = document.documentElement;
    if(e.scrollTop===0){
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t+1===e.scrollTop--?e:document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
    if (duration < 0) return;
    if(typeof from === "object")from=from.offsetTop;
    if(typeof to === "object")to=to.offsetTop;

    scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX(element, x1, x2, t, v, step, operacion) {
    if (t < 0 || t > 1 || v <= 0) return;
    element.scrollTop = x1 - (x1-x2)*operacion(t);
    t += v * step;

    setTimeout(function() {
        scrollToX(element, x1, x2, t, v, step, operacion);
    }, step);
}
function easeOutCuaic(t){
    t--;
    return t*t*t+1;
}