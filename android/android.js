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
      console.log('ADDFILE', file);
    },
    totalUploads: 0
  },
  transfer: null,
  uploading: false,
  settingPassword: false,
  passwordSetError: null,
  route: '/'
};

emitter.on('render', function() {
  const node = document.createElement('div');
  node.textContent = 'onrender';
  document.body.appendChild(node);
});

const fileManager = require('../app/fileManager').default;
try {
  fileManager(state, emitter);
} catch (e) {
  console.error('error' + e);
  console.error(e);
}

const fileInput = document.createElement('input');
fileInput.className = 'inputFile';
fileInput.type = 'file';
fileInput.name = 'fileUploaded';
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

  emitter.emit('upload', { file, type: 'click' });
};

document.body.appendChild(fileInput);

window.addEventListener(
  'message',
  event => {
    fetch(event.data)
      .then(res => res.blob())
      .then(file => {
        emitter.emit('upload', { file, type: 'share' });
      });
  },
  false
);
