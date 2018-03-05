import { 
  setupTokenEditor,
  setTokenEditorValue,
  getTokenEditorValue
} from '../editor';
import { setupTokenPageInspector } from './page-inspector.js';
import { shareJwtLink, shareJwtTextElement } from './dom-elements.js';
import { copyTokenLink } from '../utils.js';
import { getTokenFromClipboardIfPossible } from './utils.js';
import strings from '../strings.js';

function setupShareJwtButton() {
  shareJwtLink.addEventListener('click', event => {
    event.preventDefault();

    const value = getTokenEditorValue();
    if(value.token) {
      // If the selected algorithm does not use public keys, publicKey will be
      // undefined.
      copyTokenLink(value.token, value.publicKey);
    }

    const shareJwtTextNode = shareJwtTextElement.firstChild;
    shareJwtTextNode.textContent = strings.extension.jwtIoUrlCopied;
    setTimeout(() => {
      shareJwtTextNode.textContent = strings.extension.shareThisJwt;
    }, 2000);
  });
}

function loadFromClipboardIfPossible() {
  const token = getTokenFromClipboardIfPossible();
  if(token) {
    setTokenEditorValue(token);
  }
}

// Initialization
setupTokenEditor();
loadFromClipboardIfPossible();
setupTokenPageInspector();
setupShareJwtButton();
