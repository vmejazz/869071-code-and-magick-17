'use strict';

(function () {
  // Генерация рандомных волшебников

  var similarListElement = window.setup.userDialog.querySelector('.setup-similar-list');

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

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
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

  window.setup.userDialog.querySelector('.setup-similar').classList.remove('hidden');


  // Изменение параметров игрока

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
})();
