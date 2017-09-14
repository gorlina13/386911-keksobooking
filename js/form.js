'use strict';

(function () {
  var form = document.forms[1];
  var title = form.elements.title;
  var price = form.elements.price;

  function syncElementsValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function setMinPrice(evt) {
    var types = ['flat', 'bungalo', 'house', 'palace'];
    var minPrices = ['1000', '0', '5000', '10000'];
    var typeSelect = form.elements.type;
    var priceInput = form.elements.price;
    var priceValue = Number(priceInput.value);
    if (evt.target === typeSelect) {
      window.synchronizeFields(typeSelect, priceInput, types, minPrices, syncValueWithMin);
    } else {
      if (priceValue < minPrices[0]) {
        typeSelect.value = types[1];
      } else if (priceValue < minPrices[2]) {
        typeSelect.value = types[0];
      } else if (priceValue < minPrices[3]) {
        typeSelect.value = types[2];
      } else {
        typeSelect.value = types[3];
      }
    }
  }

  function onRoomsChange() {
    var roomsSelect = form.elements.rooms;
    var capacitySelect = form.elements.capacity;
    var capacityOptions = capacitySelect.querySelectorAll('option');
    capacitySelect.selectedIndex = -1;
    for (var i = capacityOptions.length - 1; i >= 0; i--) {
      var option = capacityOptions[i];
      option.classList.add('hidden');
    }
    switch (roomsSelect.value) {
      case '100':
        capacityOptions[3].classList.remove('hidden');
        capacitySelect.selectedIndex = 3;
        break;

      case '3':
        capacityOptions[0].classList.remove('hidden');
        capacityOptions[1].classList.remove('hidden');
        capacityOptions[2].classList.remove('hidden');
        capacitySelect.selectedIndex = 0;
        break;

      case '2':
        capacityOptions[1].classList.remove('hidden');
        capacityOptions[2].classList.remove('hidden');
        capacitySelect.selectedIndex = 1;
        break;

      default:
        capacityOptions[2].classList.remove('hidden');
        capacitySelect.selectedIndex = 2;
    }
  }

  function resetForm() {
    title.minLength = 30;
    title.maxLength = 100;
    price.required = true;
    price.type = 'number';
    price.max = 1000000;
    price.min = 0;
    price.value = 1000;
  }

  function onSubmit(evt) {
    window.backend.save(new FormData(form), resetForm, window.util.errorHandler);
  }

  function handleForm() {
    var timeinSelect = form.elements.timein;
    var timeoutSelect = form.elements.timeout;
    var checkins = ['12:00', '13:00', '14:00'];
    var checkouts = ['12:00', '13:00', '14:00'];

    function onTimeinChange() {
      window.synchronizeFields(timeinSelect, timeoutSelect, checkins, checkouts, syncElementsValues);
    }

    function onTimeoutChange() {
      window.synchronizeFields(timeoutSelect, timeinSelect, checkouts, checkins, syncElementsValues);
    }

    function onTypeChange(evt) {
      setMinPrice(evt);
    }

    function onPriceInput(evt) {
      setMinPrice(evt);
    }

    timeinSelect.addEventListener('change', onTimeinChange);
    timeoutSelect.addEventListener('change', onTimeoutChange);
    document.querySelector('#type').addEventListener('change', onTypeChange);
    document.querySelector('#price').addEventListener('input', onPriceInput);
    document.querySelector('#room_number').addEventListener('change', onRoomsChange);
    form.addEventListener('submit', onSubmit);
  }

  handleForm();
})();
