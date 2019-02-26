const crypto = require('crypto');
const config = require('../config');
const storage = require('../storage');
const Limiter = require('../limiter');

function id(user, kid) {
  const sha = crypto.createHash('sha256');
  sha.update(user);
  sha.update(kid);
  const hash = sha.digest('hex');
  return `filelist-${hash}`;
}

module.exports = {
  async get(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const kid = req.params.id;
    try {
      const fileId = id(req.user, kid);
      const contentLength = await storage.length(fileId);
      const fileStream = await storage.get(fileId);
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': contentLength
      });
      fileStream.pipe(res);
    } catch (e) {
      res.sendStatus(404);
    }
  },

  async post(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const kid = req.params.id;
    try {
      const limiter = new Limiter(1024 * 1024 * 10);
      const fileStream = req.pipe(limiter);
      await storage.set(
        id(req.user, kid),
        fileStream,
        null,
        config.max_expire_seconds
      );
      res.sendStatus(200);
    } catch (e) {
      if (e.message === 'limit') {
        return res.sendStatus(413);
      }
      res.sendStatus(500);
    }
  }
};
