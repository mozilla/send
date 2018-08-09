const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');
const Limiter = require('../limiter');
const Parser = require('../streamparser');
const wsStream = require('websocket-stream/stream');

const log = mozlog('send.upload');

module.exports = async function(ws, req) {
  let fileStream;

  ws.on('close', e => {
    if (e !== 1000 && fileStream !== undefined) {
      fileStream.destroy();
    }
  });

  ws.once('message', async function(message) {
    try {
      const newId = crypto.randomBytes(5).toString('hex');
      const owner = crypto.randomBytes(10).toString('hex');

      const fileInfo = JSON.parse(message);
      const timeLimit = fileInfo.timeLimit;
      const metadata = fileInfo.fileMetadata;
      const auth = fileInfo.authorization;

      if (
        !metadata ||
        !auth ||
        timeLimit <= 0 ||
        timeLimit > config.max_expire_seconds
      ) {
        ws.send(
          JSON.stringify({
            error: 400
          })
        );
        return ws.close();
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
      const parser = new Parser();
      fileStream = wsStream(ws, { binary: true })
        .pipe(limiter)
        .pipe(parser);
      await storage.set(newId, fileStream, meta, timeLimit);

      if (ws.readyState === 1) {
        // if the socket is closed by a cancelled upload the stream
        // ends without an error so we need to check the state
        // before sending a reply.

        // TODO: we should handle cancelled uploads differently
        // in order to avoid having to check socket state and clean
        // up storage, possibly with an exception that we can catch.
        ws.send(
          JSON.stringify({
            url,
            owner: meta.owner,
            id: newId,
            authentication: `send-v1 ${meta.nonce}`
          })
        );
      }
    } catch (e) {
      log.error('upload', e);
      if (ws.readyState === 1) {
        ws.send(
          JSON.stringify({
            error: e === 'limit' ? 413 : 500
          })
        );
        ws.close();
      }
    }
  });
};
