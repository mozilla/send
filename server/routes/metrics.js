const { sendBatch, clientEvent } = require('../amplitude');

module.exports = async function(req, res) {
  try {
    const data = req.body;
    const deltaT = Date.now() - data.now;
    const events = data.events.map(e =>
      clientEvent(
        e,
        req.ua,
        data.lang,
        data.session_id + deltaT,
        deltaT,
        data.platform,
        req.ip
      )
    );
    const status = await sendBatch(events);
    res.sendStatus(status);
  } catch (e) {
    res.sendStatus(500);
  }
};
