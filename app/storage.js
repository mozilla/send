import { isFile } from './utils';
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
  }

  loadFiles() {
    const fs = [];
    for (let i = 0; i < this.engine.length; i++) {
      const k = this.engine.key(i);
      if (isFile(k)) {
        try {
          const f = new OwnedFile(JSON.parse(this.engine.getItem(k)), this);
          if (!f.id) {
            f.id = f.fileId;
          }
          fs.push(f);
        } catch (err) {
          // obviously you're not a golfer
          this.engine.removeItem(k);
        }
      }
    }
    return fs.sort((a, b) => a.createdAt - b.createdAt);
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
    return JSON.parse(this.engine.getItem('experiments') || '[]');
  }

  enroll(id, variant) {
    const enrolled = this.enrolled;
    // eslint-disable-next-line no-unused-vars
    if (!enrolled.find(([i, v]) => i === id)) {
      enrolled.push([id, variant]);
      this.engine.setItem('experiments', JSON.stringify(enrolled));
    }
  }

  get files() {
    return this._files;
  }

  getFileById(id) {
    return this._files.find(f => f.id === id);
  }

  get(id) {
    return this.engine.getItem(id);
  }

  remove(property) {
    if (isFile(property)) {
      this._files.splice(this._files.findIndex(f => f.id === property), 1);
    }
    this.engine.removeItem(property);
  }

  addFile(file) {
    this._files.push(file);
    this.writeFile(file);
  }

  writeFile(file) {
    this.engine.setItem(file.id, JSON.stringify(file));
  }

  writeFiles() {
    this._files.forEach(f => this.writeFile(f));
  }
}

export default new Storage();
