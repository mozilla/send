const FileSender = require('./fileSender');

$(document).ready(function() {
  let copyBtn = $('#copy-btn');
  copyBtn.attr('disabled', false);
  copyBtn.html('Copy');
  $('#page-one').show();
  $('#file-list').hide();
  $('#upload-progress').hide();
  $('#share-link').hide();

  copyBtn.click(() => {
    console.log('copied');
    var aux = document.createElement('input');
    aux.setAttribute('value', $('#link').attr('value'));
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    copyBtn.attr('disabled', true);
    copyBtn.html('Copied!');
  });
  $('.send-new').click(() => {
    $('#page-one').show();
    $('#file-list').show();
    $('#upload-progress').hide();
    $('#share-link').hide();
    copyBtn.attr('disabled', false);
    copyBtn.html('Copy');
  });

  let onChange = event => {
    const file = event.target.files[0];

    let fileList = $('#uploaded-files');
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let link = document.createElement('td');
    let expiry = document.createElement('td');

    let cellText = document.createTextNode(file.name);

    name.appendChild(cellText);

    let progress = document.createElement('p');

    row.appendChild(name);
    row.appendChild(link);
    row.appendChild(expiry);
    fileList.append(row);

    const fileSender = new FileSender(file);
    fileSender.on('progress', percentComplete => {
      $('#page-one').hide();
      $('#file-list').hide();
      $('#upload-progress').show();
      $('#upload-filename').innerHTML += file.name;
      progress.innerText = `Progress: ${percentComplete}%`;
    });
    fileSender.upload().then(info => {
      const url = `${window.location
        .origin}/download/${info.fileId}/#${info.secretKey}`;
      $('#link').attr('value', url);
      link.innerHTML = url;
      localStorage.setItem(info.fileId, info.deleteToken);
      let del = document.createElement('td');
      let btn = document.createElement('button');
      btn.innerHTML = 'x';
      btn.classList.add('delete-btn');
      btn.addEventListener('click', e => {
        FileSender.delete(
          info.fileId,
          localStorage.getItem(info.fileId)
        ).then(() => {
          e.target.parentNode.parentNode.remove();
          localStorage.removeItem(info.fileId);
        });
      });
      del.appendChild(btn);
      row.appendChild(del);
      $('#upload-progress').hide();
      $('#share-link').show();
    });
  };

  window.onChange = onChange;
});
