import Nanobus from 'nanobus';
import { arrayToB64, b64ToArray } from './utils';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default class Keychain extends Nanobus {
  constructor(secretKeyB64, nonce, ivB64) {
    super('Keychain');
    this._nonce = nonce || 'yRCdyQ1EMSA3mo4rqSkuNQ==';
    if (ivB64) {
      this.iv = b64ToArray(ivB64);
    } else {
      this.iv = window.crypto.getRandomValues(new Uint8Array(12));
    }
    if (secretKeyB64) {
      this.rawSecret = b64ToArray(secretKeyB64);
    } else {
      this.rawSecret = window.crypto.getRandomValues(new Uint8Array(16));
    }
    this.secretKeyPromise = window.crypto.subtle.importKey(
      'raw',
      this.rawSecret,
      'HKDF',
      false,
      ['deriveKey']
    );
    this.encryptKeyPromise = this.secretKeyPromise.then(function(secretKey) {
      return window.crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: new Uint8Array(),
          info: encoder.encode('encryption'),
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
    this.metaKeyPromise = this.secretKeyPromise.then(function(secretKey) {
      return window.crypto.subtle.deriveKey(
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
      return window.crypto.subtle.deriveKey(
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
    if (n !== this.nonce) {
      this.emit('nonceChanged', n);
    }
    this._nonce = n;
  }

  setIV(ivB64) {
    this.iv = b64ToArray(ivB64);
  }

  setPassword(password, shareUrl) {
    this.authKeyPromise = window.crypto.subtle
      .importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, [
        'deriveKey'
      ])
      .then(passwordKey =>
        window.crypto.subtle.deriveKey(
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
    this.authKeyPromise = window.crypto.subtle.importKey(
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
    const rawAuth = await window.crypto.subtle.exportKey('raw', authKey);
    return arrayToB64(new Uint8Array(rawAuth));
  }

  async authHeader() {
    const authKey = await this.authKeyPromise;
    const sig = await window.crypto.subtle.sign(
      {
        name: 'HMAC'
      },
      authKey,
      b64ToArray(this.nonce)
    );
    return `send-v1 ${arrayToB64(new Uint8Array(sig))}`;
  }

  async encryptFile(plaintext) {
    const encryptKey = await this.encryptKeyPromise;
    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: this.iv,
        tagLength: 128
      },
      encryptKey,
      plaintext
    );
    return ciphertext;
  }

  async encryptMetadata(metadata) {
    const metaKey = await this.metaKeyPromise;
    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        tagLength: 128
      },
      metaKey,
      encoder.encode(
        JSON.stringify({
          iv: arrayToB64(this.iv),
          name: metadata.name,
          type: metadata.type || 'application/octet-stream'
        })
      )
    );
    return ciphertext;
  }

  async decryptFile(ciphertext) {
    const encryptKey = await this.encryptKeyPromise;
    const plaintext = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: this.iv,
        tagLength: 128
      },
      encryptKey,
      ciphertext
    );
    return plaintext;
  }

  async decryptMetadata(ciphertext) {
    const metaKey = await this.metaKeyPromise;
    const plaintext = await window.crypto.subtle.decrypt(
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
