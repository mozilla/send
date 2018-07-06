const { Duplex } = require('stream');

class StreamParser extends Duplex {
  _write(chunk, encoding, callback) {
    if (chunk.byteLength === 1 && chunk[0] === 0) {
      this.push(null);
    } else {
      this.push(chunk);
    }
    callback();
  }
  _read() {}
}

module.exports = StreamParser;
