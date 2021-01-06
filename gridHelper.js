$(
  function() {
    $('#calculator-buttons input').each(
      function(_index, button) {
        $(button).css('grid-area', $(button).attr('id'))
      }
    );
  }
);