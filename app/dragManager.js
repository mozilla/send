/* global MAXFILESIZE */
const { bytes } = require('./utils');

export default function(state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    document.body.addEventListener('dragover', event => {
      if (state.route === '/') {
        event.preventDefault();
      }
    });
    document.body.addEventListener('drop', event => {
      if (state.route === '/' && !state.uploading) {
        event.preventDefault();
        document
          .querySelector('.uploadArea')
          .classList.remove('uploadArea--dragging');
        const target = event.dataTransfer;
        if (target.files.length === 0) {
          return;
        }
        if (target.files.length > 1) {
          return alert(state.translate('uploadPageMultipleFilesAlert'));
        }
        const file = target.files[0];
        if (file.size === 0) {
          return;
        }
        if (file.size > MAXFILESIZE) {
          window.alert(
            state.translate('fileTooBig', { size: bytes(MAXFILESIZE) })
          );
          return;
        }
        emitter.emit('upload', { file, type: 'drop' });
      }
    });
  });
}
