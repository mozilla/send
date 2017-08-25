const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');

const log = mozlog('send.upload');

const validateIV = route_id => {
  return route_id.match(/^[0-9a-fA-F]{24}$/) !== null;
};

module.exports = function(req, res) {
  const newId = crypto.randomBytes(5).toString('hex');
  let meta;

  try {
    meta = JSON.parse(req.header('X-File-Metadata'));
  } catch (e) {
    res.sendStatus(400);
    return;
  }

  if (
    !meta.hasOwnProperty('id') ||
    !meta.hasOwnProperty('filename') ||
    !validateIV(meta.id)
  ) {
    res.sendStatus(404);
    return;
  }

  meta.delete = crypto.randomBytes(10).toString('hex');
  req.pipe(req.busboy);

  req.busboy.on(
    'file',
    async (fieldname, file, filename, encoding, mimeType) => {
      try {
        meta.mimeType = mimeType || 'application/octet-stream';
        await storage.set(newId, file, filename, meta);
        const protocol = config.env === 'production' ? 'https' : req.protocol;
        const url = `${protocol}://${req.get('host')}/download/${newId}/`;
        res.json({
          url,
          delete: meta.delete,
          id: newId
        });
      } catch (e) {
        log.error('upload', e);
        if (e.message === 'limit') {
          return res.sendStatus(413);
        }
        res.sendStatus(500);
      }
    }
  );

  req.on('close', async err => {
    try {
      await storage.forceDelete(newId);
    } catch (e) {
      log.info('DeleteError:', newId);
    }
  });
};
