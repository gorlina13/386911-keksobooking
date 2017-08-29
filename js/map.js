'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function getRandomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function getPlaceTitle(index) {
    // список заголовков
    var placeTitles = [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ];
    return placeTitles[index];
  }

  function getTypePlace() {
    var placeTypesEn = ['flat', 'house', 'bungalo'];
    var index = getRandomNumber(0, 2);
    return placeTypesEn[index];
  }

  function translatePlaceType(englishType) {
    var translate = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    return translate[englishType];
  }

  // Генерирует массив строковых значений, взятых случайным образом из начального набора

  function getPlaceFeatures() {
    var result = [];
    var featuresList = ['wifi', 'dishwasher', 'parking', 'washer',
      'elevator', 'conditioner'];

    for (var i = 0; i < featuresList.length; i++) {
      if (getRandomNumber(0, 1)) {
        result.push(featuresList[i]);
      }
    }

    return result;
  }

  // Создание массива объектов, описывающих объявления

  function generateAdverts(advertsCount) {
    var adverts = [];

    for (var i = 0; i < advertsCount; i++) {
      adverts[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: getPlaceTitle(i),
          price: getRandomNumber(1000, 1000000),
          type: getTypePlace(),
          rooms: getRandomNumber(1, 5),
          guests: getRandomNumber(1, 10),
          checkin: getRandomNumber(12, 14) + ':00',
          checkout: getRandomNumber(12, 14) + ':00',
          features: getPlaceFeatures(),
          description: '',
          photos: []
        },
        location: {
          x: getRandomNumber(300, 900),
          y: getRandomNumber(100, 500)
        }
      };
      adverts[i].offer.address = // адрес квартиры
        adverts[i].location.x + ', ' + adverts[i].location.y;
    }

    return adverts;
  }

  function createFeaturesFragment(adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.offer.features.length; i++) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + adverts.offer.features[i]);
      fragment.appendChild(feature);
    }
    return fragment;
  }

  function createAdNode(adverts) {
    // Создание узла и запись данных
    var advertsNode =
      document.querySelector('#lodge-template').content.cloneNode(true);

    advertsNode.querySelector('.lodge__title').textContent =
      adverts.offer.title;

    advertsNode.querySelector('.lodge__address').textContent =
      adverts.offer.address;

    advertsNode.querySelector('.lodge__price').innerHTML =
      adverts.offer.price + '&#x20bd;/ночь';

    advertsNode.querySelector('.lodge__type').textContent =
      translatePlaceType(adverts.offer.type);

    advertsNode.querySelector('.lodge__rooms-and-guests').textContent =
      'Для ' + adverts.offer.guests +
      ' гостей в ' + adverts.offer.rooms + ' комнатах';

    advertsNode.querySelector('.lodge__checkin-time').textContent =
      'Заезд после ' + adverts.offer.checkin +
      ', выезд до ' + adverts.offer.checkout;

    var setOfFeatures = createFeaturesFragment(adverts);
    advertsNode.querySelector('.lodge__features').appendChild(setOfFeatures);

    advertsNode.querySelector('.lodge__description').textContent =
      adverts.offer.description;

    // Замена стандартной аватарки на аватарку отрисовываемого объявления
    document.getElementById('offer-dialog').getElementsByTagName('img')[0].src =
      adverts.author.avatar;

    return advertsNode;
  }

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

  function showPins(setOfAds) {
    var pinsFragment = createPinsFragment(setOfAds);
    document.querySelector('.tokyo__pin-map').appendChild(pinsFragment);
  }


  function showAdDialog(adObject) {
    var adNode = createAdNode(adObject);
    var dialogPanel = document.querySelector('.dialog__panel');
    var parentNode = dialogPanel.parentNode;
    parentNode.replaceChild(adNode, dialogPanel);
    document.querySelector('.dialog').classList.remove('hidden');
  }

  function initializeAdvert(count) {
    var adverts = generateAdverts(count);
    showPins(adverts);
    document.querySelector('.dialog').classList.add('hidden');
    document.querySelector('.dialog__close').addEventListener('click', dialogCloseHandler);
    document.querySelector('.dialog__close').addEventListener('keydown', dialogCloseHandler);
    document.querySelector('.tokyo').addEventListener('keydown', dialogCloseHandler);
  }

  function makePinActive(pin) {
    pin.classList.add('pin--active');
  }

  function makePinsInactive(pins) {
    [].forEach.call(pins, function (pin) {
      pin.classList.remove('pin--active');
    });
  }

  function dialogCanOpen(event) {
    return event.button === 0 || event.keyCode === ENTER_KEYCODE;
  }


  function dialogCanClose(event) {
    return event.button === 0 || event.keyCode === ENTER_KEYCODE || event.keyCode === ESC_KEYCODE;
  }

  function dialogOpenHandler(event) {
    var pin = event.currentTarget;
    var setOfAds = pin.adverts;
    var index = pin.dataset.adNumber;
    var allPins = pin.parentNode.querySelectorAll('.pin--active');

    if (dialogCanOpen(event)) {
      makePinsInactive(allPins);
      makePinActive(pin);
      showAdDialog(setOfAds[index]);
    }
  }


  function dialogCloseHandler(event) {
    if (dialogCanClose(event)) {
      document.querySelector('.dialog').classList.add('hidden');
      document.querySelector('.pin--active').classList.remove('pin--active');
    }
  }

  initializeAdvert(8);


  function setTheSameTime(event) {
    var timeinSelect = document.forms[1].elements.timein;
    var timeoutSelect = document.forms[1].elements.timeout;
    if (event.target === timeinSelect) {
      timeoutSelect.selectedIndex = timeinSelect.selectedIndex;
    } else {
      timeinSelect.selectedIndex = timeoutSelect.selectedIndex;
    }
  }

  function timeinChangeHandler(event) {
    setTheSameTime(event);
  }

  function timeoutChangeHandler(event) {
    setTheSameTime(event);
  }

  function setMinPrice(event) {
    var minPrices = ['1000', '0', '5000', '10000'];
    var types = ['flat', 'bungalo', 'house', 'palace'];
    var typeSelect = document.forms[1].elements.type;
    var priceInput = document.forms[1].elements.price;
    var typeIndex = typeSelect.selectedIndex;
    var priceValue = Number(priceInput.value);

    if (event.target === typeSelect) {
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

  function typeChangeHandler(event) {
    setMinPrice(event);
  }

  function priceInputHandler(event) {
    setMinPrice(event);
  }


  function roomsChangeHandler() {
    var roomsSelect = document.forms[1].elements.rooms;
    var capacitySelect = document.forms[1].elements.capacity;
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
        formElements[i].setAttribute('style', 'border: 2px solid red;');
      }
    }
  }

  function doWhenSending() {
    var allInputs = document.forms[1].querySelectorAll('input');
    var allSelects = document.forms[1].querySelectorAll('select');
    checkForm(allInputs);
    checkForm(allSelects);
  }

  function submitClickHandler(event) {
    doWhenSending(event);
  }

  function submitEnterPressHandler(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      doWhenSending(event);
    }
  }

  function handleForm() {
    document.querySelector('#timein').addEventListener('change', timeinChangeHandler);
    document.querySelector('#timeout').addEventListener('change', timeoutChangeHandler);
    document.querySelector('#type').addEventListener('change', typeChangeHandler);
    document.querySelector('#price').addEventListener('input', priceInputHandler);
    document.querySelector('#room_number').addEventListener('change', roomsChangeHandler);
    document.querySelector('.form__submit').addEventListener('click', submitClickHandler);
    document.querySelector('.form__submit').addEventListener('keydown', submitEnterPressHandler);
  }

  handleForm();
})();
