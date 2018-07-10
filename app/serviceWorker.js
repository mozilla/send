import Keychain from './keychain';

self.addEventListener('install', event => {
  self.skipWaiting();
});

async function decryptStream(request) {
  self.controller = new AbortController();
  //console.log('SW INTERCEPTED DOWNLOAD');

  const response = await fetch(request.url, {
    method: 'GET',
    headers: { Authorization: self.auth },
    signal: controller.signal
  });

  if (response.status !== 200) {
    return response;
  }

  self.authHeader = response.headers.get('WWW-Authenticate');

  const body = response.body; //stream

  const progStream = new TransformStream({
    transform: (chunk, controller) => {
      self.progress += chunk.length;
      controller.enqueue(chunk);
    }
  });

  const decrypted = self.keychain.decryptStream(body.pipeThrough(progStream));

  const headers = {
    headers: {
      'Content-Disposition': 'attachment; filename=' + self.filename
    }
  };

  const newRes = new Response(decrypted, headers);
  return newRes;
}

self.onfetch = event => {
  const req = event.request.clone();
  if (req.url.includes('/api/download')) {
    event.respondWith(decryptStream(req));
  }
};

self.onmessage = event => {
  if (event.data.key) {
    self.keychain = new Keychain(event.data.key, event.data.nonce);
    self.filename = event.data.filename;
    self.auth = event.data.auth;
    self.progress = 0;
    self.cancelled = false;
    event.ports[0].postMessage('file info received');
  } else if (event.data === 'progress') {
    if (self.cancelled) {
      event.ports[0].postMessage({ error: 'cancelled' });
    } else {
      event.ports[0].postMessage(self.progress);
    }
  } else if (event.data === 'authHeader') {
    event.ports[0].postMessage(self.authHeader);
  } else if (event.data === 'cancel') {
    self.cancelled = true;
    if (self.controller) {
      self.controller.abort();
    }
    event.ports[0].postMessage('download cancelled');
  }
};
