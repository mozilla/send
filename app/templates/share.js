/* global EXPIRE_SECONDS */
const html = require('choo/html');
const assets = require('../../common/assets');
const notFound = require('./notFound');
const uploadPassword = require('./uploadPassword');
const selectbox = require('./selectbox');
const { allowedCopy, delay, fadeOut } = require('../utils');

function inputChanged() {
  const resetInput = document.getElementById('unlock-reset-input');
  const resetBtn = document.getElementById('unlock-reset-btn');
  if (resetInput.value.length > 0) {
    resetBtn.classList.remove('btn-hidden');
    resetInput.classList.remove('input-no-btn');
  } else {
    resetBtn.classList.add('btn-hidden');
    resetInput.classList.add('input-no-btn');
  }
}

function toggleResetInput(event) {
  const form = event.target.parentElement.querySelector('form');
  const input = document.getElementById('unlock-reset-input');
  if (form.style.visibility === 'hidden' || form.style.visibility === '') {
    form.style.visibility = 'visible';
    input.focus();
  } else {
    form.style.visibility = 'hidden';
  }
  inputChanged();
}

function expireInfo(file, translate, emit) {
  const hours = Math.floor(EXPIRE_SECONDS / 60 / 60);
  const el = html([
    `<div>${translate('expireInfo', {
      downloadCount: '<select></select>',
      timespan: translate('timespanHours', { num: hours })
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
    ? passwordComplete(file.password)
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
        onclick=${showPopup}>${state.translate('deleteFileButton')}
      </button>
      <div id="deletePopup" class="popup">
         <div class="popuptext" onblur=${cancel} tabindex="-1">
           <div class="popup-message">${state.translate('deletePopupText')}
           </div>
           <div class="popup-action">
             <span class="popup-no" onclick=${cancel}>${state.translate(
    'deletePopupCancel'
  )}
             </span>
             <span class="popup-yes" onclick=${deleteFile}>${state.translate(
    'deletePopupYes'
  )}
             </span>
           </div>
         </div>
      </div>
      <a class="send-new"
        data-state="completed"
        href="/"
        onclick=${sendNew}>${state.translate('sendAnotherFileLink')}</a>
    </div>
  </div>
  `;

  function passwordComplete(password) {
    const passwordSpan = html([
      `<span>${state.translate('passwordResult', {
        password:
          '<pre class="passwordOriginal"></pre><pre class="passwordMask"></pre>'
      })}</span>`
    ]);
    const og = passwordSpan.querySelector('.passwordOriginal');
    const masked = passwordSpan.querySelector('.passwordMask');
    og.textContent = password;
    masked.textContent = password.replace(/./g, '●');
    return html`<div class="selectPassword">
      ${passwordSpan}
      <button
        id="resetButton"
        onclick=${toggleResetInput}
        >${state.translate('changePasswordButton')}</button>
      <form
        id='reset-form'
        class="setPassword hidden"
        onsubmit=${resetPassword}
        data-no-csrf>
        <input id="unlock-reset-input"
          class="unlock-input input-no-btn"
          maxlength="32"
          autocomplete="off"
          type="password"
          oninput=${inputChanged}
          placeholder="${state.translate('unlockInputPlaceholder')}">
        <input type="submit"
          id="unlock-reset-btn"
          class="btn btn-hidden"
          value="${state.translate('changePasswordButton')}"/>
      </form>
      </div>`;
  }

  function resetPassword(event) {
    event.preventDefault();
    const existingPassword = file.password;
    const password = document.querySelector('#unlock-reset-input').value;
    if (password.length > 0) {
      document.getElementById('copy').classList.remove('wait-password');
      document.getElementById('copy-btn').disabled = false;
      emit('password', { existingPassword, password, file });
    }
  }

  function showPopup() {
    const popupText = document.querySelector('.popuptext');
    popupText.classList.add('show');
    popupText.focus();
  }

  function cancel(e) {
    e.stopPropagation();
    const popupText = document.querySelector('.popuptext');
    popupText.classList.remove('show');
  }

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
