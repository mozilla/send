const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');
const setPasswordSection = require('../../templates/setPasswordSection');
const uploadBox = require('../../templates/uploadedFileList');
const expireInfo = require('../../templates/expireInfo');

module.exports = function(state, emit) {
  // the page flickers if both the server and browser set 'effect--fadeIn'
  const fade = state.layout ? '' : 'effect--fadeIn';

  const hasAnUpload = state.archive && state.archive.numFiles > 0;

  const optionClass = state.uploading ? 'uploadOptions--faded' : '';
  const btnUploading = state.uploading ? 'btn--stripes' : '';
  const cancelVisible = state.uploading ? '' : 'noDisplay';
  const faded = hasAnUpload ? 'uploadArea--faded' : '';
  const selectFileClass = hasAnUpload > 0 ? 'btn--hidden' : '';
  const sendFileClass = hasAnUpload > 0 ? '' : 'btn--hidden';

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
  <div class="${fade}">
    ${title(state)}

    <label class="uploadArea"

      ondragover=${dragover}
      ondragleave=${dragleave}>

      ${uploadBox(state.archive, state, emit)}

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
    ${expireInfo(state, emit)}
    ${setPasswordSection(state)}
    </div>

    <label for="file-upload"
      class="btn btn--file ${selectFileClass}"
      title="${state.translate('uploadPageBrowseButton1')}">
      ${state.translate('uploadPageBrowseButton1')}
    </label>

    <button
      class="btn ${btnUploading} ${sendFileClass}"
      onclick=${state.uploading ? noop : upload}
      title="${btnText}">
      ${btnText}
    </button>

    <button class="btn--cancel uploadCancel ${cancelVisible}"
      onclick=${cancel}>
      ${state.translate('uploadingPageCancel')}
    </button>

  </div>
  `;

  function noop() {}

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

  function cancel(event) {
    if (state.uploading) {
      emit('cancel');
      const cancelBtn = document.querySelector('.uploadCancel');
      cancelBtn.innerHTML = state.translate('uploadCancelNotification');
    }
  }

  function addFiles(event) {
    event.preventDefault();
    const newFiles = Array.from(event.target.files);

    emit('addFiles', { files: newFiles });
  }

  function upload(event) {
    event.preventDefault();
    event.target.disabled = true;
    if (!state.uploading) {
      emit('upload', {
        type: 'click',
        dlimit: state.downloadCount || 1,
        password: state.password
      });
    }
  }
};
