const html = require('choo/html');
const assets = require('../../common/assets');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');

function intro(state) {
  return html`
  <article class="flex flex-col items-center justify-center bg-white border border-grey-light p-2">
    <p class="text-center">
      <div class="font-semibold">${state.translate('uploadPageHeader')}</div>
      <div class="italic">${state.translate('pageHeaderCredits')}</div>
    </p>
    <img src="${assets.get('illustration_download.svg')}"/>
    <p class="m-4 max-w-sm text-sm font-light">${state.translate(
      'uploadPageExplainer'
    )}</p>
  </article>`;
}

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
  <section class="relative h-full w-full px-6">
    <div class="pt-4 pb-2">${wip}</div>
    ${list(archives, 'list-reset h-full overflow-y-scroll foo', 'py-2')}
  </section>`;
};
