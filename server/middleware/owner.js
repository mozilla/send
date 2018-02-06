const storage = require('../storage');

module.exports = async function(req, res, next) {
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
};
