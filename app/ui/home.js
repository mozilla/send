const html = require('choo/html');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const intro = require('./intro');

module.exports = function(state, emit) {
  const archives = state.storage.files
    .filter(archive => !archive.expired)
    .map(archive => archiveTile(state, emit, archive));
  let left = '';
  if (state.uploading) {
    left = archiveTile.uploading(state, emit);
  } else if (state.archive) {
    left = archiveTile.wip(state, emit);
  } else {
    left = archiveTile.empty(state, emit);
  }
  archives.reverse();
  const right =
    archives.length < 1
      ? intro(state)
      : list(archives, 'list-reset h-full overflow-y-scroll', 'mb-3');

  return html`
    <main class="main relative">
      ${state.modal && modal(state, emit)}
      <section class="h-full w-full p-6 md:flex md:flex-row z-10">
        <div class="md:mr-6 md:w-1/2">${left}</div>
        <div class="md:w-1/2 mt-6 md:mt-0">${right}</div>
      </section>
    </main>
  `;
};
