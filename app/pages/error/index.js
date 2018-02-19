const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  return html`
  <div class="errorPage">
    <div class="title">${state.translate('errorPageHeader')}</div>
    <img class="errorPage__img" src="${assets.get('illustration_error.svg')}"/>
  </div>`;
};
