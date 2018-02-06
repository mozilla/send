const storage = require('../storage');
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
    res.set('WWW-Authenticate', `send-v1 ${nonce}`);

    const size = await storage.length(id);
    const ttl = await storage.ttl(id);
    res.send({
      metadata: meta.metadata,
      finalDownload: +meta.dl + 1 === +meta.dlimit,
      size,
      ttl
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
