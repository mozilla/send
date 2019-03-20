const html = require('choo/html');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const intro = require('./intro');
const faviconProgressbar = require('./faviconProgressbar');

module.exports = function(state, emit) {
  const archives = state.storage.files
    .filter(archive => !archive.expired)
    .map(archive => archiveTile(state, emit, archive));
  let left = '';

  if (state.uploading) {
    left = archiveTile.uploading(state, emit);
  } else if (state.archive.numFiles > 0) {
    faviconProgressbar.updateFavicon('0%');
    left = archiveTile.wip(state, emit);
  } else {
    faviconProgressbar.updateFavicon('0%');
    left = archiveTile.empty(state, emit);
  }
  archives.reverse();
  const right =
    archives.length === 0
      ? intro(state)
      : list(
          archives,
          'list-reset p-2 h-full overflow-y-auto w-full',
          'mb-4 w-full'
        );

  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <section
        class="h-full w-full p-6 overflow-hidden md:flex md:flex-row md:rounded-lg md:shadow-big"
      >
        <div class="px-2 w-full md:px-0 md:mr-6 md:w-1/2">${left}</div>
        <div class="mt-6 w-full md:w-1/2 md:-m-2">${right}</div>
      </section>
    </main>
  `;
};
