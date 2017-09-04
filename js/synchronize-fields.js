'use strict';

(function () {
  window.synchronizeFields = function (evt, elementOne, elementTwo, arrayOne, arrayTwo, action) {
    action(evt, elementOne, elementTwo, arrayOne, arrayTwo);
  };
})();
