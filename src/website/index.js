import '../google-analytics.js';
import * as metrics from './metrics.js';
import { setupNavbar } from './navbar.js';
import { setupExtensionButton } from './extension.js';
import { setupLibraries } from './libraries.js';
import { setupTokenEditor, setTokenEditorValue } from '../editor';
import { setupJwtCounter } from './counter.js';
import { setupSmoothScrolling } from './smooth-scrolling.js';
import { setupHighlighting } from './highlighting.js';
import { isChrome, isFirefox, isPartiallyInViewport, once } from './utils.js';
import { setupShareJwtButton } from '../share-button.js';
import {
  publicKeyTextArea,
  debuggerSection,
  extensionSection,
  ebookSection,
  shareJwtButton,
  shareJwtTextElement,
  librariesElement
} from './dom-elements.js';

import queryString from 'querystring';

/* For initialization, look at the end of this file */

function parseLocationQuery() {
  const locSearch = queryString.parse(document.location.search.substr(1));
  const locHash = queryString.parse(document.location.hash.substr(1));

  const keys = [
    'id_token',
    'access_token',
    'value',
    'token',
    'debugger-io?token'
  ];
  for(const key of keys) {
    const token = locSearch[key] || locHash[key];

    if(token) {
      metrics.track('token-in-url', { type: key });

      setTokenEditorValue(token);

      if(locSearch.publicKey || locHash.publicKey) {
        metrics.track('pubkey-in-url');
        publicKeyTextArea.value = locSearch.publicKey || locHash.publicKey;
      }

      debuggerSection.scrollIntoView(true);

      break;
    }
  }
}

function pickEbookOrExtensionBanner() {
  if((isChrome() || isFirefox()) && (Math.random() >= 0.5)) {
    metrics.track('extension-banner-shown');
    extensionSection.style.display = 'block';
  } else {
    metrics.track('ebook-banner-shown');
    ebookSection.style.display = 'block';
  }
}

function setupMetrics() {
  metrics.init(PRODUCTION ? 'PROD-KEY' : 'DEV-KEY');

  // Section visible metrics
  window.addEventListener('scroll', e => {
    if(isPartiallyInViewport(librariesElement)) {
      once('libraries-visible', () => metrics.track('libraries-visible-once'));
    }

    if(isPartiallyInViewport(debuggerSection)) {
      once('debugger-visible', () => metrics.track('debugger-visible-once'));
    }
  });
}

// Initialization
setupMetrics();
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
