import assert from 'assert';
import * as api from '../../../app/api';
import Keychain from '../../../app/keychain';

const encoder = new TextEncoder();
const plaintext = encoder.encode('hello world!');
const metadata = {
  name: 'test.txt',
  type: 'text/plain'
};

describe('API', function() {
  describe('uploadFile', function() {
    it('returns file info on success', async function() {
      const keychain = new Keychain();
      const encrypted = await keychain.encryptFile(plaintext);
      const meta = await keychain.encryptMetadata(metadata);
      const verifierB64 = await keychain.authKeyB64();
      const up = api.uploadFile(encrypted, meta, verifierB64, keychain);
      const result = await up.result;
      assert.ok(result.url);
      assert.ok(result.id);
      assert.ok(result.ownerToken);
    });
  });
});
