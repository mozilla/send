const FileSender = require('./fileSender');

let onChange = event => {
  const file = event.target.files[0];

  var row = document.createElement("tr");
  var name = document.createElement("td");
  var link = document.createElement("td");
  var expiry = document.createElement("td");

  var cellText = document.createTextNode(file.name);

  name.appendChild(cellText);

  var progress = document.createElement("p");

  row.appendChild(name);
  row.appendChild(link);
  row.appendChild(expiry);
  document.getElementById("uploaded-files").appendChild(row);

  const fileSender = new FileSender(file);
  fileSender.on('progress', percentComplete => {
    progress.innerText = `Progress: ${percentComplete}%`;
  });
  fileSender.upload().then(info => {
    const url = `${window.location
      .origin}/download/${info.fileId}/#${info.secretKey}`;
    localStorage.setItem(info.fileId, info.deleteToken);
    var del = document.createElement("td");
    var btn = document.createElement("button");
    btn.innerHTML = "x";
    btn.style = "padding: 0; border: none; background: none; cursor: pointer"
    btn.addEventListener('click', () => {
      FileSender.delete(
        info.fileId,
        localStorage.getItem(info.fileId)
      ).then(() => {
        document.getElementById('uploaded-files').removeChild(row);
        localStorage.removeItem(info.fileId);
      });
    });
    del.appendChild(btn);
    row.appendChild(del);
  });
};

window.onChange = onChange;
