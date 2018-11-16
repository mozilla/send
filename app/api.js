import { arrayToB64, b64ToArray, delay } from './utils';
import { ECE_RECORD_SIZE } from './ece';

let fileProtocolWssUrl = null;
try {
  fileProtocolWssUrl = localStorage.getItem('wssURL');
} catch (e) {
  // NOOP
}
if (!fileProtocolWssUrl) {
  fileProtocolWssUrl = 'wss://send2.dev.lcip.org/api/ws';
}

export function setFileProtocolWssUrl(url) {
  localStorage && localStorage.setItem('wssURL', url);
  fileProtocolWssUrl = url;
}

export function getFileProtocolWssUrl() {
  return fileProtocolWssUrl;
}

function post(obj, bearerToken) {
  const h = {
    'Content-Type': 'application/json'
  };
  if (bearerToken) {
    h['Authentication'] = `Bearer ${bearerToken}`;
  }
  return {
    method: 'POST',
    headers: new Headers(h),
    body: JSON.stringify(obj)
  };
}

export function parseNonce(header) {
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

export async function setParams(id, owner_token, bearerToken, params) {
  const response = await fetch(
    `/api/params/${id}`,
    post(
      {
        owner_token,
        dlimit: params.dlimit
      },
      bearerToken
    )
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
      size: meta.size,
      ttl: data.ttl,
      iv: meta.iv,
      name: meta.name,
      type: meta.type,
      manifest: meta.manifest
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

function listenForResponse(ws, canceller) {
  return new Promise((resolve, reject) => {
    function handleMessage(msg) {
      try {
        const response = JSON.parse(msg.data);
        if (response.error) {
          throw new Error(response.error);
        } else {
          resolve(response);
        }
      } catch (e) {
        ws.close();
        canceller.cancelled = true;
        canceller.error = e;
        reject(e);
      }
    }
    ws.addEventListener('message', handleMessage, { once: true });
  });
}

async function upload(
  stream,
  metadata,
  verifierB64,
  timeLimit,
  dlimit,
  bearerToken,
  onprogress,
  canceller
) {
  const host = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const endpoint =
    window.location.protocol === 'file:'
      ? fileProtocolWssUrl
      : `${protocol}//${host}${port ? ':' : ''}${port}/api/ws`;

  const ws = await asyncInitWebSocket(endpoint);

  try {
    const metadataHeader = arrayToB64(new Uint8Array(metadata));
    const fileMeta = {
      fileMetadata: metadataHeader,
      authorization: `send-v1 ${verifierB64}`,
      bearer: bearerToken,
      timeLimit,
      dlimit
    };
    const uploadInfoResponse = listenForResponse(ws, canceller);
    ws.send(JSON.stringify(fileMeta));
    const uploadInfo = await uploadInfoResponse;

    const completedResponse = listenForResponse(ws, canceller);

    const reader = stream.getReader();
    let state = await reader.read();
    let size = 0;
    while (!state.done) {
      const buf = state.value;
      if (canceller.cancelled) {
        throw canceller.error;
      }

      ws.send(buf);

      onprogress(size);
      size += buf.length;
      state = await reader.read();
      while (ws.bufferedAmount > ECE_RECORD_SIZE * 2) {
        await delay();
      }
    }
    const footer = new Uint8Array([0]);
    ws.send(footer);

    await completedResponse;
    ws.close();
    return uploadInfo;
  } catch (e) {
    ws.close(4000);
    throw e;
  }
}

export function uploadWs(
  encrypted,
  metadata,
  verifierB64,
  timeLimit,
  dlimit,
  bearerToken,
  onprogress
) {
  const canceller = { cancelled: false };

  return {
    cancel: function() {
      canceller.error = new Error(0);
      canceller.cancelled = true;
    },

    result: upload(
      encrypted,
      metadata,
      verifierB64,
      timeLimit,
      dlimit,
      bearerToken,
      onprogress,
      canceller
    )
  };
}

////////////////////////

async function downloadS(id, keychain, signal) {
  const auth = await keychain.authHeader();

  const response = await fetch(`/api/download/${id}`, {
    signal: signal,
    method: 'GET',
    headers: { Authorization: auth }
  });

  const authHeader = response.headers.get('WWW-Authenticate');
  if (authHeader) {
    keychain.nonce = parseNonce(authHeader);
  }

  if (response.status !== 200) {
    throw new Error(response.status);
  }

  return response.body;
}

async function tryDownloadStream(id, keychain, signal, tries = 1) {
  try {
    const result = await downloadS(id, keychain, signal);
    return result;
  } catch (e) {
    if (e.message === '401' && --tries > 0) {
      return tryDownloadStream(id, keychain, signal, tries);
    }
    if (e.name === 'AbortError') {
      throw new Error('0');
    }
    throw e;
  }
}

export function downloadStream(id, keychain) {
  const controller = new AbortController();
  function cancel() {
    controller.abort();
  }
  return {
    cancel,
    result: tryDownloadStream(id, keychain, controller.signal, 2)
  };
}

//////////////////

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
      if (event.target.status === 200) {
        onprogress(event.loaded);
      }
    });
    const auth = await keychain.authHeader();
    xhr.open('get', `/api/download/blob/${id}`);
    xhr.setRequestHeader('Authorization', auth);
    xhr.responseType = 'blob';
    xhr.send();
    onprogress(0);
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

export async function getFileList(bearerToken) {
  const headers = new Headers({ Authorization: `Bearer ${bearerToken}` });
  const response = await fetch('/api/filelist', { headers });
  if (response.ok) {
    return response.body; // stream
  }
  throw new Error(response.status);
}

export async function setFileList(bearerToken, data) {
  const headers = new Headers({ Authorization: `Bearer ${bearerToken}` });
  const response = await fetch('/api/filelist', {
    headers,
    method: 'POST',
    body: data
  });
  return response.ok;
}
