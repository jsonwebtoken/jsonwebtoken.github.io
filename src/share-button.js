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
      const copiedUrl = copyTokenLink(value.token, value.publicKey);

      // We cannot read the clipboard in headless Chrome,
      // so we use this to let functional tests see the URL. See:
      // https://github.com/GoogleChrome/puppeteer/issues/2147
      if(!window.test) {
        window.test = {};
      }
      window.test.shareJwtCopiedUrl = copiedUrl;
    }

    const shareJwtTextNode = shareJwtTextElement.firstChild;
    shareJwtTextNode.textContent = strings.common.jwtIoUrlCopied;
    setTimeout(() => {
      shareJwtTextNode.textContent = strings.common.shareThisJwt;
    }, 2000);
  });
}
