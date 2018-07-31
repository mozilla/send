const html = require('choo/html');
const assets = require('../../../common/assets');
const { checkSize } = require('../../utils');
const title = require('../../templates/title');
const setPasswordSection = require('../../templates/setPasswordSection');
const uploadBox = require('../../templates/uploadedFileList');
const expireInfo = require('../../templates/expireInfo');

module.exports = function(state, emit) {
  // the page flickers if both the server and browser set 'effect--fadeIn'
  const fade = state.layout ? '' : 'effect--fadeIn';
  const files = state.files ? state.files : [];

  const optionClass = state.uploading ? 'uploadOptions--faded' : '';
  const btnUploading = state.uploading ? 'btn--stripes' : '';
  const faded = files.length > 0 ? 'uploadArea--faded' : '';
  const selectFileClass = files.length > 0 ? 'btn--hidden' : '';
  const sendFileClass = files.length > 0 ? '' : 'btn--hidden';

  let btnText = '';

  if (state.encrypting) {
    btnText = state.translate('encryptingFile');
  } else if (state.uploading) {
    btnText = `sending...  ${Math.floor(state.transfer.progressRatio * 100)}%`;
  } else {
    //default pre-upload text
    btnText = state.translate('uploadSuccessConfirmHeader');
  }

  return html`
  <div id="page-one" class="page ${fade}">
    ${title(state)}

    <label class="uploadArea"
      ondragover=${dragover}
      ondragleave=${dragleave}>

      ${uploadBox(files, state, emit)}

      <div class="uploadedFilesWrapper ${faded}">
        <img
          class="uploadArea__icon"
          src="${assets.get('addfile.svg')}"
          title="${state.translate('uploadSvgAlt')}"/>
        <div class="uploadArea__msg">
          ${state.translate('uploadDropDragMessage')}
        </div>

        <span class="uploadArea__clickMsg">
          ${state.translate('uploadDropClickMessage')}
        </span>
      </div>

      <input id="file-upload"
        class="inputFile fileBox"
        type="file"
        multiple
        name="fileUploaded"
        onfocus=${onfocus}
        onblur=${onblur}
        onchange=${addFiles} />
        
    </label>

    <div class="uploadOptions ${optionClass}">
    ${expireInfo(state)}
    ${setPasswordSection(state)}
    </div>

    <label for="file-upload"
      class="btn btn--file ${selectFileClass}"
      title="${state.translate('uploadPageBrowseButton1')}">
      ${state.translate('uploadPageBrowseButton1')}
    </label>

    <button
      class="btn ${btnUploading} ${sendFileClass}"
      onclick=${upload}
      title="${btnText}">
      ${btnText}
    </button>

  </div>
  `;

  function dragover(event) {
    const div = document.querySelector('.uploadArea');
    div.classList.add('uploadArea--dragging');
  }

  function dragleave(event) {
    const div = document.querySelector('.uploadArea');
    div.classList.remove('uploadArea--dragging');
  }

  function onfocus(event) {
    event.target.classList.add('inputFile--focused');
  }

  function onblur(event) {
    event.target.classList.remove('inputFile--focused');
  }

  async function addFiles(event) {
    event.preventDefault();
    const target = event.target;
    checkSize(target.files, state.files);
    emit('addFiles', { files: target.files });
  }

  async function upload(event) {
    event.preventDefault();

    if (files.length > 0) {
      emit('upload', {
        files,
        type: 'click',
        dlCount: state.downloadCount,
        password: state.password
      });
    }
  }
};
