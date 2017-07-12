const FileSender = require('./fileSender');
const { notify, gcmCompliant } = require('./utils');
const $ = require('jquery');

const Raven = window.Raven;

$(document).ready(function() {
  gcmCompliant().catch(err => {
    $('#page-one').hide();
    $('#compliance-error').show();
  });

  // reset copy button
  const $copyBtn = $('#copy-btn');
  $copyBtn.attr('disabled', false);
  $copyBtn.html('Copy');

  $('#page-one').show();
  $('#file-list').show();
  $('#upload-progress').hide();
  $('#share-link').hide();
  $('#upload-error').hide();
  $('#compliance-error').hide();

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
    $copyBtn.html('Copied!');
    window.setTimeout(() => {
      $copyBtn.attr('disabled', false);
      $copyBtn.html('Copy');
    }, 3000);
  });

  // link back to home page
  $('.send-new').click(() => {
    $('#page-one').show();
    $('#file-list').show();
    $('#upload-progress').hide();
    $('#share-link').hide();
    $('#upload-error').hide();
    $copyBtn.attr('disabled', false);
    $copyBtn.html('Copy');
  });

  // on file upload by browse or drag & drop
  window.onUpload = event => {
    event.preventDefault();
    let file = '';
    if (event.type === 'drop') {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }
    const expiration = 24 * 60 * 60 * 1000; //will eventually come from a field

    const fileSender = new FileSender(file);
    fileSender.on('progress', percentComplete => {
      $('#page-one').hide();
      $('#file-list').hide();
      $('#upload-progress').show();
      $('#upload-error').hide();
      $('#upload-filename').innerHTML += file.name;
      // update progress bar
      document
        .querySelector('#progress-bar')
        .style.setProperty('--progress', percentComplete + '%');
      $('#progress-text').html(`${percentComplete}%`);
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

    fileSender
      .upload()
      .then(info => {
        const url = info.url.trim() + `#${info.secretKey}`.trim();
        $('#link').attr('value', url);
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

        $('#page-one').hide();
        $('#file-list').hide();
        $('#upload-progress').hide();
        $('#share-link').show();
        $('#upload-error').hide();

        populateFileList(JSON.stringify(fileData));
        notify('Your upload has finished.');
      })
      .catch(err => {
        Raven.captureException(err);
        console.log(err);
        $('#page-one').hide();
        $('#upload-error').show();
      });
  };

  window.allowDrop = function(ev) {
    ev.preventDefault();
  };

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
    del.setAttribute('align', 'center');
    const btn = document.createElement('button');
    const popupDiv = document.createElement('div');
    const $popupText = $('<span>', { class: 'popuptext' });
    const cellText = document.createTextNode(file.name);

    name.appendChild(cellText);

    // create delete button
    btn.innerHTML = 'x';
    btn.classList.add('delete-btn');

    link.innerHTML = file.url.trim() + `#${file.secretKey}`.trim();

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

      if (hours > 1) {
        expiry.innerHTML = hours + 'h';
        t = window.setTimeout(() => {
          poll();
        }, 3600000);
      } else if (hours === 1) {
        expiry.innerHTML = hours + 'h';
        t = window.setTimeout(() => {
          poll();
        }, 60000);
      } else if (hours === 0) {
        expiry.innerHTML = minutes + 'm' + seconds + 's';
        t = window.setTimeout(() => {
          poll();
        }, 1000);
      }
      //remove from list when expired
      if (countdown <= 0) {
        localStorage.removeItem(file.fileId);
        $(expiry).parents('tr').remove();
        window.clearTimeout(t);
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

    // add data cells to table row
    row.appendChild(name);
    row.appendChild(link);
    row.appendChild(expiry);
    popupDiv.appendChild(btn);
    $(popupDiv).append($popupText);
    del.appendChild(popupDiv);
    row.appendChild(del);

    // show popup
    del.addEventListener('click', toggleShow);
    // hide popup
    $popupText.find('.nvm').click(function(e) {
      e.stopPropagation();
      toggleShow();
    });
    $popupText.click(function(e) {
      e.stopPropagation();
    });

    $('tbody').append(row); //add row to table

    function toggleShow() {
      $popupText.toggleClass('show');
    }
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
