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
  var maxElement = 5000;
  if (arr.length > 0) {
    maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }

  return maxElement;
};

var barColor = function (player) {
  var color = 'rgba(0,0,255,' + (0.1 + (Math.round(Math.random() * 100) / 100)) + ')';
  if (player === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
    return color;
  }

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
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + (GAP * 2) + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + (GAP * 2) + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime) - GAP * 3);
    ctx.fillStyle = barColor(players[i]);
    ctx.fillRect(CLOUD_X + (GAP * 2) + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_HEIGHT - (GAP * 3), BAR_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime) + GAP);
  }
};
