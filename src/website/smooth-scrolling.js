import { menuScrollableLinks, navbarElement } from './dom-elements-common.js';
import { isWideScreen } from '../utils.js';

import $ from 'jquery';
import log from 'loglevel';

// This is the only function that really requires jQuery, other than some
// of the dependencies. Consider this when adding code that depends on
// jQuery somewhere else.
export function smoothScrollTo(element) {
  // TODO: don't use jQuery

  const navHeight = $(navbarElement).height();
  const targetElement = $(element);

  if (isWideScreen()) {
    $('html, body').animate({
      scrollTop: targetElement.offset().top - navHeight
    }, 500);
  } else {
    $('html, body').animate({
      scrollTop: targetElement.offset().top
    }, 500);
  }
}

export function setupSmoothScrolling() {
  Array.prototype.forEach.call(menuScrollableLinks, scrollable => {
    scrollable.addEventListener('click', event => {
      event.preventDefault();

      const start = scrollable.href.indexOf('#');
      if (start === -1) {
        log.warn('<a> element with .scrollto set and bad link: ',
          scrollable.href);
        return;
      }

      const id = scrollable.href.substr(start + 1);
      smoothScrollTo(document.getElementById(id));
    });
  });
}
