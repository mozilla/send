/* global downloadMetadata */
const html = require('choo/html');
const assets = require('../../common/assets');
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
      <h1 class="text-3xl font-bold mb-4">
        ${state.translate('downloadingTitle')}
      </h1>
      ${archiveTile.downloading(state, emit)}
    </div>
  `;
}

function preview(state, emit) {
  if (state.fileInfo.flagged) {
    return html`
      <div
        class="flex flex-col w-full max-w-md h-full mx-auto items-center justify-center"
      >
        <h1 class="text-xl font-bold">${state.translate('downloadFlagged')}</h1>
      </div>
    `;
  }
  if (!state.capabilities.streamDownload && state.fileInfo.size > BIG_SIZE) {
    return noStreams(state, emit);
  }
  return html`
    <div
      class="w-full overflow-hidden md:flex md:flex-row items-stretch md:flex-1"
    >
      <div
        class="px-2 w-full md:px-0 flex-half md:flex md:flex-col mt-12 md:pr-8 pb-4"
      >
        <h1 class="text-3xl font-bold mb-4 text-center md:text-left">
          ${state.translate('downloadTitle')}
        </h1>
        <p
          class="text-grey-80 leading-normal dark:text-grey-40 mb-4 text-center md:text-left"
        >
          ${state.translate('downloadDescription')}
        </p>
        <p
          class="text-grey-80 leading-normal dark:text-grey-40 font-semibold text-center md:mb-8 md:text-left"
        >
          ${state.translate('downloadConfirmDescription')}
        </p>
        <img
          class="hidden md:block dl-bg w-full"
          src="${assets.get('intro.svg')}"
        />
      </div>
      <div
        class="w-full flex-half flex-half md:flex md:flex-col md:justify-center"
      >
        ${archiveTile.preview(state, emit)}
        <a href="/report" class="link-blue mt-4 text-center block"
          >${state.translate('reportFile', {
            count: state.fileInfo.manifest.files.length
          })}</a
        >
      </div>
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
      <section
        class="relative h-full w-full p-6 md:p-8 md:rounded-xl md:shadow-big md:flex md:flex-col"
      >
        ${content}
      </section>
    </main>
  `;
};
