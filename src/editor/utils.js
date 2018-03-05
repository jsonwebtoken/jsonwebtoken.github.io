import { tokenEditor } from './instances.js';
import { isWideScreen } from '../utils.js';
import { 
  algorithmSelect, 
  publicKeyTextArea,
  editorElement,
  decodedElement
} from '../dom-elements.js';

export function getTrimmedValue(instance) {
  const value = instance.getValue();
  if (!value) {
    return '';
  }

  return value.replace(/\s/g, '');
}

export function fixEditorHeight() {
  if(isWideScreen()) {
    editorElement.style.height = `${decodedElement.offsetHeight}px`;
  }
}

export function stringify(object) {
  return JSON.stringify(object, null, 2);
}
