const html = require('choo/html');
const assets = require('../../common/assets');
const notFound = require('./notFound');
const uploadPassword = require('./uploadPassword');
const selectbox = require('./selectbox');
const { allowedCopy, delay, fadeOut } = require('../utils');

function passwordComplete(state, password) {
  const el = html([
    `<div class="selectPassword">${state.translate('passwordResult', {
      password: '<pre></pre>'
    })}</div>`
  ]);
  el.lastElementChild.textContent = password;
  return el;
}

function expireInfo(file, translate, emit) {
  const el = html([
    `<div>${translate('expireInfo', {
      downloadCount: '<select></select>',
      timespan: translate('timespanHours', { num: 24 })
    })}</div>`
  ]);
  const select = el.querySelector('select');
  const options = [1, 2, 3, 4, 5, 20];
  const t = num => translate('downloadCount', { num });
  const changed = value => emit('changeLimit', { file, value });
  select.parentNode.replaceChild(
    selectbox(file.dlimit || 1, options, t, changed),
    select
  );
  return el;
}

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  if (!file) {
    return notFound(state, emit);
  }

  file.password = file.password || '';

  const passwordSection = file.password
    ? passwordComplete(state, file.password)
    : uploadPassword(state, emit);
  const div = html`
  <div id="share-link" class="fadeIn">
    <div class="title">${expireInfo(file, state.translate, emit)}</div>
    <div id="share-window">
      <div id="copy-text">
        ${state.translate('copyUrlFormLabelWithName', {
          filename: file.name
        })}</div>
      <div id="copy">
        <input id="link" type="url" value="${file.url}" readonly="true"/>
        <button id="copy-btn"
          class="btn"
          title="${state.translate('copyUrlFormButton')}"
          onclick=${copyLink}>${state.translate('copyUrlFormButton')}</button>
      </div>
      ${passwordSection}
      <button id="delete-file"
        class="btn"
        title="${state.translate('deleteFileButton')}"
        onclick=${deleteFile}>${state.translate('deleteFileButton')}</button>
      <a class="send-new"
        data-state="completed"
        href="/"
        onclick=${sendNew}>${state.translate('sendAnotherFileLink')}</a>
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
      copyBtn.classList.add('success');
      copyBtn.replaceChild(
        html`<img src="${assets.get('check-16.svg')}" class="icon-check">`,
        copyBtn.firstChild
      );
      await delay(2000);
      input.disabled = false;
      if (!copyBtn.parentNode.classList.contains('wait-password')) {
        copyBtn.disabled = false;
      }
      copyBtn.classList.remove('success');
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
