import Keychain from './keychain';
import { arrayToB64 } from './utils';
import { del, metadata, setParams, setPassword } from './api';

export default class OwnedFile {
  constructor(obj, storage) {
    this.id = obj.id;
    this.url = obj.url;
    this.name = obj.name;
    this.size = obj.size;
    this.type = obj.type;
    this.time = obj.time;
    this.speed = obj.speed;
    this.createdAt = obj.createdAt;
    this.expiresAt = obj.expiresAt;
    this.ownerToken = obj.ownerToken;
    this.dlimit = obj.dlimit || 1;
    this.dtotal = obj.dtotal || 0;
    this.keychain = new Keychain(obj.secretKey, obj.nonce);
    this.keychain.on('nonceChanged', () => storage.writeFile(this));
    if (obj.authKeyB64) {
      this.authKeyB64 = obj.authKeyB64;
      this.keychain.setAuthKey(obj.authKeyB64);
    }
  }

  async setPassword(password) {
    this.password = password;
    this.keychain.setPassword(password, this.url);
    const result = await setPassword(this.id, this.ownerToken, this.keychain);
    this.authKeyB64 = await this.keychain.authKeyB64();
    return result;
  }

  del() {
    return del(this.id, this.ownerToken);
  }

  changeLimit(dlimit) {
    if (this.dlimit !== dlimit) {
      this.dlimit = dlimit;
      return setParams(this.id, this.ownerToken, { dlimit });
    }
    return Promise.resolve(true);
  }

  hasPassword() {
    return !!this.authKeyB64;
  }

  async updateDownloadCount() {
    try {
      const result = await metadata(this.id, this.keychain);
      this.dtotal = result.dtotal;
    } catch (e) {
      if (e.message === '404') {
        this.dtotal = this.dlimit;
      }
    }
  }

  toJSON() {
    return {
      id: this.id,
      url: this.url,
      name: this.name,
      size: this.size,
      type: this.type,
      time: this.time,
      speed: this.speed,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      secretKey: arrayToB64(this.keychain.rawSecret),
      nonce: this.keychain.nonce,
      ownerToken: this.ownerToken,
      dlimit: this.dlimit,
      dtotal: this.dtotal,
      authKeyB64: this.authKeyB64
    };
  }
}
