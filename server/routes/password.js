const storage = require('../storage');
const crypto = require('crypto');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = async function(req, res) {
  const id = req.params.id;
  if (!validateID(id)) {
    return res.sendStatus(404);
  }
  if (!req.body.auth) {
    return res.sendStatus(400);
  }

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
  } catch (e) {
    res.sendStatus(404);
  }
  storage.setField(id, 'auth', req.body.auth);
  storage.setField(id, 'pwd', 1);
  res.sendStatus(200);
};
