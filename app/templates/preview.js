const html = require('choo/html');
const assets = require('../../common/assets');
const notFound = require('./notFound');
const { bytes } = require('../utils');

function getFileFromDOM() {
  const el = document.getElementById('dl-file');
  if (!el) {
    return null;
  }
  const data = el.dataset;
  return {
    name: data.name,
    size: parseInt(data.size, 10),
    ttl: parseInt(data.ttl, 10)
  };
}

module.exports = function(state, emit) {
  state.fileInfo = state.fileInfo || getFileFromDOM();
  if (!state.fileInfo) {
    return notFound(state, emit);
  }
  state.fileInfo.id = state.params.id;
  state.fileInfo.key = state.params.key;
  const fileInfo = state.fileInfo;
  const size = bytes(fileInfo.size);
  const div = html`
  <div id="page-one">
    <div id="download">
      <div id="download-page-one">
        <div class="title">
          <span id="dl-file"
            data-name="${fileInfo.name}"
            data-size="${fileInfo.size}"
            data-ttl="${fileInfo.ttl}">${state.translate('downloadFileName', {
    filename: fileInfo.name
  })}</span>
        <span id="dl-filesize">${' ' +
          state.translate('downloadFileSize', { size })}</span>
        </div>
        <div class="description">${state.translate('downloadMessage')}</div>
        <img
          src="${assets.get('illustration_download.svg')}"
          id="download-img"
          alt="${state.translate('downloadAltText')}"/>
        <div>
          <button
            id="download-btn"
            class="btn"
            title="${state.translate('downloadButtonLabel')}"
            onclick=${download}>${state.translate(
    'downloadButtonLabel'
  )}</button>
        </div>
      </div>
      <a class="send-new" href="/">${state.translate('sendYourFilesLink')}</a>
    </div>
  </div>
  `;
  function download(event) {
    event.preventDefault();
    emit('download', fileInfo);
  }

  if (state.layout) {
    return state.layout(state, div);
  }
  return div;
};
