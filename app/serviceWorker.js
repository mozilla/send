import Keychain from './keychain';
import { downloadStream } from './api';
import { transformStream } from './streams';
import Zip from './zip';
import contentDisposition from 'content-disposition';

let noSave = false;
const map = new Map();

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

async function decryptStream(id) {
  const file = map.get(id);
  if (!file) {
    return new Response(null, { status: 400 });
  }
  try {
    let size = file.size;
    let type = file.type;
    const keychain = new Keychain(file.key, file.nonce);
    if (file.requiresPassword) {
      keychain.setPassword(file.password, file.url);
    }

    file.download = downloadStream(id, keychain);

    const body = await file.download.result;

    const decrypted = keychain.decryptStream(body);

    let zipStream = null;
    if (file.type === 'send-archive') {
      const zip = new Zip(file.manifest, decrypted);
      zipStream = zip.stream;
      type = 'application/zip';
      size = zip.size;
    }
    const readStream = transformStream(
      zipStream || decrypted,
      {
        transform(chunk, controller) {
          file.progress += chunk.length;
          controller.enqueue(chunk);
        }
      },
      function oncancel() {
        // NOTE: cancel doesn't currently fire on chrome
        // https://bugs.chromium.org/p/chromium/issues/detail?id=638494
        file.download.cancel();
        map.delete(id);
      }
    );

    const headers = {
      'Content-Disposition': contentDisposition(file.filename),
      'Content-Type': type,
      'Content-Length': size
    };
    return new Response(readStream, { headers });
  } catch (e) {
    if (noSave) {
      return new Response(null, { status: e.message });
    }

    const redirectRes = await fetch(`/download/${id}`);
    return new Response(redirectRes.body, { status: 302 });
  }
}

self.onfetch = event => {
  const req = event.request;
  if (/\/api\/download\/[A-Fa-f0-9]{4,}/.test(req.url)) {
    const id = req.url.split('/')[5];
    event.respondWith(decryptStream(id));
  }
};

self.onmessage = event => {
  if (event.data.request === 'init') {
    noSave = event.data.noSave;
    const info = {
      key: event.data.key,
      nonce: event.data.nonce,
      filename: event.data.filename,
      requiresPassword: event.data.requiresPassword,
      password: event.data.password,
      url: event.data.url,
      type: event.data.type,
      manifest: event.data.manifest,
      size: event.data.size,
      progress: 0
    };
    map.set(event.data.id, info);

    event.ports[0].postMessage('file info received');
  } else if (event.data.request === 'progress') {
    const file = map.get(event.data.id);
    if (!file) {
      event.ports[0].postMessage({ error: 'cancelled' });
    } else {
      if (file.progress === file.size) {
        map.delete(event.data.id);
      }
      event.ports[0].postMessage({ progress: file.progress });
    }
  } else if (event.data.request === 'cancel') {
    const file = map.get(event.data.id);
    if (file) {
      if (file.download) {
        file.download.cancel();
      }
      map.delete(event.data.id);
    }
    event.ports[0].postMessage('download cancelled');
  }
};
