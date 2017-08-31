'use strict';

(function () {
  var form = document.forms[1];

  function setTheSameTime(evt) {
    var timeinSelect = form.elements.timein;
    var timeoutSelect = form.elements.timeout;
    if (evt.target === timeinSelect) {
      timeoutSelect.selectedIndex = timeinSelect.selectedIndex;
    } else {
      timeinSelect.selectedIndex = timeoutSelect.selectedIndex;
    }
  }

  function timeinChangeHandler(evt) {
    setTheSameTime(evt);
  }

  function timeoutChangeHandler(evt) {
    setTheSameTime(evt);
  }

  function setMinPrice(evt) {
    var minPrices = ['1000', '0', '5000', '10000'];
    var types = ['flat', 'bungalo', 'house', 'palace'];
    var typeSelect = form.elements.type;
    var priceInput = form.elements.price;
    var typeIndex = typeSelect.selectedIndex;
    var priceValue = Number(priceInput.value);

    if (evt.target === typeSelect) {
      priceInput.setAttribute('min', minPrices[typeIndex]);
    } else {
      if (priceValue < minPrices[0]) {
        typeSelect.value = types[1];
      } else if (priceValue <= minPrices[2]) {
        typeSelect.value = types[0];
      } else if (priceValue <= minPrices[3]) {
        typeSelect.value = types[2];
      } else {
        typeSelect.value = types[3];
      }
    }
  }

  function typeChangeHandler(evt) {
    setMinPrice(evt);
  }

  function priceInputHandler(evt) {
    setMinPrice(evt);
  }

  function roomsChangeHandler() {
    var roomsSelect = form.elements.rooms;
    var capacitySelect = form.elements.capacity;
    switch (roomsSelect.value) {
      case '100':
        capacitySelect.options[3].selected = true;
        capacitySelect.options[0].selected = false;
        capacitySelect.options[1].selected = false;
        capacitySelect.options[2].selected = false;
        break;

      case '3':
        capacitySelect.options[3].selected = false;
        capacitySelect.options[0].selected = true;
        capacitySelect.options[1].selected = true;
        capacitySelect.options[2].selected = true;
        break;

      case '2':
        capacitySelect.options[3].selected = false;
        capacitySelect.options[0].selected = false;
        capacitySelect.options[1].selected = true;
        capacitySelect.options[2].selected = true;
        break;

      default:
        capacitySelect.options[3].selected = false;
        capacitySelect.options[0].selected = false;
        capacitySelect.options[1].selected = false;
        capacitySelect.options[2].selected = true;
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


  function submitHandler(evt) {
    if (window.util.actionCanStart(evt)) {
      doWhenSending();
    }
  }

  function handleForm() {
    document.querySelector('#timein').addEventListener('change', timeinChangeHandler);
    document.querySelector('#timeout').addEventListener('change', timeoutChangeHandler);
    document.querySelector('#type').addEventListener('change', typeChangeHandler);
    document.querySelector('#price').addEventListener('input', priceInputHandler);
    document.querySelector('#room_number').addEventListener('change', roomsChangeHandler);
    document.querySelector('.form__submit').addEventListener('click', submitHandler);
    document.querySelector('.form__submit').addEventListener('keydown', submitHandler);
  }

  handleForm();
})();
