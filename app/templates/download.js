const html = require('choo/html');
const progress = require('./progress');
const { bytes } = require('../utils');
const { fadeOut } = require('../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;

  function showProgressOrData() {
    if (state.fileInfo.plaintext === undefined)
      return progress(transfer.progressRatio);
    return html`
      <div class="description">
        <textarea>${state.fileInfo.plaintext}</textarea>
      </div>
    `;
  }

  function showSendAgain() {
    return html`
      <div class="description">
        <a class="send-new" data-state="completed" href="/" onclick=${sendNew}>${state.translate(
      'sendYourFilesLink'
    )}</a>
      </div>
    `;
  }

  const div = html`
  <div id="download-progress" class="fadeIn">
    <div id="dl-title" class="title">${state.translate(
      'downloadingPageProgress',
      {
        filename: state.fileInfo.name,
        size: bytes(state.fileInfo.size)
      }
    )}</div>
    <div class="description">${state.translate('downloadingPageMessage')}</div>
    ${showProgressOrData()}
    <div class="upload">
      <div class="progress-text">${state.translate(
        transfer.msg,
        transfer.sizes
      )}</div>
    </div>
    ${showSendAgain()}
  </div>
  `;

  async function sendNew(e) {
    e.preventDefault();
    await fadeOut('download-progress');
    state.transfer = null;
    emit('pushState', '/');
  }

  return div;
};
