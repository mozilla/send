/* global EXPIRE_SECONDS */
import Nanobus from 'nanobus';
import OwnedFile from './ownedFile';
import Keychain from './keychain';
import { arrayToB64, bytes } from './utils';
import { uploadFile } from './api';

export default class FileSender extends Nanobus {
  constructor(file) {
    super('FileSender');
    this.file = file;
    this.uploadRequest = null;
    this.msg = 'importingFile';
    this.progress = [0, 1];
    this.cancelled = false;
    this.keychain = new Keychain();
  }

  get progressRatio() {
    return this.progress[0] / this.progress[1];
  }

  get sizes() {
    return {
      partialSize: bytes(this.progress[0]),
      totalSize: bytes(this.progress[1])
    };
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

  async upload(storage) {
    const start = Date.now();
    const plaintext = await this.readFile();
    if (this.cancelled) {
      throw new Error(0);
    }
    this.msg = 'encryptingFile';
    this.emit('encrypting');
    const encrypted = await this.keychain.encryptFile(plaintext);
    const metadata = await this.keychain.encryptMetadata(this.file);
    const authKeyB64 = await this.keychain.authKeyB64();
    if (this.cancelled) {
      throw new Error(0);
    }
    this.uploadRequest = uploadFile(
      encrypted,
      metadata,
      authKeyB64,
      this.keychain
    );
    this.msg = 'fileSizeProgress';
    this.uploadRequest.onprogress = p => {
      this.progress = p;
      this.emit('progress', p);
    };
    try {
      const result = await this.uploadRequest.result;
      const time = Date.now() - start;
      this.msg = 'notifyUploadDone';
      this.uploadRequest = null;
      this.progress = [1, 1];
      const secretKey = arrayToB64(this.keychain.rawSecret);
      const ownedFile = new OwnedFile(
        {
          id: result.id,
          url: `${result.url}#${secretKey}`,
          name: this.file.name,
          size: this.file.size,
          type: this.file.type, //TODO 'click' ?
          time: time,
          speed: this.file.size / (time / 1000),
          createdAt: Date.now(),
          expiresAt: Date.now() + EXPIRE_SECONDS * 1000,
          secretKey: secretKey,
          nonce: this.keychain.nonce,
          ownerToken: result.ownerToken
        },
        storage
      );
      return ownedFile;
    } catch (e) {
      this.msg = 'errorPageHeader';
      this.uploadRequest = null;
      throw e;
    }
  }
}
