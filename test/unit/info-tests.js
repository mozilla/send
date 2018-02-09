const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const storage = {
  ttl: sinon.stub()
};

function request(id, meta) {
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

const infoRoute = proxyquire('../../server/routes/info', {
  '../storage': storage
});

describe('/api/info', function() {
  afterEach(function() {
    storage.ttl.reset();
  });

  it('calls storage.ttl with the id parameter', async function() {
    const req = request('x');
    const res = response();
    await infoRoute(req, res);
    sinon.assert.calledWith(storage.ttl, 'x');
  });

  it('sends a 404 on failure', async function() {
    storage.ttl.returns(Promise.reject(new Error()));
    const res = response();
    await infoRoute(request('x'), res);
    sinon.assert.calledWith(res.sendStatus, 404);
  });

  it('returns a json object', async function() {
    storage.ttl.returns(Promise.resolve(123));
    const meta = {
      dlimit: '1',
      dl: '0'
    };
    const res = response();
    await infoRoute(request('x', meta), res);
    sinon.assert.calledWithMatch(res.send, {
      dlimit: 1,
      dtotal: 0,
      ttl: 123
    });
  });
});
