const assets = require('../../../common/assets');

module.exports = function(state) {
  if (!state.backgroundClass) {
    const backgrounds = assets.match(/background_/);
    state.backgroundClass = `background_${Math.floor(
      Math.random() * backgrounds.length
    ) + 1}`;
  }

  return state.backgroundClass;
};
