'use strict';

(function () {
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var MINPRICES = ['1000', '0', '5000', '10000'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var EMPTY_VALUE = '';
  var form = document.forms[1];
  var type = form.elements.type;
  var price = form.elements.price;
  var rooms = form.elements.rooms;
  var capacity = form.elements.capacity;
  var capacityOptions = capacity.querySelectorAll('option');
  var timein = form.elements.timein;
  var timeout = form.elements.timeout;


  function syncElementsValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function setMinPrice(evt) {
    var priceValue = Number(price.value);
    if (evt.target === type) {
      window.synchronizeFields(type, price, TYPES, MINPRICES, syncValueWithMin);
    } else {
      if (priceValue < MINPRICES[0]) {
        type.value = TYPES[1];
      } else if (priceValue < MINPRICES[2]) {
        type.value = TYPES[0];
      } else if (priceValue < MINPRICES[3]) {
        type.value = TYPES[2];
      } else {
        type.value = TYPES[3];
      }
    }
  }

  function onRoomsChange() {
    var roomsOptions = rooms.querySelectorAll('option');
    capacity.selectedIndex = -1;

    [].forEach.call(capacityOptions, function (item) {
      item.classList.add('hidden');
    });

    switch (rooms.value) {
      case roomsOptions[3].value:
        capacityOptions[3].classList.remove('hidden');
        capacity.selectedIndex = 3;
        break;

      case roomsOptions[2].value:
        for (var i = 0; i <= 2; i++) {
          capacityOptions[i].classList.remove('hidden');
        }
        capacity.selectedIndex = 0;
        break;

      case roomsOptions[1].value:
        capacityOptions[1].classList.remove('hidden');
        capacityOptions[2].classList.remove('hidden');
        capacity.selectedIndex = 1;
        break;

      default:
        capacityOptions[2].classList.remove('hidden');
        capacity.selectedIndex = 2;
    }
  }

  function resetForm() {
    form.reset();
    [].forEach.call(capacityOptions, function (item) {
      item.classList.remove('hidden');
    });
    window.map.mainPin.style.left = EMPTY_VALUE;
    window.map.mainPin.style.top = EMPTY_VALUE;
  }

  function onSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), resetForm, window.util.errorHandler);
  }

  function handleForm() {

    function onTimeinChange() {
      window.synchronizeFields(timein, timeout, CHECKINS, CHECKOUTS, syncElementsValues);
    }

    function onTimeoutChange() {
      window.synchronizeFields(timeout, timein, CHECKOUTS, CHECKINS, syncElementsValues);
    }

    function onTypeChange(evt) {
      setMinPrice(evt);
    }

    function onPriceInput(evt) {
      setMinPrice(evt);
    }

    timein.addEventListener('change', onTimeinChange);
    timeout.addEventListener('change', onTimeoutChange);
    type.addEventListener('change', onTypeChange);
    price.addEventListener('input', onPriceInput);
    rooms.addEventListener('change', onRoomsChange);
    form.addEventListener('submit', onSubmit);
  }

  handleForm();
})();
