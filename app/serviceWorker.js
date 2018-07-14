import Keychain from './keychain';
import { downloadStream } from './api';
import TransformStream from './transformStream';

let noSave = false;
const map = new Map();

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

async function decryptStream(request) {
  const id = request.url.split('/')[5];
  try {
    const file = map.get(id);

    file.download = downloadStream(id, file.keychain);

    const stream = await file.download.result;

    // eslint-disable-next-line no-undef
    const progStream = new TransformStream({
      transform: (chunk, controller) => {
        file.progress += chunk.length;
        controller.enqueue(chunk);
      }
    });

    const readStream = stream.pipeThrough(progStream);
    const decrypted = file.keychain.decryptStream(readStream);

    const headers = {
      'Content-Disposition': 'attachment; filename=' + file.filename,
      'Content-Type': file.type,
      'Content-Length': file.size
    };
    const body = decrypted.local ? decrypted.nativeReadable : decrypted;
    return new Response(body, { headers });
  } catch (e) {
    if (noSave) {
      return new Response(null, { status: e.message });
    }

    const redirectRes = await fetch(`/download/${id}`);
    return new Response(redirectRes.body, { status: 302 });
  }
}

self.onfetch = event => {
  const req = event.request.clone();
  if (req.url.includes('/api/download')) {
    event.respondWith(decryptStream(req));
  }
};

self.onmessage = event => {
  if (event.data.request === 'init') {
    noSave = event.data.noSave;
    const info = {
      keychain: new Keychain(event.data.key),
      filename: event.data.filename,
      type: event.data.type,
      size: event.data.size,
      progress: 0,
      cancelled: false
    };
    if (event.data.requiresPassword) {
      info.keychain.setPassword(event.data.password, event.data.url);
    }
    map.set(event.data.id, info);

    event.ports[0].postMessage('file info received');
  } else if (event.data.request === 'progress') {
    const file = map.get(event.data.id);
    if (file.cancelled) {
      event.ports[0].postMessage({ error: 'cancelled' });
    } else {
      event.ports[0].postMessage({ progress: file.progress });
    }
  } else if (event.data.request === 'cancel') {
    const file = map.get(event.data.id);
    file.cancelled = true;
    if (file.download) {
      file.download.cancel();
    }
    event.ports[0].postMessage('download cancelled');
  }
};
