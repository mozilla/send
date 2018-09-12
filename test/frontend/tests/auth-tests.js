import assert from 'assert';
import storage from '../../../app/storage';
import { decryptBundle, prepareScopedBundleKey } from '../../../app/fxa';
import { b64ToArray } from '../../../app/utils';

const decoder = new TextDecoder();

describe('user auth', function() {
  it('prepares ECDH keys for PKCE auth', async function() {
    const empty = storage.get('scopedBundlePrivateKey');
    assert.equal(empty, undefined);
    const publicKeyB64 = await prepareScopedBundleKey(storage);
    const publicKey = JSON.parse(decoder.decode(b64ToArray(publicKeyB64)));
    assert(!publicKey.d, 'not a public key');
    assert(publicKey.x);
    assert(publicKey.y);
    assert.equal(publicKey.kty, 'EC');
    assert.equal(publicKey.crv, 'P-256');

    const privateKey = JSON.parse(storage.get('scopedBundlePrivateKey'));
    storage.remove('scopedBundlePrivateKey');
    assert.equal(privateKey.kty, 'EC');
    assert.equal(privateKey.crv, 'P-256');
    assert(privateKey.d, 'not a private key');
  });

  it('decrypts the PKCE auth bundle', async function() {
    storage.set(
      'scopedBundlePrivateKey',
      '{"kty":"EC","kid":"cV9_thVX9XRa-R2nVZF9rFdwrcR_eST4UZuUCx03ebI","crv":"P-256","x":"-0OOb6SPdYBz0CkQLWRu8ojDUhRe-VoKnwLEBi97KAk","y":"U3fXgj1LV7KhiO5O60niMjPpDqToh15-R6C22NnmNXY","d":"KfIQCxZrqSI6j69rAC6fEiGIYKwYv2buQG9NTcKOiGc"}'
    );
    const jwks = await decryptBundle(
      storage,
      'eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiRUNESC1FUyIsImtpZCI6ImNWOV90aFZYOVhSYS1SMm5WWkY5ckZkd3JjUl9lU1Q0VVp1VUN4MDNlYkkiLCJlcGsiOnsia3R5IjoiRUMiLCJjcnYiOiJQLTI1NiIsIngiOiJqckcwajNFODNodDZJcDE1YmtuZWRUV3kwZmR1WnR0V3NtMkFybUNoQU5rIiwieSI6Ijl3SmNQUDRrQmQ5amtCbEJJcWRhclQ2NjVIQU00SndUX0FSSFc0aTN4QUUifX0..Dkf-FXtakCiPuXjW.-KfVQEntYjUe3f5OxslSQwjLFauc50RurLQHDV75sUixNTlsjTIldCZVb6WUKpQkpOdFHOUYFX9_Cvk2ENKdfcVm2eTuyomlKklHF3q5209KwJz8lDK3gOQuAlz79eDou0k_Z3JNGu-qZ8IiDhZZ9iNSgBrsq0BZwVXZ9ViSFEW-YzJBQlKmildscXhp_-Lf6-qiJJrPbZCXFD3PZmzcule3kyBOarg_fjjHLFlIpdjP1lI5wBETqdjk7iBKeO2isSQO7-8.q5EzqP6OPg9yb5BcJH2oFg'
    );
    assert.deepEqual(jwks, {
      'https://identity.mozilla.com/apps/send': {
        kty: 'oct',
        scope: 'https://identity.mozilla.com/apps/send',
        k: '5_jrbS76RzJ4EwlKSl527vqz3BDqf5DM4sNsoEK_hoA',
        kid: '1414456160-n6yE-eL-ADvnsJo_huq3DA'
      }
    });
  });
});
