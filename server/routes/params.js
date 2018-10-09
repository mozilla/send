const storage = require('../storage');
const config = require('../config');

module.exports = function(req, res) {
  const dlimit = req.body.dlimit;
  const expire_limit = [config.expire_limit];
  const expire_max = expire_limit[expire_limit.length - 1];
  if (!dlimit || dlimit > expire_max) {
    return res.sendStatus(400);
  }

  try {
    storage.setField(req.params.id, 'dlimit', dlimit);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
