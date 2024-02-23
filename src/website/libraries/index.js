import { CCPAModal } from "../ccpa-modal.js";
import { setupJwtCounter } from "../counter.js";
import { setupHighlighting } from "../highlighting.js";
import { TopBanner } from "../top-banner.js";
import { setupLibraries } from "./libraries.js";

// Initialization
setupLibraries();
setupHighlighting();
setupJwtCounter();
CCPAModal();
TopBanner();
