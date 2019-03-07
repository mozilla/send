const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const mkdirp = require('mkdirp');

const stat = promisify(fs.stat);

class FSStorage {
  constructor(config, log) {
    this.log = log;
    this.dir = config.file_dir;
    mkdirp.sync(this.dir);
  }

  async length(id) {
    const result = await stat(path.join(this.dir, id));
    return result.size;
  }

  getStream(id) {
    return fs.createReadStream(path.join(this.dir, id));
  }

  set(id, file) {
    return new Promise((resolve, reject) => {
      const filepath = path.join(this.dir, id);
      const fstream = fs.createWriteStream(filepath);
      file.pipe(fstream);
      file.on('error', err => {
        fstream.destroy(err);
      });
      fstream.on('error', err => {
        fs.unlinkSync(filepath);
        reject(err);
      });
      fstream.on('finish', resolve);
    });
  }

  del(id) {
    return Promise.resolve(fs.unlinkSync(path.join(this.dir, id)));
  }

  ping() {
    return Promise.resolve();
  }
}

module.exports = FSStorage;
