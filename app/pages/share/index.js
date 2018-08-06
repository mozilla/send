/* global EXPIRE_SECONDS */
const html = require('choo/html');
const raw = require('choo/html/raw');
const assets = require('../../../common/assets');
const notFound = require('../notFound');
const deletePopup = require('../../templates/popup');
const uploadedFileList = require('../../templates/uploadedFileList');
const { allowedCopy, delay, fadeOut } = require('../../utils');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  if (!file) {
    return notFound(state);
  }

  const passwordReminderClass = file._hasPassword
    ? ''
    : 'passwordReminder--hidden';

  return html`

    <div class="page effect--fadeIn" id="shareWrapper">
      <a href="/" class="goBackButton"> 
        <img src="${assets.get('back-arrow.svg')}"/> 
      </a>
      ${expireInfo(file, state.translate)}

      ${uploadedFileList(file, state, emit)}

      <div class="sharePage__copyText">
        ${state.translate('copyUrlLabel')}
        <div class="sharePage__passwordReminder ${passwordReminderClass}">(don't forget the password too)</div>
      </div>

      <input
        id="fileUrl"
        class="copySection__url"
        type="url"
        value="${file.url}"
        readonly="true"/>

      <button id="copyBtn"
        class="btn copyBtn"
        title="${state.translate('copyUrlFormButton')}"
        onclick=${copyLink}>${state.translate('copyUrlFormButton')}
      </button>
      
      <div class="sharePage__deletePopup">
        ${deletePopup(
          state.translate('deletePopupText'),
          state.translate('deletePopupYes'),
          state.translate('deletePopupCancel'),
          deleteFile
        )}
      </div>

      <button
        class="btn--cancel btn--delete"
        title="${state.translate('deleteFileButton')}"
        onclick=${showDeletePopup}>${state.translate('deleteFileButton')}
      </button>

    </div>

  `;

  function showDeletePopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup--show');
    popup.focus();
  }

  async function copyLink() {
    if (allowedCopy()) {
      emit('copy', { url: file.url, location: 'success-screen' });
      const input = document.getElementById('fileUrl');
      input.disabled = true;
      const copyBtn = document.getElementById('copyBtn');
      copyBtn.disabled = true;
      copyBtn.classList.add('copyBtn--copied');
      copyBtn.replaceChild(
        html`<label>${state.translate('copiedUrl')}</label>`,
        copyBtn.firstChild
      );
      await delay(2000);
      input.disabled = false;
      copyBtn.disabled = false;
      copyBtn.classList.remove('copyBtn--copied');
      copyBtn.textContent = state.translate('copyUrlFormButton');
    }
  }

  async function deleteFile() {
    emit('delete', { file, location: 'success-screen' });
    await fadeOut('#shareWrapper');
    emit('pushState', '/');
  }
};

function expireInfo(file, translate) {
  const hours = Math.floor(EXPIRE_SECONDS / 60 / 60);
  const el = html`<div class="shareTitle">${raw(
    translate('expireInfo', {
      downloadCount: translate('downloadCount', { num: file.dlimit }),
      timespan: translate('timespanHours', { num: hours })
    })
  )}</div>`;

  return el;
}
