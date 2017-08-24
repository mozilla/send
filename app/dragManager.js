export default function(state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    document.body.addEventListener('dragover', event => {
      if (state.route === '/') {
        event.preventDefault();
      }
    });
    document.body.addEventListener('drop', event => {
      if (state.route === '/' && !state.transfer) {
        event.preventDefault();
        document.querySelector('.upload-window').classList.remove('ondrag');
        const target = event.dataTransfer;
        if (target.files.length === 0) {
          return;
        }
        if (target.files.length > 1 || target.files[0].size === 0) {
          return alert(state.translate('uploadPageMultipleFilesAlert'));
        }
        const file = target.files[0];
        emitter.emit('upload', { file, type: 'drop' });
      }
    });
  });
}
