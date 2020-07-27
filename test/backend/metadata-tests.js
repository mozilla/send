const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const storage = {
  ttl: sinon.stub(),
  length: sinon.stub()
};

function request(id, meta = {}) {
  return {
    params: { id },
    meta
  };
}

function response() {
  return {
    sendStatus: sinon.stub(),
    send: sinon.stub()
  };
}

const metadataRoute = proxyquire('../../server/routes/metadata', {
  '../storage': storage
});

describe('/api/metadata', function() {
  afterEach(function() {
    storage.ttl.reset();
    storage.length.reset();
  });

  it('calls storage.ttl with the id parameter', async function() {
    const req = request('x');
    const res = response();
    await metadataRoute(req, res);
    sinon.assert.calledWith(storage.ttl, 'x');
  });

  it('sends a 404 on failure', async function() {
    storage.ttl.returns(Promise.reject(new Error()));
    const res = response();
    await metadataRoute(request('x'), res);
    sinon.assert.calledWith(res.sendStatus, 404);
  });

  it('returns a json object', async function() {
    storage.ttl.returns(Promise.resolve(123));
    const meta = {
      dlimit: 1,
      dlToken: 0,
      metadata: 'foo'
    };
    const res = response();
    await metadataRoute(request('x', meta), res);
    sinon.assert.calledWithMatch(res.send, {
      metadata: 'foo',
      finalDownload: true,
      ttl: 123
    });
  });
});
