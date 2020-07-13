const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const storage = {
  kill: sinon.stub(),
  ttl: sinon.stub()
};

function request(id) {
  return {
    params: { id }
  };
}

function response() {
  return {
    sendStatus: sinon.stub()
  };
}

const delRoute = proxyquire('../../server/routes/delete', {
  '../storage': storage
});

describe('/api/delete', function() {
  afterEach(function() {
    storage.kill.reset();
  });

  it('calls storage.kill with the id parameter', async function() {
    const req = request('x');
    const res = response();
    await delRoute(req, res);
    sinon.assert.calledWith(storage.kill, 'x');
    sinon.assert.calledWith(res.sendStatus, 200);
  });

  it('sends a 404 on failure', async function() {
    storage.kill.returns(Promise.reject(new Error()));
    const res = response();
    await delRoute(request('x'), res);
    sinon.assert.calledWith(res.sendStatus, 404);
  });
});
