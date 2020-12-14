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

function getStarsFromUrl(url) {
    return httpGet(url).then((data) => {
        const parsed = JSON.parse(data);
        const count = parsed.stargazers_count;

        if (Number.isInteger(count)) {
            return count;
        } else {
            throw new Error("Bad data received for stars count.");
        }
    });
}

export function setupLibraries() {
    librariesSelect.addEventListener("change", (event) => {
        librariesGrid.arrange({
            filter: event.target.value,
        });
    });
}