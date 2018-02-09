const storage = require('../storage');

module.exports = async function(req, res) {
  try {
    await storage.del(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
