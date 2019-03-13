/* eslint-disable no-console */

// TODO rename this file to content-page-bridge
export default function content_page_bridge(state, emitter) {
  window.addEventListener(
    'message',
    event => {
      console.error('got messageggggg', JSON.stringify(event.data));
      if (event.data.cmd === 'incomingShare') {
        fetch(event.data.url)
          .then(res => res.blob())
          .then(blob => {
            emitter.emit('addFiles', { files: [blob] });
            emitter.emit('upload', {});
          })
          .catch(e => console.error('ERROR ' + e + ' ' + e.stack));
      }
      if (event.data.cmd === 'finishLogin') {
        // hack: keys is supposed to be a json string, but I don't want to double
        // quote json in kotlin, so I'll turn it into a string here
        event.data.keys = JSON.stringify(event.data.keys);
        window.finishLogin(event.data);
      }
    },
    false
  );
}
