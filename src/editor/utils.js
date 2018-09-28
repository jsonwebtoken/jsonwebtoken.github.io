import { isWideScreen } from '../utils.js';
import * as metrics from '../metrics.js';
import * as jwt from './jwt.js';
import registeredClaims from './jwt-iana-registered-claims.js';
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

export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function getBase64Format(token) {
  try {
    function getFormat(str) {
      if(jwt.isValidBase64String(str, true)) {
        return 'base64url';
      } else if(jwt.isValidBase64String(str, false)) {
        return 'base64';
      } else {
        return 'invalid';
      }
    }

    const formats = token.split('.').map(getFormat);
    return formats.every(r => r === formats[0]) ?
      formats[0] : 'invalid';
  } catch(e) {
    return 'invalid';
  }
}

function getRegisteredClaims(payload) {
  const result = [];

  registeredClaims.forEach(claim => {
    if(claim in payload) {
      result.push(claim);
    }
  });

  return result;
}

function getScopes(payload) {
  if(!isString(payload.scope)) {
    return [];
  }

  const scopes = payload.scope.split(/\s+/).filter(scope => {
    return scope.length > 0 && /\S+/.test(scope);
  });

  return scopes;
}

function getNumberOfScopes(payload) {
  return getScopes(payload).length;
}

function getOIDCScopes(payload) {
  const oidcScopes = ['openid', 'profile', 'email',
                      'address', 'phone', 'offline_access'];
  const scopes = getScopes(payload);

  return scopes.filter(scope => oidcScopes.indexOf(scope) !== -1);
}

export function getSafeTokenInfo(token) {
  try {
    sha256.start();
    sha256.update(token);

    const result = {
      hash: sha256.digest().toHex()
    };

    try {
      const decoded = jwt.decode(token);

      Object.assign(result, {
        decodedWithErrors: decoded.errors,
        encodedSize: token.length,
        base64Format: getBase64Format(token),
        header: {
          alg: decoded.header.alg,
        },
        payload: {
          registeredClaimsPresent: getRegisteredClaims(decoded.payload),
          oidcScopesPresent: getOIDCScopes(decoded.payload),
          numberOfScopes: getNumberOfScopes(decoded.payload),
          numberOfClaims: Object.keys(decoded.payload).length,
          issuer: decoded.payload.iss ? decoded.payload.iss : null
        }
      });

      if(decoded.payload.amr) {
        result.payload.amr = decoded.payload.amr;
      }

      return result;
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
