const { Transform } = require('stream');

class Limiter extends Transform {
  constructor(limit) {
    super();
    this.limit = limit;
    this.length = 0;
  }

  _transform(chunk, encoding, callback) {
    this.length += chunk.length;
    this.push(chunk);
    if (this.length > this.limit) {
      console.error('LIMIT', this.length, this.limit);
      return callback(new Error('limit'));
    }
    callback();
  }
}

module.exports = Limiter;
