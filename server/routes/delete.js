const storage = require('../storage');

module.exports = async function(req, res) {
  const id = req.params.id;

  const ownerToken = req.body.owner_token || req.body.delete_token;

  if (!ownerToken) {
    res.sendStatus(404);
    return;
  }

  try {
    const err = await storage.delete(id, ownerToken);
    if (!err) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(404);
  }
};
