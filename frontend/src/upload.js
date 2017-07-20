const FileSender = require('./fileSender');
const { notify, gcmCompliant, findMetric, isFile, ONE_DAY_IN_MS } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

if (!localStorage.hasOwnProperty('totalUploads')) {
  localStorage.setItem('totalUploads', 0);
}

if (localStorage.hasOwnProperty('referrer')) {
  window.referrer = localStorage.getItem('referrer');
  localStorage.removeItem('referrer');
} else {
  window.referrer = 'external';
}

$(document).ready(function() {
  if (!location.pathname.toString().includes('download')) {
    gcmCompliant()
      .catch(err => {
        $('#page-one').attr('hidden', true);
        $('#unsupported-browser').removeAttr('hidden');
        // record unsupported event
        window.analytics
              .sendEvent('sender', 'unsupported', {
                cd6: err
              });
    });

    $('#file-upload').change(onUpload);

    $('.legal-links a, .social-links a, #dl-firefox').click(function(target) {
      target.preventDefault();
      const metric = findMetric(target.currentTarget.href);
      // record exited event by recipient
      window.analytics
            .sendEvent('sender', 'exited', {
              cd3: metric
            })
            .then(() => {
              location.href = target.currentTarget.href;
            });
    })

    $('#send-new-completed').click(function(target) {
      target.preventDefault();
      // record restarted event 
      window.analytics
            .sendEvent('sender', 'restarted', {
              cd2: 'completed'
            })
            .then(() => {
              localStorage.setItem('referrer', 'completed-upload');
              location.href = target.currentTarget.href;
            });
    })

    $('#send-new-error').click(function(target) {
      target.preventDefault();
      // record restarted event
      window.analytics
            .sendEvent('sender', 'restarted', {
              cd2: 'errored'
            })
            .then(() => {
              localStorage.setItem('referrer', 'errored-upload');
              location.href = target.currentTarget.href;
            });
    })

    $('body').on('dragover', allowDrop).on('drop', onUpload);
    // reset copy button
    const $copyBtn = $('#copy-btn');
    $copyBtn.attr('disabled', false);
    $('#link').attr('disabled', false);
    $copyBtn.attr('data-l10n-id', 'copyUrlFormButton');

    if (localStorage.length === 0) {
      toggleHeader();
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        //check if file exists before adding to list
        checkExistence(id, true);
      }
    }

    // copy link to clipboard
    $copyBtn.click(() => {
      // record copied event from success screen
      window.analytics
            .sendEvent('sender', 'copied', {
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
      $copyBtn.html('<img src="/resources/check-16.svg" class="icon-check"></img>');
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
  }

  //link back to homepage
  $('.send-new').attr('href', window.location);

  // on file upload by browse or drag & drop
  function onUpload(event) {
    event.preventDefault();

    const totalUploads = localStorage.getItem('totalUploads');
    localStorage.setItem('totalUploads', Number(totalUploads) + 1);

    let file = '';
    if (event.type === 'drop') {
      if (event.originalEvent.dataTransfer.files.length > 1 || event.originalEvent.dataTransfer.files[0].size === 0){
        $('.upload-window').removeClass('ondrag');
        document.l10n.formatValue('uploadPageMultipleFilesAlert')
                     .then(str => {
                       alert(str);
                     });
        return;
      }
      file = event.originalEvent.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    $('#page-one').attr('hidden', true);
    $('#upload-error').attr('hidden', true);
    $('#upload-progress').removeAttr('hidden');
    //don't allow drag and drop when not on page-one
    $('body').off('drop', onUpload);
    const expiration = 24 * 60 * 60 * 1000; //will eventually come from a field

    const fileSender = new FileSender(file);
    $('#cancel-upload').click(() => {
      fileSender.cancel();
      location.reload();
      document.l10n.formatValue('uploadCancelNotification')
                   .then(str => {
                     notify(str);
                   });
      localStorage.setItem('referrer', 'cancelled-upload');
      
      // record upload-stopped (cancelled) by sender
      window.analytics
            .sendEvent('sender', 'upload-stopped', {
              cm1: file.size,
              cm5: localStorage.getItem('totalUploads'),
              cm6: unexpiredFiles,
              cm7: totalDownloads,
              cd1: event.type === 'drop' ? 'drop' : 'click',
              cd2: 'cancelled'
            });
    });

    fileSender.on('progress', progress => {
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#ul-progress').circleProgress('value', percent);
      $('#ul-progress').circleProgress().on('circle-animation-end', function() {
        $('.percent-number').html(`${Math.floor(percent * 100)}`);
      });
      if (progress[1] < 1000000) {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000).toFixed(1)}KB of ${(progress[1] / 1000).toFixed(1)}KB)`
        );
      } else if (progress[1] < 1000000000) {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000000).toFixed(1)}MB of ${(progress[1] / 1000000).toFixed(1)}MB)`
        );
      } else {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000000).toFixed(1)}MB of ${(progress[1] / 1000000000).toFixed(1)}GB)`
        );
      }
    });

    fileSender.on('loading', isStillLoading => {
      // The file is loading into Firefox at this stage
      if (isStillLoading) {
        console.log('Processing');
      } else {
        console.log('Finished processing');
      }
    });

    fileSender.on('hashing', isStillHashing => {
      // The file is being hashed
      if (isStillHashing) {
        console.log('Hashing');
      } else {
        console.log('Finished hashing');
      }
    });

    let uploadStart;
    fileSender.on('encrypting', isStillEncrypting => {
      // The file is being encrypted
      if (isStillEncrypting) {
        console.log('Encrypting');
      } else {
        console.log('Finished encrypting');
        uploadStart = new Date().getTime();
      }
    });

    let t;
    const startTime = new Date().getTime();

    let unexpiredFiles = 1;

    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      if (isFile(id)) {
          unexpiredFiles += 1;
      }
    }

    let totalDownloads = 0;
    if (localStorage.hasOwnProperty('totalDownloads')) {
      totalDownloads = localStorage.getItem('totalDownloads');
    }

    // record upload-started event by sender
    window.analytics
          .sendEvent('sender', 'upload-started', {
            cm1: file.size,
            cm5: localStorage.getItem('totalUploads'),
            cm6: unexpiredFiles,
            cm7: totalDownloads,
            cd1: event.type === 'drop' ? 'drop' : 'click',
            cd5: window.referrer
          });

    fileSender
      .upload()
      .then(info => {
        const endTime = new Date().getTime();
        const totalTime = endTime - startTime;
        const uploadTime = endTime - uploadStart;
        const uploadSpeed = file.size / (uploadTime / 1000);

        // record upload-stopped (completed) by sender
        window.analytics
              .sendEvent('sender', 'upload-stopped', {
                cm1: file.size,
                cm2: totalTime,
                cm3: uploadSpeed,
                cm5: localStorage.getItem('totalUploads'),
                cm6: unexpiredFiles,
                cm7: totalDownloads,
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

        localStorage.setItem(info.fileId, JSON.stringify(fileData));
        $('#upload-filename').attr('data-l10n-id', 'uploadSuccessConfirmHeader');
        t = window.setTimeout(() => {
          $('#page-one').attr('hidden', true);
          $('#upload-progress').attr('hidden', true);
          $('#upload-error').attr('hidden', true);
          $('#share-link').removeAttr('hidden');
        }, 1000);

        populateFileList(JSON.stringify(fileData));
        document.l10n.formatValue('notifyUploadDone')
                     .then(str => {
                       notify(str);
                     });
      })
      .catch(err => {
        Raven.captureException(err);
        console.log(err);
        $('#page-one').attr('hidden', true);
        $('#upload-progress').attr('hidden', true);
        $('#upload-error').removeAttr('hidden');
        window.clearTimeout(t);

        // record upload-stopped (errored) by sender
        window.analytics
              .sendEvent('sender', 'upload-stopped', {
                cm1: file.size,
                cm5: localStorage.getItem('totalUploads'),
                cm6: unexpiredFiles,
                cm7: totalDownloads,
                cd1: event.type === 'drop' ? 'drop' : 'click',
                cd2: 'errored',
                cd6: err
              });
      });
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function checkExistence(id, populate) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (populate) {
            populateFileList(localStorage.getItem(id));
          }
        } else if (xhr.status === 404) {
          if (isFile(id)) {
            localStorage.removeItem(id);
          }
        }
      }
    };
    xhr.open('get', '/exists/' + id, true);
    xhr.send();
  }

  //update file table with current files in localStorage
  function populateFileList(file) {
    try {
      file = JSON.parse(file);
    } catch (e) {
      return;
    }

    const row = document.createElement('tr');
    const name = document.createElement('td');
    const link = document.createElement('td');
    const $copyIcon = $('<img>', { src: '/resources/copy-16.svg', class: 'icon-copy', 'data-l10n-id': 'copyUrlHover'});
    const expiry = document.createElement('td');
    const del = document.createElement('td');
    const $delIcon = $('<img>', { src: '/resources/close-16.svg', class: 'icon-delete', 'data-l10n-id': 'deleteButtonHover' });
    const popupDiv = document.createElement('div');
    const $popupText = $('<div>', { class: 'popuptext' });
    const cellText = document.createTextNode(file.name);

    const url = file.url.trim() + `#${file.secretKey}`.trim();

    $('#link').attr('value', url);
    $('#copy-text').attr(
      'data-l10n-args',
      '{"filename": "' + file.name + '"}'
    );
    $('#copy-text').attr(
      'data-l10n-id',
      'copyUrlFormLabelWithName'
    );
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
      window.analytics
            .sendEvent('sender', 'copied', {
              cd4: 'upload-list'
            });
      const aux = document.createElement('input');
      aux.setAttribute('value', url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      document.l10n.formatValue('copiedUrl')
                   .then(translated => {
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
    countdown = future.getTime() - new Date().getTime();
    let minutes = Math.floor(countdown / 1000 / 60);
    let hours = Math.floor(minutes / 60);
    let seconds = Math.floor(countdown / 1000 % 60);

    poll();

    function poll() {
      countdown = future.getTime() - new Date().getTime();
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
        localStorage.removeItem(file.fileId);
        $(expiry).parents('tr').remove();
        window.clearTimeout(t);
        toggleHeader();
      }
    }

    // create popup
    popupDiv.classList.add('popup');
    const popupDelSpan = document.createElement('span');
    $(popupDelSpan).addClass('del-file');
    $(popupDelSpan).attr('data-l10n-id', 'sentFilesTitle4');

    const popupNvmSpan = document.createElement('span');
    $(popupNvmSpan).addClass('nvm');
    $(popupNvmSpan).attr('data-l10n-id', 'nevermindButton');

    $popupText.html([
      popupDelSpan,
      '&nbsp;',
      '&nbsp;',
      popupNvmSpan
    ]);

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

    let unexpiredFiles = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      if (isFile(id)) {
          unexpiredFiles += 1;
      }
    }

    let totalDownloads = 0;
    if (localStorage.hasOwnProperty('totalDownloads')) {
      totalDownloads = localStorage.getItem('totalDownloads');
    }

    // delete file
    $popupText.find('.del-file').click(e => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        $(e.target).parents('tr').remove();
        const timeToExpiry = ONE_DAY_IN_MS - (new Date().getTime() - file.creationDate.getTime());
        // record upload-deleted from file list
        window.analytics
              .sendEvent('sender', 'upload-deleted', {
                cm1: file.size,
                cm2: file.totalTime,
                cm3: file.uploadSpeed,
                cm4: timeToExpiry,
                cm5: localStorage.getItem('totalUploads'),
                cm6: unexpiredFiles,
                cm7: totalDownloads,
                cd1: file.typeOfUpload,
                cd4: 'upload-list'
              })
              .then(() => {
                localStorage.removeItem(file.fileId);
              })
        toggleHeader();
      });
    });

    document.getElementById('delete-file').onclick = () => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        const timeToExpiry = ONE_DAY_IN_MS - (new Date().getTime() - file.creationDate.getTime());
        // record upload-deleted from success screen
        window.analytics
              .sendEvent('sender', 'upload-deleted', {
                cm1: file.size,
                cm2: file.totalTime,
                cm3: file.uploadSpeed,
                cm4: timeToExpiry,
                cm5: localStorage.getItem('totalUploads'),
                cm6: unexpiredFiles,
                cm7: totalDownloads,
                cd1: file.typeOfUpload,
                cd4: 'success-screen'
              })
              .then(() => {
                localStorage.removeItem(file.fileId);
                location.reload();
              })
      });
    };
    // show popup
    $delIcon.click(function() {
      $popupText.addClass('show');
      $popupText.focus();
    });
    // hide popup
    $popupText.find('.nvm').click(function(e) {
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
