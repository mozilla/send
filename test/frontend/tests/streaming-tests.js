const ece = require('http_ece');
require('buffer');

import assert from 'assert';
import { b64ToArray } from '../../../app/utils';
import ECE from '../../../app/ece.js';

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

    it('can encrypt', async function() {
      const encStream = new ECE(blob, key, 'encrypt', rs, salt).stream;
      const reader = encStream.getReader();

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
      const decStream = await new ECE(encBlob, key, 'decrypt', rs).stream;

      const reader = decStream.getReader();
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
