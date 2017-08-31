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
      <a href="https://testpilot.firefox.com/experiments/send"
        class="link">${state.translate('uploadPageLearnMore')}</a>
    </div>
    <div class="upload-window"
      ondragover=${dragover}
      ondragleave=${dragleave}>
      <div id="upload-img">
        <img src="${assets.get('upload.svg')}"
          title="${state.translate('uploadSvgAlt')}"/>
      </div>
      <div id="upload-text">${state.translate('uploadPageDropMessage')}</div>
      <span id="file-size-msg">
        <em>${state.translate('uploadPageSizeMessage')}</em>
      </span>
      <label for="file-upload"
        id="browse"
        class="btn browse"
        title="${state.translate('uploadPageBrowseButton1')}">
        ${state.translate('uploadPageBrowseButton1')}</label>
      <input id="file-upload"
        type="file"
        name="fileUploaded"
        onfocus=${onfocus}
        onblur=${onblur}
        onchange=${upload} />
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

  function onfocus(event) {
    event.target.classList.add('has-focus');
  }

  function onblur(event) {
    event.target.classList.remove('has-focus');
  }

  async function upload(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.files[0];
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
