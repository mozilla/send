const html = require('choo/html');
const assets = require('../../../common/assets');
const number = require('../../utils').number;
const deletePopup = require('../popup');

module.exports = function(file, state, emit) {
  const ttl = file.expiresAt - Date.now();
  const remainingTime =
    timeLeft(ttl, state) || state.translate('linkExpiredAlt');
  const downloadLimit = file.dlimit || 1;
  const totalDownloads = file.dtotal || 0;
  return html`
  <tr id="${file.id}">
    <td class="fileData fileData--overflow" title="${file.name}">
      <a class="link" href="/share/${file.id}">${file.name}</a>
    </td>
    <td class="fileData fileData--center">
      <img
        onclick=${copyClick}
        src="${assets.get('copy-16.svg')}"
        class="cursor--pointer"
        title="${state.translate('copyUrlHover')}"
        tabindex="0">
      <span hidden="true">
        ${state.translate('copiedUrl')}
      </span>
    </td>
    <td class="fileData fileData--overflow">${remainingTime}</td>
    <td class="fileData fileData--center">${number(totalDownloads)} / ${number(
    downloadLimit
  )}</td>
    <td class="fileData fileData--center">
      <img
        onclick=${showPopup}
        src="${assets.get('close-16.svg')}"
        class="cursor--pointer"
        title="${state.translate('deleteButtonHover')}"
        tabindex="0">
      ${deletePopup(
        state.translate('deletePopupText'),
        state.translate('deletePopupYes'),
        state.translate('deletePopupCancel'),
        deleteFile
      )}
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
    const popup = tr.querySelector('.popup');
    popup.classList.add('popup--show');
    popup.focus();
  }

  function deleteFile() {
    emit('delete', { file, location: 'upload-list' });
    emit('render');
  }
};

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
