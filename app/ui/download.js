/* global downloadMetadata */
const html = require('choo/html');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const notFound = require('./notFound');

function password(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;

  const div = html`
    <div
      class="h-full w-full flex flex-col items-center justify-center bg-white py-8 max-w-md mx-auto"
    >
      <h1 class="mb-4">${state.translate('downloadFilesTitle')}</h1>
      <p
        class="w-full mb-4 md:w-4/5 font-light text-center text-grey-darkest leading-normal"
      >
        ${state.translate('downloadMessage')}
      </p>
      <form
        class="flex flex-row flex-no-wrap w-full md:w-4/5"
        onsubmit="${checkPassword}"
        data-no-csrf
      >
        <input
          id="password-input"
          class="w-full border-l border-t border-b rounded-l-lg rounded-r-none ${invalid
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
          class="btn rounded-r-lg rounded-l-none ${invalid
            ? 'bg-red hover:bg-red focus:bg-red'
            : ''}"
          value="${state.translate('unlockButtonLabel')}"
          title="${state.translate('unlockButtonLabel')}"
        />
      </form>
      <label
        id="password-error"
        class="${invalid ? '' : 'invisible'} text-red my-4"
        for="password-input"
      >
        ${state.translate('passwordTryAgain')}
      </label>
    </div>
  `;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged(event) {
    event.stopPropagation();
    event.preventDefault();
    const label = document.getElementById('password-error');
    const input = document.getElementById('password-input');
    const btn = document.getElementById('password-btn');
    label.classList.add('invisible');
    input.classList.remove('border-red');
    btn.classList.remove('bg-red', 'hover:bg-red', 'focus:bg-red');
  }

  function checkPassword(event) {
    event.stopPropagation();
    event.preventDefault();
    const el = document.getElementById('password-input');
    const password = el.value;
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
        content = html`
          <div
            class="flex flex-col w-full h-full items-center md:justify-center md:-mt-8"
          >
            <h1 class="mb-4">${state.translate('downloadingTitle')}</h1>
            ${archiveTile.downloading(state, emit)}
          </div>
        `;
        break;
      case 'complete':
        content = html`
          <div
            id="download-complete"
            class="flex flex-col items-center justify-center h-full w-full bg-white p-2"
          >
            <h1 class="text-center font-bold my-4 text-2xl">
              ${state.translate('downloadFinish')}
            </h1>
            <p class="pb-2 text-grey-darkest leading-normal">
              ${state.translate('downloadFinishText')}
            </p>
            <p class="mb-4">
              <a
                href="/"
                class="btn rounded-lg flex items-center mt-4"
                role="button"
                >${state.translate('sendYourFilesLink')}</a
              >
            </p>
          </div>
        `;
        break;
      default:
        content = html`
          <div class="flex flex-col w-full h-full items-center justify-center">
            <h1 class="mb-4">${state.translate('downloadFilesTitle')}</h1>
            <p
              class="w-full md:w-4/5 font-light text-grey-darkest text-center leading-normal"
            >
              ${state.translate('downloadMessage')}
            </p>
            ${archiveTile.preview(state, emit)}
          </div>
        `;
    }
  } else if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    content = password(state, emit);
  }
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <section class="relative h-full w-full p-6 md:rounded-lg md:shadow-big">
        ${content}
      </section>
    </main>
  `;
};
