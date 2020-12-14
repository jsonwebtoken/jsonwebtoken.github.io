import { httpGet } from "../utils.js";
import { librariesElement, librariesSelect } from "./dom-elements.js";

import Isotope from "isotope-layout";

const librariesGrid = new Isotope(librariesElement, {
    layoutMode: "fitRows",
    itemSelector: "article",
    percentPosition: true,
    masonry: {
        columnWidth: "article",
    },
});

export function setupLibraries() {
    librariesSelect.addEventListener("change", (event) => {
        librariesGrid.arrange({
            filter: event.target.value,
        });
    });
}