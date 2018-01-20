import FileSender from './fileSender';
import Storage from './storage';
import * as metrics from './metrics';
import { allowedCopy, copyToClipboard, ONE_DAY_IN_MS } from './utils';
import bel from 'bel';
import copyImg from '../../public/resources/copy-16.svg';
import closeImg from '../../public/resources/close-16.svg';

const HOUR = 1000 * 60 * 60;
const storage = new Storage();
let fileList = null;

document.addEventListener('DOMContentLoaded', function() {
  fileList = document.getElementById('file-list');
  toggleHeader();
  Promise.all(
    storage.files.map(file => {
      const id = file.fileId;
      return checkExistence(id).then(exists => {
        if (exists) {
          addFile(storage.getFileById(id));
        } else {
          storage.remove(id);
        }
      });
    })
  )
    .catch(err => console.error(err))
    .then(toggleHeader);
});

function toggleHeader() {
  fileList.hidden = storage.files.length === 0;
}

function timeLeft(milliseconds) {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor(milliseconds / 1000 % 60);
  if (hours >= 1) {
    return `${hours}h ${minutes % 60}m`;
  } else if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  }
  return 'Expired';
}

function addFile(file) {
  if (!file) {
    return;
  }
  file.creationDate = new Date(file.creationDate);
  const url = `${file.url}#${file.secretKey}`;
  const future = new Date();
  future.setTime(file.creationDate.getTime() + file.expiry);
  const countdown = future.getTime() - Date.now();

  const row = bel`
  <tr>
    <td>${file.name}</td>
    <td>
      <span class="icon-docs" data-l10n-id="copyUrlHover"></span>
      <img onclick=${copyClick} src="${copyImg}" class="icon-copy" data-l10n-id="copyUrlHover">
      <span data-l10n-id="copiedUrl" class="text-copied" hidden="true"></span>
    </td>
    <td>${timeLeft(countdown)}</td>
    <td>
      <span class="icon-cancel-1" data-l10n-id="deleteButtonHover" title="Delete"></span>
      <img onclick=${showPopup} src="${closeImg}" class="icon-delete" data-l10n-id="deleteButtonHover" title="Delete">
      <div class="popup">
        <div class="popuptext" onclick=${stopProp} onblur=${cancel} tabindex="-1">
          <div class="popup-message" data-l10n-id="deletePopupText"></div>
          <div class="popup-action">
            <span class="popup-no" onclick=${cancel} data-l10n-id="deletePopupCancel"></span>
            <span class="popup-yes" onclick=${deleteFile} data-l10n-id="deletePopupYes"></span>
          </div>
        </div>
      </div>
    </td>
  </tr>
  `;
  const popup = row.querySelector('.popuptext');
  const timeCol = row.querySelectorAll('td')[2];
  if (!allowedCopy()) {
    row.querySelector('.icon-copy').disabled = true;
  }

  fileList.querySelector('tbody').appendChild(row);
  toggleHeader();
  poll();

  function copyClick(e) {
    metrics.copiedLink({ location: 'upload-list' });
    copyToClipboard(url);
    const icon = e.target;
    const text = e.target.nextSibling;
    icon.hidden = true;
    text.hidden = false;
    setTimeout(() => {
      icon.hidden = false;
      text.hidden = true;
    }, 500);
  }

  function poll() {
    const countdown = future.getTime() - Date.now();
    if (countdown <= 0) {
      storage.remove(file.fileId);
      row.parentNode.removeChild(row);
      toggleHeader();
    }
    timeCol.textContent = timeLeft(countdown);
    setTimeout(poll, countdown >= HOUR ? 60000 : 1000);
  }

  function deleteFile() {
    FileSender.delete(file.fileId, file.deleteToken);
    const ttl = ONE_DAY_IN_MS - (Date.now() - file.creationDate.getTime());
    metrics.deletedUpload({
      size: file.size,
      time: file.totalTime,
      speed: file.uploadSpeed,
      type: file.typeOfUpload,
      location: 'upload-list',
      ttl
    });
    row.parentNode.removeChild(row);
    storage.remove(file.fileId);
    toggleHeader();
  }

  function showPopup() {
    popup.classList.add('show');
    popup.focus();
  }

  function cancel(e) {
    e.stopPropagation();
    popup.classList.remove('show');
  }

  function stopProp(e) {
    e.stopPropagation();
  }
}

async function checkExistence(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        resolve(xhr.status === 200);
      }
    };
    xhr.onerror = reject;
    xhr.ontimeout = reject;
    xhr.open('get', '/exists/' + id);
    xhr.timeout = 2000;
    xhr.send();
  });
}

export { addFile };
