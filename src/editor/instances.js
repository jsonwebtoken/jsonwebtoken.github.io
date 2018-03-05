import CodeMirror from 'codemirror';
import jwtMode from './jwt-mode.js';
import { 
  headerElement,
  payloadElement,
  editorElement
} from '../dom-elements.js';

CodeMirror.defineMode('jwt', jwtMode);

const jsonEditorOptions = {
  mode: 'application/json',
  lineWrapping: true,
  extraKeys: {
    'Tab': instance => {
      instance.replaceSelection('   ', 'end');
    }
  },
  lint: true,
  scrollbarStyle: 'null'
};

const tokenEditorOptions = Object.assign({}, jsonEditorOptions, {
  mode: 'jwt',
  theme: 'night'
});

export const headerEditor = new CodeMirror(headerElement, jsonEditorOptions);
export const payloadEditor = new CodeMirror(payloadElement, jsonEditorOptions);
export const tokenEditor = new CodeMirror(editorElement, tokenEditorOptions);

// Expose instances as globals for functional tests.
if(!window.test) {
  window.test = {};
}
window.test.headerEditor = headerEditor;
window.test.payloadEditor = payloadEditor;
window.test.tokenEditor = tokenEditor;
