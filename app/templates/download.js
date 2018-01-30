const html = require('choo/html');
const progress = require('./progress');
const { bytes } = require('../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;
  const div = html`
  <div id="page-one">
    <div id="download">
      <div id="download-progress" class="fadeIn">
        <div id="dl-title" class="title">${state.translate(
          'downloadingPageProgress',
          {
            filename: state.fileInfo.name,
            size: bytes(state.fileInfo.size)
          }
        )}</div>
        <div class="description">${state.translate(
          'downloadingPageMessage'
        )}</div>
        ${progress(transfer.progressRatio)}
        <div class="upload">
          <div class="progress-text">${state.translate(
            transfer.msg,
            transfer.sizes
          )}</div>
          <button
            id="cancel-upload"
            title="${state.translate('deletePopupCancel')}"
            onclick=${cancel}>${state.translate('deletePopupCancel')}</button>
        </div>
      </div>
    </div>
  </div>
  `;

  function cancel() {
    const btn = document.getElementById('cancel-upload');
    btn.remove();
    emit('cancel');
  }
  return div;
};
