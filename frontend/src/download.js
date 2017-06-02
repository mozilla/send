const FileReceiver = require('./fileReceiver');

let download = () => {
  const fileReceiver = new FileReceiver();

  let li = document.createElement('li');
  let name = document.createElement('p');
  li.appendChild(name);
  let progress = document.createElement('p');
  li.appendChild(progress);

  document.getElementById('downloaded_files').appendChild(li);

  fileReceiver.on('progress', percentComplete => {
    progress.innerText = `Progress: ${percentComplete}%`;

    if (percentComplete === 100) {
      fileReceiver.removeAllListeners('progress');

      let finished = document.createElement('p');
      finished.innerText = 'Your download has finished.';
      li.appendChild(finished);

      let close = document.createElement('button');
      close.innerText = 'Ok';
      close.addEventListener('click', () => {
        document.getElementById('downloaded_files').removeChild(li);
      });
      li.appendChild(close);
    }
  });

  fileReceiver.download()
  .catch((err) => {
    console.log('The file has expired, or has already been deleted.');
    document.getElementById('downloaded_files').removeChild(li);
    return;
  })
  .then(([decrypted, fname]) => {
    name.innerText = fname;
    let dataView = new DataView(decrypted);
    let blob = new Blob([dataView]);
    let downloadUrl = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
  });
};

window.download = download;
