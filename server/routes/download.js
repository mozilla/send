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

    const fileStream = await storage.get(id);
    let cancelled = false;

    req.on('close', () => {
      cancelled = true;
      fileStream.destroy();
    });

    fileStream.on('end', async () => {
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

    fileStream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
};
