const html = require('choo/html');
const assets = require('../../common/assets');

function timeLeft(milliseconds) {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);
  if (hours >= 1) {
    return `${hours}h ${minutes % 60}m`;
  } else if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  }
  return null;
}

module.exports = function(file, state, emit) {
  const ttl = file.expiresAt - Date.now();
  const remaining = timeLeft(ttl) || state.translate('linkExpiredAlt');
  const row = html`
  <tr id="${file.id}">
    <td class="overflow-col" title="${file.name}">${file.name}</td>
    <td class="center-col">
      <img onclick=${copyClick} src="${assets.get(
    'copy-16.svg'
  )}" class="icon-copy" title="${state.translate('copyUrlHover')}">
      <span class="text-copied" hidden="true">${state.translate(
        'copiedUrl'
      )}</span>
    </td>
    <td>${remaining}</td>
    <td class="center-col">
      <img onclick=${showPopup} src="${assets.get(
    'close-16.svg'
  )}" class="icon-delete" title="${state.translate('deleteButtonHover')}">
      <div class="popup">
        <div class="popuptext" onblur=${cancel} tabindex="-1">
          <div class="popup-message">${state.translate('deletePopupText')}</div>
          <div class="popup-action">
            <span class="popup-no" onclick=${cancel}>${state.translate(
    'deletePopupCancel'
  )}</span>
            <span class="popup-yes" onclick=${deleteFile}>${state.translate(
    'deletePopupYes'
  )}</span>
          </div>
        </div>
      </div>
    </td>
  </tr>
  `;

  function copyClick(e) {
    emit('copy', { url: file.url, location: 'upload-list' });
    const icon = e.target;
    const text = e.target.nextSibling;
    icon.hidden = true;
    text.hidden = false;
    setTimeout(() => {
      icon.hidden = false;
      text.hidden = true;
    }, 500);
  }

  function showPopup() {
    const tr = document.getElementById(file.id);
    const popup = tr.querySelector('.popuptext');
    popup.classList.add('show');
    popup.focus();
  }

  function cancel(e) {
    e.stopPropagation();
    const tr = document.getElementById(file.id);
    const popup = tr.querySelector('.popuptext');
    popup.classList.remove('show');
  }

  function deleteFile() {
    emit('delete', { file, location: 'upload-list' });
    emit('render');
  }

  return row;
};
