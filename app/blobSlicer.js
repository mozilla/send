export default class BlobSlicer {
  constructor(blob, size) {
    this.blob = blob;
    this.index = 0;
    this.chunkSize = size;
  }

  pull(controller) {
    return new Promise((resolve, reject) => {
      const bytesLeft = this.blob.size - this.index;
      if (bytesLeft <= 0) {
        controller.close();
        return resolve();
      }
      const size = Math.min(this.chunkSize, bytesLeft);
      const blob = this.blob.slice(this.index, this.index + size);
      const reader = new FileReader();
      reader.onload = () => {
        controller.enqueue(new Uint8Array(reader.result));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
      this.index += size;
    });
  }
}
