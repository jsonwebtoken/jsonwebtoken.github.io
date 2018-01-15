import {
  setupTokenEditor,
  setTokenEditorValue,
  useDefaultToken
} from '../editor';
import { publicKeyTextArea } from './dom-elements.js';

/* For initialization, look at the end of this file */

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

// Initialization
setupTokenEditor();
loadToken();
