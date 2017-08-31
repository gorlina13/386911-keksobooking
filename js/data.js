'use strict';

(function () {
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

  function getPlaceType() {
    var placeTypesEn = ['flat', 'house', 'bungalo'];
    var index = getRandomNumber(0, 2);
    return placeTypesEn[index];
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

  window.data = {
    translatePlaceType: function (englishType) {
      var translate = {
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
      };
      return translate[englishType];
    },
    // Создание массива объектов, описывающих объявления
    generateAdverts: function (advertsCount) {
      var adverts = [];

      for (var i = 0; i < advertsCount; i++) {
        adverts[i] = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            title: getPlaceTitle(i),
            price: getRandomNumber(1000, 1000000),
            type: getPlaceType(),
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
        // адрес квартиры
        adverts[i].offer.address = adverts[i].location.x + ', ' + adverts[i].location.y;
      }

      return adverts;
    }
  };
})();
