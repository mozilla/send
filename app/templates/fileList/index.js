const html = require('choo/html');
const file = require('../file');

module.exports = function(state, emit) {
  let table = '';
  if (state.storage.files.length) {
    table = html`
    <table class="fileList">
      <thead>
        <tr>
          <th class="fileList__header fileList__nameCol">
            ${state.translate('uploadedFile')}
          </th>
          <th class="fileList__header fileList__copyCol">
            ${state.translate('copyFileList')}
          </th>
          <th class="fileList__header fileList__expireCol" >
            ${state.translate('timeFileList')}
          </th>
          <th class="fileList__header fileList__dlCol" >
            ${state.translate('downloadsFileList')}
          </th>
          <th class="fileList__header fileList__delCol">
            ${state.translate('deleteFileList')}
          </th>
        </tr>
      </thead>
      <tbody class="fileList__body">
        ${state.storage.files.map(f => file(f, state, emit))}
      </tbody>
    </table>
    `;
  }
  return table;
};
