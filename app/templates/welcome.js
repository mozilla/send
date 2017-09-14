const html = require('choo/html');
const assets = require('../../common/assets');
const fileList = require('./fileList');
const { fadeOut } = require('../utils');

module.exports = function(state, emit) {
  const div = html`
  <div id="page-one" class="fadeIn">
    <div class="title">${state.translate('uploadPageHeader')}</div>
    <div class="description">
      <div>${state.translate('uploadPageExplainer')}</div>
      <a href="https://testpilot.firefox.com/experiments/send" class="link">${state.translate(
        'uploadPageLearnMore'
      )}</a>
    </div>
    <div class="${state.config
      .uploadWindowStyle}" ondragover=${dragover} ondragleave=${dragleave}>
      <div id="upload-img"><img src="${assets.get(
        'upload.svg'
      )}" title="${state.translate('uploadSvgAlt')}"/></div>


      <div id="upload-text">

        <p>Enter text to encrypt and send</p>
        <p><textarea id="source-text"></textarea><br>
        <input type="button" onclick=${uploadText} value="Send Text"></p>

        ${state.translate('uploadPageDropMessage')}</div>
      <span id="file-size-msg"><em>${state.translate(
        'uploadPageSizeMessage'
      )}</em></span>
      <form method="post" action="upload" enctype="multipart/form-data">
        <label for="file-upload" id="browse" class="${state.config
          .uploadButtonStyle}" title="${state.translate(
    'uploadPageBrowseButton1'
  )}">${state.translate('uploadPageBrowseButton1')}</label>
        <input id="file-upload" type="file" name="fileUploaded" onchange=${upload} />
      </form>
    </div>
    ${fileList(state, emit)}
  </div>
  `;

  function dragover(event) {
    const div = document.querySelector('.upload-window');
    div.classList.add('ondrag');
  }

  function dragleave(event) {
    const div = document.querySelector('.upload-window');
    div.classList.remove('ondrag');
  }

  async function uploadText(event) {
    const text = document.getElementById('source-text').value;
    const file = new File([text], 'user_text.txt', { type: 'text/plain' });
    console.log(file);
    handleUpload(file);
  }

  async function upload(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.files[0];
    handleUpload(file);
  }

  async function handleUpload(file) {
    if (file.size === 0) {
      return;
    }
    await fadeOut('page-one');
    emit('upload', { file, type: 'click' });
  }

  if (state.layout) {
    return state.layout(state, div);
  }
  return div;
};
