import FileSender from './fileSender';
import Storage from './storage';
import * as metrics from './metrics';
import { allowedCopy, copyToClipboard, ONE_DAY_IN_MS } from './utils';
import $ from 'jquery/dist/jquery.slim';

const storage = new Storage();
let fileList = null;
let $link = null;

document.addEventListener('DOMContentLoaded', function() {
  $link = $('#link');
  fileList = document.getElementById('file-list');
  toggleHeader();
  // eslint-disable-next-line prefer-const
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

function addFile(file) {
  if (!file) {
    return;
  }
  const row = document.createElement('tr');
  const name = document.createElement('td');
  const link = document.createElement('td');
  const $copyIcon = $('<img>', {
    src: '/resources/copy-16.svg',
    class: 'icon-copy',
    'data-l10n-id': 'copyUrlHover',
    disabled: !allowedCopy()
  });
  const expiry = document.createElement('td');
  const del = document.createElement('td');
  const $delIcon = $('<img>', {
    src: '/resources/close-16.svg',
    class: 'icon-delete',
    'data-l10n-id': 'deleteButtonHover'
  });
  const popupDiv = document.createElement('div');
  const $popupText = $('<div>', { class: 'popuptext' });
  const cellText = document.createTextNode(file.name);

  const url = file.url.trim() + `#${file.secretKey}`.trim();

  $link.attr('value', url);
  $('#copy-text')
    .attr('data-l10n-args', `{"filename": "${file.name}"}`)
    .attr('data-l10n-id', 'copyUrlFormLabelWithName');

  $popupText.attr('tabindex', '-1');

  name.appendChild(cellText);

  // create delete button

  const delSpan = document.createElement('span');
  $(delSpan)
    .addClass('icon-cancel-1')
    .attr('data-l10n-id', 'deleteButtonHover');
  del.appendChild(delSpan);

  const linkSpan = document.createElement('span');
  $(linkSpan).addClass('icon-docs').attr('data-l10n-id', 'copyUrlHover');

  link.appendChild(linkSpan);
  link.style.color = '#0A8DFF';

  //copy link to clipboard when icon clicked
  $copyIcon.on('click', () => {
    // record copied event from upload list
    metrics.copiedLink({ location: 'upload-list' });
    copyToClipboard(url);
    document.l10n.formatValue('copiedUrl').then(translated => {
      link.innerHTML = translated;
    });
    setTimeout(() => {
      const linkImg = document.createElement('img');
      $(linkImg)
        .addClass('icon-copy')
        .attr('data-l10n-id', 'copyUrlHover')
        .attr('src', '/resources/copy-16.svg');

      $(link).html(linkImg);
    }, 500);
  });

  file.creationDate = new Date(file.creationDate);

  const future = new Date();
  future.setTime(file.creationDate.getTime() + file.expiry);

  let countdown = 0;
  countdown = future.getTime() - Date.now();
  let minutes = Math.floor(countdown / 1000 / 60);
  let hours = Math.floor(minutes / 60);
  let seconds = Math.floor(countdown / 1000 % 60);

  const poll = () => {
    countdown = future.getTime() - Date.now();
    minutes = Math.floor(countdown / 1000 / 60);
    hours = Math.floor(minutes / 60);
    seconds = Math.floor(countdown / 1000 % 60);
    let t;

    if (hours >= 1) {
      expiry.innerHTML = hours + 'h ' + minutes % 60 + 'm';
      t = setTimeout(() => {
        poll();
      }, 60000);
    } else if (hours === 0) {
      expiry.innerHTML = minutes + 'm ' + seconds + 's';
      t = window.setTimeout(() => {
        poll();
      }, 1000);
    }
    //remove from list when expired
    if (countdown <= 0) {
      storage.remove(file.fileId);
      $(expiry).parents('tr').remove();
      window.clearTimeout(t);
      toggleHeader();
    }
  };

  poll();

  // create popup
  popupDiv.classList.add('popup');
  const $popupMessage = $('<div>', { class: 'popup-message' });
  $popupMessage.attr('data-l10n-id', 'deletePopupText');
  const $popupAction = $('<div>', { class: 'popup-action' });
  const $popupNvmSpan = $('<span>', { class: 'popup-no' });
  $popupNvmSpan.attr('data-l10n-id', 'deletePopupCancel');
  const $popupDelSpan = $('<span>', { class: 'popup-yes' });
  $popupDelSpan.attr('data-l10n-id', 'deletePopupYes');

  $popupText.html([$popupMessage, $popupAction]);
  $popupAction.html([$popupNvmSpan, $popupDelSpan]);

  // add data cells to table row
  row.appendChild(name);
  $(link).append($copyIcon);
  row.appendChild(link);
  row.appendChild(expiry);
  $(popupDiv).append($popupText);
  $(del).append($delIcon);
  del.appendChild(popupDiv);
  row.appendChild(del);
  $('tbody').append(row); //add row to table

  // delete file
  $popupText.find('.popup-yes').on('click', e => {
    FileSender.delete(file.fileId, file.deleteToken).then(() => {
      $(e.target).parents('tr').remove();
      const ttl = ONE_DAY_IN_MS - (Date.now() - file.creationDate.getTime());
      metrics
        .deletedUpload({
          size: file.size,
          time: file.totalTime,
          speed: file.uploadSpeed,
          type: file.typeOfUpload,
          location: 'upload-list',
          ttl
        })
        .then(() => {
          storage.remove(file.fileId);
        });
      toggleHeader();
    });
  });

  // show popup
  $delIcon.on('click', () => {
    $popupText.addClass('show').focus();
  });

  // hide popup
  $popupText.find('.popup-no').on('click', e => {
    e.stopPropagation();
    $popupText.removeClass('show');
  });

  $popupText.on('click', e => {
    e.stopPropagation();
  });

  //close when popup loses focus
  $popupText.on('blur', () => {
    $popupText.removeClass('show');
  });

  toggleHeader();
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
