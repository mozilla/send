const html = require('choo/html');
const raw = require('choo/html/raw');
const notFound = require('../notFound');
const deletePopup = require('../../templates/popup');
const uploadedFileList = require('../../templates/uploadedFileList');
const timeLimitText = require('../../templates/timeLimitText');
const { allowedCopy, delay } = require('../../utils');
const split = require('../split');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  if (!file) {
    return notFound(state);
  }

  const passwordReminderClass = file._hasPassword
    ? ''
    : 'passwordReminder--hidden';

  return split(
    state,
    uploadedFileList(file, state, emit),
    html`
    <div class="copySection">
      <div class="sharePage__copyText">
        ${expireInfo(file, state.translate)}
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
    </div>`
  );

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
    emit('pushState', '/');
  }
};

function expireInfo(file, translate) {
  const el = html`<div class="shareTitle">
    ${raw(
      translate('expireInfo', {
        downloadCount: translate('downloadCount', { num: file.dlimit }),
        timespan: timeLimitText(translate, file.timeLimit)
      })
    )}
  </div>`;

  return el;
}
