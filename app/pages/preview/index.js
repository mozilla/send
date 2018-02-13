const html = require('choo/html');
const assets = require('../../../common/assets');
const { bytes } = require('../../utils');

module.exports = function(state, pageAction) {
  const fileInfo = state.fileInfo;

  const size = fileInfo.size
    ? state.translate('downloadFileSize', { size: bytes(fileInfo.size) })
    : '';

  const title = fileInfo.name
    ? state.translate('downloadFileName', { filename: fileInfo.name })
    : state.translate('downloadFileTitle');

  const info = html`
    <div id="dl-file"
      data-nonce="${fileInfo.nonce}"
      data-requires-password="${fileInfo.requiresPassword}"></div>`;
  if (!pageAction) {
    return info;
  }
  const div = html`
    <div class="page">
      <div class="title">
        <span>${title}</span>
        <span>${' ' + size}</span>
      </div>
      <div class="description">${state.translate('downloadMessage')}</div>
      <img
        src="${assets.get('illustration_download.svg')}"
        class="preview__img"
        title="${state.translate('downloadAltText')}"/>
      ${pageAction}
      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>
      ${info}
    </div>
  `;
  return div;
};
