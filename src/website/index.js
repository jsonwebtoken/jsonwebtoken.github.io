import { setupNavbar } from "./navbar.js";
import { setupExtensionButton } from "./extension.js";
import { setupLibraries } from "./libraries.js";
import { setupTokenEditor, setTokenEditorValue } from "../editor";
import { setupJwtCounter } from "./counter.js";
import { setupSmoothScrolling } from "./smooth-scrolling.js";
import { setupHighlighting } from "./highlighting.js";
import { isChrome, isFirefox, isPartiallyInViewport, once } from "./utils.js";
import { setupShareJwtButton } from "../share-button.js";
import {
  publicKeyTextArea,
  debuggerSection,
  extensionSection,
  ebookSection,
  shareJwtButton,
  shareJwtTextElement,
  librariesElement
} from "./dom-elements.js";

import queryString from "querystring";

/* For initialization, look at the end of this file */

function parseLocationQuery() {
  const locSearch = queryString.parse(document.location.search.substr(1));
  const locHash = queryString.parse(document.location.hash.substr(1));

  const keys = [
    "id_token",
    "access_token",
    "value",
    "token",
    "debugger-io?token"
  ];
  for (const key of keys) {
    const token = locSearch[key] || locHash[key];

    if (token) {
      if (locSearch.publicKey || locHash.publicKey) {
        publicKeyTextArea.value = locSearch.publicKey || locHash.publicKey;
      }

      setTokenEditorValue(token);

      debuggerSection.scrollIntoView(true);

      break;
    }
  }
}

// Initialization
setupNavbar();
setupExtensionButton();
setupSmoothScrolling();
setupLibraries();
setupTokenEditor();
parseLocationQuery();
setupHighlighting();
setupJwtCounter();
setupShareJwtButton(shareJwtButton, shareJwtTextElement);
