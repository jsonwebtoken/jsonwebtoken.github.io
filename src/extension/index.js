import {
  setupTokenEditor,
  setTokenEditorValue,
  useDefaultToken
} from '../editor';
import { getParameterByName } from '../utils.js';
import { publicKeyTextArea } from './dom-elements.js';

/* For initialization, look at the end of this file */

function parseLocationQuery() {
  const publicKey = getParameterByName('publicKey');
  const value = getParameterByName('value');
  const token = getParameterByName('token');

  if(publicKey) {
    publicKeyTextArea.value = publicKey;
  }
  if(value) {
    setTokenEditorValue(value);
  }
  if(token) {
    setTokenEditorValue(token);
  }
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

// Initialization
setupTokenEditor();
loadToken();
parseLocationQuery();
