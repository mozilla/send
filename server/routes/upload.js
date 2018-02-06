const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');

const log = mozlog('send.upload');

module.exports = function(req, res) {
  const newId = crypto.randomBytes(5).toString('hex');
  const metadata = req.header('X-File-Metadata');
  const auth = req.header('Authorization');
  if (!metadata || !auth) {
    return res.sendStatus(400);
  }
  const owner = crypto.randomBytes(10).toString('hex');
  const meta = {
    owner,
    metadata,
    auth: auth.split(' ')[1],
    nonce: crypto.randomBytes(16).toString('base64')
  };
  req.pipe(req.busboy);

  req.busboy.on('file', async (fieldname, file) => {
    try {
      await storage.set(newId, file, meta);
      const protocol = config.env === 'production' ? 'https' : req.protocol;
      const url = `${protocol}://${req.get('host')}/download/${newId}/`;
      res.set('WWW-Authenticate', `send-v1 ${meta.nonce}`);
      res.json({
        url,
        owner: meta.owner,
        id: newId
      });
    } catch (e) {
      log.error('upload', e);
      if (e.message === 'limit') {
        return res.sendStatus(413);
      }
      res.sendStatus(500);
    }
  });

  req.on('close', async err => {
    try {
      await storage.del(newId);
    } catch (e) {
      log.info('DeleteError:', newId);
    }
  });
};
