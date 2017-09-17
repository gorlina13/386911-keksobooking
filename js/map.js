'use strict';

(function () {

  var TOKYO_LEFT = 0;
  var TOKYO_TOP = 200;
  var mainPin = document.querySelector('.pin__main');

  function loadHandler(adverts) {
    var dialog = document.querySelector('.dialog');
    var dialogClose = dialog.querySelector('.dialog__close');
    window.dataArray = adverts;
    window.pin.showPins(adverts);
    dialog.classList.add('hidden');
    dialogClose.addEventListener('click', window.pin.onDialogClose);
    dialogClose.addEventListener('keydown', window.pin.onDialogClose);
    document.addEventListener('keydown', window.pin.onDialogClose);
  }

  window.backend.load(loadHandler, window.util.errorHandler);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMainPinMouseMove(moveEvt) {

      moveEvt.preventDefault();

      var tokyoImg = document.querySelector('.tokyo > img');
      var address = document.forms[1].elements.address;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var mapBorders = {
        xMin: TOKYO_LEFT,
        xMax: tokyoImg.width,
        yMin: TOKYO_TOP,
        yMax: tokyoImg.height
      };

      var mainPinStyle = getComputedStyle(mainPin);
      var mainPinHalfWidth = parseInt(mainPinStyle.width, 10) / 2;
      var mainPinHeight = parseInt(mainPinStyle.height, 10);


      var mainPinAreaCoords = {
        xMin: (mapBorders.xMin - mainPinHalfWidth),
        xMax: (mapBorders.xMax - mainPinHalfWidth),
        yMin: (mapBorders.yMin - mainPinHeight),
        yMax: (mapBorders.yMax - mainPinHeight)
      };

      var addressCoords = {};

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((currentCoords.x >= mainPinAreaCoords.xMin) && (currentCoords.x <= mainPinAreaCoords.xMax)) {
        mainPin.style.left = currentCoords.x + 'px';
        addressCoords.x = currentCoords.x + Math.round(mainPinHalfWidth);
      } else if (currentCoords.x < mainPinAreaCoords.xMin) {
        addressCoords.x = mapBorders.xMin;
      } else {
        addressCoords.x = mapBorders.xMax;
      }

      if ((currentCoords.y >= mainPinAreaCoords.yMin) && (currentCoords.y <= mainPinAreaCoords.yMax)) {
        mainPin.style.top = currentCoords.y + 'px';
        addressCoords.y = currentCoords.y + mainPinHeight;
      } else if (currentCoords.y < mainPinAreaCoords.yMin) {
        addressCoords.y = mapBorders.yMin;
      } else {
        addressCoords.y = mapBorders.yMax;
      }

      address.value = 'x: ' + addressCoords.x + ', y: ' + addressCoords.y;
    }

    function onMainPinMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    }

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });

  var tokyoFilter = document.querySelector('.tokyo__filters-container');
  var tokyoFilterForm = document.querySelector('.tokyo__filters');
  tokyoFilter.addEventListener('change', function () {
    window.filter.filterPins(window.dataArray, tokyoFilterForm);
  });
})();
