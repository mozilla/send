const { Crypto } = require('@peculiar/webcrypto');
const crypto = new Crypto();

const encoder = new TextEncoder();
const decoder = new TextDecoder();

module.exports = class Keychain {
  constructor(secretKeyB64) {
    if (secretKeyB64) {
      this.rawSecret = new Uint8Array(Buffer.from(secretKeyB64, 'base64'));
    } else {
      throw new Error('key is required');
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
        ['decrypt']
      );
    });
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
};
