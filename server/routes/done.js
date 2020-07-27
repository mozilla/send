const storage = require('../storage');
const { statDownloadEvent } = require('../amplitude');

module.exports = async function(req, res) {
  try {
    const id = req.params.id;
    const meta = req.meta;
    const ttl = await storage.ttl(id);
    statDownloadEvent({
      id,
      ip: req.ip,
      owner: meta.owner,
      download_count: meta.dl,
      ttl,
      agent: req.ua.browser.name || req.ua.ua.substring(0, 6)
    });
    await storage.incrementField(id, 'dl');
    if (meta.dlToken >= meta.dlimit) {
      await storage.kill(id);
    }
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
