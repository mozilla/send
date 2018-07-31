const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');

module.exports = function(state) {
  return html`
  <div class="page">
  
    ${title(state)}

    <div class="error">${state.translate('errorPageHeader')}</div>
    <img class="flexible" src="${assets.get('illustration_error.svg')}"/>

    <div class="description">
        ${state.translate('uploadPageExplainer')}
      </div>
      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>

  </div>`;
};
