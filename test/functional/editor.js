const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const utils = require('./utils.js');
const tokens = require('./tokens.js');
const defaultTokens = require('./default-tokens.js');

const isVisible = utils.isVisible;

chai.use(chaiAsPromised);
chai.use(chaiArrays);
const expect = chai.expect;

describe('Editor', function() {
  before(utils.launchBrowser);

  after(utils.closeBrowser);

  it('Displays editor when clicking on navbar', async function() {
    await this.page.click('a[href="#debugger-io"]');
    // Wait for scroll
    await this.page.waitFor(3000);
    expect(await this.page.$eval('#debugger-io', isVisible)).to.be.true;    
  });

  it('HS256 should be selected by default', async function() {
    const selected = await this.page.$eval('#algorithm-select', select => {
      return select.options[select.selectedIndex].value;
    });

    expect(selected).to.equal('HS256');
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
      delay: 5 
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
      delay: 5 
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
      delay: 5 
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
      delay: 5 
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

    describe('Decodes HS256/384/512 tokens', function() {      
      const algs = Object.keys(tokens).filter(alg => alg.includes('hs'));
      
      for(const alg of algs) {
        it(alg.toUpperCase(), async function() {
          const secretInput = await this.page.$('input[name="secret"]');
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(tokens[alg].secret, { 
            delay: 5 
          });

          await this.page.click('.js-input');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(tokens[alg].token, { 
            delay: 5 
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
            delay: 5 
          });

          const secretInput = await this.page.$('textarea[name="public-key"]');
          await secretInput.click();
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await secretInput.type(tokens[alg].publicKey, { 
            delay: 5 
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
            delay: 5 
          });

          await this.page.click('textarea[name="private-key"]');
          await this.page.keyboard.down('ControlLeft');
          await this.page.keyboard.press('KeyA');
          await this.page.keyboard.up('ControlLeft');
          await this.page.keyboard.type(defaultTokens['rs256'].privateKey, { 
            delay: 5 
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
              delay: 5 
            });

            await this.page.click('.js-payload');
            await this.page.keyboard.down('ControlLeft');
            await this.page.keyboard.press('KeyA');
            await this.page.keyboard.up('ControlLeft');
            await this.page.keyboard.type(JSON.stringify({
              sub: 'test'
            }, null, 2), { 
              delay: 5 
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
      before(function() {

      });

      after(function() {

      });

      it('iss URL + .well-known');
      it('jku');
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
        delay: 5 
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
        delay: 5 
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
        delay: 5 
      });

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(tokens['rs256'].publicKey, { 
        delay: 5 
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
      await this.page.select('#algorithm-select', 'RS256');

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(tokens['rs256'].token, { 
        delay: 5 
      });

      const secretInput = await this.page.$('textarea[name="public-key"]');
      await secretInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await secretInput.type(tokens['rs256'].publicKey, { 
        delay: 5 
      });

      const valid = await this.page.$eval('.validation-status', status => {
        return status.classList.contains('valid-token') && 
              status.textContent.indexOf('verified') !== -1;
      });
  
      expect(valid).to.be.true;

      await secretInput.click();
      await this.page.keyboard.type('sdfasdf389972389', {
        delay: 5
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
        delay: 5 
      });

      const privateKeyInput = await this.page.$('textarea[name="private-key"]');
      await privateKeyInput.click();
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');      

      const head = defaultTokens['rs256'].privateKey.slice(0, 20);
      const tail = defaultTokens['rs256'].privateKey.slice(20);

      await privateKeyInput.type(`${head}sadfasdf${tail}`, { 
        delay: 5 
      });

      await this.page.click('.js-input');
      await this.page.keyboard.down('ControlLeft');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('ControlLeft');
      await this.page.keyboard.type(defaultTokens['rs256'].token, { 
        delay: 5 
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
        delay: 5 
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
        delay: 5 
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
      delay: 5 
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
      delay: 5 
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
      delay: 5 
    });

    await this.page.click('.js-payload');
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyA');
    await this.page.keyboard.up('ControlLeft');

    const payload = {
      sub: 'test'      
    };
    await this.page.keyboard.type(JSON.stringify(payload, null, 2), { 
      delay: 5 
    });

    await this.page.reload();

    const storedPayload = await this.page.evaluate(() => {
      return JSON.parse(window.test.payloadEditor.getValue());
    });

    expect(storedPayload).to.deep.equal(payload);
  });
});
