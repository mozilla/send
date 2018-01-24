const routes = require('../../app/routes');
const storage = require('../storage');
const state = require('../state');

function validateID(route_id) {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
}

function stripEvents(str) {
  // For CSP we need to remove all the event handler placeholders.
  // It's ok, app.js will add them when it attaches to the DOM.
  return str.replace(/\son\w+=""/g, '');
}

module.exports = {
  index: function(req, res) {
    res.send(stripEvents(routes.toString('/', state(req))));
  },

  blank: function(req, res) {
    res.send(stripEvents(routes.toString('/blank', state(req))));
  },

  download: async function(req, res, next) {
    const id = req.params.id;
    if (!validateID(id)) {
      return next();
    }

    try {
      const { nonce, pwd } = await storage.metadata(id);
      res.set('WWW-Authenticate', `send-v1 ${nonce}`);
      res.send(
        stripEvents(
          routes.toString(
            `/download/${req.params.id}`,
            Object.assign(state(req), {
              fileInfo: { nonce, requiresPassword: +pwd }
            })
          )
        )
      );
    } catch (e) {
      next();
    }
  },

  unsupported: function(req, res) {
    res.send(
      stripEvents(
        routes.toString(
          `/unsupported/${req.params.reason}`,
          Object.assign(state(req), { fira: true })
        )
      )
    );
  },

  legal: function(req, res) {
    res.send(stripEvents(routes.toString('/legal', state(req))));
  },

  notfound: function(req, res) {
    res.status(404).send(stripEvents(routes.toString('/404', state(req))));
  }
};
