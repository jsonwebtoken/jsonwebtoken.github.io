import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import publicKeyDownloadInjector from
  'inject-loader!../../../src/editor/public-key-download.js';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

describe('Public key downloader', function() {
  const baseUrl = '/';

  const decodedBaseToken = {
    header: {
      typ: 'JWT',
      alg: 'RS256'
    },
    payload: {
      sub: 'test'
    }
  };

  const jwks = {
    keys: [{
      kid: 1,
      x5c: ['test-x5c-key']
    }]
  };

  function httpGetMock(data) {
    return (url) => data ? Promise.resolve(data) : Promise.reject();
  }

  it('Finds keys in iss + .well-known URL', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: 1
      },
      payload: {
        iss: baseUrl
      }
    });

    const httpGetStub = sinon.stub().resolves(JSON.stringify(jwks));
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.been
                   .calledWith(baseUrl + '.well-known/jwks.json');
      }).should.notify(done);
  });

  it('Finds keys in jwk header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: 1,
        jwk: jwks.keys[0]
      }
    });

    const httpGetStub = sinon.stub().rejects('Should not be called');
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.callCount(0);
      }).should.notify(done);
  });

  it('Finds keys in jku header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: 1,
        jku: baseUrl
      }
    });

    const httpGetStub = sinon.stub().resolves(JSON.stringify(jwks));
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.been.calledWith(baseUrl);
      }).should.notify(done);
  });

  it('Finds keys in x5u header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        x5u: baseUrl
      }
    });

    const httpGetStub = sinon.stub().resolves(jwks.keys[0].x5c[0]);
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.been.calledWith(baseUrl);
      }).should.notify(done);
  });

  it('Finds keys in x5c string header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        x5c: jwks.keys[0].x5c[0]
      }
    });

    const httpGetStub = sinon.stub().rejects('Should not be called');
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.callCount(0);
      }).should.notify(done);
  });

  it('Finds keys in x5c array header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        x5c: jwks.keys[0].x5c
      }
    });

    const httpGetStub = sinon.stub().rejects('Should not be called');
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(jwks.keys[0].x5c[0])
      .then(() => {
        httpGetStub.should.have.callCount(0);
      }).should.notify(done);
  });

  it('Rejects the promise when HTTP request fails', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: 1,
        jku: baseUrl
      }
    });

    const httpGetStub = sinon.stub().rejects('Failure');
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.be.rejected
      .then(() => {
        httpGetStub.should.have.been.calledWith(baseUrl);
      }).should.notify(done);
  });

  describe('Rejects the promise when invalid data ' +
           'is in jku claim URL', function() {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: 1,
        jku: baseUrl
      }
    });

    let httpGetStub;
    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: url => httpGetStub(url)
      }
    }).downloadPublicKeyIfPossible;

    it('when the keys object is not an array', function(done) {
      httpGetStub = sinon.stub().resolves({
        keys: {}
      });

      downloadPublicKeyIfPossible(decodedToken)
        .should.be.rejected
        .then(() => {
          httpGetStub.should.have.been.calledWith(baseUrl);
        }).should.notify(done);
    });

    it('when the keys object does not exist', function(done) {
      httpGetStub = sinon.stub().resolves({
      });

      downloadPublicKeyIfPossible(decodedToken)
        .should.be.rejected
        .then(() => {
          httpGetStub.should.have.been.calledWith(baseUrl);
        }).should.notify(done);
    });

    it('when there is no kid', function(done) {
      httpGetStub = sinon.stub().resolves({
        keys: [{
          x5c: jwks.keys[0].x5c
        }]
      });

      downloadPublicKeyIfPossible(decodedToken)
        .should.be.rejected
        .then(() => {
          httpGetStub.should.have.been.calledWith(baseUrl);
        }).should.notify(done);
    });

    it('when there are no x5u or x5c claims', function(done) {
      httpGetStub = sinon.stub().resolves({
        keys: [{
          kid: 1
        }]
      });

      downloadPublicKeyIfPossible(decodedToken)
        .should.be.rejected
        .then(() => {
          httpGetStub.should.have.been.calledWith(baseUrl);
        }).should.notify(done);
    });
  });
});
