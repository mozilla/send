const FileSender = require('./fileSender');

let onChange = event => {
  const file = event.target.files[0];

  let fileList = document.getElementById("uploaded-files");
  let row = document.createElement("tr");
  let name = document.createElement("td");
  let link = document.createElement("td");
  let expiry = document.createElement("td");

  let cellText = document.createTextNode(file.name);

  name.appendChild(cellText);

  let progress = document.createElement("p");

  row.appendChild(name);
  row.appendChild(link);
  row.appendChild(expiry);
  fileList.appendChild(row);

  const fileSender = new FileSender(file);
  fileSender.on('progress', percentComplete => {
    progress.innerText = `Progress: ${percentComplete}%`;
  });
  fileSender.upload().then(info => {
    const url = `${window.location
      .origin}/download/${info.fileId}/#${info.secretKey}`;
    link.innerHTML = url;
    localStorage.setItem(info.fileId, info.deleteToken);
    let del = document.createElement("td");
    let btn = document.createElement("button");
    btn.innerHTML = "x";
    btn.classList.add('delete-btn');
    btn.addEventListener('click', () => {
      FileSender.delete(
        info.fileId,
        localStorage.getItem(info.fileId)
      ).then(() => {
        fileList.removeChild(row);
        localStorage.removeItem(info.fileId);
      });
    });
    del.appendChild(btn);
    row.appendChild(del);
  });
};

window.onChange = onChange;
