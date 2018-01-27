const html = require('choo/html');
const assets = require('../../common/assets');
const notFound = require('./notFound');
const downloadPassword = require('./downloadPassword');
const { bytes } = require('../utils');

function getFileFromDOM() {
  const el = document.getElementById('dl-file');
  if (!el) {
    return null;
  }
  return {
    nonce: el.getAttribute('data-nonce'),
    pwd: !!+el.getAttribute('data-requires-password')
  };
}

module.exports = function(state, emit) {
  state.fileInfo = state.fileInfo || getFileFromDOM();
  if (!state.fileInfo) {
    return notFound(state, emit);
  }
  state.fileInfo.id = state.params.id;
  state.fileInfo.secretKey = state.params.key;
  const fileInfo = state.fileInfo;
  const size = fileInfo.size
    ? state.translate('downloadFileSize', { size: bytes(fileInfo.size) })
    : '';
  let action = html`
  <div>
    <img src="${assets.get('illustration_download.svg')}"
      id="download-img"
      alt="${state.translate('downloadAltText')}"/>
    <div>
      <button id="download-btn"
        class="btn"
        onclick=${download}>${state.translate('downloadButtonLabel')}
      </button>
    </div>
  </div>`;
  if (!state.transfer) {
    const ele = action.querySelector('#download-btn');
    ele.parentNode.removeChild(ele);
  }
  if (fileInfo.pwd && !fileInfo.password) {
    action = downloadPassword(state, emit);
  } else if (!state.transfer) {
    emit('preview');
  }
  const title = fileInfo.name
    ? state.translate('downloadFileName', { filename: fileInfo.name })
    : state.translate('downloadFileTitle');
  const div = html`
  <div id="page-one">
    <div id="download">
      <div id="download-page-one">
        <div class="title">
          <span id="dl-file"
            data-nonce="${fileInfo.nonce}"
            data-requires-password="${fileInfo.pwd}">${title}</span>
        <span id="dl-filesize">${' ' + size}</span>
        </div>
        <div class="description">${state.translate('downloadMessage')}</div>
        ${action}
      </div>
      <a class="send-new" href="/">${state.translate('sendYourFilesLink')}</a>
    </div>
  </div>
  `;

  function download(event) {
    event.preventDefault();
    emit('download', fileInfo);
  }
  return div;
};
