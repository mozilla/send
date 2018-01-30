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
    return res.sendStatus(400);
  }

  try {
    const meta = await storage.metadata(id);
    if (meta.owner !== ownerToken) {
      return res.sendStatus(400);
    }
    const ttl = await storage.ttl(id);
    return res.send({
      dlimit: meta.dlimit,
      dtotal: meta.dl,
      ttl
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
