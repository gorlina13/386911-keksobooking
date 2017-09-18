'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  window.debounce = function (fun, array) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL, array);
  };
})();
