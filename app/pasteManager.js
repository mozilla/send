export default function(state, emitter) {
  window.addEventListener('paste', event => {
    if (state.route !== '/' || state.uploading) return;

    for (const item of event.clipboardData.items) {
      if (!item.type.includes('image')) continue;

      const file = item.getAsFile();

      if (!file) continue; // Sometimes null

      emitter.emit('addFiles', { files: [file] });
    }
  });
}
