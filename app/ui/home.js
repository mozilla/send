const html = require('choo/html');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const intro = require('./intro');

module.exports = function(state, emit) {
  const archives = state.storage.files.map(archive =>
    archiveTile(state, emit, archive)
  );
  let wip = '';
  if (state.uploading) {
    wip = archiveTile.uploading(state, emit);
  } else if (state.archive) {
    wip = archiveTile.wip(state, emit);
  } else {
    wip = archiveTile.empty(state, emit);
  }
  archives.reverse();
  if (archives.length < 1) {
    archives.push(intro(state));
  }
  return html`
  <main class="main container relative">
    ${state.modal && modal(state, emit)}
    <section class="h-full w-full px-6 md:flex md:flex-row">
      <div class="pt-4 md:pb-4 md:mr-6 md:w-1/2">${wip}</div>
      ${list(
        archives,
        'list-reset h-full md:w-1/2 overflow-y-scroll pt-2',
        'py-2'
      )}
    </section>
  </main>`;
};
