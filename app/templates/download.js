const html = require('choo/html');
const progress = require('./progress');
const { bytes } = require('../utils');
const { fadeOut } = require('../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;
  let div = null;

  if (state.fileInfo.plaintext === undefined) {
    div = html`
      <div id="download-progress" class="fadeIn singlepane">
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
        </div>
      </div>
    `;
  } else {
    div = html`
      <div id="download-progress" class="fadeIn singlepane">
        <div id="dl-title" class="title">Download Complete</div>
        <div class="description">
          <textarea class=pt-textarea>${state.fileInfo.plaintext}</textarea>
        </div>
        <div class="description">
            <a class="send-new" data-state="completed" href="/" onclick=${sendNew}>${state.translate(
      'sendYourFilesLink'
    )}</a>
        </div>
      </div>
    `;
  }

  async function sendNew(e) {
    e.preventDefault();
    await fadeOut('download-progress');
    state.transfer = null;
    emit('pushState', '/');
  }

  return div;
};
