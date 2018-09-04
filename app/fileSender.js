/* global DEFAULTS */
import Nanobus from 'nanobus';
import OwnedFile from './ownedFile';
import Keychain from './keychain';
import { arrayToB64, bytes } from './utils';
import { uploadWs } from './api';
import { encryptedSize } from './ece';

export default class FileSender extends Nanobus {
  constructor() {
    super('FileSender');
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

  async upload(
    file,
    timeLimit = DEFAULTS.EXPIRE_SECONDS,
    dlimit = 1,
    bearerToken
  ) {
    const start = Date.now();
    if (this.cancelled) {
      throw new Error(0);
    }
    this.msg = 'encryptingFile';
    this.emit('encrypting');
    const totalSize = encryptedSize(file.size);
    const encStream = await this.keychain.encryptStream(file.stream);
    const metadata = await this.keychain.encryptMetadata(file);
    const authKeyB64 = await this.keychain.authKeyB64();

    this.uploadRequest = uploadWs(
      encStream,
      metadata,
      authKeyB64,
      timeLimit,
      dlimit,
      bearerToken,
      p => {
        this.progress = [p, totalSize];
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
        name: file.name,
        size: file.size,
        manifest: file.manifest,
        time: time,
        speed: file.size / (time / 1000),
        createdAt: Date.now(),
        expiresAt: Date.now() + timeLimit * 1000,
        secretKey: secretKey,
        nonce: this.keychain.nonce,
        ownerToken: result.ownerToken,
        timeLimit: timeLimit
      });

      return ownedFile;
    } catch (e) {
      this.msg = 'errorPageHeader';
      this.uploadRequest = null;
      throw e;
    }
  }
}
