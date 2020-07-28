const storage = require('../storage');
const { statReportEvent } = require('../amplitude');

module.exports = async function(req, res) {
  try {
    const id = req.params.id;
    const meta = await storage.metadata(id);
    storage.flag(id);
    statReportEvent({
      id,
      ip: req.ip,
      country: req.geo.country,
      state: req.geo.state,
      owner: meta.owner,
      reason: req.body.reason,
      download_limit: meta.dlimit,
      download_count: meta.dl,
      agent: req.ua.browser.name || req.ua.ua.substring(0, 6)
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
