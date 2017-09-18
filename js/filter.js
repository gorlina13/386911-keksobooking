'use strict';

(function () {
  function filterPins(array, filter) {
    var filterResults1 = sortByType(array, filter['housing_type'].value, 'type');
    var filterResults2 = getByPrice(filterResults1, filter['housing_price'].value, 'price');
    var filterResults3 = sortArray(filterResults2, filter['housing_room-number'].value, 'rooms');
    var filterResults4 = sortArray(filterResults3, filter['housing_guests-number'].value, 'guests');
    [].forEach.call(filter['feature'], function (item) {
      var featuresFilterResults = sortByFeature(filterResults4, item.checked, 'features', item.value);
      filterResults4 = featuresFilterResults;
      return filterResults4;
    });
    clearMap();

    window.debounce(window.pin.showPins, filterResults4);
  }

  function sortArray(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      filterRezults = (data === 'any') ? (item.offer[check] !== false) : (item.offer[check] === Number(data));
      return filterRezults;
    });
    return tmpArray;
  }

  function sortByType(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      filterRezults = (data === 'any') ? (item.offer[check] !== false) : (item.offer[check] === data);
      return filterRezults;
    });
    return tmpArray;
  }

  function getByPrice(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      if (data === 'any') {
        filterRezults = (item.offer[check] !== false);
      } else if (data === 'middle') {
        filterRezults = (item.offer[check] <= 50000) && (item.offer[check] >= 10000);
      } else if (data === 'low') {
        filterRezults = (item.offer[check] <= 10000);
      } else if (data === 'high') {
        filterRezults = (item.offer[check] >= 50000);
      }
      return filterRezults;
    });
    return tmpArray;
  }

  function sortByFeature(array, data, check, checkItem) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      filterRezults = data ? (item.offer[check].indexOf(checkItem) >= 0) : (item.offer[check] !== false);
      return filterRezults;
    });
    return tmpArray;
  }

  function clearMap() {
    var tokioPinMap = document.querySelector('.tokyo__pin-map');
    var pins = tokioPinMap.querySelectorAll('.pin:not(.pin__main)');
    [].forEach.call(pins, function (item) {
      item.parentNode.removeChild(item);
    });
  }

  window.filter = {
    filterPins: filterPins
  };
}());
