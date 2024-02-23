import { setupLibraries } from "./libraries.js";
import { setupHighlighting } from "../highlighting.js";
import { setupJwtCounter } from "../counter.js";
import { TopBanner } from "../top-banner.js";

// Initialization
setupLibraries();
setupHighlighting();
setupJwtCounter();
TopBanner();
