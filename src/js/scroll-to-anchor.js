$(function() {
  let scrollButton = $('.result__button-go-up');

  window.addEventListener('resize', showScrollButton)

  function showScrollButton() {
    if (document.body.offsetHeight > window.innerHeight) {   
      scrollButton.show()
      scrollButton.on('click', function(e) {
        $('html,body').stop().animate({ scrollTop: $('#result').offset().top }, 200);
        e.preventDefault();
      });
    } else {
      scrollButton.hide()
      scrollButton.off('click')
    }
  }

  showScrollButton();
});