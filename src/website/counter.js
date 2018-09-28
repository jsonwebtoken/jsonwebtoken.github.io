import { counterElement } from './dom-elements-common.js';
import { isInViewport } from './utils.js';
import { httpGet } from '../utils.js';

import $ from 'jquery';
import jQuery from 'jquery';
import 'flipclock/compiled/flipclock.js';
import log from 'loglevel';

const baselineDate = new Date(2018, 3 - 1, 6);
// We should try to get a real number for this.
// Set on 2018-03-06
const baselineCount = 53919517299;

const secondsPerDay = 60 * 60 * 24;
const loginsPerDay = 50000000;
const loginsPerSecond = loginsPerDay / secondsPerDay;

const intervalMs = 1000;

const initialCount = getLoginCount();
const flipCounter = $(counterElement).FlipClock(initialCount, {
  clockFace: 'Counter',
  minimumDigits: initialCount.toString().length
});

function getLoginCount() {
  return baselineCount +
         Math.round((new Date() - baselineDate) / 1000 * loginsPerSecond);
}

function updateCounter() {
  if(isInViewport(counterElement)) {
    flipCounter.setTime(getLoginCount());
  }
}

export function setupJwtCounter() {
  updateCounter();
  setInterval(updateCounter, intervalMs);
}
