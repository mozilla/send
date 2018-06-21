require('buffer');
import { ReadableStream, TransformStream } from 'web-streams-polyfill';

const NONCE_LENGTH = 12;
const TAG_LENGTH = 16;
const KEY_LENGTH = 16;
const MODE_ENCRYPT = 'encrypt';
const MODE_DECRYPT = 'decrypt';
const RS = 1048576;

const encoder = new TextEncoder();

function generateSalt(len) {
  const randSalt = new Uint8Array(len);
  window.crypto.getRandomValues(randSalt);
  return randSalt.buffer;
}

class ECETransformer {
  constructor(mode, ikm, rs, salt) {
    this.mode = mode;
    this.prevChunk;
    this.seq = 0;
    this.firstchunk = true;
    this.rs = rs;
    this.ikm = ikm.buffer;
    this.salt = salt;
  }

  async generateKey() {
    const inputKey = await window.crypto.subtle.importKey(
      'raw',
      this.ikm,
      'HKDF',
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        salt: this.salt,
        info: encoder.encode('Content-Encoding: aes128gcm\0'),
        hash: 'SHA-256'
      },
      inputKey,
      {
        name: 'AES-GCM',
        length: 128
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async generateNonceBase() {
    const inputKey = await window.crypto.subtle.importKey(
      'raw',
      this.ikm,
      'HKDF',
      false,
      ['deriveKey']
    );

    const base = await window.crypto.subtle.exportKey(
      'raw',
      await window.crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: this.salt,
          info: encoder.encode('Content-Encoding: nonce\0'),
          hash: 'SHA-256'
        },
        inputKey,
        {
          name: 'AES-GCM',
          length: 128
        },
        true,
        ['encrypt', 'decrypt']
      )
    );

    return Buffer.from(base.slice(0, NONCE_LENGTH));
  }

  generateNonce(seq) {
    if (seq > 0xffffffff) {
      throw new Error('record sequence number exceeds limit');
    }
    const nonce = Buffer.from(this.nonceBase);
    const m = nonce.readUIntBE(nonce.length - 4, 4);
    const xor = (m ^ seq) >>> 0; //forces unsigned int xor
    nonce.writeUIntBE(xor, nonce.length - 4, 4);

    return nonce;
  }

  pad(data, isLast) {
    const len = data.length;
    if (len + TAG_LENGTH >= this.rs) {
      throw new Error('data too large for record size');
    }

    if (isLast) {
      const padding = Buffer.alloc(1);
      padding.writeUInt8(2, 0);
      return Buffer.concat([data, padding]);
    } else {
      const padding = Buffer.alloc(this.rs - len - TAG_LENGTH);
      padding.fill(0);
      padding.writeUInt8(1, 0);
      return Buffer.concat([data, padding]);
    }
  }

  unpad(data, isLast) {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i]) {
        if (isLast) {
          if (data[i] !== 2) {
            throw new Error('delimiter of final record is not 2');
          }
        } else {
          if (data[i] !== 1) {
            throw new Error('delimiter of not final record is not 1');
          }
        }
        return data.slice(0, i);
      }
    }
    throw new Error('no delimiter found');
  }

  createHeader() {
    const nums = Buffer.alloc(5);
    nums.writeUIntBE(this.rs, 0, 4);
    nums.writeUIntBE(0, 4, 1);
    return Buffer.concat([Buffer.from(this.salt), nums]);
  }

  readHeader(buffer) {
    if (buffer.length < 21) {
      throw new Error('chunk too small for reading header');
    }
    const header = {};
    header.salt = buffer.buffer.slice(0, KEY_LENGTH);
    header.rs = buffer.readUIntBE(KEY_LENGTH, 4);
    const idlen = buffer.readUInt8(KEY_LENGTH + 4);
    header.length = idlen + KEY_LENGTH + 5;
    return header;
  }

  async encryptRecord(buffer, seq, isLast) {
    const nonce = this.generateNonce(seq);
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce },
      this.key,
      this.pad(buffer, isLast)
    );
    return Buffer.from(encrypted);
  }

  async decryptRecord(buffer, seq, isLast) {
    const nonce = this.generateNonce(seq);
    const data = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: nonce,
        tagLength: 128
      },
      this.key,
      buffer
    );

    return this.unpad(Buffer.from(data), isLast);
  }

  async start(controller) {
    if (this.mode === MODE_ENCRYPT) {
      this.key = await this.generateKey();
      this.nonceBase = await this.generateNonceBase();
      controller.enqueue(this.createHeader());
    } else if (this.mode !== MODE_DECRYPT) {
      throw new Error('mode must be either encrypt or decrypt');
    }
  }

  async transformPrevChunk(isLast, controller) {
    if (this.mode === MODE_ENCRYPT) {
      controller.enqueue(
        await this.encryptRecord(this.prevChunk, this.seq, isLast)
      );
      this.seq++;
    } else {
      if (this.seq === 0) {
        //the first chunk during decryption contains only the header
        const header = this.readHeader(this.prevChunk);
        this.salt = header.salt;
        this.rs = header.rs;
        this.key = await this.generateKey();
        this.nonceBase = await this.generateNonceBase();
      } else {
        controller.enqueue(
          await this.decryptRecord(this.prevChunk, this.seq - 1, isLast)
        );
      }
      this.seq++;
    }
  }

  async transform(chunk, controller) {
    if (!this.firstchunk) {
      await this.transformPrevChunk(false, controller);
    }
    this.firstchunk = false;
    this.prevChunk = Buffer.from(chunk.buffer);
  }

  async flush(controller) {
    if (this.prevChunk) {
      await this.transformPrevChunk(true, controller);
    }
  }
}

class BlobSlicer {
  constructor(blob, rs, mode) {
    this.blob = blob;
    this.index = 0;
    this.mode = mode;
    this.chunkSize = mode === MODE_ENCRYPT ? rs - 17 : rs;
  }

  pull(controller) {
    return new Promise((resolve, reject) => {
      const bytesLeft = this.blob.size - this.index;
      if (bytesLeft <= 0) {
        controller.close();
        return resolve();
      }
      let size = 1;
      if (this.mode === MODE_DECRYPT && this.index === 0) {
        size = Math.min(21, bytesLeft);
      } else {
        size = Math.min(this.chunkSize, bytesLeft);
      }
      const blob = this.blob.slice(this.index, this.index + size);
      const reader = new FileReader();
      reader.onload = () => {
        controller.enqueue(new Uint8Array(reader.result));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
      this.index += size;
    });
  }
}

class BlobSliceStream extends ReadableStream {
  constructor(blob, size, mode) {
    super(new BlobSlicer(blob, size, mode));
  }
}

/*
input: a blob containing data to be transformed
key:  Uint8Array containing key of size KEY_LENGTH 
mode: string, either 'encrypt' or 'decrypt'
rs:   int containing record size, optional
salt: ArrayBuffer containing salt of KEY_LENGTH length, optional
*/
export default class ECE {
  constructor(input, key, mode, rs, salt) {
    if (rs === undefined) {
      rs = RS;
    }
    if (salt === undefined) {
      salt = generateSalt(KEY_LENGTH);
    }

    this.streamInfo = {
      recordSize: rs,
      fileSize: input.size + 16 * Math.floor(input.size / (rs - 17))
    };
    input = new BlobSliceStream(input, rs, mode);

    const ts = new TransformStream(new ECETransformer(mode, key, rs, salt));
    this.stream = input.pipeThrough(ts);
  }
}
