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
        <a href="https://testpilot.firefox.com/experiments/send" class="link">
          ${state.translate('uploadPageLearnMore')}
        </a>
      </div>
      <div class="uploadArea">
        <h1>New uploads are temporarily unavailable</h1>
        <p>Please return tomorrow for a brand new experience</p>
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
      // eslint-disable-next-line no-alert
      alert(state.translate('fileTooBig', { size: bytes(MAXFILESIZE) }));
      return;
    }

    await fadeOut('#page-one');
    emit('upload', { file, type: 'click' });
  }
};
