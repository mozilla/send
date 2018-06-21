const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');
const Limiter = require('../limiter');
const wsStream = require('websocket-stream/stream');

const log = mozlog('send.upload');

module.exports = async function(ws, req) {
  let fileStream;

  try {
    ws.on('close', e => {
      if (e !== 1000) {
        if (fileStream !== undefined) {
          fileStream.destroy();
        }
      }
    });

    let first = true;
    ws.on('message', function(message) {
      if (first) {
        const newId = crypto.randomBytes(5).toString('hex');
        const owner = crypto.randomBytes(10).toString('hex');

        const fileInfo = JSON.parse(message);
        const metadata = fileInfo.fileMetadata;
        const auth = fileInfo.authorization;

        /*
        if (!metadata || !auth) {
          return res.sendStatus(400);
        }
        */

        const meta = {
          owner,
          metadata,
          auth: auth.split(' ')[1],
          nonce: crypto.randomBytes(16).toString('base64')
        };

        const limiter = new Limiter(config.max_file_size);
        fileStream = wsStream(ws, { binary: true }).pipe(limiter);
        storage.set(newId, fileStream, meta);

        const protocol = config.env === 'production' ? 'https' : req.protocol;
        const url = `${protocol}://${req.get('host')}/download/${newId}/`;

        ws.send(
          JSON.stringify({
            url,
            owner: meta.owner,
            id: newId,
            authentication: `send-v1 ${meta.nonce}`
          })
        );

        first = false;
      }
    });
  } catch (e) {
    log.error('upload', e);
    //res.sendStatus(500);
  }
};
