/* global EXPIRE_SECONDS */
import Nanobus from 'nanobus';
import OwnedFile from './ownedFile';
import Keychain from './keychain';
import { arrayToB64, bytes } from './utils';
import { uploadWs } from './api';

export default class FileSender extends Nanobus {
  constructor(file) {
    super('FileSender');
    this.file = file;
    this.keychain = new Keychain();
    this.reset();
  }

  get progressRatio() {
    return this.progress[0] / this.progress[1];
  }

  get progressIndefinite() {
    return ['fileSizeProgress', 'notifyUploadDone'].indexOf(this.msg) === -1;
  }

  get sizes() {
    return {
      partialSize: bytes(this.progress[0]),
      totalSize: bytes(this.progress[1])
    };
  }

  reset() {
    this.uploadRequest = null;
    this.msg = 'importingFile';
    this.progress = [0, 1];
    this.cancelled = false;
  }

  cancel() {
    this.cancelled = true;
    if (this.uploadRequest) {
      this.uploadRequest.cancel();
    }
  }

  readFile() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.file);
      // TODO: progress?
      reader.onload = function(event) {
        const plaintext = new Uint8Array(this.result);
        resolve(plaintext);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }

  async upload() {
    const start = Date.now();
    if (this.cancelled) {
      throw new Error(0);
    }
    this.msg = 'encryptingFile';
    this.emit('encrypting');

    const enc = this.keychain.encryptStream(this.file);
    const metadata = await this.keychain.encryptMetadata(this.file);
    const authKeyB64 = await this.keychain.authKeyB64();

    this.uploadRequest = uploadWs(
      enc.stream,
      enc.streamInfo,
      metadata,
      authKeyB64,
      this.keychain,
      p => {
        this.progress = p;
        this.emit('progress');
      }
    );

    if (this.cancelled) {
      throw new Error(0);
    }

    this.msg = 'fileSizeProgress';
    this.emit('progress'); // HACK to kick MS Edge
    try {
      const result = await this.uploadRequest.result;
      const time = Date.now() - start;
      this.msg = 'notifyUploadDone';
      this.uploadRequest = null;
      this.progress = [1, 1];
      const secretKey = arrayToB64(this.keychain.rawSecret);
      const ownedFile = new OwnedFile({
        id: result.id,
        url: `${result.url}#${secretKey}`,
        name: this.file.name,
        size: this.file.size,
        time: time,
        speed: this.file.size / (time / 1000),
        createdAt: Date.now(),
        expiresAt: Date.now() + EXPIRE_SECONDS * 1000,
        secretKey: secretKey,
        nonce: this.keychain.nonce,
        ownerToken: result.ownerToken
      });
      return ownedFile;
    } catch (e) {
      this.msg = 'errorPageHeader';
      this.uploadRequest = null;
      throw e;
    }
  }
}
