import { extensionButton, extensionButtonText } from './dom-elements.js';
import strings from '../strings.js';

// https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
function isChrome() {
  // please note,
  // that IE11 now returns undefined again for window.chrome
  // and new Opera 30 outputs true for window.chrome
  // and new IE Edge outputs to true now for window.chrome
  // and if not iOS Chrome check
  // so use the below updated condition
  const isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    return false;
  } else if (isChromium !== null && 
             isChromium !== undefined && 
             vendorName === "Google Inc." && 
             isOpera == false && 
             isIEedge == false) {
    return true;
  } else {
    return false;
  }
}

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
