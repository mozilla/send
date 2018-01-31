const storage = require('../storage');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = async function(req, res) {
  const id = req.params.id;
  if (!validateID(id)) {
    return res.sendStatus(404);
  }
  const ownerToken = req.body.owner_token;
  if (!ownerToken) {
    return res.sendStatus(404);
  }
  const auth = req.body.auth;
  if (!auth) {
    return res.sendStatus(400);
  }

  try {
    const meta = await storage.metadata(id);
    if (meta.owner !== ownerToken) {
      return res.sendStatus(404);
    }
    storage.setField(id, 'auth', auth);
    storage.setField(id, 'pwd', 1);
    res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
};
