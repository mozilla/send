import { arrayToB64, b64ToArray } from './utils';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getOtherInfo(enc) {
  const name = encoder.encode(enc);
  const length = 256;
  const buffer = new ArrayBuffer(name.length + 16);
  const dv = new DataView(buffer);
  const result = new Uint8Array(buffer);
  let i = 0;
  dv.setUint32(i, name.length);
  i += 4;
  result.set(name, i);
  i += name.length;
  dv.setUint32(i, 0);
  i += 4;
  dv.setUint32(i, 0);
  i += 4;
  dv.setUint32(i, length);
  return result;
}

function concat(b1, b2) {
  const result = new Uint8Array(b1.length + b2.length);
  result.set(b1, 0);
  result.set(b2, b1.length);
  return result;
}

async function concatKdf(key, enc) {
  if (key.length !== 32) {
    throw new Error('unsupported key length');
  }
  const otherInfo = getOtherInfo(enc);
  const buffer = new ArrayBuffer(4 + key.length + otherInfo.length);
  const dv = new DataView(buffer);
  const concat = new Uint8Array(buffer);
  dv.setUint32(0, 1);
  concat.set(key, 4);
  concat.set(otherInfo, key.length + 4);
  const result = await crypto.subtle.digest('SHA-256', concat);
  return new Uint8Array(result);
}

export async function prepareScopedBundleKey(storage) {
  const keys = await crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256'
    },
    true,
    ['deriveBits']
  );
  const privateJwk = await crypto.subtle.exportKey('jwk', keys.privateKey);
  const publicJwk = await crypto.subtle.exportKey('jwk', keys.publicKey);
  const kid = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(JSON.stringify(publicJwk))
  );
  privateJwk.kid = kid;
  publicJwk.kid = kid;
  storage.set('scopedBundlePrivateKey', JSON.stringify(privateJwk));
  return arrayToB64(encoder.encode(JSON.stringify(publicJwk)));
}

export async function decryptBundle(storage, bundle) {
  const privateJwk = JSON.parse(storage.get('scopedBundlePrivateKey'));
  storage.remove('scopedBundlePrivateKey');
  const privateKey = await crypto.subtle.importKey(
    'jwk',
    privateJwk,
    {
      name: 'ECDH',
      namedCurve: 'P-256'
    },
    false,
    ['deriveBits']
  );
  const jweParts = bundle.split('.');
  if (jweParts.length !== 5) {
    throw new Error('invalid jwe');
  }
  const header = JSON.parse(decoder.decode(b64ToArray(jweParts[0])));
  const additionalData = encoder.encode(jweParts[0]);
  const iv = b64ToArray(jweParts[2]);
  const ciphertext = b64ToArray(jweParts[3]);
  const tag = b64ToArray(jweParts[4]);

  if (header.alg !== 'ECDH-ES' || header.enc !== 'A256GCM') {
    throw new Error('unsupported jwe type');
  }

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    header.epk,
    {
      name: 'ECDH',
      namedCurve: 'P-256'
    },
    false,
    []
  );
  const sharedBits = await crypto.subtle.deriveBits(
    {
      name: 'ECDH',
      public: publicKey
    },
    privateKey,
    256
  );

  const rawSharedKey = await concatKdf(new Uint8Array(sharedBits), header.enc);
  const sharedKey = await crypto.subtle.importKey(
    'raw',
    rawSharedKey,
    {
      name: 'AES-GCM'
    },
    false,
    ['decrypt']
  );

  const plaintext = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      additionalData: additionalData,
      tagLength: tag.length * 8
    },
    sharedKey,
    concat(ciphertext, tag)
  );

  return JSON.parse(decoder.decode(plaintext));
}

export async function preparePkce(storage) {
  const verifier = arrayToB64(crypto.getRandomValues(new Uint8Array(64)));
  storage.set('pkceVerifier', verifier);
  const challenge = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(verifier)
  );
  return arrayToB64(new Uint8Array(challenge));
}

export async function getFileListKey(storage, bundle) {
  const jwks = await decryptBundle(storage, bundle);
  const jwk = jwks['https://identity.mozilla.com/apps/send'];
  const baseKey = await crypto.subtle.importKey(
    'raw',
    b64ToArray(jwk.k),
    { name: 'HKDF' },
    false,
    ['deriveKey']
  );
  const fileListKey = await crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      salt: new Uint8Array(),
      info: encoder.encode('fileList'),
      hash: 'SHA-256'
    },
    baseKey,
    {
      name: 'AES-GCM',
      length: 128
    },
    true,
    ['encrypt', 'decrypt']
  );
  const rawFileListKey = await crypto.subtle.exportKey('raw', fileListKey);
  return arrayToB64(new Uint8Array(rawFileListKey));
}
