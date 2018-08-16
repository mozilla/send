const html = require('choo/html');

export default function uploadComplete(state, emit) {
  const file = state.storage.files[state.storage.files.length - 1];
  function onclick(e) {
    e.preventDefault();
    input.select();
    document.execCommand('copy');
    input.selectionEnd = input.selectionStart;
    copyText.textContent = 'Copied!';
    setTimeout(function() {
      copyText.textContent = 'Copy link';
    }, 2000);
  }

  function uploadFile(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.files[0];
    if (file.size === 0) {
      return;
    }

    emit('pushState', '/upload');
    emit('addFiles', { files: [file] });
    emit('upload', {});
  }

  const input = html`<input id="url" value=${file.url} readonly="true" />`;
  const copyText = html`<span>Copy link</span>`;
  return html`<body>
  <div id="white">
    <div class="card">
      <div>The card contents will be here.</div>
      <div>Expires after: <span class="expires-after">exp</span></div>
      ${input}
      <div id="copy-link" onclick=${onclick}>
        <img id="copy-image" src=${state.getAsset('copy-link.png')} />
        ${copyText}
      </div>
      <label id="label" for="input">
        <img src=${state.getAsset('cloud-upload.png')} />
      </label>
      <input id="input" name="input" type="file" onchange=${uploadFile} />
  </div>
</body>`;
}
