const storage = require('../storage');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = async (req, res) => {
  const id = req.params.id;
  if (!validateID(id)) {
    return res.sendStatus(404);
  }

  try {
    const meta = await storage.metadata(id);
    res.set('WWW-Authenticate', `send-v1 ${meta.nonce}`);
    res.send({
      password: meta.pwd !== '0'
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
