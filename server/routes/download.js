const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');
const crypto = require('crypto');

module.exports = async function(req, res) {
  const id = req.params.id;

  try {
    const auth = req.header('Authorization').split(' ')[1];
    const meta = await storage.metadata(id);
    const hmac = crypto.createHmac('sha256', Buffer.from(meta.auth, 'base64'));
    hmac.update(Buffer.from(meta.nonce, 'base64'));
    const verifyHash = hmac.digest();
    if (!verifyHash.equals(Buffer.from(auth, 'base64'))) {
      res.set('WWW-Authenticate', `send-v1 ${meta.nonce}`);
      return res.sendStatus(401);
    }
    const nonce = crypto.randomBytes(16).toString('base64');
    storage.setField(id, 'nonce', nonce);
    const contentLength = await storage.length(id);
    res.writeHead(200, {
      'Content-Disposition': 'attachment',
      'Content-Type': 'application/octet-stream',
      'Content-Length': contentLength,
      'X-File-Metadata': meta.metadata,
      'WWW-Authenticate': `send-v1 ${nonce}`
    });
    const file_stream = storage.get(id);

    file_stream.on('end', async () => {
      const dl = (+meta.dl || 0) + 1;
      const dlimit = +meta.dlimit || 1;
      try {
        if (dl >= dlimit) {
          await storage.forceDelete(id);
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
