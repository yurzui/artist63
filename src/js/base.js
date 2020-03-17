(function(){
  /* Spring */
/*  var spring = (function(){

    var spring = document.createElement('div'),
        header = document.querySelector('.l-header-wrapper');

    spring.className = 'spring';
    spring.innerHTML = '<img width="50" height="84" class="deco leaf-1" alt="" src="/img/spring/leaf-1.png">' +
                       '<img width="82" height="69" class="deco leaf-2" alt="" src="/img/spring/leaf-2.png">' +
                       '<img width="23" height="25" class="deco leaf-3" alt="" src="/img/spring/leaf-3.png">' +
                       '<img width="91" height="95" class="deco leaf-4" alt="" src="/img/spring/leaf-4.png">';

    header.insertBefore(spring, header.firstChild);
  })();*/

  /* Buttons hover */
  var hoverEffect = (function(){
    var buttons = document.querySelectorAll('.btn'), 
      elem;

    for(var i = 0; i < buttons.length; i++) {
      elem = buttons[i];
      elem.onmouseenter = function() {
        this.style.backgroundPosition =(this.offsetWidth - 458 + Math.ceil(Math.sin(15 * Math.PI / 180) * this.offsetHeight / Math.sin(75 * Math.PI / 180))) + 'px 0';
      }
      elem.onmouseout = function(e) {
        this.style.backgroundPosition = '-459px 0';
      }
    }
  })();

  /* Mobile menu */
  var navigation = (function(){
    var nav = document.querySelector('.menu-toggler');

    nav.addEventListener('click', function() {
      toggleClass(document.body, 'open-menu');
    });
  })();
})();

(function(){
  var toTop = document.getElementById('toTop'),
    header = document.querySelector('.l-header-wrapper');

  toTop.addEventListener('click', function() {
    scrollTo(0, 300);
    return false;
  });

  window.onscroll = function() {
    var scrollTop = window.pageYOffset;
    scrollTop > 300 ? toTop.style.display = 'block' : toTop.style.display = 'none';
  }

})();

(function(){
  var form = document.getElementById('form');
  if(form) {
    var name = form.querySelector('[name="name"]'),
      email = form.querySelector('[name="email"]'),
      msg = form.querySelector('[name="message"]');
    form.onsubmit = function(data,d){
      if(name.value && email.value && msg.value){
        var xhr = new XMLHttpRequest();

        var body = 'name=' + encodeURIComponent(name.value) +
          '&email=' + encodeURIComponent(email.value) + '&message=' + encodeURIComponent(msg.value);

        console.log(body);

        xhr.open("POST", '/send.php', true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.onreadystatechange = function(){
          if (xhr.readyState==4 && xhr.status==200)
          {
            document.getElementById('results').innerHTML=xhr.responseText;
            addClass(form, 'g-hidden')
          }
        };

        xhr.send(body);
      }
    };
  }
})();