import { copyTokenLink } from './utils.js';
import { getTokenEditorValue } from './editor';

import strings from './strings.js';

export function setupShareJwtButton(shareJwtElement, shareJwtTextElement) {
  shareJwtElement.addEventListener('click', event => {
    event.preventDefault();

    const value = getTokenEditorValue();
    if(value.token) {
      // If the selected algorithm does not use public keys, publicKey will be
      // undefined.
      copyTokenLink(value.token, value.publicKey);
    }

    const shareJwtTextNode = shareJwtTextElement.firstChild;
    shareJwtTextNode.textContent = strings.common.jwtIoUrlCopied;
    setTimeout(() => {
      shareJwtTextNode.textContent = strings.common.shareThisJwt;
    }, 2000);
  });
}
