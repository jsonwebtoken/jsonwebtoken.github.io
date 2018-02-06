const puppeteer = require('puppeteer');
const os = require('os');

// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function isVisible(elm) {
  try {
    const rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, 
                                window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0) && 
           rect.width > 0 && 
           rect.height > 0;
  } catch(e) {
    return false;
  }
}

async function launchBrowser() {
  // Initial navigation may take long due to outside requests.
  this.timeout(30000);

  const options = os.hostname() === 'i7-4790K-LIN' ? {    
    headless: false,
    executablePath: '/usr/bin/chromium'
  } : {
    args: ['--no-sandbox']
  };

  this.browser = await puppeteer.launch(options);
  this.page = await this.browser.newPage();
  await this.page.setViewport({
    width: 1920,
    height: 1080
  });
  await this.page.goto('http://localhost:8000');
}

async function closeBrowser() {
  await this.browser.close();
}

module.exports = {
  isVisible: isVisible,
  launchBrowser: launchBrowser,
  closeBrowser: closeBrowser
};
