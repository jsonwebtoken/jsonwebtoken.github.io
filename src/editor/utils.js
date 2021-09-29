import * as Bowser from 'bowser';
import { isWideScreen } from '../utils.js';
import {
  algorithmSelect,
  algorithmEs512,
  editorElement,
  decodedElement
} from '../dom-elements.js';

const browser = Bowser.parse(window.navigator.userAgent);

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

export function isWebkit() {
  return browser.engine.name === 'WebKit';
}

export function disableUnsupportedAlgorithms() {
  // TODO: test supported algorithms in runtime
  if(isWebkit()) {
    algorithmEs512.disabled = true;
  }
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}
