const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  return html`
    <div class="page">
      <div class="title">${state.translate('expiredPageHeader')}</div>
      <img src="${assets.get('illustration_expired.svg')}" id="expired-img">
      <div class="description">
        ${state.translate('uploadPageExplainer')}
      </div>
      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>
    </div>`;
};
