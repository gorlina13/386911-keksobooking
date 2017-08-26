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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var dialogPanels = document.querySelectorAll('.dialog__panel');
var pinElements = document.querySelectorAll('.pin');
var activeElement = null;
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Эта функция создает массив объектов с информацией об объявлениях.
function generateAdverts(advertsCount) {

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

// Функция создает новые метки - то есть блоки с классом .pin - для объявлений adverts (см. выше )- и добавляет их в блок tokyo__pin-map.
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

// Функция создает список доступных удобств для каждой карточки объявления. Вызывается из функции ниже.
function createFeatures(array, createdElement) {
  for (var i = 0; i < array.length; i++) {
    var newFeatureElement = '<span class="feature__image feature__image--' + array[i] + '"></span>';
    createdElement.querySelector('.lodge__features').insertAdjacentHTML('beforeend', newFeatureElement);
  }
}

// Функция на основе шаблона и массива с данными об объявлениях определяет, из чего будут состоять карточки объявлений.
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

/* Думаю, что карточка объявления - это блок .dialog__panel.
Блок dialogPanels[0] - это карточка объявления, которое было с самого начала. Ей соответствует .pin.pin__main.
Пинов (включая .pin.pin__main.) теперь на один больше (1 + 8), чем мы создали новых объявлений (объектов в массиве с инфой об объявлении).
Объявления созданы функцией generateAdverts(advertsCount) (см. выше). Это не блоки в HTML, а просто информация.
Для каждого пина после главного нужна своя карточка - свой блок .dialog__panel.
Она может быть создана на основе шаблона функцией createLodgeElement(advert) (см. выше).
Здесь advert - это generateAdverts(advertsCount)[i].
Каждому элементу в массиве generateAdverts(advertsCount)[i] соответствует свой блок .dialog__panel (карточка).
Как соотнести каждый пин после первого (главного) и каждую карточку?
Массив пинов на один элемент длиннее, чем массив объектов с инфой об объявлении.
Поэтому я решила, что надо создавать функцией createLodgeElement карточку с информацией того объявления,
чей индекс на единицу меньше индекса пина.
Отсюда запись: generateAdverts(8)[pinElements.indexOf(pin) - 1])
Но я делаю что-то не так.
Ниже я пытаюсь вызвать эту функцию switchDialog(pin) в функции openDialog(evt) - которую потом передаю в обработчкик событий.
Но, возможно, запись switchDialog(activeElement) некорректна. Или что-то еще.
Наверное, можно и короче, и проще - и чтобы работало. Но не знаю как.*/

function switchDialog(pin) {
  var dialogPanel = dialog.querySelector('.dialog__panel');
  dialog.removeChild(dialogPanel);
  if (pin === pinElements[0]) {
    dialog.appendChild(dialogPanels[0]);
  } else {
    dialog.appendChild(createLodgeElement(generateAdverts(8)[pinElements.indexOf(pin) - 1]));
  }
}

appendPins();

// Функция назначает закрытие диалога (сокрытие блока .dialog__panel) на клавишу esc
function onDialogEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
}

/* Функция показывает блок .dialog__panel.
Назначает активным элементом новый пин (на котором событие).
Вызывает функцию switchDialog, чтобы показать актуальную для данного пина карточку объявления.
(Должна это делать).
Добавляет обработчик нажатия esc.*/
function openDialog(evt) {
  if (activeElement) {
    activeElement.classList.remove('pin--active');
  }

  activeElement = evt.currentTarget;
  activeElement.classList.add('pin--active');
  switchDialog(activeElement);
  dialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
}

/* Функция скрывает блок .dialog__panel.
Дезактивирует активный элемент.
Удаляет обработчик нажатия esc.*/
function closeDialog() {
  dialog.classList.add('hidden');
  if (activeElement) {
    activeElement.classList.remove('pin--active');
  }
  document.removeEventListener('keydown', onDialogEscPress);
}

/* Функция для передачи в обработчик клика.
??? Надо ли здесь передавать evt в обоих случаях? У меня было только внутри - в openDialog - но eslint сказал, что evt - не определен.*/
function onPinClick(evt) {
  openDialog(evt);
}

/* Функция для передачи в обработчик нажатия клавиши.
??? Надо ли здесь передавать evt в обоих случаях? У меня было только внутри - в openDialog - но eslint сказал, что evt - не определен.*/
function onPinEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openDialog(evt);
  }
}

// Функция для передачи в обработчик клика по крестику.
function onDialogCloseClick() {
  closeDialog();
}

// Функция для передачи в обработчик нажатия enter, когда крестик в фокусе.
function onDialogCloseEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
}

// Добавляю атрибут tabindex (так можно?), вешаю обработчики.
for (var i = 0; i < pinElements.length; i++) {
  pinElements[i].querySelector('img').setAttribute('tabindex', '0');
  pinElements[i].addEventListener('click', onPinClick);
  pinElements[i].addEventListener('keydown', onPinEnterPress);
}

dialogClose.setAttribute('tabindex', '0');
dialogClose.addEventListener('click', onDialogCloseClick);
dialogClose.addEventListener('keydown', onDialogCloseEnterPress);
