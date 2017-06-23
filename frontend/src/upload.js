const FileSender = require('./fileSender');
const { notify } = require('./utils');
const $ = require('jquery');

const Raven = window.Raven;

$(document).ready(function() {
  // reset copy button
  const $copyBtn = $('#copy-btn');
  $copyBtn.attr('disabled', false);
  $copyBtn.html('Copy');

  $('#page-one').show();
  $('#file-list').show();
  $('#upload-progress').hide();
  $('#share-link').hide();

  for(let i=0; i<localStorage.length; i++) {
    let id = localStorage.key(i);
    checkUploads(id);
  }

  // copy link to clipboard
  $copyBtn.click(() => {
    var aux = document.createElement('input');
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

    const fileSender = new FileSender(file);
    fileSender.on('progress', percentComplete => {
      $('#page-one').hide();
      $('#file-list').hide();
      $('#upload-progress').show();
      $('#upload-filename').innerHTML += file.name;
      // update progress bar
      document
        .querySelector('#progress-bar')
        .style.setProperty('--progress', percentComplete + '%');
      $('#progress-text').html(`${percentComplete}%`);

    });
    fileSender.upload().then(info => {
      const url = info.url.trim() + `#${info.secretKey}`.trim();
      $('#link').attr('value', url);

      localStorage.setItem(info.fileId, info.deleteToken);

      $('#page-one').hide();
      $('#file-list').hide();
      $('#upload-progress').hide();
      $('#share-link').show();

      checkUploads(info.fileId, url);
    });
  };

  window.allowDrop = function(ev) {
    ev.preventDefault();
  };

  //load previous uploads
  function checkUploads(id, url='') {
    return new Promise ((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(xhr.response);
        }
        else if (xhr.readyState == 4 && xhr.status == 404) {
          reject('error code: ' + xhr.status);
        }
      };
      xhr.onerror = () => {
        reject('There was a network error.');
      };
      xhr.open('get', '/file/' + id, true);
      xhr.send();
    }).then (response => {
      populateFileList(response, url);
    }, error => {
      console.log(error);
    });
  }

  //update file table with current files in localStorage
  function populateFileList(file, url) {
    console.log(file);
    const $fileList = $('#uploaded-files');
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
    const progress = document.createElement('p');

    name.appendChild(cellText);

    // create delete button
    btn.innerHTML = 'x';
    btn.classList.add('delete-btn');
    link.innerHTML = url;

    // create popup
    popupDiv.classList.add('popup');
    $popupText.html(
      '<span class="del-file">Delete</span><span class="nvm" > Nevermind</span>'
    );

    // delete file
    $popupText.find('.del-file').click(e => {
      FileSender.delete(
        file.fileId,
        localStorage.getItem(file.fileId)
      ).then(() => {
        $(e.target).parents('tr').remove();
        localStorage.removeItem(file.fileId);
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
    $popupText.find('.nvm').click(function(e){
      e.stopPropagation();
      toggleShow();
    });
    $popupText.click(function(e){
      e.stopPropagation();
    });

    $('tbody').append(row); //add row to table

    function toggleShow() {
      $popupText.toggleClass('show');
    }
  }

});
