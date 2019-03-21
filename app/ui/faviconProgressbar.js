const { platform } = require('../utils');
const assets = require('../../common/assets');

const size = 32;
const loaderWidth = 5;
const loaderColor = '#0090ed';

function drawCircle(canvas, context, color, lineWidth, outerWidth, percent) {
  canvas.width = canvas.height = outerWidth;
  context.translate(outerWidth * 0.5, outerWidth * 0.5);
  context.rotate(-Math.PI * 0.5);
  const radius = (outerWidth - lineWidth) * 0.5;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
  context.strokeStyle = color;
  context.lineCap = 'square';
  context.lineWidth = lineWidth;
  context.stroke();
}

function drawNewFavicon(progressRatio) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  drawCircle(canvas, context, '#efefef', loaderWidth, size, 1);
  drawCircle(canvas, context, loaderColor, loaderWidth, size, progressRatio);
  return canvas.toDataURL();
}

module.exports.updateFavicon = function(progressRatio) {
  if (platform() === 'web') {
    const link = document.querySelector("link[rel*='icon']");
    const progress = progressRatio * 100;
    if (progress === 0 || progress === 100) {
      link.type = 'image/png';
      link.href = assets.get('favicon-32x32.png');
      document.getElementsByTagName('head')[0].appendChild(link);
      return;
    }

    link.href = drawNewFavicon(progressRatio);
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};
