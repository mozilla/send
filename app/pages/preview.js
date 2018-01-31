const html = require('choo/html');
const assets = require('../../common/assets');
const { bytes } = require('../utils');

module.exports = function(state, pageAction) {
  const fileInfo = state.fileInfo;

  const size = fileInfo.size
    ? state.translate('downloadFileSize', { size: bytes(fileInfo.size) })
    : '';

  const name = fileInfo.name
    ? state.translate('downloadFileName', { filename: fileInfo.name })
    : '';
  const title = html`
    <span id="dl-file"
      data-nonce="${fileInfo.nonce}"
      data-requires-password="${fileInfo.requiresPassword}">${name}</span>`;

  if (!pageAction) {
    return title;
  }
  const div = html`
  <div id="page-one">
    <div id="download">
      <div id="download-page-one">
        <div class="title">
          ${title}
        <span id="dl-filesize">${' ' + size}</span>
        </div>
        <div class="description">${state.translate('downloadMessage')}</div>
        <img
          src="${assets.get('illustration_download.svg')}"
          id="download-img"
          title="${state.translate('downloadAltText')}"/>
        ${pageAction}
      </div>
      <a class="send-new" href="/">${state.translate('sendYourFilesLink')}</a>
    </div>
  </div>
  `;
  return div;
};
