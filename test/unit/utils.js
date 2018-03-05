import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import xhrMock from 'xhr-mock';

import { httpGet, isValidBase64String } from '../../src/utils.js';
import { utf8tob64, utf8tob64u } from 'jsrsasign';

import { randomFillSync } from 'crypto';

chai.use(chaiAsPromised);
chai.should();

describe('Generic utils', function() {
  describe('isValidBase64String', function() {
    // Generate random data of different sizes.
    const data = [];
    for(let i = 0; i < 1000; ++i) {
      let bytes = new Uint8Array(i);
      randomFillSync(bytes);
      bytes = String.fromCharCode.apply(null, bytes);

      data.push({
        b64: utf8tob64(bytes),
        b64u: utf8tob64u(bytes)
      });
    }

    it('detects valid Base64 and Base64URL strings', function() {
      data.forEach(d => {
        isValidBase64String(d.b64, false).should.be.true;
        isValidBase64String(d.b64u, false).should.be.true;
        isValidBase64String(d.b64u).should.be.true;
        isValidBase64String(d.b64u, true).should.be.true;
      });
    });

    it('fails on invalid Base64 and Base64 URL strings', function() {
      data.forEach(d => {
        if(d.b64.match(/[\+\/]/)) {
          isValidBase64String(d.b64, true).should.be.false;
        }
      });
    });
  });

  describe('httpGet', function() {
    const url = '/';
    const reply = 'test';

    beforeEach(() => xhrMock.setup());

    afterEach(() => xhrMock.teardown());
    
    it('fetches data with a GET request', function() {
      xhrMock.get(url, {
        status: 200,
        reason: 'OK',
        body: reply
      });

      return httpGet(url).should.eventually.equal(reply);
    });

    it('fetches data with a GET request and no cache', function() {
      xhrMock.get(url, (req, res) => {
        req.url().path.should.equal(url);
        req.method().should.equal('GET');
        req.header('Cache-Control').should.equal('no-cache');

        return res.status(200).body(reply);
      });

      return httpGet(url, false).should.eventually.equal(reply);
    });

    it('rejects promise on non-200 status codes', function() {
      xhrMock.get(url, {
        status: 404,
        reason: 'Not Found'
      });

      return httpGet(url, false).should.eventually.be.rejected;
    });

    it('rejects promise on connection error', function() {
      xhrMock.get(url, () => {
        return Promise.reject();
      });

      return httpGet(url, false).should.eventually.be.rejected;
    });
  });
});
