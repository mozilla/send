const storage = require('../storage');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = async function(req, res) {
  const id = req.params.id;

  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

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
