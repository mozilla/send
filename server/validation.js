function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

module.exports = {
  middleware: function(req, res, next) {
    if (req.params.id && !validateID(req.params.id)) {
      return res.sendStatus(404);
    }
    next();
  }
};
