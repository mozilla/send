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
    await storage.exists(id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
