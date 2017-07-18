const FileSender = require('./fileSender');
const { notify, gcmCompliant } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

$(document).ready(function() {
  gcmCompliant().catch(err => {
    $('#page-one').hide();
    $('#unsupported-browser').show();
  });

  $('#file-upload').change(onUpload);
  $('body').on('dragover', allowDrop).on('drop', onUpload);
  // reset copy button
  const $copyBtn = $('#copy-btn');
  $copyBtn.attr('disabled', false);
  $('#link').attr('disabled', false);
  $copyBtn.html('Copy to Clipboard');

  $('#upload-progress').hide();
  $('#share-link').hide();
  $('#upload-error').hide();
  $('#unsupported-browser').hide();
  $('#compliance-error').hide();
  $('#page-one').show();

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
    const aux = document.createElement('input');
    aux.setAttribute('value', $('#link').attr('value'));
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    //disable button for 3s
    $copyBtn.attr('disabled', true);
    $('#link').attr('disabled', true);
    $copyBtn.html('<span class="icon-check"></span>');
    window.setTimeout(() => {
      $copyBtn.attr('disabled', false);
      $('#link').attr('disabled', false);
      $copyBtn.html('Copy to Clipboard');
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
    size: 158
  });
  //link back to homepage
  $('.send-new').attr('href', window.location);

  // on file upload by browse or drag & drop
  function onUpload(event) {
    event.preventDefault();
    let file = '';
    if (event.type === 'drop') {
      file = event.originalEvent.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }
    const expiration = 24 * 60 * 60 * 1000; //will eventually come from a field

    const fileSender = new FileSender(file);
    $('#cancel-upload').click(() => {
      fileSender.cancel();
      location.reload();
      notify('Your upload was cancelled.');
    });

    fileSender.on('progress', progress => {
      $('#page-one').hide();
      $('#upload-error').hide();
      $('#upload-progress').show();
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#ul-progress').circleProgress('value', percent);
      $('#ul-progress').circleProgress().on('circle-animation-end', function() {
        $('.percent-number').html(`${Math.floor(percent * 100)}`);
      });
      if (progress[1] < 1000000) {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000).toFixed(
            1
          )}KB of ${(progress[1] / 1000).toFixed(1)}KB)`
        );
      } else if (progress[1] < 1000000000) {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000000).toFixed(
            1
          )}MB of ${(progress[1] / 1000000).toFixed(1)}MB)`
        );
      } else {
        $('.progress-text').text(
          `${file.name} (${(progress[0] / 1000000).toFixed(
            1
          )}MB of ${(progress[1] / 1000000000).toFixed(1)}GB)`
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

    fileSender.on('encrypting', isStillEncrypting => {
      // The file is being encrypted
      if (isStillEncrypting) {
        console.log('Encrypting');
      } else {
        console.log('Finished encrypting');
      }
    });
    let t = '';
    fileSender
      .upload()
      .then(info => {
        const fileData = {
          name: file.name,
          fileId: info.fileId,
          url: info.url,
          secretKey: info.secretKey,
          deleteToken: info.deleteToken,
          creationDate: new Date(),
          expiry: expiration
        };
        localStorage.setItem(info.fileId, JSON.stringify(fileData));
        $('#upload-filename').html('Ready to Send');
        t = window.setTimeout(() => {
          $('#page-one').hide();
          $('#upload-progress').hide();
          $('#upload-error').hide();
          $('#share-link').show();
        }, 2000);

        populateFileList(JSON.stringify(fileData));
        notify('Your upload has finished.');
      })
      .catch(err => {
        Raven.captureException(err);
        console.log(err);
        $('#page-one').hide();
        $('#upload-progress').hide();
        $('#upload-error').show();
        window.clearTimeout(t);
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
          localStorage.removeItem(id);
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
    const expiry = document.createElement('td');
    const del = document.createElement('td');
    const popupDiv = document.createElement('div');
    const $popupText = $('<div>', { class: 'popuptext' });
    const cellText = document.createTextNode(file.name);

    const url = file.url.trim() + `#${file.secretKey}`.trim();
    $('#link').attr('value', url);
    $('#copy-text').text(
      'Copy and share the link to send your file: ' + file.name
    );
    $popupText.attr('tabindex', '-1');

    name.appendChild(cellText);

    // create delete button
    del.innerHTML = '<span class="icon-cancel-1" title="Delete"></span>';

    link.innerHTML = '<span class="icon-docs" title="Copy URL"></span>';
    link.style.color = '#0A8DFF';
    //copy link to clipboard when icon clicked
    $(link).click(function() {
      const aux = document.createElement('input');
      aux.setAttribute('value', url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      link.innerHTML = 'Copied!';
      window.setTimeout(() => {
        link.innerHTML = '<span class="icon-docs" title="Copy URL"></span>';
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
    $popupText.html(
      '<span class="del-file">Delete</span><span class="nvm" > Nevermind</span>'
    );

    // delete file
    $popupText.find('.del-file').click(e => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        $(e.target).parents('tr').remove();
        localStorage.removeItem(file.fileId);
        toggleHeader();
      });
    });
    document.getElementById('delete-file').onclick = () => {
      FileSender.delete(file.fileId, file.deleteToken).then(() => {
        localStorage.removeItem(file.fileId);
        location.reload();
      });
    };

    // add data cells to table row
    row.appendChild(name);
    row.appendChild(link);
    row.appendChild(expiry);
    $(popupDiv).append($popupText);
    del.appendChild(popupDiv);
    row.appendChild(del);

    // show popup
    del.addEventListener('click', function() {
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
    $('tbody').append(row); //add row to table

    toggleHeader();
  }
  function toggleHeader() {
    //hide table header if empty list
    if (document.querySelector('tbody').childNodes.length === 1) {
      $('#file-list').hide();
    } else {
      $('#file-list').show();
    }
  }
});
