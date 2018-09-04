import assert from 'assert';
import Keychain from '../../../app/keychain';

describe('Keychain', function() {
  describe('setPassword', function() {
    it('changes the authKey', async function() {
      const k = new Keychain();
      const original = await k.authKeyB64();
      k.setPassword('foo', 'some://url');
      const pwd = await k.authKeyB64();
      assert.notEqual(pwd, original);
    });
  });

  describe('encrypt / decrypt metadata', function() {
    it('can decrypt metadata it encrypts', async function() {
      const k = new Keychain();
      const meta = {
        name: 'foo',
        type: 'bar/baz'
      };
      const ciphertext = await k.encryptMetadata(meta);
      const result = await k.decryptMetadata(ciphertext);
      assert.equal(result.name, meta.name);
      assert.equal(result.type, meta.type);
    });
  });
});
