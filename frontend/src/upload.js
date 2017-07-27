/* global MAXFILESIZE EXPIRE_SECONDS */
require('./common');
const FileSender = require('./fileSender');
const {
  notify,
  gcmCompliant,
  findMetric,
  sendEvent,
  ONE_DAY_IN_MS
} = require('./utils');
const bytes = require('bytes');
const Storage = require('./storage');
const storage = new Storage(localStorage);

const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

if (storage.has('referrer')) {
  window.referrer = storage.referrer;
  storage.remove('referrer');
} else {
  window.referrer = 'external';
}

$(document).ready(function() {
  gcmCompliant().catch(err => {
    $('#page-one').attr('hidden', true);
    sendEvent('sender', 'unsupported', {
      cd6: err
    }).then(() => {
      location.replace('/unsupported');
    });
  });

  $('#file-upload').change(onUpload);

  $('.legal-links a, .social-links a, #dl-firefox').click(function(target) {
    target.preventDefault();
    const metric = findMetric(target.currentTarget.href);
    // record exited event by recipient
    sendEvent('sender', 'exited', {
      cd3: metric
    }).then(() => {
      location.href = target.currentTarget.href;
    });
  });

  $('#send-new-completed').click(function(target) {
    target.preventDefault();
    // record restarted event
    sendEvent('sender', 'restarted', {
      cd2: 'completed'
    }).then(() => {
      storage.referrer = 'completed-upload';
      location.href = target.currentTarget.href;
    });
  });

  $('#send-new-error').click(function(target) {
    target.preventDefault();
    // record restarted event
    sendEvent('sender', 'restarted', {
      cd2: 'errored'
    }).then(() => {
      storage.referrer = 'errored-upload';
      location.href = target.currentTarget.href;
    });
  });

  $('body').on('dragover', allowDrop).on('drop', onUpload);
  // reset copy button
  const $copyBtn = $('#copy-btn');
  $copyBtn.attr('disabled', false);
  $('#link').attr('disabled', false);
  $copyBtn.attr('data-l10n-id', 'copyUrlFormButton');

  const files = storage.files;
  if (files.length === 0) {
    toggleHeader();
  } else {
    // eslint-disable-next-line prefer-const
    for (let index in files) {
      const id = files[index].fileId;
      //check if file still exists before adding to list
      checkExistence(id, files[index], true);
    }
  }

  // copy link to clipboard
  $copyBtn.click(() => {
    // record copied event from success screen
    sendEvent('sender', 'copied', {
      cd4: 'success-screen'
    });
    const aux = document.createElement('input');
    aux.setAttribute('value', $('#link').attr('value'));
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    //disable button for 3s
    $copyBtn.attr('disabled', true);
    $('#link').attr('disabled', true);
    $copyBtn.html(
      '<img src="/resources/check-16.svg" class="icon-check"></img>'
    );
    window.setTimeout(() => {
      $copyBtn.attr('disabled', false);
      $('#link').attr('disabled', false);
      $copyBtn.attr('data-l10n-id', 'copyUrlFormButton');
    }, 3000);
  });

  $('.upload-window').on('dragover', () => {
    $('.upload-window').addClass('ondrag');
  });
  $('.upload-window').on('dragleave', () => {
    $('.upload-window').removeClass('ondrag');
  });
  //initiate progress bar
  $('#ul-progress').circleProgress({
    value: 0.0,
    startAngle: -Math.PI / 2,
    fill: '#3B9DFF',
    size: 158,
    animation: { duration: 300 }
  });

  //link back to homepage
  $('.send-new').attr('href', window.location);

  // on file upload by browse or drag & drop
  function onUpload(event) {
    event.preventDefault();

    // don't allow upload if not on upload page
    if ($('#page-one').attr('hidden')) {
      return;
    }

    storage.totalUploads += 1;

    let file = '';
    if (event.type === 'drop') {
      if (!event.originalEvent.dataTransfer.files[0]) {
        $('.upload-window').removeClass('ondrag');
        return;
      }
      if (
        event.originalEvent.dataTransfer.files.length > 1 ||
        event.originalEvent.dataTransfer.files[0].size === 0
      ) {
        $('.upload-window').removeClass('ondrag');
        document.l10n.formatValue('uploadPageMultipleFilesAlert').then(str => {
          alert(str);
        });
        return;
      }
      file = event.originalEvent.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    if (file.size > MAXFILESIZE) {
      return document.l10n
        .formatValue('fileTooBig', { size: bytes(MAXFILESIZE) })
        .then(alert);
    }

    $('#page-one').attr('hidden', true);
    $('#upload-error').attr('hidden', true);
    $('#upload-progress').removeAttr('hidden');
    document.l10n.formatValue('importingFile').then(importingFile => {
      $('.progress-text').text(importingFile);
    });
    //don't allow drag and drop when not on page-one
    $('body').off('drop', onUpload);

    const fileSender = new FileSender(file);
    $('#cancel-upload').click(() => {
      fileSender.cancel();
      storage.referrer = 'cancelled-upload';

      // record upload-stopped (cancelled) by sender
      sendEvent('sender', 'upload-stopped', {
        cm1: file.size,
        cm5: storage.totalUploads,
        cm6: unexpiredFiles,
        cm7: storage.totalDownloads,
        cd1: event.type === 'drop' ? 'drop' : 'click',
        cd2: 'cancelled'
      });
      location.reload();
    });

    fileSender.on('progress', progress => {
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#ul-progress').circleProgress('value', percent);
      $('#ul-progress').circleProgress().on('circle-animation-end', function() {
        $('.percent-number').text(`${Math.floor(percent * 100)}`);
      });
      $('.progress-text').text(
        `${file.name} (${bytes(progress[0], {
          decimalPlaces: 1,
          fixedDecimals: true
        })} of ${bytes(progress[1], { decimalPlaces: 1 })})`
      );
    });

    fileSender.on('hashing', isStillHashing => {
      // The file is being hashed
      if (isStillHashing) {
        document.l10n.formatValue('verifyingFile').then(verifyingFile => {
          $('.progress-text').text(verifyingFile);
        });
      } else {
        console.log('Finished hashing');
      }
    });

    let uploadStart;
    fileSender.on('encrypting', isStillEncrypting => {
      // The file is being encrypted
      if (isStillEncrypting) {
        document.l10n.formatValue('encryptingFile').then(encryptingFile => {
          $('.progress-text').text(encryptingFile);
        });
      } else {
        console.log('Finished encrypting');
        uploadStart = Date.now();
      }
    });

    let t;
    const startTime = Date.now();
    const unexpiredFiles = storage.numFiles + 1;

    // record upload-started event by sender
    sendEvent('sender', 'upload-started', {
      cm1: file.size,
      cm5: storage.totalUploads,
      cm6: unexpiredFiles,
      cm7: storage.totalDownloads,
      cd1: event.type === 'drop' ? 'drop' : 'click',
      cd5: window.referrer
    });

    // For large files we need to give the ui a tick to breathe and update
    // before we kick off the FileSender
    setTimeout(() => {
      fileSender
        .upload()
        .then(info => {
          const endTime = Date.now();
          const totalTime = endTime - startTime;
          const uploadTime = endTime - uploadStart;
          const uploadSpeed = file.size / (uploadTime / 1000);
          const expiration = EXPIRE_SECONDS * 1000;

          // record upload-stopped (completed) by sender
          sendEvent('sender', 'upload-stopped', {
            cm1: file.size,
            cm2: totalTime,
            cm3: uploadSpeed,
            cm5: storage.totalUploads,
            cm6: unexpiredFiles,
            cm7: storage.totalDownloads,
            cd1: event.type === 'drop' ? 'drop' : 'click',
            cd2: 'completed'
          });

          const fileData = {
            name: file.name,
            size: file.size,
            fileId: info.fileId,
            url: info.url,
            secretKey: info.secretKey,
            deleteToken: info.deleteToken,
            creationDate: new Date(),
            expiry: expiration,
            totalTime: totalTime,
            typeOfUpload: event.type === 'drop' ? 'drop' : 'click',
            uploadSpeed: uploadSpeed
          };

          storage.addFile(info.fileId, fileData);
          $('#upload-filename').attr(
            'data-l10n-id',
            'uploadSuccessConfirmHeader'
          );
          t = window.setTimeout(() => {
            $('#page-one').attr('hidden', true);
            $('#upload-progress').attr('hidden', true);
            $('#upload-error').attr('hidden', true);
            $('#share-link').removeAttr('hidden');
          }, 1000);

          populateFileList(fileData);
          document.l10n.formatValue('notifyUploadDone').then(str => {
            notify(str);
          });
        })
        .catch(err => {
          // err is 0 when coming from a cancel upload event
          if (err === 0) {
            return;
          }
          // only show error page when the error is anything other than user cancelling the upload
          Raven.captureException(err);
          $('#page-one').attr('hidden', true);
          $('#upload-progress').attr('hidden', true);
          $('#upload-error').removeAttr('hidden');
          window.clearTimeout(t);

          // record upload-stopped (errored) by sender
          sendEvent('sender', 'upload-stopped', {
            cm1: file.size,
            cm5: storage.totalUploads,
            cm6: unexpiredFiles,
            cm7: storage.totalDownloads,
            cd1: event.type === 'drop' ? 'drop' : 'click',
            cd2: 'errored',
            cd6: err
          });
        });
    }, 10);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function checkExistence(id, file, populate) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (populate) {
            populateFileList(file);
          }
        } else if (xhr.status === 404) {
          storage.remove(id);
          if (storage.numFiles === 0) {
            toggleHeader();
          }
        }
      }
    };
    xhr.open('get', '/exists/' + id, true);
    xhr.send();
  }

  //update file table with current files in storage
  function populateFileList(file) {
    const row = document.createElement('tr');
    const name = document.createElement('td');
    const link = document.createElement('td');
    const $copyIcon = $('<img>', {
      src: '/resources/copy-16.svg',
      class: 'icon-copy',
      'data-l10n-id': 'copyUrlHover'
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

    $('#link').attr('value', url);
    $('#copy-text').attr('data-l10n-args', '{"filename": "' + file.name + '"}');
    $('#copy-text').attr('data-l10n-id', 'copyUrlFormLabelWithName');
    $popupText.attr('tabindex', '-1');

    name.appendChild(cellText);

    // create delete button

    const delSpan = document.createElement('span');
    $(delSpan).addClass('icon-cancel-1');
    $(delSpan).attr('data-l10n-id', 'deleteButtonHover');
    del.appendChild(delSpan);

    const linkSpan = document.createElement('span');
    $(linkSpan).addClass('icon-docs');
    $(linkSpan).attr('data-l10n-id', 'copyUrlHover');
    link.appendChild(linkSpan);

    link.style.color = '#0A8DFF';

    //copy link to clipboard when icon clicked
    $copyIcon.click(function() {
      // record copied event from upload list
      sendEvent('sender', 'copied', {
        cd4: 'upload-list'
      });
      const aux = document.createElement('input');
      aux.setAttribute('value', url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      document.l10n.formatValue('copiedUrl').then(translated => {
        link.innerHTML = translated;
      });
      window.setTimeout(() => {
        const linkImg = document.createElement('img');
        $(linkImg).addClass('icon-copy');
        $(linkImg).attr('data-l10n-id', 'copyUrlHover');
        $(linkImg).attr('src', '/resources/copy-16.svg');
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

    poll();

    function poll() {
      countdown = future.getTime() - Date.now();
      minutes = Math.floor(countdown / 1000 / 60);
      hours = Math.floor(minutes / 60);
      seconds = Math.floor(countdown / 1000 % 60);
      let t;

      if (hours >= 1) {
        expiry.innerHTML = hours + 'h ' + minutes % 60 + 'm';
        t = window.setTimeout(() => {
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
    }

    // create popup
    popupDiv.classList.add('popup');
    const $popupMessage = $('<div>', { class: 'popup-message' });
    $popupMessage.attr('data-l10n-id', 'deletePopupText');
    const $popupDelSpan = $('<span>', { class: 'popup-yes' });
    $popupDelSpan.attr('data-l10n-id', 'deletePopupYes');
    const $popupNvmSpan = $('<span>', { class: 'popup-no' });
    $popupNvmSpan.attr('data-l10n-id', 'deletePopupCancel');

    $popupText.html([$popupMessage, $popupDelSpan, $popupNvmSpan]);

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

    const unexpiredFiles = storage.numFiles;

    // delete file
    $popupText.find('.popup-yes').click(e => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        $(e.target).parents('tr').remove();
        const timeToExpiry =
          ONE_DAY_IN_MS - (Date.now() - file.creationDate.getTime());
        // record upload-deleted from file list
        sendEvent('sender', 'upload-deleted', {
          cm1: file.size,
          cm2: file.totalTime,
          cm3: file.uploadSpeed,
          cm4: timeToExpiry,
          cm5: storage.totalUploads,
          cm6: unexpiredFiles,
          cm7: storage.totalDownloads,
          cd1: file.typeOfUpload,
          cd4: 'upload-list'
        }).then(() => {
          storage.remove(file.fileId);
        });
        toggleHeader();
      });
    });

    document.getElementById('delete-file').onclick = () => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        const timeToExpiry =
          ONE_DAY_IN_MS - (Date.now() - file.creationDate.getTime());
        // record upload-deleted from success screen
        sendEvent('sender', 'upload-deleted', {
          cm1: file.size,
          cm2: file.totalTime,
          cm3: file.uploadSpeed,
          cm4: timeToExpiry,
          cm5: storage.totalUploads,
          cm6: unexpiredFiles,
          cm7: storage.totalDownloads,
          cd1: file.typeOfUpload,
          cd4: 'success-screen'
        }).then(() => {
          storage.remove(file.fileId);
          location.reload();
        });
      });
    };
    // show popup
    $delIcon.click(function() {
      $popupText.addClass('show');
      $popupText.focus();
    });
    // hide popup
    $popupText.find('.popup-no').click(function(e) {
      e.stopPropagation();
      $popupText.removeClass('show');
    });
    $popupText.click(function(e) {
      e.stopPropagation();
    });
    //close when popup loses focus
    $popupText.blur(() => {
      $popupText.removeClass('show');
    });

    toggleHeader();
  }
  function toggleHeader() {
    //hide table header if empty list
    if (document.querySelector('tbody').childNodes.length === 1) {
      $('#file-list').attr('hidden', true);
    } else {
      $('#file-list').removeAttr('hidden');
    }
  }
});
