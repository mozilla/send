const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const meta = req.meta;
    const file_stream = storage.get(id);
    let cancelled = false;

    req.on('close', () => {
      cancelled = true;
      file_stream.destroy();
    });

    file_stream.pipe(res).on('finish', async () => {
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
  } catch (e) {
    res.sendStatus(404);
  }
};
