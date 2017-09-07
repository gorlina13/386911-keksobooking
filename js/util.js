'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    canActionStart: function (evt) {
      return evt.button === 0 || evt.keyCode === ENTER_KEYCODE;
    },
    canElementClose: function (evt) {
      return evt.button === 0 || evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE;
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.marginTop = '0';
      node.style.marginBottom = '0';
      node.style.marginLeft = 'auto';
      node.style.marginRight = 'auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = 'red';
      node.style.position = 'absolute';
      node.style.left = '0';
      node.style.right = '0';
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
