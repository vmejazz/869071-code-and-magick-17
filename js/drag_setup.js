'use strict';

(function () {
  var userDialogResetX;
  var userDialogResetY;
  window.startCoordsUserDialog = {
    x: userDialogResetX,
    y: userDialogResetY
  };

  var dialogIcon = window.userDialog.querySelector('.upload');

  var dragSetupWindow = function () {

    dialogIcon.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      userDialogResetX = window.userDialog.offsetTop;
      userDialogResetY = window.userDialog.offsetLeft;

      window.startCoordsUserDialog = {
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

        window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
        window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';

      };

      var onMouseUpInSetupDialog = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMoveInSetupDialog);
        document.removeEventListener('mouseup', onMouseUpInSetupDialog);


        if (dragged) {
          var onClickPreventDefault = function (eventDrag) {
            eventDrag.preventDefault();
            dialogIcon.removeEventListener('click', onClickPreventDefault);
          };
          dialogIcon.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMoveInSetupDialog);
      document.addEventListener('mouseup', onMouseUpInSetupDialog);
    });
  };

  dragSetupWindow();
})();
