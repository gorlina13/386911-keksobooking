'use strict';

(function () {
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

  window.card = {
    createAdNode: function (adverts) {
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
        window.data.translatePlaceType(adverts.offer.type);

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
  };
})();
