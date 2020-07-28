const ece = require('http_ece');

import assert from 'assert';
import Archive from '../../../app/archive';
import { b64ToArray } from '../../../app/utils';
import { blobStream, concatStream } from '../../../app/streams';
import { decryptStream, encryptStream } from '../../../app/ece.js';
import { encryptedSize, concat } from '../../../app/utils';

const rs = 36;

const str = 'You are the dancing queen, young and sweet, only seventeen.';
const testSalt = 'I1BsxtFttlv3u_Oo94xnmw';
const keystr = 'yqdlZ-tYemfogSmv7Ws5PQ';

const buffer = Buffer.from(str);
const params = {
  version: 'aes128gcm',
  rs: rs,
  salt: testSalt,
  keyid: '',
  key: keystr
};

const encrypted = ece.encrypt(buffer, params);
const decrypted = ece.decrypt(encrypted, params);

describe('Streaming', function() {
  describe('blobStream', function() {
    it('reads the entire blob', async function() {
      const len = 12345;
      const chunkSize = 1024;
      const blob = new Blob([new Uint8Array(len)]);
      const stream = blobStream(blob, chunkSize);
      const reader = stream.getReader();
      let bytes = 0;
      let data = await reader.read();
      while (!data.done) {
        bytes += data.value.byteLength;
        assert.ok(data.value.byteLength <= chunkSize, 'chunk too big');
        data = await reader.read();
      }
      assert.equal(bytes, len);
    });
  });

  describe('concatStream', function() {
    it('reads all the streams', async function() {
      const count = 5;
      const len = 12345;
      const streams = Array.from({ length: count }, () =>
        blobStream(new Blob([new Uint8Array(len)]))
      );
      const concat = concatStream(streams);
      const reader = concat.getReader();
      let bytes = 0;
      let data = await reader.read();
      while (!data.done) {
        bytes += data.value.byteLength;
        data = await reader.read();
      }
      assert.equal(bytes, len * count);
    });
  });

  //testing against http_ece's implementation
  describe('ECE', function() {
    const key = b64ToArray(keystr);
    const salt = b64ToArray(testSalt).buffer;

    it('can encrypt', async function() {
      const stream = new Archive([new Blob([str], { type: 'text/plain' })])
        .stream;
      const encStream = encryptStream(stream, key, rs, salt);
      const reader = encStream.getReader();

      let result = new Uint8Array(0);

      let state = await reader.read();
      while (!state.done) {
        result = concat(result, state.value);
        state = await reader.read();
      }

      assert.deepEqual(result, new Uint8Array(encrypted));
    });

    it('can decrypt', async function() {
      const stream = new Archive([new Blob([encrypted])]).stream;
      const decStream = decryptStream(stream, key, rs);

      const reader = decStream.getReader();
      let result = new Uint8Array(0);

      let state = await reader.read();
      while (!state.done) {
        result = concat(result, state.value);
        state = await reader.read();
      }
      assert.deepEqual(result, new Uint8Array(decrypted));
    });
  });

  describe('encryptedSize', function() {
    it('matches the size of an encrypted buffer', function() {
      assert.equal(encryptedSize(buffer.length, rs), encrypted.length);
    });
  });
});
