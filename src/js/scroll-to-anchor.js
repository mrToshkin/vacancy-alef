$(document).ready(function() {
  $('.result__button-go-up').on('click', function(e) {
    $('html,body').stop().animate({ scrollTop: $('#result').offset().top }, 200);
    e.preventDefault();
  });
});