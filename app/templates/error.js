const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`
  <div id="upload-error">
    <div class="title">${state.translate('errorPageHeader')}</div>
    <img id="upload-error-img" data-l10n-id="errorAltText" src="${assets.get(
      'illustration_error.svg'
    )}"/>
  </div>`;
};
