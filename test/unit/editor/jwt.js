import * as jwt from '../../../src/editor/jwt.js';
import tokens from '../../../src/editor/default-tokens.js';

import b64u from 'base64url';
import log from 'loglevel';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomFillSync, generateKeyPair } from 'crypto';

chai.use(chaiAsPromised);
chai.should();

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

  for (const [alg, vector] of Object.entries(tokens)) {
    let { privateKey, publicKey, jwk } = vector;
    if (vector.secret) {
      privateKey = publicKey = vector.secret;
    }

    it(`signs/verifies ${alg.toUpperCase()}`, function () {
      const header = { alg: alg.toUpperCase(), iat: Date.now() };
      const payload = { sub: 'test' };

      // test the default token
      return jwt.verify(vector.token, publicKey).should.eventually.include({validSignature: true})
        .then(() => {
          // test signing
          return jwt.sign(header, payload, privateKey).then(token => {
            token.should.be.a('string');

            const split = token.split('.');
            split.should.have.lengthOf(3);

            const decoded = jwt.decode(token);
            decoded.header.should.deep.equal(header);
            decoded.payload.should.deep.equal(payload);

            // test verifying just signed token
            return jwt.verify(token, publicKey)
                      .should.eventually.include({validSignature: true});
          });
        });
    });

    if (jwk) {
      it(`signs/verifies ${alg.toUpperCase()} with a JWK`, function () {
        const header = { alg: alg.toUpperCase(), iat: Date.now() };
        const payload = { sub: 'test' };

        const jsonJWK = JSON.stringify(jwk, null, 4)

        // test the default token
        return jwt.verify(vector.token, jsonJWK).should.eventually.include({validSignature: true})
          .then(() => {
            // test signing
            return jwt.sign(header, payload, jsonJWK).then(token => {
              token.should.be.a('string');

              const split = token.split('.');
              split.should.have.lengthOf(3);

              const decoded = jwt.decode(token);
              decoded.header.should.deep.equal(header);
              decoded.payload.should.deep.equal(payload);

              // test verifying just signed token
              return jwt.verify(token, jsonJWK)
                        .should.eventually.include({validSignature: true});
            });
          });
      });
    }
  }

  it('signs and verifies tokens using a PKCS1 RSA keys', function() {
    const header = {
      alg: 'RS256'
    };
    const payload = {
      sub: 'test'
    };

    return new Promise((resolve, reject) => {
      generateKeyPair('rsa', {
        modulusLength: 2048,
        privateKeyEncoding: { format: 'pem', type: 'pkcs1' },
        publicKeyEncoding: { format: 'pem', type: 'pkcs1' },
      }, (err, publicKey, privateKey) => {
        if (err) return reject(err);
        return resolve({ publicKey, privateKey });
      })
    }).then(({ privateKey, publicKey }) => {
      return jwt.sign(header, payload, privateKey).then((token) => {
        return jwt.verify(token, publicKey).should.eventually.include({validSignature: true});
      });
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
