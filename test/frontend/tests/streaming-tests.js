const streams = require('web-streams-polyfill');
const ece = require('http_ece');
require('buffer');

import assert from 'assert';
import { b64ToArray } from '../../../app/utils';
import ECETransformer from '../../../app/ece.js';
import BlobSliceStream from '../../../app/blobslicer.js';

const decoder = new TextDecoder('utf-8');
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
  //testing against http_ece's implementation
  describe('ECE', function() {
    const key = b64ToArray(keystr);
    const salt = b64ToArray(testSalt).buffer;
    const blob = new Blob([str], { type: 'text/plain' });

    it('blob slice stream works', async function() {
      const rs = await new BlobSliceStream(blob, 100);
      const reader = rs.getReader();

      let result = '';
      let state = await reader.read();
      while (!state.done) {
        result = decoder.decode(state.value);
        state = await reader.read();
      }

      assert.equal(result, str);
    });

    it('can encrypt', async function() {
      const enc = new streams.TransformStream(
        new ECETransformer('encrypt', key, rs, salt)
      );

      const rstream = await new BlobSliceStream(blob, rs - 17);

      const reader = rstream.pipeThrough(enc).getReader();
      let result = Buffer.from([]);

      let state = await reader.read();
      while (!state.done) {
        result = Buffer.concat([result, state.value]);
        state = await reader.read();
      }

      assert.deepEqual(result, encrypted);
    });

    it('can decrypt', async function() {
      const encBlob = new Blob([encrypted]);
      const dec = new streams.TransformStream(
        new ECETransformer('decrypt', key, rs)
      );

      const rstream = await new BlobSliceStream(encBlob, rs, true);
      const reader = rstream.pipeThrough(dec).getReader();
      let result = Buffer.from([]);

      let state = await reader.read();
      while (!state.done) {
        result = Buffer.concat([result, state.value]);
        state = await reader.read();
      }

      assert.deepEqual(result, decrypted);
    });
  });
});
