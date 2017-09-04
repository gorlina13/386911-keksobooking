'use strict';

(function () {
  function initializeAdvert(count) {
    var adverts = window.data.generateAdverts(count);
    window.pin.showPins(adverts);
    document.querySelector('.dialog').classList.add('hidden');
    document.querySelector('.dialog__close').addEventListener('click', window.pin.onDialogClose);
    document.querySelector('.dialog__close').addEventListener('keydown', window.pin.onDialogClose);
    document.addEventListener('keydown', window.pin.onDialogClose);
  }

  initializeAdvert(8);

  var mainPin = document.querySelector('.pin__main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMainPinMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var mapBorders = {
        xMin: 300,
        xMax: 900,
        yMin: 100,
        yMax: 500
      };

      var mainPinAreaCoords = {
        xMin: (mapBorders.xMin - mainPin.style.width / 2),
        xMax: (mapBorders.xMax - mainPin.style.width / 2),
        yMin: (mapBorders.yMin - mainPin.style.height),
        yMax: (mapBorders.yMax - mainPin.style.height)
      };

      var addressCoords = {};

      var mainPinStyle = getComputedStyle(mainPin);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((currentCoords.x >= mainPinAreaCoords.xMin) && (currentCoords.x <= mainPinAreaCoords.xMax)) {
        mainPin.style.left = currentCoords.x + 'px';
        addressCoords.x = currentCoords.x + Math.round(parseInt(mainPinStyle.width, 10) / 2);
      } else if (currentCoords.x < mainPinAreaCoords.xMin) {
        addressCoords.x = mapBorders.xMin;
      } else {
        addressCoords.x = mapBorders.xMax;
      }

      if ((currentCoords.y >= mainPinAreaCoords.yMin) && (currentCoords.y <= mainPinAreaCoords.yMax)) {
        mainPin.style.top = currentCoords.y + 'px';
        addressCoords.y = currentCoords.y + parseInt(mainPinStyle.height, 10);
      } else if (currentCoords.y < mainPinAreaCoords.yMin) {
        addressCoords.y = mapBorders.yMin;
      } else {
        addressCoords.y = mapBorders.yMax;
      }

      document.querySelector('#address').value = 'x: ' + addressCoords.x + ', y: ' + addressCoords.y;
    }

    function onMainPinMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    }

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });
})();
