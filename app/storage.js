import { arrayToB64, isFile } from './utils';
import OwnedFile from './ownedFile';

class Mem {
  constructor() {
    this.items = new Map();
  }

  get length() {
    return this.items.size;
  }

  getItem(key) {
    return this.items.get(key);
  }

  setItem(key, value) {
    return this.items.set(key, value);
  }

  removeItem(key) {
    return this.items.delete(key);
  }

  key(i) {
    return this.items.keys()[i];
  }
}

class Storage {
  constructor() {
    try {
      this.engine = localStorage || new Mem();
    } catch (e) {
      this.engine = new Mem();
    }
    this._files = this.loadFiles();
    this.pruneTokens();
  }

  loadFiles() {
    const fs = new Map();
    for (let i = 0; i < this.engine.length; i++) {
      const k = this.engine.key(i);
      if (isFile(k)) {
        try {
          const f = new OwnedFile(JSON.parse(this.engine.getItem(k)));
          if (!f.id) {
            f.id = f.fileId;
          }

          fs.set(f.id, f);
        } catch (err) {
          // obviously you're not a golfer
          this.engine.removeItem(k);
        }
      }
    }
    return fs;
  }

  get id() {
    let id = this.engine.getItem('device_id');
    if (!id) {
      id = arrayToB64(crypto.getRandomValues(new Uint8Array(16)));
      this.engine.setItem('device_id', id);
    }
    return id;
  }

  get totalDownloads() {
    return Number(this.engine.getItem('totalDownloads'));
  }
  set totalDownloads(n) {
    this.engine.setItem('totalDownloads', n);
  }
  get totalUploads() {
    return Number(this.engine.getItem('totalUploads'));
  }
  set totalUploads(n) {
    this.engine.setItem('totalUploads', n);
  }
  get referrer() {
    return this.engine.getItem('referrer');
  }
  set referrer(str) {
    this.engine.setItem('referrer', str);
  }
  get enrolled() {
    return JSON.parse(this.engine.getItem('ab_experiments') || '{}');
  }

  enroll(id, variant) {
    const enrolled = {};
    enrolled[id] = variant;
    this.engine.setItem('ab_experiments', JSON.stringify(enrolled));
  }

  get files() {
    return Array.from(this._files.values()).sort(
      (a, b) => a.createdAt - b.createdAt
    );
  }

  get user() {
    try {
      return JSON.parse(this.engine.getItem('user'));
    } catch (e) {
      return null;
    }
  }

  set user(info) {
    return this.engine.setItem('user', JSON.stringify(info));
  }

  getFileById(id) {
    return this._files.get(id);
  }

  get(id) {
    return this.engine.getItem(id);
  }

  set(id, value) {
    return this.engine.setItem(id, value);
  }

  remove(property) {
    if (isFile(property)) {
      this._files.delete(property);
    }
    this.engine.removeItem(property);
  }

  addFile(file) {
    this._files.set(file.id, file);
    this.writeFile(file);
  }

  writeFile(file) {
    this.engine.setItem(file.id, JSON.stringify(file));
  }

  writeFiles() {
    this._files.forEach(f => this.writeFile(f));
  }

  clearLocalFiles() {
    this._files.forEach(f => this.engine.removeItem(f.id));
    this._files = new Map();
  }

  async merge(files = []) {
    let incoming = false;
    let outgoing = false;
    let downloadCount = false;
    for (const f of files) {
      if (!this.getFileById(f.id)) {
        this.addFile(new OwnedFile(f));
        incoming = true;
      }
    }
    const workingFiles = this.files.slice();
    for (const f of workingFiles) {
      const cc = await f.updateDownloadCount();
      if (cc) {
        await this.writeFile(f);
      }
      downloadCount = downloadCount || cc;
      outgoing = outgoing || f.expired;
      if (f.expired) {
        this.remove(f.id);
      } else if (!files.find(x => x.id === f.id)) {
        outgoing = true;
      }
    }
    return {
      incoming,
      outgoing,
      downloadCount
    };
  }

  setDownloadToken(id, token) {
    let otherTokens = {};
    try {
      otherTokens = JSON.parse(this.get('dlTokens'));
    } catch (e) {
      //
    }
    if (token) {
      const record = { token, ts: Date.now() };
      this.set('dlTokens', JSON.stringify({ ...otherTokens, [id]: record }));
    } else {
      this.set('dlTokens', JSON.stringify({ ...otherTokens, [id]: undefined }));
    }
  }

  getDownloadToken(id) {
    try {
      return JSON.parse(this.get('dlTokens'))[id].token;
    } catch (e) {
      return undefined;
    }
  }

  pruneTokens() {
    try {
      const now = Date.now();
      const tokens = JSON.parse(this.get('dlTokens'));
      const keep = {};
      for (const id of Object.keys(tokens)) {
        const t = tokens[id];
        if (t.ts > now - 7 * 86400 * 1000) {
          keep[id] = t;
        }
      }
      if (Object.keys(keep).length < Object.keys(tokens).length) {
        this.set('dlTokens', JSON.stringify(keep));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default new Storage();
