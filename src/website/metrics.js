import Analytics from 'analytics-node';

let analytics;

export function init(key) {
  analytics = new Analytics(key);
}

export function track(event, data) {
  if(analytics) {
    analytics.track(event, data);
  }
}
