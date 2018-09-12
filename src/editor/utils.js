import { isWideScreen } from '../utils.js';
import * as metrics from '../metrics.js';
import * as jwt from './jwt.js';
import forge from 'node-forge';
import {
  algorithmSelect,
  algorithmEs512,
  editorElement,
  decodedElement
} from '../dom-elements.js';

const sha256 = forge.md.sha256.create();

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
    metrics.track('editor-disabled-es512-safari');
  }
}

export function getSafeTokenInfo(jwt) {
  try {
    sha256.start();
    sha256.update(jwt);

    const result = {
      hash: sha256.digest().toHex()
    };

    try {
      const decoded = jwt.decode(jwt);

      return Object.assign(result, {
        decodedWithErrors: decoded.errors,
        header: {
          alg: decoded.header.alg,
        },
        payload: {
          // TODO
        }
      });
    } catch(e) {
      return Object.assign(result, {
        error: 'error decoding token',
      });
    }
  } catch(e) {
    sha256.start();

    return {
      error: 'error reading token',
      hash: sha256.digest().toHex() // Hash for empty string
    };
  }
}
