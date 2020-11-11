$(document).ready(function() {
  let $body = document.querySelector('body'),
      burger = document.querySelector('.burger'),
      overlay = document.querySelector('.mobile-menu__overlay'),
      widthMobile = window.matchMedia('(max-width: 768px)'); // media query list

  $('body').removeClass('nojs')

  function pageStarted() {
    if (widthMobile.matches) {
      $('body').addClass('menu--closed');
    }
  };

  function checkWidth(e) {
    if (e.matches) {
      $('body').addClass('menu--closed');
    }
    else {
      $('body').removeClass('menu--closed'),
      $('body').removeClass('menu--opened');
      $('.mobile-menu__overlay').removeClass('mobile-menu__overlay--opened');
    }
  };

  widthMobile.addListener(checkWidth);
  pageStarted();

  $('.burger').on('click', function(e) {
    e.preventDefault;
    $(this).toggleClass('burger--opened');
    $('.mobile-menu__overlay').toggleClass('mobile-menu__overlay--opened');
  });

  burger.addEventListener('click', function() {
    if ($body.classList.contains('menu--closed')) {
      $body.classList.remove('menu--closed');
      $body.classList.add('menu--opened');
      burger.setAttribute('aria-expanded', true);
    } else {
      $body.classList.add('menu--closed');
      $body.classList.remove('menu--opened');
      burger.setAttribute('aria-expanded', false);
    }
  });

  overlay.addEventListener('click', function() {
    $body.classList.add('menu--closed');
    $body.classList.remove('menu--opened');
    burger.classList.remove('burger--opened');
    overlay.classList.remove('mobile-menu__overlay--opened');
  });
});