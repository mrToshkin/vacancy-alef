$(function() {
  let formValidate = function() {
    $('form').each(function() {
      $(this).on('submit', function() {
        $(this).validate({
          rules: {
            email: {
              required: true,
              email: true
            },
            subscribe: 'required'
          },
          messages: {
            email: {
              required: "Введите email",
              email: "Email должен быть в формате name@domain.com"
            },
            subscribe: 'Подпишитесь на наши новости'
          },
          /* errorPlacement: function (error, element) {
            element.attr('placeholder', error[0].outerText);
            $('.checkmark').css({ 'outline': '1px solid red'})
          } */
        });
        if ($(this).valid()) {
          let wrap = $(this)[0].closest('.subscribe-block__form');
          if (wrap) {
            $(wrap).siblings('.subscribe-block__form-accepted').show();
            $(wrap).hide();
          }
        }
        return false;
      })
    });
  };
  formValidate();
});