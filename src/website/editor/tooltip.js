import { payloadEditor } from './instances.js';
import { payloadTooltipElement } from '../dom-elements.js';

export function tooltipHandler(event) {
  const result = payloadEditor.coordsChar({
    left: event.pageX,
    top: event.pageY
  }, 'page');

  const line = payloadEditor.getLine(result.line);

  const timeClaims = ['exp', 'nbf', 'iat', 'auth_time', 'updated_at'];

  const matches = /"(.*)":\s*"?(\d*)"?/.exec(line);
  if (matches && timeClaims.indexOf(matches[1]) !== -1) {
    const dateStr = (new Date(parseInt(matches[2], 10) * 1000)).toString();
    payloadTooltipElement.firstChild.textContent = dateStr;
    payloadTooltipElement.style.left = event.pageX + 'px';
    payloadTooltipElement.style.top = event.pageY + 'px';

    payloadTooltipElement.style.display = 'block';
  } else {
    payloadTooltipElement.style.display = 'none';
  }
}
