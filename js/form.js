'use strict';

(function () {
  var form = document.forms[1];

  function syncSelectsValues(evt, startElement, endElement, startArray, endArray) {
    if (evt.target === startElement) {
      endElement.value = endArray[startArray.indexOf(startElement.value)];
    } else {
      startElement.value = startArray[endArray.indexOf(endElement.value)];
    }
  }

  function syncValueWithMin(evt, startElement, endElement, startArray, endArray) {
    if (evt.target === startElement) {
      endElement.min = endArray[startArray.indexOf(startElement.value)];
    }
  }

  function setMinPrice(evt) {
    var minPrices = ['1000', '0', '5000', '10000'];
    var types = ['flat', 'bungalo', 'house', 'palace'];
    var typeSelect = form.elements.type;
    var priceInput = form.elements.price;
    var priceValue = Number(priceInput.value);

    window.synchronizeFields(evt, typeSelect, priceInput, types, minPrices, syncValueWithMin);

    if (evt.target === priceInput) {
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

  function checkForm(formElements) {
    for (var i = 0; i < formElements.length; i++) {

      if (!formElements[i].validity.valid) {
        formElements[i].style = 'border: 2px solid red;';
      }
    }
  }

  function doWhenSending() {
    var allInputs = form.querySelectorAll('input');
    var allSelects = form.querySelectorAll('select');
    checkForm(allInputs);
    checkForm(allSelects);
  }


  function onSubmit(evt) {
    if (window.util.canActionStart(evt)) {
      doWhenSending();
    }
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      /* здесь должно быть действие
      при успешной загрузке данных на сервер,
      сброс значений на значения по умолчанию*/

    }, window.util.errorHandler);
  }

  function handleForm() {
    var timeinSelect = form.elements.timein;
    var timeoutSelect = form.elements.timeout;
    var checkins = ['12:00', '13:00', '14:00'];
    var checkouts = ['12:00', '13:00', '14:00'];

    function onTimeinChange(evt) {
      window.synchronizeFields(evt, timeinSelect, timeoutSelect, checkins, checkouts, syncSelectsValues);
    }

    function onTimeoutChange(evt) {
      window.synchronizeFields(evt, timeinSelect, timeoutSelect, checkins, checkouts, syncSelectsValues);
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
