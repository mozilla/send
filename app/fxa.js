import jose from 'node-jose';
import { arrayToB64, b64ToArray } from './utils';

const encoder = new TextEncoder();

export async function prepareWrapKey(storage) {
  const keystore = jose.JWK.createKeyStore();
  const keypair = await keystore.generate('EC', 'P-256');
  storage.set('fxaWrapKey', JSON.stringify(keystore.toJSON(true)));
  return jose.util.base64url.encode(JSON.stringify(keypair.toJSON()));
}

export async function getFileListKey(storage, bundle) {
  const keystore = await jose.JWK.asKeyStore(
    JSON.parse(storage.get('fxaWrapKey'))
  );
  const result = await jose.JWE.createDecrypt(keystore).decrypt(bundle);
  const jwks = JSON.parse(jose.util.utf8.encode(result.plaintext));
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
