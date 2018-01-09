import { setupNavbar } from './navbar.js';
import { setupExtensionButton } from './extension.js';
import { setupLibraries } from './libraries.js';
import {
  setupTokenEditor,
  setTokenEditorValue,
  useDefaultToken
} from './editor';
import { setupJwtCounter } from './counter.js';
import { getParameterByName } from './utils.js';
import { 
  publicKeyTextArea, 
  codeElements, 
  debuggerSection
} from './dom-elements.js';

import hljs from 'highlight.js';

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
    setTokenEditorValue(value);
    scroll = true;
  }

  debuggerSection.scrollIntoView(true);
}

function loadToken() {
  const lastToken = localStorage.getItem('lastToken');
  if(lastToken) {
    setTokenEditorValue(value);
    
    const lastPublicKey = localStorage.getItem('lastPublicKey');
    if(lastPublicKey) {
      publicKeyTextArea.value = lastPublicKey;
    }
  } else {
    useDefaultToken('HS256');
  }
}

function setupHighlighting() {
  // TODO: consider replacing this with CodeMirror, which we already use.

  hljs.configure({
    classPrefix: ''
  });
  
  Array.prototype.forEach.call(codeElements, element => {
    if(!element.classList.contains('hljs')) {
      element.classList.add('hljs');
      hljs.highlightBlock(element);   
    }
  });
}

function setupSmoothScrolling() {
  //TODO
  console.log('TODO: smooth scrolling');
}

// Initialization
setupNavbar();
setupExtensionButton();
setupSmoothScrolling();
setupLibraries();
setupTokenEditor();
loadToken();
parseLocationQuery();
setupHighlighting();
setupJwtCounter();
