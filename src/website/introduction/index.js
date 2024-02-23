import { CCPAModal } from "../ccpa-modal.js";
import { setupJwtCounter } from "../counter.js";
import { setupHighlighting } from "../highlighting.js";
import { TopBanner } from "../top-banner.js";

// Initialization
setupHighlighting();
setupJwtCounter();
CCPAModal();
TopBanner();
