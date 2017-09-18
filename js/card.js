'use strict';

(function () {
  var RUBLE = '&#x20bd;';
  var TRANSLATIONS = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  function translatePlaceType(englishType) {
    return TRANSLATIONS[englishType];
  }

  function createFeaturesFragment(adverts) {
    var fragment = document.createDocumentFragment();
    adverts.offer.features.forEach(function (item) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + item);
      fragment.appendChild(feature);
    });
    return fragment;
  }

  window.card = {
    createAdNode: function (adverts) {

      var advertsNode = document.querySelector('#lodge-template').content.cloneNode(true);
      var avatar = document.querySelector('.dialog__title > img');
      var price = advertsNode.querySelector('.lodge__price');
      advertsNode.querySelector('.lodge__title').textContent = adverts.offer.title;
      advertsNode.querySelector('.lodge__address').textContent = adverts.offer.address;
      price.textContent = adverts.offer.price;
      price.innerHTML = price.innerHTML + RUBLE + '/ночь';
      advertsNode.querySelector('.lodge__type').textContent = translatePlaceType(adverts.offer.type);
      advertsNode.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + adverts.offer.guests + ' гостей в ' + adverts.offer.rooms + ' комнатах';
      advertsNode.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + adverts.offer.checkin + ', выезд до ' + adverts.offer.checkout;
      var setOfFeatures = createFeaturesFragment(adverts);
      advertsNode.querySelector('.lodge__features').appendChild(setOfFeatures);
      advertsNode.querySelector('.lodge__description').textContent = adverts.offer.description;
      avatar.src = adverts.author.avatar;

      return advertsNode;
    }
  };
})();
