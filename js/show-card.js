'use strict';

(function () {
  window.showCard = function (adObject) {
    var adNode = window.card.createAdNode(adObject);
    var dialogPanel = document.querySelector('.dialog__panel');
    var parentNode = dialogPanel.parentNode;
    parentNode.replaceChild(adNode, dialogPanel);
    document.querySelector('.dialog').classList.remove('hidden');
  };
})();
