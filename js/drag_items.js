'use strict';

(function () {
  var playerBug = window.userDialog.querySelector('.setup-artifacts');

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

        var checkPositionItemInBag = function () {
          var positionElemntX = draggedItem.getBoundingClientRect().left;
          var positionElemntY = draggedItem.getBoundingClientRect().top;
          var positionBugX = playerBug.getBoundingClientRect().left;
          var positionBugY = playerBug.getBoundingClientRect().top;
          if (checkItemPositionInBugHorizontal(positionElemntX, draggedItem.offsetWidth, positionBugX, playerBug.offsetWidth) && checkItemPositionInBugVertical(positionElemntY, draggedItem.offsetHeight, positionBugY, playerBug.offsetHeight)) {
            return true;
          }

          return false;
        };

        if (!checkPositionItemInBag()) {
          draggedItem.style.top = startCoordsReset.x + 'px';
          draggedItem.style.left = startCoordsReset.y + 'px';
        }

        document.removeEventListener('mousemove', onMouseMoveInShop);
        document.removeEventListener('mouseup', onMouseUpInShop);
        draggedItem.removeEventListener('mousedown', onMouseDown);
      };

      document.addEventListener('mousemove', onMouseMoveInShop);
      document.addEventListener('mouseup', onMouseUpInShop);

    };

    draggedItem.addEventListener('mousedown', onMouseDown);
  };

  var onShopElementClick = function (evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();
      draggedWindow(evt.target);
    }
  };

  window.userDialog.addEventListener('mousedown', onShopElementClick, true);
})();
