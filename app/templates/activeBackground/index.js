const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  if (!state.backgroundUrl) {
    const backgrounds = assets.match(/background/);
    state.backgroundUrl =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }

  return html`<div class="background">
    <img src="${state.backgroundUrl}">
  </div>`;
};
