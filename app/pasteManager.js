function getString(item) {
  return new Promise(resolve => {
    item.getAsString(resolve);
  });
}

export default function(state, emitter) {
  window.addEventListener('paste', async event => {
    if (state.route !== '/' || state.uploading) return;
    if (['password', 'text'].includes(event.target.type)) return;

    const items = Array.from(event.clipboardData.items);
    const transferFiles = items.filter(item => item.kind === 'file');
    const strings = items.filter(item => item.kind === 'string');
    if (transferFiles.length) {
      const promises = transferFiles.map(async (f, i) => {
        const blob = f.getAsFile();
        if (!blob) {
          return null;
        }
        const name = await getString(strings[i]);
        const file = new File([blob], name, { type: blob.type });
        return file;
      });
      const files = (await Promise.all(promises)).filter(f => !!f);
      if (files.length) {
        emitter.emit('addFiles', { files });
      }
    } else if (strings.length) {
      strings[0].getAsString(s => {
        const file = new File([s], 'pasted.txt', { type: 'text/plain' });
        emitter.emit('addFiles', { files: [file] });
      });
    }
  });
}
