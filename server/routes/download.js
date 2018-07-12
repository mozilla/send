const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const meta = req.meta;
    const contentLength = await storage.length(id);
    res.writeHead(200, {
      'Content-Disposition': 'attachment',
      'Content-Type': 'application/octet-stream',
      'Content-Length': contentLength,
      'WWW-Authenticate': `send-v1 ${req.nonce}`
    });
    const file_stream = storage.get(id);
    let sentBytes = 0;
    let cancelled = false;

    req.on('close', () => (cancelled = true));

    file_stream.on('data', c => (sentBytes += c.length));

    file_stream.on('end', async () => {
      if (cancelled) {
        return;
      }
      const dl = meta.dl + 1;
      const dlimit = meta.dlimit;
      try {
        if (dl >= dlimit) {
          await storage.del(id);
        } else {
          await storage.setField(id, 'dl', dl);
        }
      } catch (e) {
        log.info('StorageError:', id);
      }
    });

    file_stream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
};
