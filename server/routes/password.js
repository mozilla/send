const storage = require('../storage');

module.exports = function(req, res) {
  const id = req.params.id;
  const auth = req.body.auth;
  if (!auth) {
    return res.sendStatus(400);
  }

  try {
    storage.setField(id, 'auth', auth);
    storage.setField(id, 'pwd', true);
    res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
};
