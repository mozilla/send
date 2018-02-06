const storage = require('../storage');

module.exports = function(req, res) {
  const dlimit = req.body.dlimit;
  if (!dlimit || dlimit > 20) {
    return res.sendStatus(400);
  }

  try {
    storage.setField(req.params.id, 'dlimit', dlimit);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
