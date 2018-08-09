const html = require('choo/html');
const number = require('../../utils').number;
const bytes = require('../../utils').bytes;
const fileIcon = require('../fileIcon');

module.exports = function(file, state) {
  const ttl = file.expiresAt - Date.now();
  const remainingTime =
    timeLeft(ttl, state) || state.translate('linkExpiredAlt');
  const downloadLimit = file.dlimit || 1;
  const totalDownloads = file.dtotal || 0;

  const multiFiles = file.manifest.files;
  const fileName =
    multiFiles.length > 1
      ? `${multiFiles[0].name} + ${state.translate('fileCount', {
          num: multiFiles.length - 1
        })}`
      : file.name;

  const activeClass = isOnSharePage() ? 'fileToast--active' : '';
  return html`
    <li id="${file.id}">
      <a class="fileToast ${activeClass}" href=${toastClick()}>
        <div class="fileToast__content">
          ${fileIcon(file.name, file._hasPassword)}
          <div class="fileData">
            <p class="fileName">${fileName}</p>
            <p class="fileInfo">
              <span>${bytes(file.size)}</span> · 
              <span>${state.translate('downloadCount', {
                num: `${number(totalDownloads)} / ${number(downloadLimit)}`
              })}</span>
              <span>${remainingTime}</span>
            </p>
          </div>
        </div>
      </a>
    </li>
  `;

  function toastClick() {
    return isOnSharePage() ? '/' : `/share/${file.id}`;
  }

  function isOnSharePage() {
    return state.href.includes('/share/') && state.params.id === file.id;
  }
};

function timeLeft(milliseconds, state) {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 1) {
    return state.translate('expiresDaysHoursMinutes', {
      days,
      hours: hours % 24,
      minutes: minutes % 60
    });
  }
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
