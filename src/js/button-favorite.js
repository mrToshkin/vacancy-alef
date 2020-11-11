'use strict';

$(document).ready(function () {
  $('.card__button-favorite').on('click', function() {
    $(this).toggleClass('card__button-favorite--selected');
  });
});