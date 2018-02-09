const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const storage = {
  metadata: sinon.stub(),
  setField: sinon.stub()
};

function request(id, auth) {
  return {
    params: { id },
    header: sinon.stub().returns(auth)
  };
}

function response() {
  return {
    sendStatus: sinon.stub(),
    set: sinon.stub()
  };
}

const next = sinon.stub();

const storedMeta = {
  auth:
    'r9uFxEs9GEVaQR9CJJ0uTKFGhFSOTRjOY2FCLFlCIZ0Cr-VGTVpMGlXDbNR8RMT55trMpSrzWtBVKq1LffOT2g',
  nonce: 'FL4oxA7IE1PW8shwFN9qZw=='
};

const authMiddleware = proxyquire('../../server/middleware/auth', {
  '../storage': storage
});

describe('Owner Middleware', function() {
  afterEach(function() {
    storage.metadata.reset();
    storage.setField.reset();
    next.reset();
  });

  it('sends a 401 when no auth header is set', async function() {
    const req = request('x');
    const res = response();
    await authMiddleware(req, res, next);
    sinon.assert.calledWith(res.sendStatus, 401);
    sinon.assert.notCalled(next);
  });

  it('sends a 404 when metadata is not found', async function() {
    const req = request('x', 'y');
    const res = response();
    await authMiddleware(req, res, next);
    sinon.assert.calledWith(res.sendStatus, 404);
    sinon.assert.notCalled(next);
  });

  it('sends a 401 when the auth header is invalid base64', async function() {
    storage.metadata.returns(Promise.resolve(storedMeta));
    const req = request('x', '1');
    const res = response();
    await authMiddleware(req, res, next);
    sinon.assert.calledWith(res.sendStatus, 401);
    sinon.assert.notCalled(next);
  });

  it('authenticates when the hashes match', async function() {
    storage.metadata.returns(Promise.resolve(storedMeta));
    const req = request(
      'x',
      'send-v1 R7nZk14qJqZXtxpnAtw2uDIRQTRnO1qSO1Q0PiwcNA8'
    );
    const res = response();
    await authMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
    sinon.assert.calledWith(storage.setField, 'x', 'nonce', req.nonce);
    sinon.assert.calledWith(
      res.set,
      'WWW-Authenticate',
      `send-v1 ${req.nonce}`
    );
    sinon.assert.notCalled(res.sendStatus);
    assert.equal(req.authorized, true);
    assert.equal(req.meta, storedMeta);
    assert.notEqual(req.nonce, storedMeta.nonce);
  });

  it('sends a 401 when the hashes do not match', async function() {
    storage.metadata.returns(Promise.resolve(storedMeta));
    const req = request(
      'x',
      'send-v1 R8nZk14qJqZXtxpnAtw2uDIRQTRnO1qSO1Q0PiwcNA8'
    );
    const res = response();
    await authMiddleware(req, res, next);
    sinon.assert.calledWith(res.sendStatus, 401);
    sinon.assert.calledWith(
      res.set,
      'WWW-Authenticate',
      `send-v1 ${storedMeta.nonce}`
    );
    sinon.assert.notCalled(next);
  });
});
