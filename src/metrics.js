import Analytics from 'analytics-node';
import log from 'loglevel';

let analytics;

export function init(key) {
  analytics = new Analytics(key);
}

export function track(event, data) {
  if(analytics) {
    try {
      analytics.track(event, data);
    } catch(e) {
      log.error(`Metrics library error for event ${event}: ${e}`);
    }
  }
}
