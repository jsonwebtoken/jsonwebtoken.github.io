import { setupHighlighting } from "../highlighting.js";
import { setupJwtCounter } from "../counter.js";
import * as metrics from "../../metrics.js";

function setupMetrics() {
  metrics.init();
}

// Initialization
setupMetrics();
setupHighlighting();
setupJwtCounter();
