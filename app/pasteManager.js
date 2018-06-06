/* global MAXFILESIZE */
import { bytes } from './utils';

export default function(state, emitter) {
  window.addEventListener('paste', event => {
    if (state.route !== '/' || state.uploading) return;

    for (const item of event.clipboardData.items) {
      if (!item.type.includes('image')) continue;

      const file = item.getAsFile();

      if (!file) continue; // Sometimes null

      if (file.size > MAXFILESIZE) {
        // eslint-disable-next-line no-alert
        alert(state.translate('fileTooBig', { size: bytes(MAXFILESIZE) }));
        continue;
      }

      emitter.emit('upload', { file, type: 'paste' });
    }
  });
}
