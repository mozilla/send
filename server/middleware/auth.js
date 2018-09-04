const crypto = require('crypto');
const storage = require('../storage');
const fxa = require('../routes/fxa');

module.exports = {
  hmac: async function(req, res, next) {
    const id = req.params.id;
    const authHeader = req.header('Authorization');
    if (id && authHeader) {
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
  },
  owner: async function(req, res, next) {
    const id = req.params.id;
    const ownerToken = req.body.owner_token;
    if (id && ownerToken) {
      try {
        req.meta = await storage.metadata(id);
        if (!req.meta) {
          return res.sendStatus(404);
        }
        req.authorized = req.meta.owner === ownerToken;
      } catch (e) {
        req.authorized = false;
      }
    }
    if (req.authorized) {
      next();
    } else {
      res.sendStatus(401);
    }
  },
  fxa: async function(req, res, next) {
    const authHeader = req.header('Authorization');
    if (authHeader && /^Bearer\s/i.test(authHeader)) {
      const token = authHeader.split(' ')[1];
      req.user = await fxa.verify(token);
    }
    return next();
  }
};
