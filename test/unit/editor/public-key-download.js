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
      kty: 'RSA',
      kid: '1',
      e: 'AQAB',
      n: '1GPz-Er5h7PCk4v3pSlnaLYNYrp4sVc6Tx7FVz9d8m4zIS2qzcTM_6dRbMgZ4hBdD35NpYzU4z-d8lN27-J_jOzHnCiMdkY-w52dCofAkICh6ftkFlG9bFQyH8Jz5UtpVkZyy1dxCRz_sbRAzUdjUYsGvrKXg-3UYCL5SBCnt0ycrvr3iKX9k8IlMrFRB8lBJ6eQVzkzGsuivPaThXjVZ_OpY7W-XsDjut7cFgPKIc843tW4CNaDJ6j3afm-RFOok__xLQH5uA7HXS_yqfEchvzXfYfMxJY2d-Eqw4xTurm3TT07RnwJuN9slDJUrTH9EKkJkjZ7dn7fZtGjGTpaDQ',
      x5c: ['test-x5c-key'],
    }]
  };

  const keyAsPEM = `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1GPz+Er5h7PCk4v3pSln\r\naLYNYrp4sVc6Tx7FVz9d8m4zIS2qzcTM/6dRbMgZ4hBdD35NpYzU4z+d8lN27+J/\r\njOzHnCiMdkY+w52dCofAkICh6ftkFlG9bFQyH8Jz5UtpVkZyy1dxCRz/sbRAzUdj\r\nUYsGvrKXg+3UYCL5SBCnt0ycrvr3iKX9k8IlMrFRB8lBJ6eQVzkzGsuivPaThXjV\r\nZ/OpY7W+XsDjut7cFgPKIc843tW4CNaDJ6j3afm+RFOok//xLQH5uA7HXS/yqfEc\r\nhvzXfYfMxJY2d+Eqw4xTurm3TT07RnwJuN9slDJUrTH9EKkJkjZ7dn7fZtGjGTpa\r\nDQIDAQAB\r\n-----END PUBLIC KEY-----\r\n`;

  function httpGetMock(data) {
    return (url) => data ? Promise.resolve(data) : Promise.reject();
  }

  it('Finds keys in iss + .well-known URL', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: '1'
      },
      payload: {
        iss: baseUrl
      }
    });

    const httpGetStub = sinon.stub()
      .onCall(0).resolves(JSON.stringify({ jwks_uri: '/.well-known/jwks.json' }))
      .onCall(1).resolves(JSON.stringify(jwks));

    const downloadPublicKeyIfPossible = publicKeyDownloadInjector({
      '../utils.js': {
        httpGet: httpGetStub
      }
    }).downloadPublicKeyIfPossible;

    downloadPublicKeyIfPossible(decodedToken)
      .should.eventually.include(keyAsPEM)
      .then(() => {
        httpGetStub.should.have.been
                   .calledWith(baseUrl + '.well-known/openid-configuration');
        httpGetStub.should.have.been
                   .calledWith(baseUrl + '.well-known/jwks.json');
      }).should.notify(done);
  });

  it('Finds keys in jwk header claim', function(done) {
    const decodedToken = _.defaultsDeep({}, decodedBaseToken, {
      header: {
        kid: '1',
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
        kid: '1',
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
        kid: '1',
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
        kid: '1',
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
          kid: '1'
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
