(function(){
  var elem = document.createElement('div');
  elem.className = 'pswp';
  elem.innerHTML ='<div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Закрыть"></button><button class="pswp__button pswp__button--fs" title="Полноэкранный режим"></button><button class="pswp__button pswp__button--zoom" title="Увеличить/уменьшить"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Назад">Туда</button><button class="pswp__button pswp__button--arrow--right" title="Вперед">Сюда</button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div>';
  document.body.appendChild(elem);
  var options = {
      index: 0,
      bgOpacity: 0.7,
      showHideOpacity: true,
      closeOnScroll: false
  }

  var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            childElements,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i];
            if(figureEl.nodeType !== 1) {
              continue;
            }

            linkEl = figureEl.children[0];
            size = linkEl.getAttribute('data-size').split('x');

            item = {
              src: linkEl.getAttribute('href'),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
            };

            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
   
            if(linkEl.children.length > 0) {
              item.msrc = linkEl.children[0].getAttribute('src');
            } 
           
            item.el = figureEl;
            items.push(item);
        }

        return items;
    };

    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

      items = parseThumbnailElements(galleryElement);

      options = {
          index: index,
          bgOpacity: 0.85,
          history: false,
          galleryUID: galleryElement.getAttribute('data-gallery-uid'),
          getThumbBoundsFn: function(index) {
              var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  rect = thumbnail.getBoundingClientRect(); 

              return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
          },
          focus: false,
          closeOnScroll: false
      };

      if(disableAnimation) {
          options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };

    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-gallery-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
  };

  initPhotoSwipeFromDOM('.swipe-gallery');
})();