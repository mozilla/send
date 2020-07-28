const crypto = require('crypto');
const storage = require('../storage');
const config = require('../config');
const mozlog = require('../log');
const Limiter = require('../limiter');
const fxa = require('../fxa');
const { statUploadEvent } = require('../amplitude');
const { encryptedSize } = require('../../app/utils');

const { Transform } = require('stream');

const log = mozlog('send.upload');

module.exports = function(ws, req) {
  let fileStream;

  ws.on('close', e => {
    if (e !== 1000 && fileStream !== undefined) {
      fileStream.destroy();
    }
  });

  ws.once('message', async function(message) {
    try {
      const newId = crypto.randomBytes(8).toString('hex');
      const owner = crypto.randomBytes(10).toString('hex');

      const fileInfo = JSON.parse(message);
      const timeLimit = fileInfo.timeLimit || config.default_expire_seconds;
      const dlimit = fileInfo.dlimit || 1;
      const metadata = fileInfo.fileMetadata;
      const auth = fileInfo.authorization;
      const user = await fxa.verify(fileInfo.bearer);
      const maxFileSize = user
        ? config.max_file_size
        : config.anon_max_file_size;
      const maxExpireSeconds = user
        ? config.max_expire_seconds
        : config.anon_max_expire_seconds;
      const maxDownloads = user
        ? config.max_downloads
        : config.anon_max_downloads;

      if (config.fxa_required && !user) {
        ws.send(
          JSON.stringify({
            error: 401
          })
        );
        return ws.close();
      }
      if (
        !metadata ||
        !auth ||
        timeLimit <= 0 ||
        timeLimit > maxExpireSeconds ||
        dlimit > maxDownloads
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
        dlimit,
        auth: auth.split(' ')[1],
        nonce: crypto.randomBytes(16).toString('base64')
      };

      const protocol = config.env === 'production' ? 'https' : req.protocol;
      const url = `${protocol}://${req.get('host')}/download/${newId}/`;

      ws.send(
        JSON.stringify({
          url,
          ownerToken: meta.owner,
          id: newId
        })
      );
      const limiter = new Limiter(encryptedSize(maxFileSize));
      const eof = new Transform({
        transform: function(chunk, encoding, callback) {
          if (chunk.length === 1 && chunk[0] === 0) {
            this.push(null);
          } else {
            this.push(chunk);
          }
          callback();
        }
      });
      const wsStream = ws.constructor.createWebSocketStream(ws);

      fileStream = wsStream.pipe(eof).pipe(limiter); // limiter needs to be the last in the chain

      await storage.set(newId, fileStream, meta, timeLimit);

      if (ws.readyState === 1) {
        // if the socket is closed by a cancelled upload the stream
        // ends without an error so we need to check the state
        // before sending a reply.

        // TODO: we should handle cancelled uploads differently
        // in order to avoid having to check socket state and clean
        // up storage, possibly with an exception that we can catch.
        ws.send(JSON.stringify({ ok: true }));
        statUploadEvent({
          id: newId,
          ip: req.ip,
          country: req.geo.country,
          state: req.geo.state,
          owner,
          dlimit,
          timeLimit,
          anonymous: !user,
          size: limiter.length,
          agent: req.ua.browser.name || req.ua.ua.substring(0, 6)
        });
      }
    } catch (e) {
      log.error('upload', e);
      if (ws.readyState === 1) {
        ws.send(
          JSON.stringify({
            error: e === 'limit' ? 413 : 500
          })
        );
      }
    }
    ws.close();
  });
};
