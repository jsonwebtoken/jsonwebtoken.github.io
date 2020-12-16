import { getTokenEditorValue, setTokenEditorValue } from '../editor';

export function setupInsertJwtCheckbox(insertJwtCheckbox) {
  const background = chrome.extension.getBackgroundPage();

  addEventListener('unload', function (event) {
    // Must write to background DOM; cannot use messaging API as
    // async sendMessage won't reach background script in time 
    const value = getTokenEditorValue();
    if (value.token) {
      background.data['token'] = value.token;
    }
  }, true);

  // Get data stored in background script
  chrome.runtime.sendMessage({}, (data) => {
    insertJwtCheckbox.checked = data['isInsert'];

    if (data['token']) {
      setTokenEditorValue(data['token']);
    }
  });

  // Store checkbox state
  insertJwtCheckbox.addEventListener('change', function() {
    chrome.runtime.sendMessage({isInsert: this.checked});
  });
}
