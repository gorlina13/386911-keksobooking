'use strict';

(function () {
  function createPinsFragment(adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      var pin = document.createElement('div');
      pin.className = 'pin';
      pin.style.left = adverts[i].location.x + 'px';
      pin.style.top = adverts[i].location.y + 'px';
      pin.setAttribute('tabindex', 0);
      pin.setAttribute('data-ad-number', i);
      pin.addEventListener('click', dialogOpenHandler);
      pin.addEventListener('keypress', dialogOpenHandler);
      pin.adverts = adverts;

      var pinAvatar = document.createElement('img');
      pinAvatar.src = adverts[i].author.avatar;
      pinAvatar.className = 'rounded';
      pinAvatar.width = '40';
      pinAvatar.height = '40';

      pin.appendChild(pinAvatar);
      fragment.appendChild(pin);
    }
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

  function dialogOpenHandler(evt) {
    var pin = evt.currentTarget;
    var setOfAds = pin.adverts;
    var index = pin.dataset.adNumber;
    var allPins = pin.parentNode.querySelectorAll('.pin--active');

    if (window.util.actionCanStart(evt)) {
      makePinsInactive(allPins);
      makePinActive(pin);
      window.cards.showAdDialog(setOfAds[index]);
    }
  }

  window.pin = {
    showPins: function (setOfAds) {
      var pinsFragment = createPinsFragment(setOfAds);
      document.querySelector('.tokyo__pin-map').appendChild(pinsFragment);
    },
    dialogCloseHandler: function (evt) {
      if (window.util.elementCanClose(evt)) {
        document.querySelector('.dialog').classList.add('hidden');
        document.querySelector('.pin--active').classList.remove('pin--active');
      }
    }
  };
})();
