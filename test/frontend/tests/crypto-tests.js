import assert from 'assert';
import { arrayToB64, b64ToArray } from '../../../app/utils';

describe('webcrypto', function() {
  it('can do it', async function() {
    const encoder = new TextEncoder();
    const x = b64ToArray('SPIfAlwbnncIFw3hEHYihw');
    const a = await crypto.subtle.importKey('raw', x, 'PBKDF2', false, [
      'deriveKey'
    ]);

    const ad = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('metadata'),
        iterations: 100,
        hash: 'SHA-256'
      },
      a,
      {
        name: 'AES-GCM',
        length: 128
      },
      false,
      ['encrypt', 'decrypt']
    );

    const ae = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        tagLength: 128
      },
      ad,
      encoder.encode('hello world!')
    );

    assert.equal(
      arrayToB64(new Uint8Array(ae)),
      'UXQQ4yVf55TRk9AZtz5QCwFofRvh-HdWJyxSCQ'
    );

    const ah = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('authentication'),
        iterations: 100,
        hash: 'SHA-256'
      },
      a,
      {
        name: 'HMAC',
        hash: { name: 'SHA-256' }
      },
      true,
      ['sign']
    );
    const ahx = await crypto.subtle.exportKey('raw', ah);
    assert.equal(
      arrayToB64(new Uint8Array(ahx)),
      'wxXDmHgmMgrcDVD8zbDLRl2yNa8jSAQgsaeIBZ4vueygpxzaTK6ZE_6X-XHvllBly6pSuFNbSxcve0ZHhVdcEA'
    );
    // const jwk = await crypto.subtle.exportKey('jwk', ah)
    // console.error(jwk)
    const as = await crypto.subtle.sign(
      {
        name: 'HMAC'
      },
      ah,
      encoder.encode('test')
    );
    assert.equal(
      arrayToB64(new Uint8Array(as)),
      'AOi4HcoCJxQ4nUYxlmHB1rlcxQBn-zVjrSHz-VW7S-I'
    );

    const b = await crypto.subtle.importKey('raw', x, 'HKDF', false, [
      'deriveKey'
    ]);
    const bd = await crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        salt: new Uint8Array(),
        info: encoder.encode('encryption'),
        hash: 'SHA-256'
      },
      b,
      {
        name: 'AES-GCM',
        length: 128
      },
      true,
      ['encrypt', 'decrypt']
    );
    const bdx = await crypto.subtle.exportKey('raw', bd);

    assert.equal(arrayToB64(new Uint8Array(bdx)), 'g7okjWWO9yueDz16-owShQ');

    const bh = await crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        salt: new Uint8Array(),
        info: encoder.encode('authentication'),
        hash: 'SHA-256'
      },
      b,
      {
        name: 'HMAC',
        hash: { name: 'SHA-256' }
      },
      true,
      ['sign']
    );

    const bhx = await crypto.subtle.exportKey('raw', bh);

    assert.equal(
      arrayToB64(new Uint8Array(bhx)),
      'TQOGtmQ8-ZfnWu6Iq-U1IAVBVREFuI17xqsW1shiC8eMCa-a5qeYTvoX3-5kCoCha8R59ycnPDnTz75clLBmbQ'
    );
  });
});
