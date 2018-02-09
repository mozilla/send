const crypto = require('crypto');
const storage = require('../storage');

module.exports = async function(req, res, next) {
  const id = req.params.id;
  if (id && req.header('Authorization')) {
    try {
      const auth = req.header('Authorization').split(' ')[1];
      const meta = await storage.metadata(id);
      if (!meta) {
        return res.sendStatus(404);
      }
      const hmac = crypto.createHmac(
        'sha256',
        Buffer.from(meta.auth, 'base64')
      );
      hmac.update(Buffer.from(meta.nonce, 'base64'));
      const verifyHash = hmac.digest();
      if (verifyHash.equals(Buffer.from(auth, 'base64'))) {
        req.nonce = crypto.randomBytes(16).toString('base64');
        storage.setField(id, 'nonce', req.nonce);
        res.set('WWW-Authenticate', `send-v1 ${req.nonce}`);
        req.authorized = true;
        req.meta = meta;
      } else {
        res.set('WWW-Authenticate', `send-v1 ${meta.nonce}`);
        req.authorized = false;
      }
    } catch (e) {
      req.authorized = false;
    }
  }
  if (req.authorized) {
    next();
  } else {
    res.sendStatus(401);
  }
};
