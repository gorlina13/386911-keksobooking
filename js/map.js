'use strict';

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

var pinMapElement = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function createAdverts(j) {

  for (var i = 0; i < j; i++) {
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
  var fragment = document.createDocumentFragment();
  var pinWidth = 40;
  var pinHeight = 40;
  for (var i = 0; i < adverts.length; i++) {
    var newPinElement = document.createElement('div');
    newPinElement.className = 'pin';
    newPinElement.innerHTML = '<img>';
    newPinElement.setAttribute('style', 'left: ' + (adverts[i].location.x - pinWidth / 2) + 'px; top: ' + (adverts[i].location.y - pinHeight) + 'px');
    newPinElement.querySelector('img').setAttribute('src', adverts[i].author.avatar);
    newPinElement.querySelector('img').setAttribute('width', String(pinWidth));
    newPinElement.querySelector('img').setAttribute('height', String(pinHeight));
    newPinElement.querySelector('img').className = 'rounded';
    fragment.appendChild(newPinElement);
  }
  pinMapElement.appendChild(fragment);
}

function createLodgeElement(advert) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = advert.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = advert.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = advert.offer.price + '&#x20bd;/ночь';

  if (advert.offer.type === 'flat') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (advert.offer.type === 'house') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Дом';
  } else {
    lodgeElement.querySelector('.lodge__type').textContent = 'Бунгало';
  }

  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  for (var i = 0; i < advert.offer.features.length; i++) {
    var newFeatureElement = '<span class="feature__image feature__image--' + advert.offer.features[i] + '"></span>';
    lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('beforeend', newFeatureElement);
  }

  lodgeElement.querySelector('.lodge__description').textContent = advert.offer.description;

  document.querySelector('.dialog__title').querySelector('img').setAttribute('src', advert.author.avatar);

  return lodgeElement;
}

function switchDialog(advert) {
  var dialogPanels = document.querySelectorAll('.dialog__panel');
  document.querySelector('#offer-dialog').removeChild(dialogPanels[0]);
  document.querySelector('#offer-dialog').appendChild(createLodgeElement(advert));
}

createAdverts(8);
appendPins();
switchDialog(adverts[0]);
