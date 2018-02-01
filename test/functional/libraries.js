const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const utils = require('./utils.js');

const isVisible = utils.isVisible;

chai.use(chaiAsPromised);
chai.use(chaiArrays);
const expect = chai.expect;

describe('Libraries', function() {
  before(utils.launchBrowser);

  after(utils.closeBrowser);

  it('Displays libraries when clicking on navbar', async function() {
    await this.page.click('a[href="#libraries-io"]');
    // Wait for scroll
    await this.page.waitFor(3000);
    expect(await this.page.$eval('#libraries-io', isVisible)).to.be.true;    
  });

  it('Displays a sorted library filter', async function() {
    const libraries = await this.page.$eval('#libraries-select', select => {
      const result = [];
    
      Array.prototype.forEach.call(select.children, element => {
        result.push(element.value);
      });
      
      return result;  
    });

    expect(libraries).to.be.sorted;
  });

  it('Hides and displays libraries using filters', async function() {    
    await this.page.select('#libraries-select', '.php');
    // Wait for animation
    await this.page.waitFor(2000);

    expect(await this.page.$eval('.php', isVisible)).to.be.true; 
    expect(await this.page.$eval('.net', isVisible)).to.be.false; 
    expect(await this.page.$eval('.python', isVisible)).to.be.false; 
    
    await this.page.waitForSelector('.net', {
      hidden: true
    });
    await this.page.waitForSelector('.python', {
      hidden: true
    });

    await this.page.select('#libraries-select', '*');
    // Wait for animation
    await this.page.waitFor(2000);

    await this.page.waitForSelector('.net', {
      visible: true
    });
    await this.page.waitForSelector('.php', {
      visible: true
    });
    await this.page.waitForSelector('.python', {
      visible: true
    });
  });
});
