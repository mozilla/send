/* global LIMITS */
import { blobStream, concatStream } from './streams';

function isDupe(newFile, array) {
  for (const file of array) {
    if (
      newFile.name === file.name &&
      newFile.size === file.size &&
      newFile.lastModified === file.lastModified
    ) {
      return true;
    }
  }
  return false;
}

export default class Archive {
  constructor(files = []) {
    this.files = Array.from(files);
  }

  get name() {
    return this.files.length > 1 ? 'Send-Archive.zip' : this.files[0].name;
  }

  get type() {
    return this.files.length > 1 ? 'send-archive' : this.files[0].type;
  }

  get size() {
    return this.files.reduce((total, file) => total + file.size, 0);
  }

  get numFiles() {
    return this.files.length;
  }

  get manifest() {
    return {
      files: this.files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };
  }

  get stream() {
    return concatStream(this.files.map(file => blobStream(file)));
  }

  addFiles(files, maxSize) {
    if (this.files.length + files.length > LIMITS.MAX_FILES_PER_ARCHIVE) {
      throw new Error('tooManyFiles');
    }
    const newFiles = files.filter(file => !isDupe(file, this.files));
    const newSize = newFiles.reduce((total, file) => total + file.size, 0);
    if (this.size + newSize > maxSize) {
      throw new Error('fileTooBig');
    }
    this.files = this.files.concat(newFiles);
    return true;
  }

  remove(file) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  clear() {
    this.files = [];
  }
}
