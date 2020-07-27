const storage = require('../storage');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const { length, stream } = await storage.get(id);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': length
    });
    stream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
};
