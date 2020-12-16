import {
  setupTokenEditor,
  setTokenEditorValue,
  getTokenEditorValue
} from "../editor";
import { setupTokenPageInspector } from "./page-inspector.js";
import {
  shareJwtLink,
  shareJwtTextElement,
  insertJwtCheckbox
} from "./dom-elements.js";
import { getTokenFromClipboardIfPossible } from "./utils.js";
import { setupShareJwtButton } from "../share-button.js";
import { setupInsertJwtCheckbox } from "./insert-button.js";
import strings from "../strings.js";

function loadFromClipboardIfPossible() {
  const token = getTokenFromClipboardIfPossible();
  if (token) {
    setTokenEditorValue(token);
  }
}

// Initialization
setupTokenEditor();
loadFromClipboardIfPossible();
setupTokenPageInspector();
setupShareJwtButton(shareJwtLink, shareJwtTextElement);
setupInsertJwtCheckbox(insertJwtCheckbox);
