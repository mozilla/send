import { arrayToB64, b64ToArray } from './utils';

function post(obj) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(obj)
  };
}

function parseNonce(header) {
  header = header || '';
  return header.split(' ')[1];
}

async function fetchWithAuth(url, params, keychain) {
  const result = {};
  params = params || {};
  const h = await keychain.authHeader();
  params.headers = new Headers({ Authorization: h });
  const response = await fetch(url, params);
  result.response = response;
  result.ok = response.ok;
  const nonce = parseNonce(response.headers.get('WWW-Authenticate'));
  result.shouldRetry = response.status === 401 && nonce !== keychain.nonce;
  keychain.nonce = nonce;
  return result;
}

async function fetchWithAuthAndRetry(url, params, keychain) {
  const result = await fetchWithAuth(url, params, keychain);
  if (result.shouldRetry) {
    return fetchWithAuth(url, params, keychain);
  }
  return result;
}

export async function del(id, owner_token) {
  const response = await fetch(`/api/delete/${id}`, post({ owner_token }));
  return response.ok;
}

export async function setParams(id, owner_token, params) {
  const response = await fetch(
    `/api/params/${id}`,
    post({
      owner_token,
      dlimit: params.dlimit
    })
  );
  return response.ok;
}

export async function fileInfo(id, owner_token) {
  const response = await fetch(`/api/info/${id}`, post({ owner_token }));
  if (response.ok) {
    const obj = await response.json();
    return obj;
  }
  throw new Error(response.status);
}

export async function metadata(id, keychain) {
  const result = await fetchWithAuthAndRetry(
    `/api/metadata/${id}`,
    { method: 'GET' },
    keychain
  );
  if (result.ok) {
    const data = await result.response.json();
    const meta = await keychain.decryptMetadata(b64ToArray(data.metadata));
    return {
      size: data.size,
      ttl: data.ttl,
      iv: meta.iv,
      name: meta.name,
      type: meta.type
    };
  }
  throw new Error(result.response.status);
}

export async function setPassword(id, owner_token, keychain) {
  const auth = await keychain.authKeyB64();
  const response = await fetch(
    `/api/password/${id}`,
    post({ owner_token, auth })
  );
  return response.ok;
}

function asyncInitWebSocket(server) {
  return new Promise(resolve => {
    const ws = new WebSocket(server);
    ws.onopen = () => {
      resolve(ws);
    };
  });
}

async function upload(
  ws,
  stream,
  streamInfo,
  metadata,
  verifierB64,
  keychain,
  onprogress
) {
  const metadataHeader = arrayToB64(new Uint8Array(metadata));
  const fileMeta = {
    fileMetadata: metadataHeader,
    authorization: `send-v1 ${verifierB64}`
  };

  //send file header
  ws.send(JSON.stringify(fileMeta));

  function listenForRes() {
    return new Promise((resolve, reject) => {
      ws.addEventListener('message', function(msg) {
        const response = JSON.parse(msg.data);
        resolve({
          url: response.url,
          id: response.id,
          ownerToken: response.owner
        });
      });
    });
  }

  const resPromise = listenForRes();

  const reader = stream.getReader();
  let state = await reader.read();
  let size = 0;
  while (!state.done) {
    const buf = state.value;
    ws.send(buf);
    if (ws.readyState !== 1) {
      throw new Error(0); //should this be here
    }

    onprogress([Math.min(streamInfo.fileSize, size), streamInfo.fileSize]);
    size += streamInfo.recordSize;
    state = await reader.read();
  }

  const res = await resPromise;

  ws.close();
  return res;
}

export async function uploadWs(
  encrypted,
  info,
  metadata,
  verifierB64,
  keychain,
  onprogress
) {
  const host = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const ws = await asyncInitWebSocket(`${protocol}//${host}:${port}/api/ws`);

  //console.log(`made connection to websocket: ws://${host}:${port}/api/ws`)

  return {
    cancel: function() {
      ws.close(4000, 'upload cancelled');
    },
    result: upload(
      ws,
      encrypted,
      info,
      metadata,
      verifierB64,
      keychain,
      onprogress
    )
  };
}

function download(id, keychain, onprogress, canceller) {
  const xhr = new XMLHttpRequest();
  canceller.oncancel = function() {
    xhr.abort();
  };
  return new Promise(async function(resolve, reject) {
    xhr.addEventListener('loadend', function() {
      canceller.oncancel = function() {};
      const authHeader = xhr.getResponseHeader('WWW-Authenticate');
      if (authHeader) {
        keychain.nonce = parseNonce(authHeader);
      }
      if (xhr.status !== 200) {
        return reject(new Error(xhr.status));
      }

      const blob = new Blob([xhr.response]);
      resolve(blob);
    });
    xhr.addEventListener('progress', function(event) {
      if (event.lengthComputable && event.target.status === 200) {
        onprogress([event.loaded, event.total]);
      }
    });
    const auth = await keychain.authHeader();
    xhr.open('get', `/api/download/${id}`);
    xhr.setRequestHeader('Authorization', auth);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

async function tryDownload(id, keychain, onprogress, canceller, tries = 1) {
  try {
    const result = await download(id, keychain, onprogress, canceller);
    return result;
  } catch (e) {
    if (e.message === '401' && --tries > 0) {
      return tryDownload(id, keychain, onprogress, canceller, tries);
    }
    throw e;
  }
}

export function downloadFile(id, keychain, onprogress) {
  const canceller = {
    oncancel: function() {} // download() sets this
  };
  function cancel() {
    canceller.oncancel();
  }
  return {
    cancel,
    result: tryDownload(id, keychain, onprogress, canceller, 2)
  };
}
