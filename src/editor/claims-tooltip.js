import { claimsTooltipElement } from '../dom-elements.js';
import { stringifyIndentSpaces } from './utils.js';
import strings from '../strings.js';
import { 
  payloadElement,
  headerElement,
  decodedElement
} from '../dom-elements.js';

import tippy from 'tippy.js';

const timeClaims = ['exp', 'nbf', 'iat', 'auth_time', 'updated_at'];

function hideTooltip() {
  decodedElement._tippy.popper.style.opacity = 0;
}

function showTooltip(text) {
  decodedElement._tippy.popper.querySelector('.tippy-content')
                .textContent = text;
  decodedElement._tippy.popperInstance.update();
  decodedElement._tippy.popper.style.opacity = 1;
}

function getTimeText(timeStr) {
  return (new Date(parseInt(timeStr, 10) * 1000)).toString();
}

function tooltipHandler(event) {
  const editor = event.currentTarget.querySelector('.CodeMirror').CodeMirror;

  if(!editor) {
    hideTooltip();
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
    showTooltip(getTimeText(matches[2]));
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
    distance: 20,
    sticky: true,
    updateDuration: 100
  });  

  decodedElement._tippy.popper.style.opacity = 0;

  payloadElement.addEventListener('mousemove', tooltipHandler);
  headerElement.addEventListener('mousemove', tooltipHandler);
}
