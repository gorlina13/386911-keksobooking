'use strict';

(function () {
  window.showCard = function (adObject) {
    var adNode = window.card.createAdNode(adObject);
    var dialogPanel = window.map.dialog.querySelector('.dialog__panel');
    window.map.dialog.replaceChild(adNode, dialogPanel);
    window.map.dialog.classList.remove('hidden');
  };
})();
