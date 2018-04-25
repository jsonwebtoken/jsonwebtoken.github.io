import * as jwt from '../../../src/editor/jwt.js';
import tokens from '../../../src/editor/default-tokens.js';

import { utf8tob64, utf8tob64u, b64utob64 } from 'jsrsasign';
import log from 'loglevel';
import { should } from 'chai';
import { randomFillSync } from 'crypto';

should();

const publicKeyPlainRSA =
`-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAN2Vq1GNGOiCjdaiOAYcUdgu6B1RYBj2JHd/LhqtY0DUqhLyRXDfdwmJ
tevxu/BQBSlqsLCW91sfp28Q5+i7T+AIVCwdR9CtIO/4y5JQwB7yPMoTipb6Mr7F
BT1rTcZScoeSSV75DSlf+DqNdnuvX/EArkOjaRD5fnEr1yKlGAQrAgMBAAE=
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
    const token = b64utob64(tokens.hs256.token);

    jwt.isToken(token).should.be.false;
    jwt.verify(token, tokens.hs256.secret).should.be.false;
  });

  it('verifies valid tokens', function() {
    jwt.verify(tokens.hs256.token, tokens.hs256.secret).should.be.true;
    jwt.verify(tokens.hs384.token, tokens.hs384.secret).should.be.true;
    jwt.verify(tokens.hs512.token, tokens.hs512.secret).should.be.true;

    jwt.verify(tokens.rs256.token, tokens.rs256.publicKey).should.be.true;
    jwt.verify(tokens.rs384.token, tokens.rs384.publicKey).should.be.true;
    jwt.verify(tokens.rs512.token, tokens.rs512.publicKey).should.be.true;
    
    jwt.verify(tokens.es256.token, tokens.es256.publicKey).should.be.true;
    jwt.verify(tokens.es384.token, tokens.es384.publicKey).should.be.true;
    
    jwt.verify(tokens.ps256.token, tokens.ps256.publicKey).should.be.true;
    jwt.verify(tokens.ps384.token, tokens.ps384.publicKey).should.be.true;
  });

  it('fails to verify invalid tokens ' +
     '(logging temporarily disabled to hide exceptions)', function() {
    log.disableAll();

    try {
      const split = tokens.hs256.token.split('.');
      const token = `${split[0]}.${split[1]}`;
      const token2 = token + '.';

      jwt.verify(token, tokens.hs256.secret).should.be.false;
      jwt.verify(token2, tokens.hs256.secret).should.be.false;

      jwt.verify(tokens.hs256.token, tokens.hs256.secret + 'sdfasdf')
        .should.be.false;
      jwt.verify(tokens.hs256.token, 'sdfsdf' + tokens.hs256.secret)
        .should.be.false;
      jwt.verify(tokens.hs256.token, 'sdfsdf').should.be.false;

      jwt.verify(tokens.rs256.token, tokens.rs256.publicKey.replace('a','b'))
        .should.be.false;

      jwt.verify(tokens.es256.token, tokens.es256.publicKey.replace('a','b'))
        .should.be.false;
      
      jwt.verify(tokens.ps256.token, tokens.ps256.publicKey.replace('a','b'))
        .should.be.false;

      const header = {
        typ: 'JWT',
        alg: 'none'
      };
      const payload = {
        sub: 'test'
      };

      const token3 = `${utf8tob64u(JSON.stringify(header))}.` + 
                    `${utf8tob64u(JSON.stringify(payload))}`;
      
      jwt.verify(token3, 'whatever').should.be.false;
      jwt.verify(token3 + '.', 'whatever').should.be.false;
      jwt.verify(token3 + '.' + split[2], 'whatever').should.be.false;
    } finally {
      log.enableAll();
    }
  });

  it('signs/verifies tokens (HS256)', function() {
    const header = {
      alg: 'HS256'
    };
    const payload = {
      sub: 'test'
    };

    const token = jwt.sign(header, payload, 'secret');
    token.should.be.a('string');

    const split = token.split('.');
    split.should.have.lengthOf(3);
    
    jwt.verify(token, 'secret').should.be.true;

    const decoded = jwt.decode(token);
    decoded.header.should.deep.equal(header);
    decoded.payload.should.deep.equal(payload);
  });

  it('signs/verifies tokens (RS256)', function() {
    const header = {
      alg: 'RS256'
    };
    const payload = {
      sub: 'test'
    };

    const token = jwt.sign(header, payload, tokens.rs256.privateKey);
    token.should.be.a('string');

    const split = token.split('.');
    split.should.have.lengthOf(3);
    
    jwt.verify(token, tokens.rs256.publicKey).should.be.true;

    const decoded = jwt.decode(token);
    decoded.header.should.deep.equal(header);
    decoded.payload.should.deep.equal(payload);
  });

  it('signs/verifies tokens (ES256)', function() {
    const header = {
      alg: 'ES256'
    };
    const payload = {
      sub: 'test'
    };

    const token = jwt.sign(header, payload, tokens.es256.privateKey);
    token.should.be.a('string');

    const split = token.split('.');
    split.should.have.lengthOf(3);
    
    jwt.verify(token, tokens.es256.publicKey).should.be.true;

    const decoded = jwt.decode(token);
    decoded.header.should.deep.equal(header);
    decoded.payload.should.deep.equal(payload);
  });

  it('signs/verifies tokens (PS256)', function() {
    const header = {
      alg: 'PS256'
    };
    const payload = {
      sub: 'test'
    };

    const token = jwt.sign(header, payload, tokens.ps256.privateKey);
    token.should.be.a('string');

    const split = token.split('.');
    split.should.have.lengthOf(3);
    
    jwt.verify(token, tokens.ps256.publicKey).should.be.true;

    const decoded = jwt.decode(token);
    decoded.header.should.deep.equal(header);
    decoded.payload.should.deep.equal(payload);
  });

  it('verifies tokens (RS256) using a plain RSA public key', function() {
    const header = {
      alg: 'RS256'
    };
    const payload = {
      sub: 'test'
    };

    const token = jwt.sign(header, payload, tokens.rs256.privateKey);
    
    jwt.verify(token, publicKeyPlainRSA).should.be.true;
  });

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
        jwt.isValidBase64String(d.b64, false).should.be.true;
        jwt.isValidBase64String(d.b64u, false).should.be.true;
        jwt.isValidBase64String(d.b64u).should.be.true;
        jwt.isValidBase64String(d.b64u, true).should.be.true;
      });
    });

    it('fails on invalid Base64 and Base64 URL strings', function() {
      data.forEach(d => {
        if(d.b64.match(/[\+\/]/)) {
          jwt.isValidBase64String(d.b64, true).should.be.false;
        }
      });
    });
  });
});
