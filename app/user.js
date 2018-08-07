/* global LIMITS */
import assets from '../common/assets';
import { getFileList, setFileList } from './api';
import { encryptStream, decryptStream } from './ece';
import { b64ToArray, streamToArrayBuffer } from './utils';
import { blobStream } from './streams';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export default class User {
  constructor(info, storage) {
    if (info && storage) {
      storage.user = info;
    }
    this.storage = storage;
    this.data = info || storage.user || {};
  }

  get avatar() {
    const defaultAvatar = assets.get('user.svg');
    if (this.data.avatarDefault) {
      return defaultAvatar;
    }
    return this.data.avatar || defaultAvatar;
  }

  get name() {
    return this.data.displayName;
  }

  get email() {
    return this.data.email;
  }

  get loggedIn() {
    return !!this.data.access_token;
  }

  get bearerToken() {
    return this.data.access_token;
  }

  get maxSize() {
    return this.loggedIn ? LIMITS.MAX_FILE_SIZE : LIMITS.ANON.MAX_FILE_SIZE;
  }

  get maxExpireSeconds() {
    return this.loggedIn
      ? LIMITS.MAX_EXPIRE_SECONDS
      : LIMITS.ANON.MAX_EXPIRE_SECONDS;
  }

  get maxDownloads() {
    return this.loggedIn ? LIMITS.MAX_DOWNLOADS : LIMITS.ANON.MAX_DOWNLOADS;
  }

  login() {}

  logout() {
    this.storage.user = null;
    this.storage.clearLocalFiles();
    this.data = {};
  }

  async syncFileList() {
    let changes = { incoming: false, outgoing: false, downloadCount: false };
    if (!this.loggedIn) {
      return this.storage.merge();
    }
    let list = [];
    try {
      const encrypted = await getFileList(this.bearerToken);
      const decrypted = await streamToArrayBuffer(
        decryptStream(encrypted, b64ToArray(this.data.fileListKey))
      );
      list = JSON.parse(textDecoder.decode(decrypted));
    } catch (e) {
      //
    }
    changes = await this.storage.merge(list);
    if (!changes.outgoing) {
      return changes;
    }
    try {
      const blob = new Blob([
        textEncoder.encode(JSON.stringify(this.storage.files))
      ]);
      const encrypted = await streamToArrayBuffer(
        encryptStream(blobStream(blob), b64ToArray(this.data.fileListKey))
      );
      await setFileList(this.bearerToken, encrypted);
    } catch (e) {
      //
    }
    return changes;
  }

  toJSON() {
    return this.data;
  }
}
