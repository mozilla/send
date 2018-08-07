const config = require('../config');
const storage = require('../storage');

module.exports = function(req, res) {
  const dlimit = req.body.dlimit;
  // TODO: fxa auth
  if (!dlimit || dlimit > config.max_downloads) {
    return res.sendStatus(400);
  }

  try {
    storage.setField(req.params.id, 'dlimit', dlimit);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
