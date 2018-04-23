import { setupNavbar } from './navbar.js';
import { setupExtensionButton } from './extension.js';
import { setupLibraries } from './libraries.js';
import { setupTokenEditor, setTokenEditorValue } from '../editor';
import { setupJwtCounter } from './counter.js';
import { setupSmoothScrolling } from './smooth-scrolling.js';
import { setupHighlighting } from './highlighting.js';
import { isChrome, isFirefox } from './utils.js';
import { setupShareJwtButton } from '../share-button.js';
import { 
  publicKeyTextArea, 
  codeElements, 
  debuggerSection,
  extensionSection,
  ebookSection,
  shareJwtButton,
  shareJwtTextElement
} from './dom-elements.js';

import queryString from 'querystring';

/* For initialization, look at the end of this file */

function parseLocationQuery() {
  const locSearch = queryString.parse(document.location.search.substr(1));
  const locHash = queryString.parse(document.location.hash.substr(1));

  const token = locSearch.id_token || 
                locSearch.access_token ||
                locSearch.value ||
                locSearch.token;
  if(token) {
    setTokenEditorValue(token);

    if(locSearch.publicKey) {
      publicKeyTextArea.value = locSearch.publicKey;
    }

    debuggerSection.scrollIntoView(true);
  } else if(locHash.token) { // Legacy token passing method (as hash)    
    setTokenEditorValue(locHash.token);
  }    
}

function pickEbookOrExtensionBanner() {
  if((isChrome() || isFirefox()) && (Math.random() >= 0.5)) {
    extensionSection.style.display = 'block';
  } else {
    ebookSection.style.display = 'block';
  }
}

// Initialization
setupNavbar();
setupExtensionButton();
setupSmoothScrolling();
setupLibraries();
setupTokenEditor();
parseLocationQuery();
setupHighlighting();
setupJwtCounter();
pickEbookOrExtensionBanner();
setupShareJwtButton(shareJwtButton, shareJwtTextElement);
