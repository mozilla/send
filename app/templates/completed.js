const html = require('choo/html');
const progress = require('./progress');
const { fadeOut } = require('../utils');

module.exports = function(state, emit) {
  const div = html`
  <div id="page-one">
    <div id="download" class="fadeIn">
      <div id="download-progress">
        <div id="dl-title" class="title">
          ${state.translate('downloadFinish')}
        </div>
        <div class="description"></div>
        ${progress(1)}
        <div class="upload">
          <div class="progress-text"></div>
        </div>
      </div>
      <a class="send-new"
        data-state="completed"
        href="/"
        onclick=${sendNew}>${state.translate('sendYourFilesLink')}</a>
    </div>
  </div>
  `;

  async function sendNew(e) {
    e.preventDefault();
    await fadeOut('download');
    emit('pushState', '/');
  }

  return div;
};
