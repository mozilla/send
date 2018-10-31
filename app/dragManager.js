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
        emitter.emit('addFiles', {
          files: Array.from(event.dataTransfer.files)
        });
      }
    });
  });
}
