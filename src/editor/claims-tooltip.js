import { claimsTooltipElement } from '../dom-elements.js';
import { timeClaims } from './time-tooltip.js';
import { stringifyIndentSpaces } from './utils.js';
import strings from '../strings.js';
import { 
  payloadElement,
  headerElement,
  decodedElement
} from '../dom-elements.js';

import tippy from 'tippy.js';

function hideTooltip() {
  decodedElement._tippy.hide();
}

function showTooltip(text) {
  decodedElement.title = text;
  decodedElement._tippy.show();
}

function tooltipHandler(event) {
  const editor = event.currentTarget.querySelector('.CodeMirror').CodeMirror;

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

  showTooltip(claimText);
}

export function setupClaimsTooltip() {
  tippy(decodedElement, {    
    placement: 'left',
    arrow: true,
    followCursor: true,
    performance: true,
    size: 'large',
    dynamicTitle: true,
    arrowTransform: 'scale(0.75)',
    distance: 20
  });

  payloadElement.addEventListener('mousemove', tooltipHandler);
  headerElement.addEventListener('mousemove', tooltipHandler);
}
