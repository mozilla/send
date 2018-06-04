const streams = require('web-streams-polyfill');

class BlobSlicer {
  constructor(blob, size, decrypt) {
    this.blob = blob;
    this.size = size;
    this.index = 0;
    this.decrypt = decrypt;
  }

  pull(controller) {
    return new Promise((resolve, reject) => {
      const bytesLeft = this.blob.size - this.index;
      if (bytesLeft <= 0) {
        controller.close();
        return resolve();
      }
      let size = 0;
      if (this.decrypt && this.index === 0) {
        size = Math.min(21, bytesLeft);
      } else {
        size = Math.min(this.size, bytesLeft);
      }
      const blob = this.blob.slice(this.index, this.index + size);
      const reader = new FileReader();
      reader.onload = function() {
        controller.enqueue(new Uint8Array(this.result));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
      this.index += size;
    });
  }
}

export default class BlobSliceStream extends streams.ReadableStream {
  constructor(blob, size, decrypt) {
    super(new BlobSlicer(blob, size, decrypt));
  }
}
