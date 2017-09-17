'use strict';

(function () {

  function createPinsFragment(adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (item, i, array) {
      var pin = document.createElement('div');
      pin.className = 'pin';
      pin.style.left = item.location.x + 'px';
      pin.style.top = item.location.y + 'px';
      pin.setAttribute('tabindex', 0);
      pin.setAttribute('data-ad-number', i);
      pin.addEventListener('click', onDialogOpen);
      pin.addEventListener('keypress', onDialogOpen);
      pin.adverts = array;

      var pinAvatar = document.createElement('img');
      pinAvatar.src = item.author.avatar;
      pinAvatar.className = 'rounded';
      pinAvatar.width = '40';
      pinAvatar.height = '40';

      pin.appendChild(pinAvatar);
      fragment.appendChild(pin);
    });

    return fragment;
  }

  function makePinActive(pin) {
    pin.classList.add('pin--active');
  }

  function makePinsInactive(pins) {
    [].forEach.call(pins, function (pin) {
      pin.classList.remove('pin--active');
    });
  }

  function onDialogOpen(evt) {
    var pin = evt.currentTarget;
    var setOfAds = pin.adverts;
    var index = pin.dataset.adNumber;
    var allPins = pin.parentNode.querySelectorAll('.pin');

    if (window.util.canActionStart(evt)) {
      makePinsInactive(allPins);
      makePinActive(pin);
      window.showCard(setOfAds[index]);
    }
  }

  window.pin = {
    showPins: function (setOfAds) {
      var tokioPinMap = document.querySelector('.tokyo__pin-map');
      var pinsFragment = createPinsFragment(setOfAds);
      tokioPinMap.appendChild(pinsFragment);
    },
    onDialogClose: function (evt) {
      var dialog = document.querySelector('.dialog');
      var activePin = document.querySelector('.pin--active');
      // var allPins = document.querySelectorAll('.pin');
      if (window.util.canElementClose(evt)) {
        dialog.classList.add('hidden');
        // makePinsInactive(allPins);
        activePin.classList.remove('pin--active');
      }
    }
  };
})();
