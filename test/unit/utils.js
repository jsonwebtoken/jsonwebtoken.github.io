import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import xhrMock from 'xhr-mock';

import { httpGet } from '../../src/utils.js';

chai.use(chaiAsPromised);
chai.should();

describe('Generic utils', function() {
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
