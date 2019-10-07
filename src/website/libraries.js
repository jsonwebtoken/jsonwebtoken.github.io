import { safeLocalStorageSetItem } from '../utils.js';
import { httpGet } from '../utils.js';
import {
  starsElements,
  librariesElement,
  librariesSelect
} from './dom-elements.js';

import Isotope from 'isotope-layout';
import log from 'loglevel';

const librariesGrid = new Isotope(librariesElement, {
  layoutMode: 'fitRows',
  itemSelector: 'article',
  percentPosition: true,
  masonry: {
    columnWidth: 'article'
  }
});

function getStarsFromUrl(url) {
  return httpGet(url).then(data => {
    const parsed = JSON.parse(data);
    const count = parsed.stargazers_count;

    if(Number.isInteger(count)) {
      return count;
    } else {
      throw new Error('Bad data received for stars count.');
    }
  });
}

function insertStarCount(starElement, count) {
  const span = document.createElement('span');
  span.textContent = count;
  starElement.insertBefore(span, null);
  starElement.style.display = 'inline';
}

function getStarsForGitHubRepos() {
  Array.prototype.forEach.call(starsElements, element => {
    const repo = element.getAttribute('data-repo');
    if (!repo) {
      return;
    }

    const key = `stars_v2_${repo}`;

    const now = Date.now();
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      const diff = now - stored.date;
      // Cached for a week
      const maxdiff = 7 * 24 * 60 * 60 * 1000;
      if (diff < maxdiff) {
        insertStarCount(element, stored.count);
        return;
      }
    } catch (e) {
      // Ignore bad data
      log.warn('Bad data in stored stars count, ignoring...', e);
    }

    const url = `https://api.github.com/repos/${repo}`;
    getStarsFromUrl(url).then(count => {
      safeLocalStorageSetItem(key, JSON.stringify({
        date: now,
        count: count
      }));

      insertStarCount(element, count);
    }).catch(e => {
      log.warn('Failed to get GitHub stars count for repository, ' +
               'is the repository URL OK? ', e);
    });
  });
}

export function setupLibraries() {
  getStarsForGitHubRepos();

  librariesSelect.addEventListener('change', event => {
    librariesGrid.arrange({
      filter: event.target.value
    });
  });
}
