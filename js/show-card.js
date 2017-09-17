'use strict';
// Стало:
// Так - корректно?
(function () {
  window.showCard = function (adObject) {
    var dialog = document.querySelector('.dialog');
    var adNode = window.card.createAdNode(adObject);
    var dialogPanel = dialog.querySelector('.dialog__panel');
    dialog.replaceChild(adNode, dialogPanel);
    dialog.classList.remove('hidden');
  };
})();

// Было:
/* (function () {
  window.showCard = function (adObject) {
    var adNode = window.card.createAdNode(adObject);
    var dialogPanel = document.querySelector('.dialog__panel');
    var parentNode = dialogPanel.parentNode;
    parentNode.replaceChild(adNode, dialogPanel);
    document.querySelector('.dialog').classList.remove('hidden');
  };
})();*/
