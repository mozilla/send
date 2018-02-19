/* global EXPIRE_SECONDS */
const html = require('choo/html');
const raw = require('choo/html/raw');
const assets = require('../../../common/assets');
const notFound = require('../notFound');
const setPasswordSection = require('../../templates/setPasswordSection');
const selectbox = require('../../templates/selectbox');
const deletePopup = require('../../templates/popup');
const { allowedCopy, delay, fadeOut } = require('../../utils');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  if (!file) {
    return notFound(state, emit);
  }

  return html`
  <div id="shareWrapper" class="effect--fadeIn">
    <div class="title">${expireInfo(file, state.translate, emit)}</div>
    <div class="sharePage">
      <div class="sharePage__copyText">
        ${state.translate('copyUrlFormLabelWithName', { filename: file.name })}
      </div>
      <div class="copySection">
        <input
          id="fileUrl"
          class="copySection__url"
          type="url"
          value="${file.url}"
          readonly="true"/>
        <button id="copyBtn"
          class="inputBtn inputBtn--copy"
          title="${state.translate('copyUrlFormButton')}"
          onclick=${copyLink}>${state.translate('copyUrlFormButton')}</button>
      </div>
      ${setPasswordSection(state, emit)}
      <button
        class="btn btn--delete"
        title="${state.translate('deleteFileButton')}"
        onclick=${showPopup}>${state.translate('deleteFileButton')}
      </button>
      <div class="sharePage__deletePopup">
        ${deletePopup(
          state.translate('deletePopupText'),
          state.translate('deletePopupYes'),
          state.translate('deletePopupCancel'),
          deleteFile
        )}
      </div>
      <a class="link link--action"
        href="/"
        onclick=${sendNew}>${state.translate('sendAnotherFileLink')}</a>
    </div>
  </div>
  `;

  function showPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup--show');
    popup.focus();
  }

  async function sendNew(e) {
    e.preventDefault();
    await fadeOut('#shareWrapper');
    emit('pushState', '/');
  }

  async function copyLink() {
    if (allowedCopy()) {
      emit('copy', { url: file.url, location: 'success-screen' });
      const input = document.getElementById('fileUrl');
      input.disabled = true;
      input.classList.add('input--copied');
      const copyBtn = document.getElementById('copyBtn');
      copyBtn.disabled = true;
      copyBtn.classList.add('inputBtn--copied');
      copyBtn.replaceChild(
        html`<img src="${assets.get('check-16.svg')}" class="cursor--pointer">`,
        copyBtn.firstChild
      );
      await delay(2000);
      input.disabled = false;
      input.classList.remove('input--copied');
      copyBtn.disabled = false;
      copyBtn.classList.remove('inputBtn--copied');
      copyBtn.textContent = state.translate('copyUrlFormButton');
    }
  }

  async function deleteFile() {
    emit('delete', { file, location: 'success-screen' });
    await fadeOut('#shareWrapper');
    emit('pushState', '/');
  }
};

function expireInfo(file, translate, emit) {
  const hours = Math.floor(EXPIRE_SECONDS / 60 / 60);
  const el = html`<div>${raw(
    translate('expireInfo', {
      downloadCount: '<select></select>',
      timespan: translate('timespanHours', { num: hours })
    })
  )}</div>`;
  const select = el.querySelector('select');
  const options = [1, 2, 3, 4, 5, 20].filter(i => i > (file.dtotal || 0));
  const t = num => translate('downloadCount', { num });
  const changed = value => emit('changeLimit', { file, value });
  select.parentNode.replaceChild(
    selectbox(file.dlimit || 1, options, t, changed),
    select
  );
  return el;
}
