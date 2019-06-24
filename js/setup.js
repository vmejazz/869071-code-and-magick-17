// Файл setup.js
'use strict';

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_COUNT = 4;

var getRandomItem = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getWizardProperties = function () {
  var arrayWizards = [];
  var i = 1;
  while (i <= WIZARD_COUNT) {
    var wizardPropetry = {
      name: FIRST_NAMES[getRandomItem(FIRST_NAMES)] + ' ' + SECOND_NAMES[getRandomItem(SECOND_NAMES)],
      coatColor: COAT_COLORS[getRandomItem(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomItem(EYES_COLORS)]
    };
    arrayWizards.push(wizardPropetry);
    i++;
  }
  return arrayWizards;
};

var wizards = getWizardProperties();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// module4-task1 ----------------------------------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  if (document.activeElement !== setup.querySelector('.setup-user-name')) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  userDialog.style.top = startCoordsUserDialog.x + 'px';
  userDialog.style.left = startCoordsUserDialog.y + 'px';
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var wizardPlayerSetup = document.querySelector('.setup-wizard-form');
var wizardPlayerEyesSetup = wizardPlayerSetup.querySelector('.wizard-eyes');
var wizardPlayerCoatColorSetup = wizardPlayerSetup.querySelector('.wizard-coat');
var fireballPlayerSetup = wizardPlayerSetup.querySelector('.setup-fireball');

var wizardPlayerEyesInput = wizardPlayerSetup.querySelector('input[name=eyes-color]');
var wizardPlayerCoatColorInput = wizardPlayerSetup.querySelector('input[name=coat-color]');
var fireballPlayerInput = wizardPlayerSetup.querySelector('input[name=fireball-color]');

var changePlayerEyes = function () {
  var newColor = EYES_COLORS[getRandomItem(EYES_COLORS)];
  wizardPlayerEyesSetup.style.fill = newColor;
  wizardPlayerEyesInput.value = newColor;
};

var changePlayerCoatColor = function () {
  var newColor = COAT_COLORS[getRandomItem(COAT_COLORS)];
  wizardPlayerCoatColorSetup.style.fill = newColor;
  wizardPlayerCoatColorInput.value = newColor;
};

var changefireballPlayer = function () {
  var newColor = FIREBALL_COLORS[getRandomItem(FIREBALL_COLORS)];
  fireballPlayerSetup.style.backgroundColor = newColor;
  fireballPlayerInput.value = newColor;
};

wizardPlayerEyesSetup.addEventListener('click', function () {
  changePlayerEyes();
});

wizardPlayerCoatColorSetup.addEventListener('click', function () {
  changePlayerCoatColor();
});

fireballPlayerSetup.addEventListener('click', function () {
  changefireballPlayer();
});

// module5-task1 ----------------------------------------------

var userDialogResetX;
var userDialogResetY;
var startCoordsUserDialog = {
  x: userDialogResetX,
  y: userDialogResetY
};

var onDialog = userDialog.querySelector('.upload');

var draggedSetupWindow = function () {

  onDialog.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    userDialogResetX = userDialog.offsetTop;
    userDialogResetY = userDialog.offsetLeft;

    startCoordsUserDialog = {
      x: userDialogResetX,
      y: userDialogResetY
    };


    var dragged = false;

    var onMouseMoveInSetupDialog = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUpInSetupDialog = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveInSetupDialog);
      document.removeEventListener('mouseup', onMouseUpInSetupDialog);


      if (dragged) {
        var onClickPreventDefault = function (eventDrag) {
          eventDrag.preventDefault();
          onDialog.removeEventListener('click', onClickPreventDefault);
        };
        onDialog.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMoveInSetupDialog);
    document.addEventListener('mouseup', onMouseUpInSetupDialog);
  });
};

draggedSetupWindow();

//  ------------------------------------------------- перетаскиваем вещи из магазина в сумку

var playerBug = userDialog.querySelector('.setup-artifacts');

var draggedWindow = function (draggedItem) {
  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var resetX = draggedItem.offsetTop;
    var resetY = draggedItem.offsetLeft;

    var startCoordsReset = {
      x: resetX,
      y: resetY
    };

    var onMouseMoveInShop = function (moveEvt) {
      moveEvt.preventDefault();
      draggedItem.style.position = 'absolute';

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      draggedItem.style.top = (draggedItem.offsetTop - shift.y) + 'px';
      draggedItem.style.left = (draggedItem.offsetLeft - shift.x) + 'px';

    };

    var onMouseUpInShop = function (upEvt) {
      upEvt.preventDefault();

      var checkItemPositionInBugHorizontal = function (eX, eWidth, bX, bWidth) {
        if (eX >= bX && eX + eWidth <= bX + bWidth) {
          return true;
        }
        return false;
      };

      var checkItemPositionInBugVertical = function (eY, eHeight, bY, bHeight) {
        if (eY >= bY && eY + eHeight <= bY + bHeight) {
          return true;
        }
        return false;
      };

      var checkPositionItemInBug = function () {
        var positionElemntX = draggedItem.getBoundingClientRect().left;
        var positionElemntY = draggedItem.getBoundingClientRect().top;
        var positionBugX = playerBug.getBoundingClientRect().left;
        var positionBugY = playerBug.getBoundingClientRect().top;
        if (checkItemPositionInBugHorizontal(positionElemntX, draggedItem.offsetWidth, positionBugX, playerBug.offsetWidth) && checkItemPositionInBugVertical(positionElemntY, draggedItem.offsetHeight, positionBugY, playerBug.offsetHeight)) {
          return true;
        }

        return false;
      };

      if (!checkPositionItemInBug()) {
        draggedItem.style.top = startCoordsReset.x + 'px';
        draggedItem.style.left = startCoordsReset.y + 'px';
      }

      userDialog.removeEventListener('mousemove', onMouseMoveInShop);
      userDialog.removeEventListener('mouseup', onMouseUpInShop);
      draggedItem.removeEventListener('mousedown', onMouseDown);
    };

    userDialog.addEventListener('mousemove', onMouseMoveInShop);
    userDialog.addEventListener('mouseup', onMouseUpInShop);

  };

  draggedItem.addEventListener('mousedown', onMouseDown);
};

var onShopElementClick = function (evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    draggedWindow(evt.target);
  }
};

userDialog.addEventListener('mousedown', onShopElementClick, true);
