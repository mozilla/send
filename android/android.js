/* global window, document, fetch */

const MAXFILESIZE = 1024 * 1024 * 1024 * 2;

const EventEmitter = require('events');
const emitter = new EventEmitter();

const state = {
  storage: {
    files: [],
    remove: function(fileId) {
      console.log('REMOVE FILEID', fileId);
    },
    writeFile: function(file) {
      console.log('WRITEFILE', file);
    },
    addFile: function(file) {
      console.log('ADDFILE' + JSON.stringify(file));
      document.body.innerHTML = '';
      const node = document.createElement('input');
      node.id = 'url';
      node.value = file.url;
      const white = document.createElement('div');
      white.id = 'white';
      white.appendChild(node);
      const striped = document.createElement('div');
      striped.id = 'striped';
      striped.appendChild(white);
      const copy = document.createElement('button');
      copy.id = 'copy-button';
      copy.className = 'button';
      copy.textContent = 'Copy to clipboard';
      copy.onclick = function() {
        node.select();
        document.execCommand('copy');
        node.blur();
        copy.textContent = 'Copied!';
        setTimeout(function() {
          copy.textContent = 'Copy to clipboard';
        }, 2000);
      };
      white.appendChild(copy);
      const button = document.createElement('button');
      button.id = 'send-another';
      button.className = 'button';
      button.textContent = 'Send another file';
      button.onclick = function() {
        render();
      };
      white.appendChild(button);
      document.body.appendChild(striped);
    },
    totalUploads: 0
  },
  transfer: null,
  uploading: false,
  settingPassword: false,
  passwordSetError: null,
  route: '/'
};

function render() {
  document.body.innerHTML = '';
  const striped = document.createElement('div');
  striped.id = 'striped';
  const white = document.createElement('div');
  white.id = 'white';
  striped.appendChild(white);
  document.body.appendChild(striped);
  const label = document.createElement('label');
  label.id = 'label';
  label.htmlFor = 'input';
  label.textContent = 'Choose file';
  white.appendChild(label);
  const fileInput = document.createElement('input');
  fileInput.id = 'input';
  fileInput.type = 'file';
  fileInput.name = 'input';
  fileInput.onchange = function upload(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.files[0];
    if (file.size === 0) {
      return;
    }
    if (file.size > MAXFILESIZE) {
      console.log('file too big (no bigger than ' + MAXFILESIZE + ')');
      return;
    }

    emitter.emit('upload', { file: file, type: 'click' });
  };

  white.appendChild(fileInput);
}

emitter.on('render', function() {
  const node = document.createElement('div');
  node.textContent = 'onrender';
  document.body.appendChild(node);
});

emitter.on('pushState', function(path) {
  console.log('pushState ' + path + ' ' + JSON.stringify(state));
});

const fileManager = require('../app/fileManager').default;
try {
  fileManager(state, emitter);
} catch (e) {
  console.error('error' + e);
  console.error(e);
}

window.addEventListener(
  'message',
  event => {
    fetch(event.data)
      .then(res => res.blob())
      .then(blob => {
        emitter.emit('upload', { file: blob, type: 'share' });
      });
  },
  false
);

render();
