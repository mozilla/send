const { sendBatch, clientEvent } = require('../amplitude');
const statsdClient = require('statsd-client');
const config = require('../config');

async function sendToAmplitude(data, req) {
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
  return sendBatch(events);
}

function sendToStatsd(data) {
  let client = new statsdClient({
    host: config.statsd_host,
    port: config.statsd_port,
    prefix: config.statsd_prefix
  });

  data.events.forEach(function(e) {
    let metric_name = e.event_type;
    if (e.event_properties && e.event_properties.status) {
      metric_name += `_${e.event_properties.status}`;
    }

    console.log('event: ' + metric_name);
    client.increment(metric_name);
  });
}

module.exports = async function(req, res) {
  try {
    const data = JSON.parse(req.body); // see http://crbug.com/490015

    sendToStatsd(data);
    const status = await sendToAmplitude(data, req);

    res.sendStatus(status);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
