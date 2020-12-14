import { codeElements } from "./dom-elements-common.js";

import hljs from "highlight.js/lib/core";
import jsHighlight from "highlight.js/lib/languages/javascript";
import jsonHighlight from "highlight.js/lib/languages/json";

hljs.registerLanguage("javascript", jsHighlight);
hljs.registerLanguage("json", jsonHighlight);

export function setupHighlighting() {
    // TODO: consider replacing this with CodeMirror, which we already use.

    hljs.configure({
        classPrefix: "",
    });

    Array.prototype.forEach.call(codeElements, (element) => {
        if (!element.classList.contains("hljs")) {
            element.classList.add("hljs");
            hljs.highlightBlock(element);
        }
    });
}