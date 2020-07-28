const { sendBatch, clientEvent } = require('../amplitude');

module.exports = async function(req, res) {
  try {
    const data = JSON.parse(req.body); // see http://crbug.com/490015
    const deltaT = Date.now() - data.now;
    const events = data.events.map(e =>
      clientEvent(
        e,
        req.ua,
        data.lang,
        data.session_id + deltaT,
        deltaT,
        data.platform,
        req.geo.country,
        req.geo.state
      )
    );
    const status = await sendBatch(events);
    res.sendStatus(status);
  } catch (e) {
    res.sendStatus(500);
  }
};
