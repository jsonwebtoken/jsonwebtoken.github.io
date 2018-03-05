import { isToken } from '../editor/jwt.js'
import { getTokenEditorValue, setTokenEditorValue } from '../editor';
import { 
  cookiesOptGroup,
  webStorageOptGroup,
  saveBackElement,
  saveBackLink,
  storageSelect  
} from './dom-elements.js';
import strings from '../strings.js';

function updateOptGroups() {
  var optGroups = [cookiesOptGroup, webStorageOptGroup];

  optGroups.forEach(optGroup => {
    const hasJWTs = optGroup.querySelectorAll(':not(.load-from-no-jwts)')
                            .length > 0;
    if (hasJWTs) {
      const toRemove = optGroup.querySelectorAll('.load-from-no-jwts');
      Array.prototype.forEach.call(toRemove, e => e.remove());
    } else {      
      const noJwtOption = document.createElement('option');
      noJwtOption.classList.add('load-from-no-jwts');
      noJwtOption.text = strings.extension.noJwtsFound;
      noJwtOption.disabled = true;

      optGroup.innerHTML = ''; // Remove all elements
      optGroup.appendChild(noJwtOption);      
    }
  });
}

function messageHandler(message) {
  if (message.type !== 'cookies' && message.type !== 'storage') {
    return;
  }

  const elements = [];

  message.tokens.forEach(token => {
    if (!isToken(token.value)) {
      if(message.type === 'cookies') {
        return;
      }

      try {
        // Try again after parsing it first, some people do
        //localStorage.setItem('jwt', JSON.stringify(token))
        token.value = JSON.parse(token.value);
        if (!isToken(token.value)) {
          // Not a valid token, ignore it.
          return;
        }
      } catch (e) {
        // Not a valid token, ignore it.
        return;
      }
    }

    const e = document.createElement('option');
    e.text = token.name;
    e.value = token.value;
    e.setAttribute('data-type', token.type);

    if(token.cookie) {
      e.setAttribute('data-cookie', JSON.stringify(token.cookie));
    }

    elements.push(e);
  });

  if (message.type === 'cookies') {
    elements.forEach(e => cookiesOptGroup.appendChild(e));
  } else {
    elements.forEach(e => webStorageOptGroup.appendChild(e));
  }

  updateOptGroups();
}

function saveCookie(url, cookie, oldCookie) {
  // Some cookies get duplicated otherwise (chrome.cookies.set bug?)
  chrome.cookies.remove({
      url: url,
      name: oldCookie.name,
      storeId: oldCookie.storeId
  });
  chrome.cookies.set({
      url: url,
      name: oldCookie.name,
      value: cookie.value,
      domain: oldCookie.domain,
      path: oldCookie.path,
      secure: oldCookie.secure,
      httpOnly: oldCookie.httpOnly,
      expirationDate: oldCookie.expirationDate,
      storeId: oldCookie.storeId
  });
}

function saveBackClick() {
  const selected = storageSelect.options[storageSelect.selectedIndex];
  const type = selected.getAttribute('data-type');
  const name = selected.text;
  const value = getTokenEditorValue().token;

  selected.value = value;

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const data = {
      type: type + 'Save',
      name: name,
      value: value
    };
    if(type === 'cookie') {
      saveCookie(tabs[0].url, data, 
                 JSON.parse(selected.getAttribute('data-cookie')));
    } else {
      chrome.tabs.sendMessage(tabs[0].id, data);
    }
  });
}

function storedJwtSelect() {
  const selected = storageSelect.options[storageSelect.selectedIndex];

  if(selected.getAttribute('name') === '0') { // "None" selected
    saveBackElement.classList.add('hide');
    return;
  }
  saveBackElement.classList.remove('hide');

  const type = selected.parentElement.getAttribute('label').toLowerCase();

  const name = selected.text;
  const value = selected.value;

  setTokenEditorValue(value);

  saveBackLink.firstChild.textContent = strings.extension.saveBackTo + type;
}

function setupListeners() {
  saveBackElement.addEventListener('click', saveBackClick);
  storageSelect.addEventListener('change', storedJwtSelect);
}

function getCookies() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.cookies.getAll({
      url: tabs[0].url,
    }, cookies => {
      const result = cookies.map(cookie => {
        return {
          name: cookie.name,
          value: cookie.value,
          type: 'cookie',
          cookie: cookie
        }
      });

      messageHandler({
        type: 'cookies',
        tokens: result
      });
    });
  });
}

function setupInjectedCode() {
  chrome.runtime.onMessage.addListener(messageHandler);

  chrome.tabs.executeScript({
    file: 'js/webstorage.js',
    runAt: "document_idle"
  });
}

export function setupTokenPageInspector() {
  setupInjectedCode();
  getCookies();
  updateOptGroups();
  setupListeners();
}
