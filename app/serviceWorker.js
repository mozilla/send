import Keychain from './keychain';

self.addEventListener('install', (event) => {
  console.log("install event on sw")
  self.skipWaiting();
});

async function decryptStream(request) {
  console.log("DOWNLOAD FETCH")
  //make actual request to server, get response back, decrypt it, send it
  const response = await fetch(req, 
    {
      method: 'GET',
      headers: { Authorization: auth }
    }
  );

  if (response.status !== 200) {
    console.log(response.status)
    throw new Error(response.status);
  }

  const body = response.body;
  console.log(body);

  return response;
}

self.onfetch = (event) => {
  const req = event.request.clone();
  if (req.url.includes('/api/download')) {
    event.respondWith(decryptStream(req));
  }
};

self.onmessage = (event) => {
  self.keychain = new Keychain(event.data.key, event.data.nonce);
};