const { isFile } = require('./utils');

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

  get files() {
    const fs = [];
    for (let i = 0; i < this.engine.length; i++) {
      const k = this.engine.key(i);
      if (isFile(k)) {
        try {
          fs.push(JSON.parse(this.engine.getItem(k)));
        } catch (err) {
          // obviously you're not a golfer
          this.engine.removeItem(k);
        }
      }
    }
    return fs.sort((file1, file2) => {
      const creationDate1 = new Date(file1.creationDate);
      const creationDate2 = new Date(file2.creationDate);
      return creationDate1 - creationDate2;
    });
  }

  get numFiles() {
    let length = 0;
    for (let i = 0; i < this.engine.length; i++) {
      const k = this.engine.key(i);
      if (isFile(k)) {
        length += 1;
      }
    }
    return length;
  }

  getFileById(id) {
    return this.engine.getItem(id);
  }

  remove(property) {
    this.engine.removeItem(property);
  }

  addFile(id, file) {
    this.engine.setItem(id, JSON.stringify(file));
  }
}

module.exports = Storage;
