export default function(state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    document.body.addEventListener('dragover', event => {
      if (state.route === '/') {
        event.preventDefault();
        // const files = document.querySelector('.uploadedFilesWrapper');
        // files.classList.add('uploadArea--noEvents');
      }
    });
    document.body.addEventListener('drop', event => {
      if (state.route === '/' && !state.uploading) {
        event.preventDefault();
        // document
        //   .querySelector('.uploadArea')
        //   .classList.remove('uploadArea--dragging');

        const files = Array.from(event.dataTransfer.files);

        emitter.emit('addFiles', { files });
      }
    });
  });
}
