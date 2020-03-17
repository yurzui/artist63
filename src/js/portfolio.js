(function(){
  var filter = document.querySelector('.filters');
  if(filter) {
    var filters = filter.getElementsByTagName('li'),
    portfolio = document.querySelector('.portfolio');

    for(var i = 0; i < filters.length; i++){
      filters[i].addEventListener('click', function() {

        var criteria = this.getAttribute('data-filter'),
          hiddenItems = portfolio.querySelectorAll('.g-hidden'),
          visibleItems, i, j;
          
        for(i = 0; i < hiddenItems.length; i++){
          removeClass(hiddenItems[i], 'g-hidden');
        }

        if(criteria) {
          visibleItems = portfolio.querySelectorAll('.work-wrapper:not(.' + criteria + ')');
          for(j = 0; j < visibleItems.length; j++){
            addClass(visibleItems[j], 'g-hidden');
          }
        }

        var activeFilter = filter.querySelector('.selected');
        if(criteria) {
          window.location.hash = criteria;
        } else {
          history.pushState('', document.title, window.location.pathname);
        }
        removeClass(activeFilter, 'selected');
        addClass(this, 'selected');
      });
    }

    if(window.location.hash) {
      var category = window.location.hash.slice(1);
      document.querySelector('[data-filter="' + category + '"]').click();
    }

   
  }

  if(document.getElementById('portfolio')) {
    var popupLinks = document.querySelectorAll('.work-wrapper .lightbox');
    var elem = document.querySelector('.pswp');

    for(var i = 0; i < popupLinks.length; i++) {
      popupLinks[i].addEventListener('click', function(e) {
        e.preventDefault();

        var items = [],
            group = this.getAttribute('data-group'),
            sizes, index, figcaption;

        var siblings = document.querySelectorAll('.work-wrapper:not(.g-hidden) a[data-group="' + group +'"]');

        for(var k = 0; k < siblings.length; k++) {
          sizes = siblings[k].getAttribute('data-sizes').split('x');
          figcaption = siblings[k].parentNode.children[1].innerHTML;
          items.push({
              index: siblings[k].getAttribute('data-index'),
              src : siblings[k].href,
              w   : sizes[0],
              h   : sizes[1],
              current: siblings[k] === this,
              el: siblings[k],
              msrc: siblings[k].href.replace('/big', ''),
              title: figcaption
          });
        }

        for(var m = 0; m < items.length; m++) {
          if(items[m].current) {
            index = m;
          }
        }

        var options = {
            index: index,
            bgOpacity: 0.85,
            closeOnScroll: false,
            history: false,
            focus: false,
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            maxSpreadZoom: 2
        }
        
        var lightBox = new PhotoSwipe(elem, PhotoSwipeUI_Default, items, options);
        lightBox.init();
      });
    }
  }
})();