const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(name, hasPassword) {
  let type = '';
  if (name) {
    type = name.split('.').pop();
  }
  const lockClass = hasPassword ? 'fileIcon__lock--visible' : '';
  return html`
  <div class="fileIcon">
    <div class="fileIcon__fileType">${type}</div>
    <img class="fileIcon__lock ${lockClass}"src="${assets.get(
    'lock-white.svg'
  )}"/>
  </div>`;
};
