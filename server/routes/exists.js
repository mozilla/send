const storage = require('../storage');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const meta = await storage.metadata(id);
    res.set('WWW-Authenticate', `send-v1 ${meta.nonce}`);
    res.send({
      password: meta.pwd !== '0'
    });
  } catch (e) {
    res.sendStatus(404);
  }
};
