/* global AUTH_CONFIG */
import { browserName } from './utils';

async function checkCrypto() {
  try {
    const key = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 128
      },
      true,
      ['encrypt', 'decrypt']
    );
    await crypto.subtle.exportKey('raw', key);
    await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: crypto.getRandomValues(new Uint8Array(12)),
        tagLength: 128
      },
      key,
      new ArrayBuffer(8)
    );
    await crypto.subtle.importKey(
      'raw',
      crypto.getRandomValues(new Uint8Array(16)),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    await crypto.subtle.importKey(
      'raw',
      crypto.getRandomValues(new Uint8Array(16)),
      'HKDF',
      false,
      ['deriveKey']
    );
    return true;
  } catch (err) {
    return false;
  }
}

function checkStreams() {
  try {
    new ReadableStream({
      pull() {}
    });
    return true;
  } catch (e) {
    return false;
  }
}

function polyfillStreams() {
  try {
    require('@mattiasbuelens/web-streams-polyfill');
    return true;
  } catch (e) {
    return false;
  }
}

export default async function capabilities() {
  const crypto = await checkCrypto();
  const nativeStreams = checkStreams();
  const polyStreams = nativeStreams ? false : polyfillStreams();
  let account = typeof AUTH_CONFIG !== 'undefined';
  try {
    account = account && !!localStorage;
  } catch (e) {
    // nevermind
  }

  return {
    account,
    crypto,
    streamUpload: nativeStreams || polyStreams,
    streamDownload:
      nativeStreams &&
      'serviceWorker' in navigator &&
      browserName() !== 'safari',
    multifile: nativeStreams || polyStreams
  };
}
