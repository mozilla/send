const html = require('choo/html');
const controlArea = require('../../templates/controlArea');
const archiveTile = require('../../templates/archiveTile');

module.exports = function(state, emit) {
  const fileArea = state.storage.files.length
    ? html`<ul class="myUploads">
      ${state.storage.files.map(f => archiveTile(f, state))}
    </ul>`
    : html`<div>nothing to see here</div>`;
  return html`<main class="main">
    ${controlArea(state, emit)}
    <div class="wide">
      <h1>${state.translate('myUploads')}</h1>
      ${fileArea}
    </div>
  </main>`;
};
