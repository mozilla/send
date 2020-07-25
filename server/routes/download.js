const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');
const { statDownloadEvent } = require('../amplitude');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const meta = req.meta;
    const contentLength = await storage.length(id);
    const fileStream = await storage.get(id);
    let cancelled = false;

    req.on('aborted', () => {
      cancelled = true;
      fileStream.destroy();
    });

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': contentLength
    });
    fileStream.pipe(res).on('finish', async () => {
      if (cancelled) {
        return;
      }

      const dl = meta.dl + 1;
      const dlimit = meta.dlimit;
      const ttl = await storage.ttl(id);
      statDownloadEvent({
        id,
        ip: req.ip,
        owner: meta.owner,
        download_count: dl,
        ttl,
        agent: req.ua.browser.name || req.ua.ua.substring(0, 6)
      });
      try {
        if (dl >= dlimit) {
          await storage.kill(id);
        } else {
          await storage.incrementField(id, 'dl');
        }
      } catch (e) {
        log.info('StorageError:', id);
      }
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
