module.exports = async function(req, res) {
  const meta = req.meta;
  try {
    if (meta.dead || meta.flagged) {
      return res.sendStatus(404);
    }
    const token = await meta.getDownloadToken();
    res.send({
      token
    });
  } catch (e) {
    if (e.message === 'limit') {
      return res.sendStatus(403);
    }
    res.sendStatus(404);
  }
};
