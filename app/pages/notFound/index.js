const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  return html`
    <div class="notFoundPage">
      <div class="title">${state.translate('expiredPageHeader')}</div>
      <div class="notFoundPage__img">
        <img src="${assets.get('illustration_expired.svg')}" id="expired-img">
      </div>
      <div class="description">
        ${state.translate('uploadPageExplainer')}
      </div>
      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>
    </div>`;
};
