/* global ReadableStream TransformStream */

export function transformStream(readable, transformer, oncancel) {
  if (typeof TransformStream === 'function') {
    return readable.pipeThrough(new TransformStream(transformer));
  }
  const reader = readable.getReader();
  return new ReadableStream({
    start(controller) {
      if (transformer.start) {
        return transformer.start(controller);
      }
    },
    async pull(controller) {
      let enqueued = false;
      const wrappedController = {
        enqueue(d) {
          enqueued = true;
          controller.enqueue(d);
        }
      };
      while (!enqueued) {
        const data = await reader.read();
        if (data.done) {
          if (transformer.flush) {
            await transformer.flush(controller);
          }
          return controller.close();
        }
        await transformer.transform(data.value, wrappedController);
      }
    },
    cancel(reason) {
      readable.cancel(reason);
      if (oncancel) {
        oncancel(reason);
      }
    }
  });
}
