const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const express = require('express');
const jsrsasign = require('jsrsasign');

const _ = require('lodash');

const utils = require('./utils.js');
const tokens = require('./tokens.js');
const defaultTokens = require('./default-tokens.js');
const jwks = require('./jwks.json');

const isVisible = utils.isVisible;

chai.use(chaiAsPromised);
chai.use(chaiArrays);
const expect = chai.expect;

const typingDelay = 0;

describe('Editor', function() {
  before(utils.launchBrowser);

  after(utils.closeBrowser);

  it('Displays editor when clicking on navbar', async function() {
    await this.page.click('a[href="#debugger-io"]');
    // Wait for scroll
    await this.page.waitFor(3000);
    expect(await this.page.$eval('#debugger-io', isVisible)).to.be.true;    
  });
  
  const token = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.';
  ['token', 'value', 'id_token', 'access_token'].forEach((key) => {
    [
      `/?${key}=${token}`,
      `/#${key}=${token}`,
      `/?foo=bar&${key}=${token}`,
      `/#foo=bar&${key}=${token}`,
    ].forEach((structure, i) => {
      it(`Should parse ${key} from window.location.href [${i}]`, async function () {
        await this.page.goto(`http://localhost:8000${structure}${key}${i}`);
        expect(await this.page.evaluate(() => {
          return window.test.tokenEditor.getValue();
        })).to.equal(`${token}${key}${i}`);
      });
    })
  });

  it('HS256 should be selected by default', async function() {
    const selected = await this.page.$eval('#algorithm-select', select => {
      return select.options[select.selectedIndex].value;
    });

    expect(selected).to.equal('HS256');
  });

  it('Default selected token should say something ' + 
     'about secret length', async function() {
    const secret = this.page.$eval('input[name="secret"]',
      secretInput => secretInput.value);
    return expect(secret).to.eventually.include('256');
  });

  it('Should select default tokens when no changes have ' +
     'been made', async function() {
    try {
      await this.page.select('#algorithm-select', 'HS256');    

      const algs = await this.page.$eval('#algorithm-select', select => {
        return Array.prototype.map.call(select.options, opt => opt.value);
      });

      for(const alg of algs) {        
        await this.page.select('#algorithm-select', alg);
        const token = await this.page.evaluate(() => {
          return window.test.tokenEditor.getValue();
        });

        expect(defaultTokens[alg.toLowerCase()].token).to.equal(token);
      }    
    } finally {
      await this.page.select('#algorithm-select', 'HS256');
    }
  });

  it('Should display a tooltip with a human readable ' + 
     'date on claim hover', async function() {
    await this.page.select('#algorithm-select', 'HS384');  
    
    await this.page.mouse.move(0, 0);
    
    expect(await this.page.$eval('#js-payload-tooltip', isVisible)).to.be.false;
    
    const iatPos = await this.page.evaluate(() => {
      return window.test.payloadEditor.charCoords({
        line: 4,
        pos: 3
      }, 'window');
    });

    await this.page.mouse.move(iatPos.left, iatPos.top);

    expect(await this.page.$eval('#js-payload-tooltip', isVisible)).to.be.true;
  });

  it('Displays a valid token by default', async function() {
    const valid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('valid-token') && 
             status.textContent.indexOf('verified') !== -1;
    });

    expect(valid).to.be.true;
  });

  it('Shows invalid token when a valid token is edited ' + 
     'in the left pane', async function() {    
    await this.page.evaluate(() => {
      let token = window.test.tokenEditor.getValue();
      token += 'asdf23';
      window.test.tokenEditor.setValue(token);
    });

    const invalid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('invalid-token') && 
             status.textContent.indexOf('invalid') !== -1;
    });

    expect(invalid).to.be.true;
  });

  it('Updates the token when the header is edited', async function() {
    const oldToken = await this.page.evaluate(() => {
      return window.test.tokenEditor.getValue()
    });

    await this.page.click('.js-header');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const header = {
      alg: 'HS256',
      typ: 'JWT',
      test: 'test'
    };
    await this.page.keyboard.type(JSON.stringify(header, null, 2), { 
      delay: typingDelay 
    });

    const newToken = await this.page.evaluate(() => {
      return window.test.tokenEditor.getValue()
    });

    expect(newToken).to.not.equal(oldToken);

    const valid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('valid-token') && 
             status.textContent.indexOf('verified') !== -1;
    });

    expect(valid).to.be.true;
  });

  it('Updates the token when the payload is edited', async function() {
    const oldToken = await this.page.evaluate(() => {
      return window.test.tokenEditor.getValue()
    });

    await this.page.click('.js-payload');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const payload = {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true,
      "iat": 1516239022,
      "test": "test"
    };
    await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
      delay: typingDelay 
    });

    const newToken = await this.page.evaluate(() => {
      return window.test.tokenEditor.getValue()
    });

    expect(newToken).to.not.equal(oldToken);

    const valid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('valid-token') && 
             status.textContent.indexOf('verified') !== -1;
    });

    expect(valid).to.be.true;
  });

  it('Selects algorithm when header is edited', async function() {
    const selectedBefore = 
      await this.page.$eval('#algorithm-select', select => {
        return select.options[select.selectedIndex].value;
      });

    await this.page.click('.js-header');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const header = {
      alg: 'HS384',
      typ: 'JWT',
    };
    await this.page.keyboard.type(JSON.stringify(header, null, 2), { 
      delay: typingDelay 
    });

    const selectedAfter = 
      await this.page.$eval('#algorithm-select', select => {
        return select.options[select.selectedIndex].value;
      });

    expect(selectedBefore).to.not.equal(selectedAfter);
    expect(selectedAfter).to.equal('HS384');

    const valid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('valid-token') && 
             status.textContent.indexOf('verified') !== -1;
    });

    expect(valid).to.be.true;
  });

  it('Should never revert to a default token after a non-default token ' + 
     'is generated', async function() {
    await this.page.select('#algorithm-select', 'HS256');

    await this.page.click('.js-payload');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const payload = {
      sub: 'test'      
    };
    await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
      delay: typingDelay 
    });

    const algs = await this.page.$eval('#algorithm-select', select => {
      return Array.prototype.map.call(select.options, opt => opt.value);
    });

    for(const alg of algs) {
      await this.page.select('#algorithm-select', alg);
    }

    const payloadInEditor = await this.page.evaluate(() => {
      return JSON.parse(window.test.payloadEditor.getValue());
    });

    expect(payload).to.deep.equal(payloadInEditor);
  });

  describe('HMAC', function() {
    before(async function() {
      await this.page.select('#algorithm-select', 'HS256');
    });
    
    it('Updates the token when the secret changes', async function() {
      const oldToken = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue()
      });
      
      const secretInput = await this.page.$('input[name="secret"]');
  
      await secretInput.type('asdfasdf');
      
      const newToken = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue()
      });
  
      expect(oldToken).to.not.equal(newToken);
    });
  
    it('Updates the token when the Base64 checkbox changes', async function() {
      const oldToken = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue()
      });
      
      await this.page.click('#is-base64-encoded');
      
      let newToken = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue()
      });
  
      expect(oldToken).to.not.equal(newToken);
  
      await this.page.click('#is-base64-encoded');
  
      newToken = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue()
      });
  
      expect(oldToken).to.equal(newToken);
    });

    describe('HS256/384/512', function() {      
      const algs = Object.keys(tokens).filter(alg => alg.includes('hs'));
      
      for(const alg of algs) {
        it(`Decodes ${alg.toUpperCase()} tokens`, async function() {
          const secretInput = await this.page.$('input[name="secret"]');
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(tokens[alg].secret, { 
            delay: typingDelay 
          });

          await this.page.click('.js-input');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(tokens[alg].token, { 
            delay: typingDelay 
          });

          const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') && 
                  status.textContent.indexOf('verified') !== -1;
          });
      
          expect(valid).to.be.true;

          const payload = await this.page.evaluate(() => {
            return window.test.payloadEditor.getValue();
          });

          expect(payload).to.include(alg + 'test');
        });

        const bits = parseInt(alg.substr(2));
        it(`Considers less-than-${bits}-bit secrets weak`,
           async function() {
          let secret = _.pad('', (bits / 8) - 1, 'test');

          const secretInput = await this.page.$('input[name="secret"]');
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(secret, {
            delay: typingDelay
          });

          // Wait for animations
          await this.page.waitFor(500);

          let tooltipVisible = 
            await this.page.$eval('input[name="secret"]', input => {
              return input._tippy.state.visible;
            });

          expect(tooltipVisible).to.be.true;

          secret += 'test';
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(secret, {
            delay: typingDelay
          });

          // Wait for animations
          await this.page.waitFor(500);

          tooltipVisible = 
            await this.page.$eval('input[name="secret"]', input => {
              return input._tippy.state.visible;
            });

          expect(tooltipVisible).to.be.false;
        });
      }
    });    

    it('Signs tokens with an empty secret', async function() {      
      const secretInput = await this.page.$('input[name="secret"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.press('Delete');

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
              status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;
    });
  });

  describe('Public-key', function() {
    describe('Decodes RS/ES/PS tokens', function() {
      const algs = Object.keys(defaultTokens)
                         .filter(alg => !alg.includes('hs'));
      
      for(const alg of algs) {
        it(alg.toUpperCase(), async function() {
          this.timeout(20000);

          await this.page.click('.js-input');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(tokens[alg].token, { 
            delay: typingDelay 
          });

          const secretInput = await this.page.$('textarea[name="public-key"]');
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(tokens[alg].publicKey, { 
            delay: typingDelay 
          });          

          const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') && 
                  status.textContent.indexOf('verified') !== -1;
          });
      
          expect(valid).to.be.true;

          const payload = await this.page.evaluate(() => {
            return window.test.payloadEditor.getValue();
          });

          expect(payload).to.include(alg + 'test');
        });
      }
    });

    describe('Encodes RS/ES/PS tokens', function() {      
      describe('RS/PS', async function() {
        before(async function() {
          this.timeout(30000);

          await this.page.select('#algorithm-select', 'RS256');

          await this.page.click('textarea[name="public-key"]');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(defaultTokens['rs256'].publicKey, { 
            delay: typingDelay 
          });

          await this.page.click('textarea[name="private-key"]');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(defaultTokens['rs256'].privateKey, { 
            delay: typingDelay 
          });
        });

        const algs = 
          Object.keys(defaultTokens)
                .filter(alg => alg.includes('rs') || alg.includes('ps'));

        for(const alg of algs) {
          it(alg.toUpperCase(), async function() {
            this.timeout(30000);

            await this.page.evaluate(token => {
              window.test.tokenEditor.setValue(token);
            }, defaultTokens[alg].token);

            await this.page.select('#algorithm-select', alg.toUpperCase());

            const oldToken = await this.page.evaluate(() => {
              return window.test.tokenEditor.getValue();
            });

            await this.page.click('.js-header');
            await this.page.keyboard.down('ControlLeft');
            await this.page.keyboard.press('KeyA');
            await this.page.keyboard.up('ControlLeft');
            await this.page.keyboard.type(JSON.stringify({
              alg: alg.toUpperCase(),
              typ: 'JWT'
            }, null, 2), { 
              delay: typingDelay 
            });

            await this.page.click('.js-payload');
            await this.page.keyboard.down('ControlLeft');
            await this.page.keyboard.press('KeyA');
            await this.page.keyboard.up('ControlLeft');
            await this.page.keyboard.type(JSON.stringify({
              sub: 'test'
            }, null, 2), { 
              delay: typingDelay 
            });

            const newToken = await this.page.evaluate(() => {
              return window.test.tokenEditor.getValue();
            });
          
            expect(newToken).to.not.be.empty;
            expect(newToken).to.not.equal(oldToken);

            const valid = await this.page.$eval('.validation-status', 
              status => {
                return status.classList.contains('valid-token') && 
                       status.textContent.indexOf('verified') !== -1;
              });
        
            expect(valid).to.be.true;
          });
        }
      });

      describe('ES', async function() {
        before(async function() {
          this.timeout(30000);

          await this.page.select('#algorithm-select', 'ES256');

          await this.page.click('textarea[name="public-key"]');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(defaultTokens['es256'].publicKey, { 
            delay: typingDelay 
          });

          await this.page.click('textarea[name="private-key"]');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(defaultTokens['es256'].privateKey, { 
            delay: typingDelay 
          });
        });

        const algs = Object.keys(defaultTokens)
                           .filter(alg => alg.includes('es'));

        for(const alg of algs) {
          it(alg.toUpperCase(), async function() {
            this.timeout(30000);

            await this.page.evaluate(token => {
              window.test.tokenEditor.setValue(token);
            }, defaultTokens[alg].token);

            await this.page.select('#algorithm-select', alg.toUpperCase());

            const oldToken = await this.page.evaluate(() => {
              return window.test.tokenEditor.getValue();
            });

            await this.page.click('.js-header');
            await this.page.keyboard.down('ControlLeft');
            await this.page.keyboard.press('KeyA');
            await this.page.keyboard.up('ControlLeft');
            await this.page.keyboard.type(JSON.stringify({
              alg: alg.toUpperCase(),
              typ: 'JWT'
            }, null, 2), { 
              delay: typingDelay 
            });

            await this.page.click('.js-payload');
            await this.page.keyboard.down('ControlLeft');
            await this.page.keyboard.press('KeyA');
            await this.page.keyboard.up('ControlLeft');
            await this.page.keyboard.type(JSON.stringify({
              sub: 'test'
            }, null, 2), { 
              delay: typingDelay 
            });

            const newToken = await this.page.evaluate(() => {
              return window.test.tokenEditor.getValue();
            });
          
            expect(newToken).to.not.be.empty;
            expect(newToken).to.not.equal(oldToken);

            const valid = await this.page.$eval('.validation-status', 
              status => {
                return status.classList.contains('valid-token') && 
                       status.textContent.indexOf('verified') !== -1;
              });
        
            expect(valid).to.be.true;
          });
        }
      });
    });

    describe('Should download public-keys when possible', function() {
      before(async function() {
        this.app = express();

        this.app.get('/.well-known/jwks.json', (req, res) => {
          res.set('Access-Control-Allow-Origin', '*');
          res.json(jwks);
        });

        this.server = this.app.listen(3000);

        await this.page.select('#algorithm-select', 'RS256');
      });

      beforeEach(async function() {
        const publicKeyInput = await this.page.$('textarea[name="public-key"]');
        await publicKeyInput.click();
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await this.page.keyboard.press('Delete');
      });

      after(function() {
        this.server.close();
      });

      it('iss URL + .well-known', async function() {
        this.timeout(20000);

        const token = jsrsasign.jws.JWS.sign(null, JSON.stringify({
          alg: 'RS256',
          typ: 'JWT',
          kid: '1'
        }), JSON.stringify({
          sub: 'test',
          iss: 'http://localhost:3000/'
        }), defaultTokens.rs256.privateKey);

        await this.page.click('.js-input');
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await this.page.keyboard.type(token, { 
          delay: typingDelay         
        });

        await this.page.waitFor(2000);

        const publicKey = await this.page.$eval('textarea[name="public-key"]', 
          publicKeyElement => publicKeyElement.value);

        expect(publicKey).to.include(jwks.keys[0].x5c[0]);

        const valid = await this.page.$eval('.validation-status', status => {
          return status.classList.contains('valid-token') && 
                status.textContent.indexOf('verified') !== -1;
        });
    
        expect(valid).to.be.true;
      });

      it('jku', async function() {
        this.timeout(20000);

        const token = jsrsasign.jws.JWS.sign(null, JSON.stringify({
          alg: 'RS256',
          typ: 'JWT',
          kid: '1',
          jku: 'http://localhost:3000/.well-known/jwks.json'
        }), JSON.stringify({
          sub: 'test'
        }), defaultTokens.rs256.privateKey);

        await this.page.click('.js-input');
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await this.page.keyboard.type(token, { 
          delay: typingDelay         
        });

        await this.page.waitFor(2000);

        const publicKey = await this.page.$eval('textarea[name="public-key"]', 
          publicKeyElement => publicKeyElement.value);

        expect(publicKey).to.include(jwks.keys[0].x5c[0]);

        const valid = await this.page.$eval('.validation-status', status => {
          return status.classList.contains('valid-token') && 
                status.textContent.indexOf('verified') !== -1;
        });
    
        expect(valid).to.be.true;
      });

      it('x5c', async function() {
        this.timeout(35000);

        const token = jsrsasign.jws.JWS.sign(null, JSON.stringify({
          alg: 'RS256',
          typ: 'JWT',
          x5c: jwks.keys[0].x5c[0]
        }), JSON.stringify({
          sub: 'test'
        }), defaultTokens.rs256.privateKey);

        await this.page.click('.js-input');
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await this.page.keyboard.type(token, { 
          delay: typingDelay         
        });

        await this.page.waitFor(2000);

        const publicKey = await this.page.$eval('textarea[name="public-key"]', 
          publicKeyElement => publicKeyElement.value);

        expect(publicKey).to.include(jwks.keys[0].x5c[0]);

        const valid = await this.page.$eval('.validation-status', status => {
          return status.classList.contains('valid-token') && 
                status.textContent.indexOf('verified') !== -1;
        });
    
        expect(valid).to.be.true;
      });
    });    

    it('Clears the token when the header is edited and there ' +     
            'is no private key', async function() {
      await this.page.select('#algorithm-select', 'RS256');

      const secretInput = await this.page.$('textarea[name="private-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.press('Delete');

      await this.page.click('.js-header');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');

      const header = {
        alg: 'RS256',
        typ: 'JWT',
        test: 'test'
      };
      await this.page.keyboard.type(JSON.stringify(header, null, 2), { 
        delay: typingDelay 
      });

      const token = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue();
      });

      expect(token).to.be.empty;
    });

    it('Clears the token when the payload is edited and there ' + 
       'is no private key', async function() {
      await this.page.select('#algorithm-select', 'RS256');

      const secretInput = await this.page.$('textarea[name="private-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.press('Delete');

      await this.page.click('.js-payload');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');

      const payload = {
        sub: 'test'
      };
      await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
        delay: typingDelay 
      });

      const token = await this.page.evaluate(() => {
        return window.test.tokenEditor.getValue();
      });

      expect(token).to.be.empty;
    });

    it('Marks token as invalid when there is no public key', async function() {
      this.timeout(20000);

      await this.page.select('#algorithm-select', 'RS256');

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(tokens['rs256'].token, { 
        delay: typingDelay 
      });

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(tokens['rs256'].publicKey, { 
        delay: typingDelay 
      });

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
              status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;

      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.press('Delete');

      const invalid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('invalid-token') && 
               status.textContent.indexOf('invalid') !== -1;
      });
  
      expect(invalid).to.be.true;
    });

    it('Marks token as invalid when the public key is wrong', async function() {
      this.timeout(20000);
      
      await this.page.select('#algorithm-select', 'RS256');

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(tokens['rs256'].token, { 
        delay: typingDelay 
      });

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(tokens['rs256'].publicKey, { 
        delay: typingDelay 
      });

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
              status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;

      await secretInput.click();
      await this.page.keyboard.type('sdfasdf389972389', {
        delay: typingDelay
      });

      const invalid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('invalid-token') && 
               status.textContent.indexOf('invalid') !== -1;
      });
  
      expect(invalid).to.be.true;
    });

    it('Marks token as valid when the public key is OK and private ' + 
       'key is wrong', async function() {
      this.timeout(30000);

      await this.page.select('#algorithm-select', 'RS256');      

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(defaultTokens['rs256'].publicKey, { 
        delay: typingDelay 
      });

      const privateKeyInput = await this.page.$('textarea[name="private-key"]');
      await privateKeyInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');      

      const head = defaultTokens['rs256'].privateKey.slice(0, 20);
      const tail = defaultTokens['rs256'].privateKey.slice(20);

      await privateKeyInput.type(`${head}sadfasdf${tail}`, { 
        delay: typingDelay 
      });

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(defaultTokens['rs256'].token, { 
        delay: typingDelay 
      });

      await this.page.waitFor(1000);

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
              status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;
    });

    it('Marks token as valid when the public key is OK and private ' + 
       'key is missing', async function() {
      this.timeout(30000);

      await this.page.select('#algorithm-select', 'RS256');      

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(tokens['rs256'].publicKey, { 
        delay: typingDelay 
      });

      const privateKeyInput = await this.page.$('textarea[name="private-key"]');
      await privateKeyInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');      
      await this.page.keyboard.press('Delete');

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(tokens['rs256'].token, { 
        delay: typingDelay 
      });

      await this.page.waitFor(1000);

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
               status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;
    });
  });

  it('Updates the header when the token algorithm ' + 
     'is changed', async function() {
    await this.page.select('#algorithm-select', 'HS256');

    await this.page.click('.js-input');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');
    await this.page.keyboard.type(tokens.hs256.token, { 
      delay: typingDelay 
    });

    await this.page.select('#algorithm-select', 'HS384');

    const header = await this.page.evaluate(() => {
      return JSON.parse(window.test.headerEditor.getValue());
    });

    expect(header.alg).to.equal('HS384');
  });

  it('Marks token as invalid when "alg" is "none"', async function() {
    this.timeout(20000);

    await this.page.click('.js-input');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');
    await this.page.keyboard.type(tokens.none.token, { 
      delay: typingDelay 
    });

    const invalid = await this.page.$eval('.validation-status', status => {
      return status.classList.contains('invalid-token') && 
             status.textContent.indexOf('invalid') !== -1;
    });

    expect(invalid).to.be.true;
  });

  it('Saves last edited token', async function() {
    await this.page.select('#algorithm-select', 'HS256');

    const secretInput = await this.page.$('input[name="secret"]');
    await secretInput.click();
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');
    await secretInput.type('secret-test', { 
      delay: typingDelay 
    });

    await this.page.click('.js-payload');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const payload = {
      sub: 'test'      
    };
    await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
      delay: typingDelay 
    });

    await this.page.reload();

    const storedPayload = await this.page.evaluate(() => {
      return JSON.parse(window.test.payloadEditor.getValue());
    });

    expect(storedPayload).to.deep.equal(payload);
  });

  describe('JWT share button', function() {
    it('Copies an HMAC token to the clipboard (no secret)', async function() {
      await this.page.select('#algorithm-select', 'HS256');

      const secretInput = await this.page.$('input[name="secret"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type('secret-test', { 
        delay: typingDelay 
      });

      await this.page.click('.js-payload');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');

      const payload = {
        sub: 'test'      
      };
      await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
        delay: typingDelay 
      });

      const shareJwtButton = await this.page.$('.website-share button');
      await shareJwtButton.click();

      const srcToken = await this.page.evaluate(() => 
        window.test.tokenEditor.getValue());

      // We cannot read the clipboard in headless Chrome, so we have a special
      // harness in the code that stores this value. See:
      // https://github.com/GoogleChrome/puppeteer/issues/2147
      const copiedUrl = await this.page.evaluate(() => 
        window.test.shareJwtCopiedUrl);

      const newPage = await this.browser.newPage();
      await newPage.goto(copiedUrl);

      const destToken = await newPage.evaluate(() => 
        window.test.tokenEditor.getValue());
      const destSecret = await newPage.$eval('input[name="secret"]', input =>
        input.value);

      expect(srcToken).to.equal(destToken);
      expect(destSecret).to.not.equal('secret-test');
    });

    it('Copies an RSA token to the clipboard (with public-key)',
      async function() {
        this.timeout(30000);

        await this.page.select('#algorithm-select', 'RS256');      

        await this.page.click('.js-input');
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await this.page.keyboard.type(defaultTokens['rs256'].token, { 
          delay: typingDelay 
        });

        const pubKeyInput = await this.page.$('textarea[name="public-key"]');
        await pubKeyInput.click();
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');
        await pubKeyInput.type(defaultTokens['rs256'].publicKey, { 
          delay: typingDelay 
        });

        const privateKeyInput = 
          await this.page.$('textarea[name="private-key"]');
        await privateKeyInput.click();
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');      
        await privateKeyInput.type(defaultTokens['rs256'].privateKey, { 
          delay: typingDelay 
        });

        await this.page.click('.js-payload');
        await this.page.keyboard.down('ControlLeft');
        await this.page.keyboard.press('KeyA');
        await this.page.keyboard.up('ControlLeft');

        const payload = {
          sub: 'test'      
        };
        await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
          delay: typingDelay 
        });

        const shareJwtButton = await this.page.$('.website-share button');
        await shareJwtButton.click();

        const srcToken = await this.page.evaluate(() => 
          window.test.tokenEditor.getValue());

        // We cannot read the clipboard in headless Chrome, so we have a
        // special harness in the code that stores this value. See:
        // https://github.com/GoogleChrome/puppeteer/issues/2147
        const copiedUrl = await this.page.evaluate(() => 
          window.test.shareJwtCopiedUrl);

        const newPage = await this.browser.newPage();
        await newPage.goto(copiedUrl);

        const destToken = await newPage.evaluate(() => 
          window.test.tokenEditor.getValue());
        const destPubKey = await newPage.$eval('textarea[name="public-key"]',
          input => input.value);

        expect(srcToken).to.equal(destToken);
        expect(destPubKey).to.equal(defaultTokens['rs256'].publicKey);
      }
    );
  });
});
