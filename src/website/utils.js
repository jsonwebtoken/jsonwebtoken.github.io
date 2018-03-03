export function getOffsetBoundingClientRect(element) {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
    bottom: rect.bottom + document.body.scrollTop,
    right: rect.right + document.body.scrollLeft
  };
}

// From: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
export function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

//From:
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
export function isChrome() {
  return !!window.chrome && !!window.chrome.webstore;
}

export function isFirefox() {
  return typeof InstallTrigger !== 'undefined';
}
