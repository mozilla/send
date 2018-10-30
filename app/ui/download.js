/* global downloadMetadata */
const html = require('choo/html');
const archiveTile = require('./archiveTile');
const intro = require('./intro');

function password(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;

  const visible = invalid ? 'visible' : 'invisible';
  const invalidBtn = invalid ? '' : '';

  const div = html`
    <div class="">
      <label
        class="${visible}"
        for="password-input">
        ${state.translate('passwordTryAgain')}
      </label>

      <form class="" onsubmit=${checkPassword} data-no-csrf>
        <input id="password-input"
          class=""
          maxlength="64"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput=${inputChanged}
          type="password" />

        <input type="submit"
          id="password-btn"
          class="${invalidBtn}"
          value="${state.translate('unlockInputLabel')}"/>
      </form>
    </div>`;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged() {
    //TODO
    const input = document.querySelector('.passwordForm__error');
    input.classList.remove('visible');
    const btn = document.getElementById('password-btn');
    btn.classList.remove('unlockBtn--error');
  }

  function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;
    if (password.length > 0) {
      document.getElementById('password-btn').disabled = true;
      state.fileInfo.url = window.location.href;
      state.fileInfo.password = password;
      emit('getMetadata');
    }
    return false;
  }

  return div;
}

function createFileInfo(state) {
  return {
    id: state.params.id,
    secretKey: state.params.key,
    nonce: downloadMetadata.nonce,
    requiresPassword: downloadMetadata.pwd
  };
}

module.exports = function(state, emit) {
  let content = '';
  if (!state.fileInfo) {
    state.fileInfo = createFileInfo(state);
  }

  if (!state.transfer && !state.fileInfo.requiresPassword) {
    emit('getMetadata');
  }

  if (state.transfer) {
    switch (state.transfer.state) {
      case 'downloading':
      case 'decrypting':
        content = archiveTile.downloading(state, emit);
        break;
      case 'complete':
        content = ''; //TODO
        break;
      default:
        content = archiveTile.preview(state, emit);
    }
  } else if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    content = password(state, emit);
  }
  return html`
  <main class="main container">
    <section class="relative h-full w-full px-6 md:flex md:flex-row">
      <div class="pt-4 md:mr-6 md:pb-4 md:w-1/2">${content}</div>
      <div class="pt-4 md:w-1/2">${intro(state)}</div>
    </section>
  </main>`;
};
