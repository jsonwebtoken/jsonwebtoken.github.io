import { claimsTooltipElement } from '../dom-elements.js';
import { timeClaims } from './time-tooltip.js';
import { stringifyIndentSpaces } from './utils.js';
import strings from '../strings.js';

function hideTooltip() {
  claimsTooltipElement.style.display = 'none';
}

function showTooltip(x, y, text) {
  claimsTooltipElement.firstChild.textContent = text;
  claimsTooltipElement.style.left = x + 'px';
  claimsTooltipElement.style.top = y + 'px';
  claimsTooltipElement.style.display = 'block';
}

export function claimsTooltipHandler(event) {
  const editor = event.currentTarget.querySelector('.CodeMirror').CodeMirror;
  //const editor = event.currentTarget.firstChild.CodeMirror;

  if(!editor) {
    return;
  }

  const result = editor.coordsChar({
    left: event.pageX,
    top: event.pageY
  }, 'page');

  const line = editor.getLine(result.line);
  const matches = /"(.*)":\s*"?(.*)"?/.exec(line);

  if(!matches) {
    hideTooltip();
    return;
  }

  const claim = matches[1];  

  // If this is a time claim and the mouse cursor is on top of the time,
  // let the time tooltip handle this, do nothing.
  // TODO: merge both tooltip handlers?
  const claimEnd = line.indexOf(':');
  if(result.ch >= claimEnd && timeClaims.includes(claim)) {
    hideTooltip();
    return;
  }

  const claimText = strings.common.claims[claim];
  if(!claimText) {
    hideTooltip();
    return;
  }

  showTooltip(event.pageX, event.pageY, claimText);
}
