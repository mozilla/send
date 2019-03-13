/* eslint-disable no-console */

export default function intentHandler(state, emitter) {
  window.addEventListener(
    'message',
    event => {
      console.error('got message', event.data);
      if (event.data.cmd === 'incomingShare') {
        fetch(event.data.url)
          .then(res => res.blob())
          .then(blob => {
            emitter.emit('addFiles', { files: [blob] });
            emitter.emit('upload', {});
          })
          .catch(e => console.error('ERROR ' + e + ' ' + e.stack));
      }
    },
    false
  );
}
