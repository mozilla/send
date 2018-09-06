const html = require('choo/html');

export default function mainPage(state, emit) {
  if (window.location.pathname === '/android/app/src/main/assets/') {
    // Hack: For debugging the android app in a web browser from
    // http://0.0.0.0:8080/android/app/src/main/assets/ after running webpack
    state.prefix = '/android/app/src/main/assets';
  }
  function clickPreferences(event) {
    event.preventDefault();
    emit('pushState', '/preferences');
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
  return html`<body>
  <div id="white">
    <div id="centering">
      <a href="#" onclick=${clickPreferences}>
      preferenes
      </a>
      <img src=${state.getAsset('encrypted-envelope.png')} />
      <h4>Private, Encrypted File Sharing</h4>
      <div>
        Send files through a safe, private, and encrypted link that automatically expires to ensure your stuff does not remain online forever.
      </div>
      <div id="spacer">
      </div>
      <label id="label" for="input">
        <img src=${state.getAsset('cloud-upload.png')} />
      </label>
      <input id="input" name="input" type="file" onchange=${uploadFile} />
    </div>
  </div>
</body>`;
}
