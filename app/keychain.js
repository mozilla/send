import { arrayToB64, b64ToArray } from './utils';
import { decryptStream, encryptStream } from './ece.js';
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default class Keychain {
  constructor(secretKeyB64, nonce) {
    this._nonce = nonce || 'yRCdyQ1EMSA3mo4rqSkuNQ==';
    if (secretKeyB64) {
      this.rawSecret = b64ToArray(secretKeyB64);
    } else {
      this.rawSecret = crypto.getRandomValues(new Uint8Array(16));
    }
    this.secretKeyPromise = crypto.subtle.importKey(
      'raw',
      this.rawSecret,
      'HKDF',
      false,
      ['deriveKey']
    );
    this.metaKeyPromise = this.secretKeyPromise.then(function(secretKey) {
      return crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: new Uint8Array(),
          info: encoder.encode('metadata'),
          hash: 'SHA-256'
        },
        secretKey,
        {
          name: 'AES-GCM',
          length: 128
        },
        false,
        ['encrypt', 'decrypt']
      );
    });
    this.authKeyPromise = this.secretKeyPromise.then(function(secretKey) {
      return crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: new Uint8Array(),
          info: encoder.encode('authentication'),
          hash: 'SHA-256'
        },
        secretKey,
        {
          name: 'HMAC',
          hash: { name: 'SHA-256' }
        },
        true,
        ['sign']
      );
    });
  }

  get nonce() {
    return this._nonce;
  }

  set nonce(n) {
    if (n && n !== this._nonce) {
      this._nonce = n;
    }
  }

  setPassword(password, shareUrl) {
    this.authKeyPromise = crypto.subtle
      .importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, [
        'deriveKey'
      ])
      .then(passwordKey =>
        crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: encoder.encode(shareUrl),
            iterations: 100,
            hash: 'SHA-256'
          },
          passwordKey,
          {
            name: 'HMAC',
            hash: 'SHA-256'
          },
          true,
          ['sign']
        )
      );
  }

  setAuthKey(authKeyB64) {
    this.authKeyPromise = crypto.subtle.importKey(
      'raw',
      b64ToArray(authKeyB64),
      {
        name: 'HMAC',
        hash: 'SHA-256'
      },
      true,
      ['sign']
    );
  }

  async authKeyB64() {
    const authKey = await this.authKeyPromise;
    const rawAuth = await crypto.subtle.exportKey('raw', authKey);
    return arrayToB64(new Uint8Array(rawAuth));
  }

  async authHeader() {
    const authKey = await this.authKeyPromise;
    const sig = await crypto.subtle.sign(
      {
        name: 'HMAC'
      },
      authKey,
      b64ToArray(this.nonce)
    );
    return `send-v1 ${arrayToB64(new Uint8Array(sig))}`;
  }

  async encryptMetadata(metadata) {
    const metaKey = await this.metaKeyPromise;
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        tagLength: 128
      },
      metaKey,
      encoder.encode(
        JSON.stringify({
          name: metadata.name,
          size: metadata.size,
          type: metadata.type || 'application/octet-stream',
          manifest: metadata.manifest || {}
        })
      )
    );
    return ciphertext;
  }

  encryptStream(plainStream) {
    return encryptStream(plainStream, this.rawSecret);
  }

  decryptStream(cryptotext) {
    return decryptStream(cryptotext, this.rawSecret);
  }

  async decryptMetadata(ciphertext) {
    const metaKey = await this.metaKeyPromise;
    const plaintext = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        tagLength: 128
      },
      metaKey,
      ciphertext
    );
    return JSON.parse(decoder.decode(plaintext));
  }
}
