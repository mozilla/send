const { platform } = require('../utils');
const assets = require('../../common/assets');

module.exports.updateFavicon = function(percentageString) {
  if (platform() === 'web') {
    const percentage = parseInt(percentageString.replace('%', ''));
    if (percentage === 0 || percentage === 100) {
      const link = document.querySelector("link[rel*='icon']");
      link.type = 'image/png';
      link.href = assets.get('favicon-32x32.png');
      document.getElementsByTagName('head')[0].appendChild(link);
      return;
    }
    const link = document.querySelector("link[rel*='icon']");
    const canvas = document.createElement('canvas');
    const size = 32;

    const lineWidth = 5;
    const color = '#0090ed';

    const span = document.createElement('span');
    span.textContent = percentageString;
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    context.translate(size / 2, size / 2);

    const radius = (size - lineWidth) / 2;

    const drawCircle = function(color, lineWidth, percent) {
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
      context.strokeStyle = color;
      context.lineCap = 'square';
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const drawNewFavicon = function() {
      drawCircle('#efefef', lineWidth, 1);
      drawCircle(color, lineWidth, percentage / 100);
    };

    drawNewFavicon(link);
    link.href = canvas.toDataURL();
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};
