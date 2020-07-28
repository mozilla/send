import { transformStream } from './streams';
import { concat } from './utils';

const NONCE_LENGTH = 12;
const TAG_LENGTH = 16;
const KEY_LENGTH = 16;
const MODE_ENCRYPT = 'encrypt';
const MODE_DECRYPT = 'decrypt';
export const ECE_RECORD_SIZE = 1024 * 64;

const encoder = new TextEncoder();

function generateSalt(len) {
  const randSalt = new Uint8Array(len);
  crypto.getRandomValues(randSalt);
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
    const inputKey = await crypto.subtle.importKey(
      'raw',
      this.ikm,
      'HKDF',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
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
      true, // Edge polyfill requires key to be extractable to encrypt :/
      ['encrypt', 'decrypt']
    );
  }

  async generateNonceBase() {
    const inputKey = await crypto.subtle.importKey(
      'raw',
      this.ikm,
      'HKDF',
      false,
      ['deriveKey']
    );

    const base = await crypto.subtle.exportKey(
      'raw',
      await crypto.subtle.deriveKey(
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

    return base.slice(0, NONCE_LENGTH);
  }

  generateNonce(seq) {
    if (seq > 0xffffffff) {
      throw new Error('record sequence number exceeds limit');
    }
    const nonce = new DataView(this.nonceBase.slice());
    const m = nonce.getUint32(nonce.byteLength - 4);
    const xor = (m ^ seq) >>> 0; //forces unsigned int xor
    nonce.setUint32(nonce.byteLength - 4, xor);
    return new Uint8Array(nonce.buffer);
  }

  pad(data, isLast) {
    const len = data.length;
    if (len + TAG_LENGTH >= this.rs) {
      throw new Error('data too large for record size');
    }

    if (isLast) {
      return concat(data, Uint8Array.of(2));
    } else {
      const padding = new Uint8Array(this.rs - len - TAG_LENGTH);
      padding[0] = 1;
      return concat(data, padding);
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
    const nums = new DataView(new ArrayBuffer(5));
    nums.setUint32(0, this.rs);
    return concat(new Uint8Array(this.salt), new Uint8Array(nums.buffer));
  }

  readHeader(buffer) {
    if (buffer.length < 21) {
      throw new Error('chunk too small for reading header');
    }
    const header = {};
    const dv = new DataView(buffer.buffer);
    header.salt = buffer.slice(0, KEY_LENGTH);
    header.rs = dv.getUint32(KEY_LENGTH);
    const idlen = dv.getUint8(KEY_LENGTH + 4);
    header.length = idlen + KEY_LENGTH + 5;
    return header;
  }

  async encryptRecord(buffer, seq, isLast) {
    const nonce = this.generateNonce(seq);
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce },
      this.key,
      this.pad(buffer, isLast)
    );
    return new Uint8Array(encrypted);
  }

  async decryptRecord(buffer, seq, isLast) {
    const nonce = this.generateNonce(seq);
    const data = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: nonce,
        tagLength: 128
      },
      this.key,
      buffer
    );

    return this.unpad(new Uint8Array(data), isLast);
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
    this.prevChunk = new Uint8Array(chunk.buffer);
  }

  async flush(controller) {
    //console.log('ece stream ends')
    if (this.prevChunk) {
      await this.transformPrevChunk(true, controller);
    }
  }
}

class StreamSlicer {
  constructor(rs, mode) {
    this.mode = mode;
    this.rs = rs;
    this.chunkSize = mode === MODE_ENCRYPT ? rs - 17 : 21;
    this.partialChunk = new Uint8Array(this.chunkSize); //where partial chunks are saved
    this.offset = 0;
  }

  send(buf, controller) {
    controller.enqueue(buf);
    if (this.chunkSize === 21 && this.mode === MODE_DECRYPT) {
      this.chunkSize = this.rs;
    }
    this.partialChunk = new Uint8Array(this.chunkSize);
    this.offset = 0;
  }

  //reslice input into record sized chunks
  transform(chunk, controller) {
    //console.log('Received chunk with %d bytes.', chunk.byteLength)
    let i = 0;

    if (this.offset > 0) {
      const len = Math.min(chunk.byteLength, this.chunkSize - this.offset);
      this.partialChunk.set(chunk.slice(0, len), this.offset);
      this.offset += len;
      i += len;

      if (this.offset === this.chunkSize) {
        this.send(this.partialChunk, controller);
      }
    }

    while (i < chunk.byteLength) {
      const remainingBytes = chunk.byteLength - i;
      if (remainingBytes >= this.chunkSize) {
        const record = chunk.slice(i, i + this.chunkSize);
        i += this.chunkSize;
        this.send(record, controller);
      } else {
        const end = chunk.slice(i, i + remainingBytes);
        i += end.byteLength;
        this.partialChunk.set(end);
        this.offset = end.byteLength;
      }
    }
  }

  flush(controller) {
    if (this.offset > 0) {
      controller.enqueue(this.partialChunk.slice(0, this.offset));
    }
  }
}

/*
input: a ReadableStream containing data to be transformed
key:  Uint8Array containing key of size KEY_LENGTH
rs:   int containing record size, optional
salt: ArrayBuffer containing salt of KEY_LENGTH length, optional
*/
export function encryptStream(
  input,
  key,
  rs = ECE_RECORD_SIZE,
  salt = generateSalt(KEY_LENGTH)
) {
  const mode = 'encrypt';
  const inputStream = transformStream(input, new StreamSlicer(rs, mode));
  return transformStream(inputStream, new ECETransformer(mode, key, rs, salt));
}

/*
input: a ReadableStream containing data to be transformed
key:  Uint8Array containing key of size KEY_LENGTH
rs:   int containing record size, optional
*/
export function decryptStream(input, key, rs = ECE_RECORD_SIZE) {
  const mode = 'decrypt';
  const inputStream = transformStream(input, new StreamSlicer(rs, mode));
  return transformStream(inputStream, new ECETransformer(mode, key, rs));
}
