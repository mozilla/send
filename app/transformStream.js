/* global TransformStream */
import { createReadableStreamWrapper } from '@mattiasbuelens/web-streams-adapter';
import { TransformStream as TransformStreamPony } from 'web-streams-ponyfill';

const toNative = createReadableStreamWrapper(ReadableStream);

class TransformStreamLocal {
  constructor(transformer) {
    this.stream = new TransformStreamPony(transformer);
    this.local = true;
  }
  get nativeReadable() {
    return toNative(this.stream.readable);
  }
  get readable() {
    return this.stream.readable;
  }
  get writable() {
    return this.stream.writable;
  }
}

export default (typeof TransformStream === 'function'
  ? TransformStream
  : TransformStreamLocal);
