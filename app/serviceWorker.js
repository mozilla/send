import Keychain from './keychain';
import { downloadStream } from './api';
import { transform } from './streams';

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
    const keychain = new Keychain(file.key);

    file.download = downloadStream(id, keychain);

    const body = await file.download.result;

    const readStream = transform(body, {
      transform: (chunk, controller) => {
        file.progress += chunk.length;
        controller.enqueue(chunk);
      }
    });
    const decrypted = keychain.decryptStream(readStream);

    const headers = {
      'Content-Disposition': 'attachment; filename=' + file.filename,
      'Content-Type': file.type,
      'Content-Length': file.size
    };
    return new Response(decrypted, { headers });
  } catch (e) {
    if (noSave) {
      return new Response(null, { status: e.message });
    }

    const redirectRes = await fetch(`/download/${id}`);
    return new Response(redirectRes.body, { status: 302 });
  } finally {
    // TODO: need to clean up, but not break progress
    // map.delete(id)
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
      key: event.data.key,
      filename: event.data.filename,
      type: event.data.type,
      size: event.data.size,
      progress: 0,
      cancelled: false
    };
    if (event.data.requiresPassword) {
      info.password = event.data.password;
      info.url = event.data.url;
    }
    map.set(event.data.id, info);

    event.ports[0].postMessage('file info received');
  } else if (event.data.request === 'progress') {
    const file = map.get(event.data.id);
    if (!file) {
      event.ports[0].postMessage({ progress: 0 });
    } else if (file.cancelled) {
      event.ports[0].postMessage({ error: 'cancelled' });
    } else {
      event.ports[0].postMessage({ progress: file.progress });
    }
  } else if (event.data.request === 'cancel') {
    const file = map.get(event.data.id);
    if (file) {
      file.cancelled = true;
      if (file.download) {
        file.download.cancel();
      }
    }
    event.ports[0].postMessage('download cancelled');
  }
};
