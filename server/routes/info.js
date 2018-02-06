const storage = require('../storage');

module.exports = async function(req, res) {
  try {
    const ttl = await storage.ttl(req.params.id);
    return res.send({
      dlimit: +req.meta.dlimit,
      dtotal: +req.meta.dl,
      ttl
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
