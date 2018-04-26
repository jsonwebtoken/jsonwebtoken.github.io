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

let instance;

function hideTooltip() {
  if(instance) {
    instance.destroy();
    instance = null;
  }
}

function showTooltip(element, text, placement) {
  function newTooltip() {
    element.title = text;

    tippy(element, {
      placement: placement,
      arrow: true,
      performance: true,
      size: 'large',
      dynamicTitle: true,
      arrowTransform: 'scale(0.75)',
      distance: 10,
      updateDuration: 100,
      trigger: 'manual'
    });  

    return element._tippy;
  }

  if(instance) {
    if(instance.reference !== element || 
       instance.options.placement !== placement) {
      instance.destroy();
      instance = newTooltip();
    } else if(instance.popper.querySelector('.tippy-content').textContent !== 
              text) {
      instance.popper.querySelector('.tippy-content').textContent = text;
    }
  } else {
    instance = newTooltip();
  }
  
  if(!instance.state.visible) {
    instance.show();
  }
}

function getTimeText(timeStr) {
  try {
    if(/\d+,?$/.test(timeStr)) {
      return (new Date(parseInt(timeStr, 10) * 1000)).toString();
    } else {            
      return (new Date(timeStr.replace(/[",]/g, ''))).toString();
    }
  } catch(e) {
    return 'Invalid date';
  }
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

  const element = event.target.tagName === 'SPAN' ? 
    event.target :
    event.target.querySelector('span');

  if(!element || element.tagName !== 'SPAN') {
    hideTooltip();
    return;
  }

  // If this is a time claim and the mouse cursor is on top of the time,
  // let the time tooltip handle this, do nothing.
  // TODO: merge both tooltip handlers?
  const claimEnd = line.indexOf(':');
  if(result.ch >= claimEnd && timeClaims.includes(claim)) {
    showTooltip(element, getTimeText(matches[2]), 'right');
    return;
  }

  const claimText = strings.common.claims[claim];
  if(!claimText) {
    hideTooltip();
    return;
  }

  showTooltip(element, claimText, 'left');
}

export function setupClaimsTooltip() {  
  payloadElement.addEventListener('mousemove', tooltipHandler);
  headerElement.addEventListener('mousemove', tooltipHandler);
}
