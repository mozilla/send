/* global downloadMetadata */
const html = require('choo/html');
const archiveTile = require('./archiveTile');
const intro = require('./intro');
const modal = require('./modal');
const notFound = require('./notFound');

function password(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;

  const div = html`
    <div
      class="h-full flex flex-col items-center justify-center border border-grey-light bg-white py-8"
    >
      <label
        id="password-error"
        class="${invalid ? '' : 'invisible'} text-red my-4"
        for="password-input"
      >
        ${state.translate('passwordTryAgain')}
      </label>

      <form class="w-5/6" onsubmit="${checkPassword}" data-no-csrf>
        <input
          id="password-input"
          class="w-full border rounded ${invalid
            ? 'border-red'
            : 'border-grey'} leading-loose px-2 py-1"
          maxlength="32"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput="${inputChanged}"
          type="password"
        />

        <input
          type="submit"
          id="password-btn"
          class="hidden"
          value="${state.translate('unlockInputLabel')}"
        />
      </form>
    </div>
  `;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged() {
    const label = document.getElementById('password-error');
    const input = document.getElementById('password-input');
    label.classList.add('invisible');
    input.classList.remove('border-red');
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
    if (!state.fileInfo.nonce) {
      return notFound(state);
    }
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
        content = html`
          <div
            id="download-complete"
            class="flex flex-col items-center justify-center h-full bg-white border border-grey-light p-2"
          >
            <h1 class="text-center font-bold my-4 text-2xl">
              ${state.translate('downloadFinish')}
            </h1>
            <p class="mb-4">
              <a
                href="/"
                class="text-blue hover:text-blue-dark focus:text-blue-darker font-medium"
                >${state.translate('sendYourFilesLink')}</a
              >
            </p>
          </div>
        `;
        break;
      default:
        content = archiveTile.preview(state, emit);
    }
  } else if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    content = password(state, emit);
  }
  return html`
    <main class="main container">
      ${state.modal && modal(state, emit)}
      <section class="relative h-full w-full p-6 md:flex md:flex-row">
        <div class="md:mr-6 md:w-1/2">${content}</div>
        <div class="md:w-1/2 mt-6 md:mt-0">${intro(state)}</div>
      </section>
    </main>
  `;
};
