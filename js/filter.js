'use strict';

(function () {
  var CHECKS = ['type', 'price', 'rooms', 'guests', 'features'];
  var FILTER_NAMES = ['housing_type', 'housing_price', 'housing_room-number', 'housing_guests-number', 'feature'];
  var PRICES = [10000, 50000];
  var DATA = ['any', 'middle', 'low', 'high'];

  function filterPins(array, filter) {
    var filterResults1 = sortByType(array, filter[FILTER_NAMES[0]].value, CHECKS[0]);
    var filterResults2 = getByPrice(filterResults1, filter[FILTER_NAMES[1]].value, CHECKS[1]);
    var filterResults3 = sortArray(filterResults2, filter[FILTER_NAMES[2]].value, CHECKS[2]);
    var filterResults4 = sortArray(filterResults3, filter[FILTER_NAMES[3]].value, CHECKS[3]);
    [].forEach.call(filter[FILTER_NAMES[4]], function (item) {
      var featuresFilterResults = sortByFeature(filterResults4, item.checked, CHECKS[4], item.value);
      filterResults4 = featuresFilterResults;
      return filterResults4;
    });
    clearMap();

    window.debounce(window.pin.showPins, filterResults4);
  }

  function sortArray(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      filterRezults = (data === DATA[0]) ? (item.offer[check] !== false) : (item.offer[check] === Number(data));
      return filterRezults;
    });
    return tmpArray;
  }

  function sortByType(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      filterRezults = (data === DATA[0]) ? (item.offer[check] !== false) : (item.offer[check] === data);
      return filterRezults;
    });
    return tmpArray;
  }

  function getByPrice(array, data, check) {
    var filterRezults = null;
    var tmpArray = array.filter(function (item) {
      if (data === DATA[0]) {
        filterRezults = (item.offer[check] !== false);
      } else if (data === DATA[1]) {
        filterRezults = (item.offer[check] <= PRICES[1]) && (item.offer[check] >= PRICES[0]);
      } else if (data === DATA[2]) {
        filterRezults = (item.offer[check] <= PRICES[0]);
      } else if (data === DATA[3]) {
        filterRezults = (item.offer[check] >= PRICES[1]);
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
    var pinMap = window.map.mainPin.parentNode;
    var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');

    [].forEach.call(pins, function (item) {
      item.parentNode.removeChild(item);
    });
  }

  window.filter = {
    filterPins: filterPins
  };
}());
