/* global MAXFILESIZE */
const html = require('choo/html');
const assets = require('../../../common/assets');
const fileList = require('../../templates/fileList');
const { bytes, fadeOut } = require('../../utils');

module.exports = function(state, emit) {
  // the page flickers if both the server and browser set 'effect--fadeIn'
  const fade = state.layout ? '' : 'effect--fadeIn';
  return html`
  <div id="page-one" class="${fade}">
    <div class="title">${state.translate('uploadPageHeader')}</div>
    <div class="description">
      <div>${state.translate('uploadPageExplainer')}</div>
      <a
        href="https://testpilot.firefox.com/experiments/send"
        class="link">
        ${state.translate('uploadPageLearnMore')}
      </a>
    </div>
    <div class="uploadArea"
      ondragover=${dragover}
      ondragleave=${dragleave}>
      <div id="upload-img">
        <img
          src="${assets.get('upload.svg')}"
          title="${state.translate('uploadSvgAlt')}"/>
      </div>
      <div class="uploadArea__msg">
        ${state.translate('uploadPageDropMessage')}
      </div>
      <span class="uploadArea__sizeMsg">
        ${state.translate('uploadPageSizeMessage')}
      </span>
      <input id="file-upload"
        class="inputFile"
        type="file"
        name="fileUploaded"
        onfocus=${onfocus}
        onblur=${onblur}
        onchange=${upload} />
      <label for="file-upload"
        class="btn btn--file"
        title="${state.translate('uploadPageBrowseButton1')}">
        ${state.translate('uploadPageBrowseButton1')}
      </label>
    </div>
    ${fileList(state, emit)}
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

  async function upload(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.files[0];
    if (file.size === 0) {
      return;
    }
    if (file.size > MAXFILESIZE) {
      window.alert(state.translate('fileTooBig', { size: bytes(MAXFILESIZE) }));
      return;
    }

    await fadeOut('#page-one');
    emit('upload', { file, type: 'click' });
  }
};
