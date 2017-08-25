const storage = require('../storage');
const mozlog = require('../log');
const log = mozlog('send.download');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = async function(req, res) {
  const id = req.params.id;
  if (!validateID(id)) {
    return res.sendStatus(404);
  }

  try {
    const meta = await storage.metadata(id);
    const contentLength = await storage.length(id);
    res.writeHead(200, {
      'Content-Disposition': `attachment; filename=${meta.filename}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': contentLength,
      'X-File-Metadata': JSON.stringify(meta)
    });
    const file_stream = storage.get(id);

    file_stream.on('end', async () => {
      try {
        await storage.forceDelete(id);
      } catch (e) {
        log.info('DeleteError:', id);
      }
    });

    file_stream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
};
