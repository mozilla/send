/* global downloadMetadata */
const html = require('choo/html');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const noStreams = require('./noStreams');
const notFound = require('./notFound');
const downloadPassword = require('./downloadPassword');
const downloadCompleted = require('./downloadCompleted');
const BIG_SIZE = 1024 * 1024 * 256;

function createFileInfo(state) {
  return {
    id: state.params.id,
    secretKey: state.params.key,
    nonce: downloadMetadata.nonce,
    requiresPassword: downloadMetadata.pwd
  };
}

function downloading(state, emit) {
  return html`
    <div
      class="flex flex-col w-full h-full items-center md:justify-center md:-mt-8"
    >
      <h1 class="mb-4">${state.translate('downloadingTitle')}</h1>
      ${archiveTile.downloading(state, emit)}
    </div>
  `;
}

function preview(state, emit) {
  if (!state.capabilities.streamDownload && state.fileInfo.size > BIG_SIZE) {
    return noStreams(state, emit);
  }
  return html`
    <div
      class="flex flex-col w-full max-w-md h-full mx-auto items-center justify-center"
    >
      <h1 class="mb-4">${state.translate('downloadFilesTitle')}</h1>
      <p class="w-full text-grey-darkest text-center leading-normal">
        ${state.translate('downloadMessage')}
      </p>
      ${archiveTile.preview(state, emit)}
    </div>
  `;
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
        content = downloading(state, emit);
        break;
      case 'complete':
        content = downloadCompleted(state);
        break;
      default:
        content = preview(state, emit);
    }
  } else if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    content = downloadPassword(state, emit);
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
