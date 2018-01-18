import { setupNavbar } from './navbar.js';
import { setupExtensionButton } from './extension.js';
import { setupLibraries } from './libraries.js';
import { setupTokenEditor, setTokenEditorValue } from '../editor';
import { setupJwtCounter } from './counter.js';
import { setupSmoothScrolling } from './smooth-scrolling.js';
import { setupHighlighting } from './highlighting.js';
import { getParameterByName } from '../utils.js';
import { 
  publicKeyTextArea, 
  codeElements, 
  debuggerSection,
  extensionSection,
  ebookSection
} from './dom-elements.js';

/* For initialization, look at the end of this file */

function parseLocationQuery() {
  const publicKey = getParameterByName('publicKey');
  const value = getParameterByName('value');
  const token = getParameterByName('token');

  let scroll = false;
  if(publicKey) {
    publicKeyTextArea.value = publicKey;
    scroll = true;
  }
  if(value) {
    setTokenEditorValue(value);
    scroll = true;
  }
  if(token) {
    setTokenEditorValue(token);
    scroll = true;
  }

  if(scroll) {
    debuggerSection.scrollIntoView(true);
  }
}

function pickEbookOrExtensionBanner() {
  if(Math.random() >= 0.5) {
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
