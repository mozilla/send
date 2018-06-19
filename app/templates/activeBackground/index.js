const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function() {
  const backgrounds = assets.match(/background/);
  const src = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return html`<div class="background">
    <img src="${src}">
  </div>`;
};
