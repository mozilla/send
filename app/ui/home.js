const html = require('choo/html');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const intro = require('./intro');

module.exports = function(state, emit) {
  const archives = state.storage.files.map(archive =>
    archiveTile(state, emit, archive)
  );
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
      : list(archives, 'list-reset h-full overflow-y-scroll', 'pb-4');

  return html`
  <main class="main container md:relative">
    ${state.modal && modal(state, emit)}
    <section class="h-full w-full px-6 md:flex md:flex-row">
      <div class="pt-4 md:pb-4 md:mr-6 md:w-1/2">${left}</div>
      <div class="py-4 md:w-1/2">${right}</div>
    </section>
  </main>`;
};
