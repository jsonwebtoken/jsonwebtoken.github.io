import { CCPAModal } from "../ccpa-modal.js";
import { setupJwtCounter } from "../counter.js";
import { setupHighlighting } from "../highlighting.js";
import { setupNavbar } from "../navbar.js";
import { TopBanner } from "../top-banner.js";

// Initialization
setupNavbar();
setupHighlighting();
setupJwtCounter();
CCPAModal();
TopBanner();
