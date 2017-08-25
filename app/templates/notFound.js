const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  const div = html`
  <div id="page-one">
    <div id="download">
      <div class="title">${state.translate('expiredPageHeader')}</div>
      <div class="share-window">
        <img src="${assets.get('illustration_expired.svg')}" id="expired-img">
      </div>
      <div class="expired-description">${state.translate(
        'uploadPageExplainer'
      )}</div>
      <a class="send-new" href="/" data-state="notfound">${state.translate(
        'sendYourFilesLink'
      )}</a>
    </div>
  </div>`;

  if (state.layout) {
    return state.layout(state, div);
  }
  return div;
};
