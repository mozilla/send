const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const config = require('../config');
const pages = require('./pages');

const KEY_SCOPE = 'https://identity.mozilla.com/apps/send';
let fxaConfig = null;
let lastConfigRefresh = 0;

async function getFxaConfig() {
  if (fxaConfig && Date.now() - lastConfigRefresh < 1000 * 60 * 5) {
    return fxaConfig;
  }
  const res = await fetch(`${config.fxa_url}/.well-known/openid-configuration`);
  fxaConfig = await res.json();
  lastConfigRefresh = Date.now();
  return fxaConfig;
}

module.exports = {
  login: async function(req, res) {
    const query = req.query;
    if (!query || !query.keys_jwk) {
      return res.sendStatus(400);
    }
    const c = await getFxaConfig();
    const params = new URLSearchParams({
      client_id: config.fxa_client_id,
      redirect_uri: `${config.base_url}/api/fxa/oauth`,
      state: 'todo',
      scope: `profile ${KEY_SCOPE}`,
      action: 'email',
      keys_jwk: query.keys_jwk
    });
    res.redirect(`${c.authorization_endpoint}?${params.toString()}`);
  },

  oauth: async function(req, res) {
    const query = req.query;
    if (!query || !query.code || !query.state || !query.action) {
      return res.sendStatus(400);
    }
    const c = await getFxaConfig();
    const x = await fetch(c.token_endpoint, {
      method: 'POST',
      body: JSON.stringify({
        code: query.code,
        client_id: config.fxa_client_id,
        client_secret: config.fxa_client_secret
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const zzz = await x.json();
    console.error(zzz);
    const p = await fetch(c.userinfo_endpoint, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${zzz.access_token}`
      }
    });
    const userInfo = await p.json();
    userInfo.keys_jwe = zzz.keys_jwe;
    userInfo.access_token = zzz.access_token;
    req.userInfo = userInfo;
    pages.index(req, res);
  },

  verify: async function(token) {
    if (!token) {
      return null;
    }

    const c = await getFxaConfig();
    try {
      const verifyUrl = c.jwks_uri.replace('jwks', 'verify');
      const result = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const info = await result.json();
      if (
        info.scope &&
        Array.isArray(info.scope) &&
        info.scope.includes(KEY_SCOPE)
      ) {
        return info.user;
      }
    } catch (e) {
      // gulp
    }
    return null;
  }
};
