const html = require('choo/html');
const file = require('./file');

module.exports = function(state, emit) {
  let table = '';
  if (state.storage.files.length) {
    table = html`
    <table id="uploaded-files">
      <thead>
        <tr>
          <th id="uploaded-file">${state.translate('uploadedFile')}</th>
          <th id="copy-file-list" class="center-col">${state.translate(
            'copyFileList'
          )}</th>
          <th id="expiry-time-file-list" >${state.translate(
            'timeFileList'
          )}</th>
          <th id="expiry-downloads-file-list" >${state.translate(
            'downloadsFileList'
          )}</th>
          <th id="delete-file-list" class="center-col">${state.translate(
            'deleteFileList'
          )}</th>
        </tr>
      </thead>
      <tbody>
        ${state.storage.files.map(f => file(f, state, emit))}
      </tbody>
    </table>
    `;
  }
  return html`
  <div id="file-list">
    ${table}
  </div>
  `;
};
