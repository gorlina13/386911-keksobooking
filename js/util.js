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
    }
  };
})();
