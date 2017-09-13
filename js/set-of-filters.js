// 'use strict';

/* В демо (блок 7, демо "Учебный проект: похожий", 16/23) сказано: "модуль настройки мага должен возвращать объект, у которого можно подписаться на событие изменения цвета плаща и глаз"*/

/* Там, в учебном проекте создается объект, свойства которого - это функции с пустым телом:
var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
}*/

/* А хотела сделать, чтобы здесь форма с фильтрами подобным образом возвращала объект, у которого можно подписаться на каждый "change"*/

/* (function () {

  var setOfFilters = {
    onTypeChange: function (type) {},
    onPriceChange: function (price) {},
    onRoomsChange: function (rooms) {},
    onGuestsChange: function (guests) {},
    onWifiChange: function (wifi) {},
    onDishwasherChange: function (dishwasher) {},
    onParkingChange: function (parking) {},
    onWasherChange: function (washer) {},
    onElevatorChange: function (elevator) {},
    onConditionerChange: function (conditioner) {}
  };

  var filtersForm = document.forms[0];
  var features = filtersForm.elements.feature;

  filtersForm.elements.housing_type.addEventListener('change', function (evt) {
    var select = evt.target;
    var newType = select.value;
    setOfFilters.onTypeChange(newType);
  });

  filtersForm.elements.housing_price.addEventListener('change', function (evt) {
    var select = evt.target;
    var newPrice = select.value;
    setOfFilters.onPriceChange(newPrice);
  });

  filtersForm.elements.housing_room-number.addEventListener('change', function (evt) {
    var select = evt.target;
    var newRoomsNumber = select.value;
    setOfFilters.onRoomsChange(newRoomsNumber);
  });

  filtersForm.elements.housing_guests-number.addEventListener('change', function (evt) {
    var select = evt.target;
    var newGuestsNumber = select.value;
    setOfFilters.onGuestsChange(newGuestsNumber);
  });

  features[0].addEventListener('change', function () {
    var availableWifi = features[0].checked;
    setOfFilters.onWifiChange(availableWifi);
  });

  features[1].addEventListener('change', function () {
    var availableDishwasher = features[1].checked;
    setOfFilters.onDishwasherChange(availableDishwasher);
  });

  features[2].addEventListener('change', function () {
    var availableParking = features[2].checked;
    setOfFilters.onParkingChange(availableParking);
  });

  features[3].addEventListener('change', function () {
    var availableWasher = features[3].checked;
    setOfFilters.onWasherChange(availableWasher);
  });

  features[4].addEventListener('change', function () {
    var availableElevator = features[4].checked;
    setOfFilters.onElevatorChange(availableElevator);
  });

  features[5].addEventListener('change', function () {
    var availableConditioner = features[5].checked;
    setOfFilters.onConditionerChange(availableConditioner);
  });

  return window.setOfFilters = setOfFilters;
})();
*/
