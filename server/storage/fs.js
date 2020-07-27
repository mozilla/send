const fss = require('fs');
const fs = fss.promises;
const path = require('path');
const mkdirp = require('mkdirp');

class FSStorage {
  constructor(config, log) {
    this.log = log;
    this.dir = config.file_dir;
    mkdirp.sync(this.dir);
  }

  async length(id) {
    const result = await fs.stat(path.join(this.dir, id));
    return result.size;
  }

  getStream(id) {
    return fss.createReadStream(path.join(this.dir, id));
  }

  set(id, file) {
    return new Promise((resolve, reject) => {
      const filepath = path.join(this.dir, id);
      const fstream = fss.createWriteStream(filepath);
      file.pipe(fstream);
      file.on('error', err => {
        fstream.destroy(err);
      });
      fstream.on('error', err => {
        this.del(id);
        reject(err);
      });
      fstream.on('finish', resolve);
    });
  }

  async del(id) {
    try {
      await fs.unlink(path.join(this.dir, id));
    } catch (e) {
      // ignore local fs issues
    }
  }

  ping() {
    return Promise.resolve();
  }
}

module.exports = FSStorage;
