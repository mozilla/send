const html = require('choo/html');
const assets = require('../../common/assets');
const notFound = require('./notFound');
const { allowedCopy, delay, fadeOut } = require('../utils');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  if (!file) {
    return notFound(state, emit);
  }
  const div = html`
  <div id="share-link" class="fadeIn singlepane">
    <div class="title">${state.translate('uploadSuccessTimingHeader')}</div>
    <div id="share-window">
      <div id="copy-text">${state.translate('copyUrlFormLabelWithName', {
        filename: file.name
      })}</div>
      <div id="copy">
        <input id="link" type="url" value="${file.url}" readonly="true"/>
        <button id="copy-btn" class="btn" title="${state.translate(
          'copyUrlFormButton'
        )}" onclick=${copyLink}>${state.translate('copyUrlFormButton')}</button>
      </div>
      <button id="delete-file" class="btn" title="${state.translate(
        'deleteFileButton'
      )}" onclick=${deleteFile}>${state.translate('deleteFileButton')}</button>
      <a class="send-new" data-state="completed" href="/" onclick=${sendNew}>${state.translate(
    'sendAnotherFileLink'
  )}</a>
    </div>
  </div>
  `;

  async function sendNew(e) {
    e.preventDefault();
    await fadeOut('share-link');
    emit('pushState', '/');
  }

  async function copyLink() {
    if (allowedCopy()) {
      emit('copy', { url: file.url, location: 'success-screen' });
      const input = document.getElementById('link');
      input.disabled = true;
      const copyBtn = document.getElementById('copy-btn');
      copyBtn.disabled = true;
      copyBtn.replaceChild(
        html`<img src="${assets.get('check-16.svg')}" class="icon-check">`,
        copyBtn.firstChild
      );
      await delay(2000);
      input.disabled = false;
      copyBtn.disabled = false;
      copyBtn.textContent = state.translate('copyUrlFormButton');
    }
  }

  async function deleteFile() {
    emit('delete', { file, location: 'success-screen' });
    await fadeOut('share-link');
    emit('pushState', '/');
  }
  return div;
};
