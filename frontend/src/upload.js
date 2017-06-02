const FileSender = require('./fileSender');

let onChange = event => {
  const file = event.target.files[0];

  let li = document.createElement('li');
  let name = document.createElement('p');
  name.innerText = file.name;
  li.appendChild(name);

  let link = document.createElement('a');
  li.appendChild(link);

  let progress = document.createElement('p');
  li.appendChild(progress);

  document.getElementById('uploaded_files').appendChild(li);

  const fileSender = new FileSender(file);
  fileSender.on('progress', percentComplete => {
    progress.innerText = `Progress: ${percentComplete}%`;
  });
  fileSender.upload().then(info => {
    const url = `${window.location.origin}/${info.fileId}/#${info.secretKey}`;
    localStorage.setItem(info.fileId, info.deleteToken);
    link.innerText = url;
    link.setAttribute('href', url);
    let btn = document.createElement('button');
    btn.innerText = 'Delete from server';
    btn.addEventListener('click', () => {
      FileSender.delete(
        info.fileId,
        localStorage.getItem(info.fileId)
      ).then(() => {
        document.getElementById('uploaded_files').removeChild(li);
        localStorage.removeItem(info.fileId);
      });
    });
    li.appendChild(btn);
  });
};

window.onChange = onChange;
