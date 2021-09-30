import { librariesElement, librariesSelect } from "./dom-elements.js";

import queryString from "querystring";
import Isotope from "isotope-layout";

const librariesGrid = new Isotope(librariesElement, {
    initLayout: false,
    layoutMode: "fitRows",
    itemSelector: "article",
    percentPosition: true,
    masonry: {
        columnWidth: "article",
    },
});

function setQueryStringParameter(name, value) {
    if (value) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
    } else {
        window.history.replaceState({}, '', decodeURIComponent(window.location.pathname));
    }
}

export function setupLibraries() {
    librariesSelect.addEventListener("change", (event) => {
        librariesGrid.arrange({
            filter: event.target.value,
        });
        if (event.target.value === '*') {
            setQueryStringParameter('language', '')
        } else {
            setQueryStringParameter('language', document.querySelector(`#libraries-select > option[value="${event.target.value}"]`).innerHTML)
        }
    });

    const { language: preselect } = {
        ...queryString.parse(document.location.search.substr(1)),
        ...queryString.parse(document.location.hash.substr(1))
    }

    let select;

    if (preselect) {
        try {
            select = document.querySelector(`#libraries-select > option[value=".${preselect}"]`)
                || [...document.querySelectorAll('#libraries-select > option')].find((el) => preselect === el.innerHTML)
        } catch (err) {}
    }

    select || (select = document.querySelector('#libraries-select > option[value="*"]'))

    librariesGrid.arrange({ filter: select.value });
    select.selected = 'selected';
}
