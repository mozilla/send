const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');
const { statDownloadEvent } = require('../amplitude');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const meta = req.meta;
    const fileStream = await storage.get(id);
    let cancelled = false;

    req.on('close', () => {
      cancelled = true;
      fileStream.destroy();
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
        ttl
      });
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
  } catch (e) {
    res.sendStatus(404);
  }
};
