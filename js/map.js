'use strict';

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function generateAdverts(advertsCount) {
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var OFFER_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKINS_OR_CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var adverts = [];

  for (var i = 0; i < advertsCount; i++) {
    var coordinateX = getRandomInteger(300, 900);
    var coordinateY = getRandomInteger(100, 500);
    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLES[i],
        address: coordinateX + ', ' + coordinateY,
        price: getRandomInteger(1000, 1000000),
        type: OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: CHECKINS_OR_CHECKOUTS[getRandomInteger(0, CHECKINS_OR_CHECKOUTS.length - 1)],
        checkout: CHECKINS_OR_CHECKOUTS[getRandomInteger(0, CHECKINS_OR_CHECKOUTS.length - 1)],
        features: FEATURES.slice(getRandomInteger(0, FEATURES.length - 1)),
        description: '',
        photos: []
      },
      location: {
        x: coordinateX,
        y: coordinateY
      }
    };
  }
  return adverts;
}

function appendPins() {
  var pinMapElement = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var pinWidth = 40;
  var pinHeight = 40;

  for (var i = 0; i < generateAdverts(8).length; i++) {
    var newPinElement = document.createElement('div');
    newPinElement.className = 'pin';
    newPinElement.setAttribute('style', 'left: ' + (generateAdverts(8)[i].location.x - pinWidth / 2) + 'px; top: ' + (generateAdverts(8)[i].location.y - pinHeight) + 'px');
    newPinElement.innerHTML = '<img src="' + generateAdverts(8)[i].author.avatar + '" class="rounded" width="' + pinWidth + '" height="' + pinHeight + '">';
    fragment.appendChild(newPinElement);
  }
  pinMapElement.appendChild(fragment);
}

function createFeatures(array, createdElement) {
  for (var i = 0; i < array.length; i++) {
    var newFeatureElement = '<span class="feature__image feature__image--' + array[i] + '"></span>';
    createdElement.querySelector('.lodge__features').insertAdjacentHTML('beforeend', newFeatureElement);
  }
}

function createLodgeElement(advert) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = advert.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = advert.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = advert.offer.price + String.fromCharCode(8381) + '/ночь';


  if (advert.offer.type === 'flat') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (advert.offer.type === 'house') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Дом';
  } else {
    lodgeElement.querySelector('.lodge__type').textContent = 'Бунгало';
  }

  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  createFeatures(advert.offer.features, lodgeElement);

  lodgeElement.querySelector('.lodge__description').textContent = advert.offer.description;

  document.querySelector('.dialog__title').querySelector('img').setAttribute('src', advert.author.avatar);

  return lodgeElement;
}

function switchDialog(advert) {
  var dialogPanels = document.querySelectorAll('.dialog__panel');
  document.querySelector('#offer-dialog').removeChild(dialogPanels[0]);
  document.querySelector('#offer-dialog').appendChild(createLodgeElement(advert));
}

appendPins();
switchDialog(generateAdverts(8)[0]);
