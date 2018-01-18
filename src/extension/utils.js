import { isToken } from '../editor/jwt.js';

// This only works on extensions
export function getTokenFromClipboardIfPossible() {
  const input = document.createElement('textarea');
  
  document.body.appendChild(input);
  input.focus();
  input.select();
  document.execCommand('Paste');

  const token = input.value;
  
  input.remove();

  return isToken(token) ? token : null;
}
