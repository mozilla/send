const FileSender = require('./fileSender');
const { notify } = require('./utils')
const $ = require('jquery');

$(document).ready(function() {
  // reset copy button
  const copyBtn = $('#copy-btn');
  copyBtn.attr('disabled', false);
  copyBtn.html('Copy');

  $('#page-one').show();
  $('#file-list').hide();
  $('#upload-progress').hide();
  $('#share-link').hide();

  // copy link to clipboard
  copyBtn.click(() => {
    const aux = document.createElement('input');
    aux.setAttribute('value', $('#link').attr('value'));
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    copyBtn.attr('disabled', true);
    copyBtn.html('Copied!');
  });

  // link back to home page
  $('.send-new').click(() => {
    $('#page-one').show();
    $('#file-list').show();
    $('#upload-progress').hide();
    $('#share-link').hide();
    copyBtn.attr('disabled', false);
    copyBtn.html('Copy');
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
    const $fileList = $('#uploaded-files');
    const row = document.createElement('tr');
    const name = document.createElement('td');
    const link = document.createElement('td');
    const expiry = document.createElement('td');
    const del = document.createElement('td');
    const btn = document.createElement('button');
    const popupDiv = document.createElement('div');
    const $popupText = $('<span>', { class: 'popuptext' });
    const cellText = document.createTextNode(file.name);
    const progress = document.createElement('p');

    name.appendChild(cellText);

    // create delete button
    btn.innerHTML = 'x';
    btn.classList.add('delete-btn');

    // create popup
    popupDiv.classList.add('popup');
    $popupText.html(
      '<span class="del-file">Delete</span><span class="nvm" > Nevermind</span>'
    );

    // add data cells to table row
    row.appendChild(name);
    row.appendChild(link);
    row.appendChild(expiry);
    popupDiv.appendChild(btn);
    $(popupDiv).append($popupText);
    del.appendChild(popupDiv);
    row.appendChild(del);
    $fileList.append(row); //add row to table

    const fileSender = new FileSender(file);
    fileSender.on('progress', percentComplete => {
      $('#page-one').hide();
      $('#file-list').hide();
      $('#upload-progress').show();
      $('#upload-filename').innerHTML += file.name;
      progress.innerText = `Progress: ${percentComplete}%`;
      if (percentComplete === 100) {
        notify('Your upload has finished.');
      }
    });
    fileSender.upload().then(info => {
      const url = info.url.trim() + `#${info.secretKey}`.trim();
      $('#link').attr('value', url);
      link.innerHTML = url;
      localStorage.setItem(info.fileId, info.deleteToken);

      // delete file
      $popupText.find('.del-file').click(e => {
        FileSender.delete(
          info.fileId,
          localStorage.getItem(info.fileId)
        ).then(() => {
          //
          $(e.target).parents('tr').remove();
          localStorage.removeItem(info.fileId);
        });
      });

      // show popup
      btn.addEventListener('click', toggleShow);
      // hide popup
      $popupText.find('.nvm').click(toggleShow);
      $('#upload-progress').hide();
      $('#share-link').show();
    });

    function toggleShow() {
      $popupText.toggleClass('show');
    }
  };

  window.allowDrop = function(ev) {
    ev.preventDefault();
  };
});
