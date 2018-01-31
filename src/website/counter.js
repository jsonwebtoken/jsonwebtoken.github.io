import { counterElement } from './dom-elements.js';
import { isInViewport } from './utils.js';
import { httpGet } from '../utils.js';

import $ from 'jquery';
import jQuery from 'jquery';
import 'flipclock/compiled/flipclock.js';
import log from 'loglevel';

const initialCount = 80482701;
const pollIntervalWhenVisible = 5000;
const pollIntervalWhenHidden = 1000*1000;
const url = 'https://webtask.it.auth0.com/api/run/' + 
            'wt-matiasw-gmail_com-0/proxy?' + 
            'url=http://metrics.it.auth0.com/counters';

const flipCounter = $(counterElement).FlipClock(initialCount, {
  clockFace: 'Counter',
  minimumDigits: initialCount.toString().length
});

function updateCounterFromWebtask() {
  return new Promise((resolve, reject) => {
    httpGet(url, false).then(data => {
      const parsed = JSON.parse(data);
      flipCounter.setTime(parsed.logins);
    }).catch(e => {
      log.warn('Failed to set count from Webtask: ', e);
    });
  });
}

let elapsed = pollIntervalWhenHidden;
function updateCounter() {
  elapsed += pollIntervalWhenVisible;

  if(isInViewport(counterElement)) {
    updateCounterFromWebtask();
  } else {
    if(elapsed >= pollIntervalWhenHidden) {
      elapsed = 0;
      updateCounterFromWebtask();
    }
  }
}

export function setupJwtCounter() {
  updateCounter();
  setInterval(updateCounter, pollIntervalWhenVisible);  
}
