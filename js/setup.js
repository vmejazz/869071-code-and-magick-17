// Файл setup.js
'use strict';

(function () {
  window.userDialog = document.querySelector('.setup');

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
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
    window.userDialog.style.top = window.startCoordsUserDialog.x + 'px';
    window.userDialog.style.left = window.startCoordsUserDialog.y + 'px';
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
