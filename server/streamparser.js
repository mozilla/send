const { Transform } = require('stream');

class StreamParser extends Transform {
  constructor() {
    super();
    let res;
    this.promise = new Promise(resolve => {
      res = resolve;
    });
    this.res = res;
  }

  _transform(chunk, encoding, callback) {
    if (chunk.byteLength === 1 && chunk[0] === 0) {
      this.res();
    } else {
      this.push(chunk);
    }
    callback();
  }
}

module.exports = StreamParser;
