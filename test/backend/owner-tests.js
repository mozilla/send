const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const storage = {
  metadata: sinon.stub()
};

function request(id, owner_token) {
  return {
    params: { id },
    body: { owner_token }
  };
}

function response() {
  return {
    sendStatus: sinon.stub()
  };
}

const ownerMiddleware = proxyquire('../../server/middleware/auth', {
  '../storage': storage
}).owner;

describe('Owner Middleware', function() {
  afterEach(function() {
    storage.metadata.reset();
  });

  it('sends a 404 when the id is not found', async function() {
    const next = sinon.stub();
    storage.metadata.returns(Promise.resolve(null));
    const res = response();
    await ownerMiddleware(request('x', 'y'), res);
    sinon.assert.notCalled(next);
    sinon.assert.calledWith(res.sendStatus, 404);
  });

  it('sends a 401 when the owner_token is missing', async function() {
    const next = sinon.stub();
    const meta = { owner: 'y' };
    storage.metadata.returns(Promise.resolve(meta));
    const res = response();
    await ownerMiddleware(request('x', null), res);
    sinon.assert.notCalled(next);
    sinon.assert.calledWith(res.sendStatus, 401);
  });

  it('sends a 401 when the owner_token does not match', async function() {
    const next = sinon.stub();
    const meta = { owner: 'y' };
    storage.metadata.returns(Promise.resolve(meta));
    const res = response();
    await ownerMiddleware(request('x', 'z'), res);
    sinon.assert.notCalled(next);
    sinon.assert.calledWith(res.sendStatus, 401);
  });

  it('sends a 401 if the metadata call fails', async function() {
    const next = sinon.stub();
    storage.metadata.returns(Promise.reject(new Error()));
    const res = response();
    await ownerMiddleware(request('x', 'y'), res);
    sinon.assert.notCalled(next);
    sinon.assert.calledWith(res.sendStatus, 401);
  });

  it('sets req.meta and req.authorized on successful auth', async function() {
    const next = sinon.stub();
    const meta = { owner: 'y' };
    storage.metadata.returns(Promise.resolve(meta));
    const req = request('x', 'y');
    const res = response();
    await ownerMiddleware(req, res, next);
    assert.equal(req.meta, meta);
    assert.equal(req.authorized, true);
    sinon.assert.notCalled(res.sendStatus);
    sinon.assert.calledOnce(next);
  });
});
