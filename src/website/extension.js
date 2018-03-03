import { extensionButton, extensionButtonText } from './dom-elements.js';
import { isChrome } from './utils.js';
import strings from '../strings.js';

function setInstalledText() {
  if (extensionButton.classList.contains('is-installed')) {
    extensionButtonText.firstChild.textContent =
      strings.extension.alreadyInstalled;

    extensionButton.style.cursor = 'default';
  }
}

export function setupExtensionButton() {
  // The is-installed class is added by the extension (when it is installed). 
  // It is unspecified when this is done. So check again in a second or so.
  setTimeout(setInstalledText, 1000);

  // chrome.webstore.install can only be called from standard event handlers.
  extensionButton.addEventListener('click', () => {
    const chromeUrl = 'https://chrome.google.com/webstore/detail/' +
                      'jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd';
    const firefoxUrl = 'https://addons.mozilla.org/en-US/firefox' +   
                       '/addon/jwtio-debugger/';

    if (extensionButton.classList.contains('is-installed')) {
      return;
    }

    function notInstalled(url) {
      extensionButton.classList.remove('is-installed');
      extensionButtonText.firstChild.textContent = 
        strings.extension.addToBrowser;
      window.open(url);
    }

    if(isChrome()) {
      try {
        chrome.webstore.install(chromeUrl, () => {
          button.classList.add('is-installed');
          setInstalledText();
        }, () => {
          notInstalled(chromeUrl);
        });
      } catch (e) {
        notInstalled(chromeUrl);
      }
    } else {
      notInstalled(firefoxUrl);
    }
  });
}
