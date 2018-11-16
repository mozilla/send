const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

class GCSStorage {
  constructor(config, log) {
    this.bucket = storage.bucket(config.gcs_bucket);
    this.log = log;
  }

  async length(id) {
    const data = await this.bucket.file(id).getMetadata();
    return data[0].size;
  }

  getStream(id) {
    return this.bucket.file(id).createReadStream({ validation: false });
  }

  set(id, file) {
    return new Promise((resolve, reject) => {
      file
        .pipe(this.bucket.file(id).createWriteStream())
        .on('error', reject)
        .on('finish', resolve);
    });
  }

  del(id) {
    return this.bucket.file(id).delete();
  }

  ping() {
    return this.bucket.exists();
  }
}

module.exports = GCSStorage;
