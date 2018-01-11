import { codeElements } from './dom-elements.js';

import hljs from 'highlight.js';

export function setupHighlighting() {
  // TODO: consider replacing this with CodeMirror, which we already use.

  hljs.configure({
    classPrefix: ''
  });

  Array.prototype.forEach.call(codeElements, element => {
    if (!element.classList.contains('hljs')) {
      element.classList.add('hljs');
      hljs.highlightBlock(element);
    }
  });
}
