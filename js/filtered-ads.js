/*'use strict';

(function () {*/
   /*В эти переменные должна записываться информация из формы о выбранных параметрах и фичах (см. модуль set-of-filters.js и функции здесь ниже - window.setOfFilters.onTypeChange и др.).*/

  /*И эти сведения должны использоваться функцией по перерисовке пинов после применения фильтров.
  Хотела сделать примерно как в демо про волшебников (блок 7, демо "Учебный проект: похожий") - как и в файле set-of-filters.js.*/

  /*var housingType;
  var housingPrice;
  var housingRooms;
  var housingGuests;
  var housingWifi;
  var housingDishwasher;
  var housingParking;
  var housingWasher;
  var housingElevator;
  var housingConditioner;
  var adverts = [];*/

  // function updateAdverts() {
     // Фильтры, которые уже были применены: например, квартира, кондиционер, лифт и др.
    // var usedFilters = [];
     // Объявления, которые получены после фильтрации
    /*var filteredAds = [];
    var selects = document.forms[0].querySelectorAll('select');
    var inputs = document.forms[0].querySelectorAll('input');*/
    /*Примерный алгоритм фильтрации
      1.При каждом событии 'change' в форме - проверка: Есть ли уже фильтр, на котором событие, в списке использованных ранее фильтров?
      Допустим, я выбрала тип жилья (дом), потом наличие парковки, а потом опять вернулась к типу жилья (передумала насчет дома, согласна на квартиру).
        НЕТ:
        А. Добавить название фильтра в usedFilters (использованные фильтры).
        Б. Проверка: Есть ли в списке usedFilters еще другие фильтры?
          НЕТ: Применить фильтр к исходному массиву объявлений (adverts).
          ДА: Отфильтровать по нему массив уже ранее отфильтрованных объявлений.
        ДА:
        А. Применить фильтр к исходному массиву объявлений.
        Б. Проверка: Есть ли в списке usedFilters еще фильтры?
          НЕТ: Переход к следующему пункту.
          ДА: К тому, что получилось в А, вновь применить остальные фильтры из списка использованных фильтров (usedFilters).
      2. Что получилось после фильтрации, записать в filteredAds.*/

    // Примерно отсюда вызывать функцию отрисовки объявлений?

    // window.map.initializeAdverts(adverts);
  // }

  /*window.setOfFilters.onTypeChange = function (type) {
    housingType = type;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onPriceChange = function (price) {
    housingPrice = price;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onRoomsChange = function (rooms) {
    housingRooms = rooms;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onGuestsChange = function (guests) {
    housingGuests = guests;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onWifiChange = function (wifi) {
    housingWifi = wifi;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onDishwasherChange = function (dishwasher) {
    housingDishwasher = dishwasher;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onParkingChange = function (parking) {
    housingParking = parking;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onWasherChange = function (washer) {
    housingWasher = washer;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onElevatorChange = function (elevator) {
    housingElevator = elevator;
    window.debounce(updateAdverts);
  }

  window.setOfFilters.onConditionerChange = function (conditioner) {
    housingConditioner = conditioner;
    window.debounce(updateAdverts);
  }

  function loadHandler(data) {
    adverts = data;
    updateAdverts();
  };

  window.backend.load(loadHandler, window.util.errorHandler);
})();
*/
