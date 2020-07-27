const storage = require('../storage');

module.exports = async function(req, res) {
  const id = req.params.id;
  const meta = req.meta;
  try {
    if (meta.dead && !meta.flagged) {
      return res.sendStatus(404);
    }
    const ttl = await storage.ttl(id);
    res.send({
      metadata: meta.metadata,
      flagged: !!meta.flagged,
      finalDownload: meta.dlToken + 1 === meta.dlimit,
      ttl
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
