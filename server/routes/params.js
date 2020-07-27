const config = require('../config');
const storage = require('../storage');

module.exports = function(req, res) {
  const max = req.meta.fxa ? config.max_downloads : config.anon_max_downloads;
  const dlimit = req.body.dlimit;
  if (!dlimit || dlimit > max) {
    return res.sendStatus(400);
  }

  try {
    storage.setField(req.params.id, 'dlimit', dlimit);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
