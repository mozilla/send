const storage = require('../storage');

module.exports = async function(req, res) {
  const id = req.params.id;
  const ownerToken = req.body.owner_token;
  if (!ownerToken) {
    return res.sendStatus(400);
  }

  const dlimit = req.body.dlimit;
  if (!dlimit || dlimit > 20) {
    return res.sendStatus(400);
  }

  try {
    const meta = await storage.metadata(id);
    if (meta.owner !== ownerToken) {
      return res.sendStatus(400);
    }
    storage.setField(id, 'dlimit', dlimit);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
