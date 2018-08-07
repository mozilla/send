const html = require('choo/html');
const titleSection = require('../../templates/title');
const downloadPassword = require('../../templates/downloadPassword');

module.exports = function(state, emit) {
  return html`
    <div class="page">
      ${titleSection(state)}
      
      <div class="description">${state.translate('downloadMessage2')}</div>
      ${downloadPassword(state, emit)}

      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>

    </div>
  `;
};
