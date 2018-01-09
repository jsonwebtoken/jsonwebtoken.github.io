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
  lint: true
};

const tokenEditorOptions = Object.assign({}, jsonEditorOptions, {
  mode: 'jwt',
  theme: 'night'
});

export const headerEditor = new CodeMirror(headerElement, jsonEditorOptions);
export const payloadEditor = new CodeMirror(payloadElement, jsonEditorOptions);
export const tokenEditor = new CodeMirror(editorElement, tokenEditorOptions);
