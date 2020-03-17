

(function( $, undefined ) {



var $result = $("#results");

$("#form").submit(function(event) {
    var $form = $(this);
    var msg = $(this).serialize();
     $result.empty();
     $.ajax({
         type: "POST",
         url: "/send.php",
         data: msg,
         success: function(data) {
             $result.html(data);
             $form.hide();
         },
         error:  function(xhr, str){
            alert("Возникла ошибка!");
        }
     });
});



  var $sidebar   = $(".article__menu"), 
          $window    = $(window),
          offset     = $sidebar.offset(),
          topPadding = 15;

if($sidebar.length){
var minPosition = $sidebar.offset().top,
    $firstMenuHash = $('.article__content h2').first();
var onScroll = function () {
  if($window.outerWidth() > 850){
    var offset = $(this).scrollTop(), hIndex;

  if (minPosition < offset) {
    $sidebar.addClass('mode_floating');
  } else {
    $sidebar.removeClass('mode_floating');
  }
  offset = $(this).scrollTop() + 25;

  hIndex = $.grep($('.article__content h2').map(function(index, item) {
  if ($(item).offset().top < offset) {
    return index;
  }
    return -1;
  }), 
  function(index) { return index >= 0; });

  if(offset >= $firstMenuHash.offset().top)
  {
    $sidebar.find('li').eq(hIndex.pop() || 0).addClass('selected')
    .siblings().removeClass('selected');
  }
  else{
     $sidebar.find('li').removeClass('selected');
  }
}
};

  $(window).scroll(onScroll);
}


})( jQuery );


