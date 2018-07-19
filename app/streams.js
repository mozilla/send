/* global ReadableStream TransformStream */

export function transformStream(readable, transformer) {
  if (typeof TransformStream === 'function') {
    return readable.pipeThrough(new TransformStream(transformer));
  }
  const reader = readable.getReader();
  const tstream = new ReadableStream({
    start(controller) {
      if (transformer.start) {
        return transformer.start(controller);
      }
    },
    async pull(controller) {
      let enqueued = false;
      const c = {
        enqueue(d) {
          enqueued = true;
          controller.enqueue(d);
        }
      };
      while (!enqueued) {
        const x = await reader.read();
        if (x.done) {
          if (transformer.flush) {
            await transformer.flush(controller);
          }
          return controller.close();
        }
        await transformer.transform(x.value, c);
      }
    },
    cancel() {
      readable.cancel();
    }
  });

  return tstream;
}
