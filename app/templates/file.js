const html = require('choo/html');
const assets = require('../../common/assets');

function timeLeft(milliseconds, state) {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  if (hours >= 1) {
    return state.translate('expiresHoursMinutes', {
      hours,
      minutes: minutes % 60
    });
  } else if (hours === 0) {
    if (minutes === 0) {
      return state.translate('expiresMinutes', { minutes: '< 1' });
    }
    return state.translate('expiresMinutes', { minutes });
  }
  return null;
}

module.exports = function(file, state, emit) {
  const ttl = file.expiresAt - Date.now();
  const remainingTime =
    timeLeft(ttl, state) || state.translate('linkExpiredAlt');
  const downloadLimit = file.dlimit || 1;
  const totalDownloads = file.dtotal || 0;
  const row = html`
  <tr id="${file.id}">
    <td class="overflow-col" title="${file.name}">
      <a class="link" href="/share/${file.id}">${file.name}</a>
    </td>
    <td class="center-col">
      <img
        onclick=${copyClick}
        src="${assets.get('copy-16.svg')}"
        class="icon-copy"
        title="${state.translate('copyUrlHover')}">
      <span class="text-copied" hidden="true">
        ${state.translate('copiedUrl')}
      </span>
    </td>
    <td>${remainingTime}</td>
    <td class="center-col">${totalDownloads} / ${downloadLimit}</td>
    <td class="center-col">
      <img
        onclick=${showPopup}
        src="${assets.get('close-16.svg')}"
        class="icon-delete"
        title="${state.translate('deleteButtonHover')}">
      <div class="popup">
        <div class="popuptext" onblur=${cancel} tabindex="-1">
          <div class="popup-message">${state.translate('deletePopupText')}</div>
          <div class="popup-action">
            <span class="popup-no" onclick=${cancel}>
              ${state.translate('deletePopupCancel')}
            </span>
            <span class="popup-yes" onclick=${deleteFile}>
              ${state.translate('deletePopupYes')}
            </span>
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
