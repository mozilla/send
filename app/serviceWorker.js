import Keychain from './keychain';

self.addEventListener('install', event => {
  self.skipWaiting();
});

async function decryptStream(request) {
  const response = await fetch(request.url, {
    method: 'GET',
    headers: { Authorization: self.auth }
  });

  if (response.status !== 200) {
    return response;
  }

  const body = response.body; //stream
  const decrypted = self.keychain.decryptStream(body);

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
  self.keychain = new Keychain(event.data.key, event.data.nonce);
  self.filename = event.data.filename;
  self.auth = event.data.auth;
};
