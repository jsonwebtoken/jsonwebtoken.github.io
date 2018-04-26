import { getSelectedAlgorithm } from './utils.js';
import { 
  secretInput,
  secretBase64Checkbox,
} from '../dom-elements.js';

import log from 'loglevel';
import tippy from 'tippy.js';
import { b64utohex, utf8tohex } from 'jsrsasign';

export function minSecretLengthCheck(event) {
  const alg = getSelectedAlgorithm();
  if(alg.indexOf('HS') !== 0) {
    log.error(`Secret input tooltip handler for wrong algorithm: ${alg}`);
    return;
  }

  const algBits = parseInt(alg.substr(2));
  const inputBits = secretBase64Checkbox.checked ? 
    b64utohex(secretInput.value).length / 2 * 8 :
    utf8tohex(secretInput.value).length / 2 * 8;

  console.log(utf8tohex(secretInput.value));

  if(inputBits < algBits) {
    if(!secretInput._tippy.state.visible) {
      secretInput._tippy.show();
    }
  } else {
    secretInput._tippy.hide();
  }
}

export function setupSecretLengthTooltip() {
  tippy(secretInput, {
    trigger: 'manual',
    placement: 'right',
    arrow: true,
    arrowTransform: 'scale(0.75)',
    size: 'large'
  });
}
