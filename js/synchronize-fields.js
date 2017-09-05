'use strict';

(function () {
  window.synchronizeFields = function (evt, startElement, endElement, startArray, endArray, action) {
    action(evt, startElement, endElement, startArray, endArray);
  };
})();
