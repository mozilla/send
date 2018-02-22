const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  return html`
  <div class="page">
    <div class="title">${state.translate('errorPageHeader')}</div>
    <img src="${assets.get('illustration_error.svg')}"/>
  </div>`;
};
