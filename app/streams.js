/* global TransformStream ReadableStream */
import { createReadableStreamWrapper } from '@mattiasbuelens/web-streams-adapter';
import {
  TransformStream as TransformStreamPony,
  ReadableStream as ReadableStreamPony
} from 'web-streams-ponyfill';

const toNativeReadable = createReadableStreamWrapper(ReadableStream);
const toPonyReadable = createReadableStreamWrapper(ReadableStreamPony);

export let TStream;
if (typeof TransformStream === 'function') {
  TStream = TransformStream;
} else {
  TStream = TransformStreamPony;
  TStream.prototype.isPony = true;
}

export let RStream = ReadableStream;
try {
  new ReadableStream().pipeThrough(new TransformStream());
} catch (e) {
  RStream = ReadableStreamPony;
  RStream.prototype.isPony = true;
  RStream.prototype.toNative = function() {
    return toNativeReadable(this);
  };
}

export function wrapReadable(stream) {
  if (RStream === ReadableStream) {
    return stream;
  }
  return toPonyReadable(stream);
}
