import Nanobus from 'nanobus';
import Keychain from './keychain';
import { bytes } from './utils';
import { metadata, downloadFile, downloadStream} from './api';

export default class FileReceiver extends Nanobus {
  constructor(fileInfo) {
    super('FileReceiver');
    this.keychain = new Keychain(fileInfo.secretKey, fileInfo.nonce);
    if (fileInfo.requiresPassword) {
      this.keychain.setPassword(fileInfo.password, fileInfo.url);
    }
    this.fileInfo = fileInfo;
    this.reset();
  }

  get progressRatio() {
    return this.progress[0] / this.progress[1];
  }

  get progressIndefinite() {
    return this.state !== 'downloading';
  }

  get sizes() {
    return {
      partialSize: bytes(this.progress[0]),
      totalSize: bytes(this.progress[1])
    };
  }

  cancel() {
    if (this.downloadRequest) {
      this.downloadRequest.cancel();
    }
  }

  reset() {
    this.msg = 'fileSizeProgress';
    this.state = 'initialized';
    this.progress = [0, 1];
  }

  async getMetadata() {
    const meta = await metadata(this.fileInfo.id, this.keychain);
    this.keychain.setIV(meta.iv);
    this.fileInfo.name = meta.name;
    this.fileInfo.type = meta.type;
    this.fileInfo.iv = meta.iv;
    this.fileInfo.size = meta.size;
    this.state = 'ready';
  }

  /*
    async streamToArrayBuffer(stream, streamSize) {
    try {
      var finish;
      const promise = new Promise((resolve) => {
        finish = resolve;
      });
      const result = new Uint8Array(streamSize);
      let offset = 0;


      const writer = new WritableStream(
        {
          write(chunk) {
            result.set(state.value, offset);
            offset += state.value.length;
          },
          close() {
            //resolve a promise or something
            finish.resolve();
          }
        }
      );

      stream.pipeTo(writer);

      await promise;
      return result.slice(0, offset).buffer;

    } catch (e) {
      console.log(e)
    }
  }
  */

  async streamToArrayBuffer(stream, streamSize) {
    try {
      const result = new Uint8Array(streamSize);
      let offset = 0;
      console.log("reading...")
      const reader = stream.getReader();
      let state = await reader.read();
      console.log("read done")
      while (!state.done) {
        result.set(state.value, offset);
        offset += state.value.length;
        state = await reader.read();
      }

      return result.slice(0, offset).buffer;
    } catch (e) {
      console.log(e)
    }
  }

  async download(noSave = false) {
    this.state = 'downloading';
    this.downloadRequest = await downloadStream(
      this.fileInfo.id,
      this.keychain,
      p => {
        this.progress = p;
        this.emit('progress');
      }
    );

    try {

      const ciphertext = await this.downloadRequest.result;
      this.downloadRequest = null;
      this.msg = 'decryptingFile';
      this.state = 'decrypting';
      this.emit('decrypting');

      const dec = this.keychain.decryptStream(ciphertext);

      let plaintext = await this.streamToArrayBuffer(
        dec.stream,
        this.fileInfo.size
      );

      if (plaintext === undefined) { plaintext = (new Uint8Array(1)).buffer; }

      if (!noSave) {
        await saveFile({
          plaintext,
          name: decodeURIComponent(this.fileInfo.name),
          type: this.fileInfo.type
        });
      }

      this.msg = 'downloadFinish';
      this.state = 'complete';

    } catch (e) {
      this.downloadRequest = null;
      throw e;
    }
  }
}

async function saveFile(file) {
  return new Promise(function(resolve, reject) {
    const dataView = new DataView(file.plaintext);
    const blob = new Blob([dataView], { type: file.type });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, file.name);
      return resolve();
    } else if (/iPhone|fxios/i.test(navigator.userAgent)) {
      // This method is much slower but createObjectURL
      // is buggy on iOS
      const reader = new FileReader();
      reader.addEventListener('loadend', function() {
        if (reader.error) {
          return reject(reader.error);
        }
        if (reader.result) {
          const a = document.createElement('a');
          a.href = reader.result;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
        }
        resolve();
      });
      reader.readAsDataURL(blob);
    } else {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
      setTimeout(resolve, 100);
    }
  });
}
