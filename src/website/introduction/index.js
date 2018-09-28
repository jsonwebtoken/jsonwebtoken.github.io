import { setupHighlighting } from '../highlighting.js';
import { setupJwtCounter } from '../counter.js';
import * as metrics from '../../metrics.js';
import metricsApiKey from '../metrics-api-key.js';

function setupMetrics() {
  metrics.init(metricsApiKey);
}

// Initialization
setupMetrics();
setupHighlighting();
setupJwtCounter();
