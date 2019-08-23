import * as jwt from '../../../src/editor/jwt.js';
import tokens from '../../../src/editor/default-tokens.js';

import b64u from 'base64url';
import log from 'loglevel';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomFillSync } from 'crypto';

chai.use(chaiAsPromised);
chai.should();

const publicKeyPlainRSA =
`-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdV
ha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mrm/Yt
jCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwz
GTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1
FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68
Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQAB
-----END RSA PUBLIC KEY-----`;

describe('JWT', function() {
  it('detects tokens', function() {
    jwt.isToken('skdjf9238ujdhkf.asdfasdf2.sdsdffsfsd').should.be.false;
    jwt.isToken('skdjf9238ujdhkf.asdfasdf2').should.be.false;
    jwt.isToken('skdjf9238ujdhkfdfsai28#390}{+śdf').should.be.false;

    jwt.isToken(tokens.hs256.token).should.be.true;
    jwt.isToken(tokens.rs256.token).should.be.true;
  });

  it('detects tokens without a signature', function() {
    const split = tokens.hs256.token.split('.');
    const token = `${split[0]}.${split[1]}`;
    const token2 = token + '.';

    jwt.isToken(token).should.be.true;
    jwt.isToken(token2).should.be.true;
  });

  it('considers Base64 (not URL) encoded tokens invalid', function() {
    const token = b64u.toBase64(tokens.hs256.token);
    jwt.isToken(token).should.be.false;
    return jwt.verify(token, tokens.hs256.secret).should.eventually.include({validSignature: false});
  });

  describe('verifies valid tokens', function() {
    Object.keys(tokens).forEach(alg => {
      it(alg.toUpperCase(), function() {
        if(alg.indexOf('hs') !== -1) {
          return jwt.verify(tokens[alg].token, tokens[alg].secret)
                    .should.eventually.include({validSignature: true});
        } else {
          return jwt.verify(tokens[alg].token, tokens[alg].publicKey)
                    .should.eventually.be.include({validSignature: true});
        }
      });
    });
  });

  it('fails to verify invalid tokens ' +
     '(logging temporarily disabled to hide exceptions)', function() {
    log.disableAll();

    const split = tokens.hs256.token.split('.');
    const token = `${split[0]}.${split[1]}`;
    const token2 = token + '.';

    const promises = [
      jwt.verify(token, tokens.hs256.secret),
      jwt.verify(token2, tokens.hs256.secret),
      jwt.verify(tokens.hs256.token, tokens.hs256.secret + 'sdfasdf'),
      jwt.verify(tokens.hs256.token, 'sdfsdf' + tokens.hs256.secret),
      jwt.verify(tokens.hs256.token, 'sdfsdf'),
      jwt.verify(tokens.rs256.token, tokens.rs256.publicKey.replace('a','b')),
      jwt.verify(tokens.es256.token, tokens.es256.publicKey.replace('a','b')),
      jwt.verify(tokens.ps256.token, tokens.ps256.publicKey.replace('a','b'))
    ];

    const header = {
      typ: 'JWT',
      alg: 'none'
    };
    const payload = {
      sub: 'test'
    };

    const token3 = `${b64u.encode(JSON.stringify(header))}.` +
                    `${b64u.encode(JSON.stringify(payload))}`;

    promises.push(jwt.verify(token3, 'whatever'));
    promises.push(jwt.verify(token3 + '.', 'whatever'));
    promises.push(jwt.verify(token3 + '.' + split[2], 'whatever'));

    return Promise.all(promises.map(p => p.then(v => !v.validSignature, e => true)))
                  .then(all => all.every(v => v))
                  .finally(() => log.enableAll())
                  .should.eventually.be.true;
  });

  it('signs/verifies tokens (HS256)', function() {
    const header = {
      alg: 'HS256'
    };
    const payload = {
      sub: 'test'
    };

    return jwt.sign(header, payload, 'secret').then(token => {
      token.should.be.a('string');

      const split = token.split('.');
      split.should.have.lengthOf(3);

      const decoded = jwt.decode(token);
      decoded.header.should.deep.equal(header);
      decoded.payload.should.deep.equal(payload);

      return jwt.verify(token, 'secret').should.eventually.include({validSignature: true});
    });
  });

  it('signs/verifies tokens (RS256)', function() {
    const header = {
      alg: 'RS256'
    };
    const payload = {
      sub: 'test'
    };

    return jwt.sign(header, payload, tokens.rs256.privateKey).then(token => {
      token.should.be.a('string');

      const split = token.split('.');
      split.should.have.lengthOf(3);

      const decoded = jwt.decode(token);
      decoded.header.should.deep.equal(header);
      decoded.payload.should.deep.equal(payload);

      return jwt.verify(token, tokens.rs256.publicKey)
                .should.eventually.include({validSignature: true});
    });
  });

  it('signs/verifies tokens (ES256)', function() {
    const header = {
      alg: 'ES256'
    };
    const payload = {
      sub: 'test'
    };

    return jwt.sign(header, payload, tokens.es256.privateKey).then(token => {
      token.should.be.a('string');

      const split = token.split('.');
      split.should.have.lengthOf(3);

      const decoded = jwt.decode(token);
      decoded.header.should.deep.equal(header);
      decoded.payload.should.deep.equal(payload);

      return jwt.verify(token, tokens.es256.publicKey)
                .should.eventually.include({validSignature: true});
    });
  });

  it('signs/verifies tokens (PS256)', function() {
    const header = {
      alg: 'PS256'
    };
    const payload = {
      sub: 'test'
    };

    return jwt.sign(header, payload, tokens.ps256.privateKey).then(token => {
      token.should.be.a('string');

      const split = token.split('.');
      split.should.have.lengthOf(3);

      const decoded = jwt.decode(token);
      decoded.header.should.deep.equal(header);
      decoded.payload.should.deep.equal(payload);

      return jwt.verify(token, tokens.ps256.publicKey)
                .should.eventually.include({validSignature: true});
    });
  });

  it('verifies tokens (RS256) using a plain RSA public key', function() {
    const header = {
      alg: 'RS256'
    };
    const payload = {
      sub: 'test'
    };

    return jwt.sign(header, payload, tokens.rs256.privateKey).then(token => {
      return jwt.verify(token, publicKeyPlainRSA).should.eventually.include({validSignature: true});
    });
  });

  describe('isValidBase64String', function() {
    // Generate random data of different sizes.
    const data = [];
    for(let i = 0; i < 1000; ++i) {
      let bytes = new Uint8Array(i);
      randomFillSync(bytes);
      bytes = String.fromCharCode.apply(null, bytes);

      data.push({
        b64: b64u.toBase64(b64u.encode(bytes)),
        b64u: b64u.encode(bytes)
      });
    }

    it('detects valid Base64 and Base64URL strings', function() {
      data.forEach(d => {
        jwt.isValidBase64String(d.b64u).should.be.true;
      });
    });

    it('fails on invalid Base64 and Base64 URL strings', function() {
      data.forEach(d => {
        if(d.b64.match(/[\+\/=]/)) {
          jwt.isValidBase64String(d.b64).should.be.false;
        }
      });
    });
  });
});
