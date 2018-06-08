import { isWideScreen } from '../utils.js';
import {
  algorithmSelect,
  algorithmEs512,
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

export const stringifyIndentSpaces = 2;

export function stringify(object) {
  return JSON.stringify(object, null, stringifyIndentSpaces);
}

export function getSelectedAlgorithm() {
  const selected = algorithmSelect.options[algorithmSelect.selectedIndex];
  return selected.value;
}

export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function disableUnsupportedAlgorithms() {
  // TODO: test supported algorithms in runtime
  if(isSafari()) {
    algorithmEs512.disabled = true;
  }
}
