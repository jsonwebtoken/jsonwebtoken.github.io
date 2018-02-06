const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const utils = require('./utils.js');

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
});
