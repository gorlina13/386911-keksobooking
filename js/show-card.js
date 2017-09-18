'use strict';

(function () {
  window.showCard = function (adObject) {
    var dialog = document.querySelector('.dialog');
    var adNode = window.card.createAdNode(adObject);
    var dialogPanel = dialog.querySelector('.dialog__panel');
    dialog.replaceChild(adNode, dialogPanel);
    dialog.classList.remove('hidden');
  };
})();
