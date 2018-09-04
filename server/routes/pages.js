const routes = require('../../app/routes');
const storage = require('../storage');
const state = require('../state');

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
    try {
      const { nonce, pwd } = await storage.metadata(id);
      res.set('WWW-Authenticate', `send-v1 ${nonce}`);
      res.send(
        stripEvents(
          routes.toString(
            `/download/${id}`,
            Object.assign(state(req), {
              downloadMetadata: { nonce, pwd }
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
