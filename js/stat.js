'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandom = function () {
  return Math.random();
};

var getBarColor = function (player) {
  var color = (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.round(getRandom() * 100) + '%, 50%)';
  return color;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeightPlayer = (maxTime === undefined) ? BAR_HEIGHT : (BAR_HEIGHT * times[i]) / maxTime;
    var ResultPositionX = CLOUD_X + (GAP * 2) + ((BAR_GAP + BAR_WIDTH) * i);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], ResultPositionX, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), ResultPositionX, CLOUD_HEIGHT - (barHeightPlayer) - GAP * 3);
    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(ResultPositionX, CLOUD_HEIGHT - (GAP * 3), BAR_WIDTH, -(barHeightPlayer) + GAP);
  }
};
