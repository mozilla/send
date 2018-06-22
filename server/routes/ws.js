const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');
const Limiter = require('../limiter');
const wsStream = require('websocket-stream/stream');

const log = mozlog('send.upload');

module.exports = async function(ws, req) {
  let fileStream;

  ws.on('close', e => {
    if (e !== 1000 && fileStream !== undefined) {
      fileStream.destroy();
    }
  });

  let first = true;
  ws.on('message', async function(message) {
    try {
      if (first) {
        const newId = crypto.randomBytes(5).toString('hex');
        const owner = crypto.randomBytes(10).toString('hex');

        const fileInfo = JSON.parse(message);
        const metadata = fileInfo.fileMetadata;
        const auth = fileInfo.authorization;

        if (!metadata || !auth) {
          ws.send(
            JSON.stringify({
              error: 400
            })
          );
          ws.close();
        }

        const meta = {
          owner,
          metadata,
          auth: auth.split(' ')[1],
          nonce: crypto.randomBytes(16).toString('base64')
        };

        const protocol = config.env === 'production' ? 'https' : req.protocol;
        const url = `${protocol}://${req.get('host')}/download/${newId}/`;

        const limiter = new Limiter(config.max_file_size);
        fileStream = wsStream(ws, { binary: true }).pipe(limiter);
        storage.set(newId, fileStream, meta);

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
    } catch (e) {
      log.error('upload', e);
      ws.send(
        JSON.stringify({
          error: 500
        })
      );
      ws.close();
    }
  });
};
