'use strict';

(function () {
  function initializeAdvert(count) {
    var adverts = window.data.generateAdverts(count);
    window.pin.showPins(adverts);
    document.querySelector('.dialog').classList.add('hidden');
    document.querySelector('.dialog__close').addEventListener('click', window.pin.dialogCloseHandler);
    document.querySelector('.dialog__close').addEventListener('keydown', window.pin.dialogCloseHandler);
    document.addEventListener('keydown', window.pin.dialogCloseHandler);
  }

  initializeAdvert(8);
})();
