import { getSelectedAlgorithm } from "./utils.js";
import { secretInput, secretBase64Checkbox } from "../dom-elements.js";

import log from "loglevel";
import tippy from "tippy.js";
import b64u from "base64url";

export function minSecretLengthCheck(event) {
    const alg = getSelectedAlgorithm();
    if (alg.indexOf("HS") !== 0) {
        log.error(`Secret input tooltip handler for wrong algorithm: ${alg}`);
        return;
    }

    const algBits = parseInt(alg.substr(2));
    const inputBits = secretBase64Checkbox.checked ?
        b64u.toBuffer(secretInput.value).length * 8 :
        Buffer.from(secretInput.value).length * 8;

    if (inputBits < algBits) {
        if (!secretInput._tippy.state.visible) {
            secretInput._tippy.show();
        }
    } else {
        secretInput._tippy.hide();
    }
}

export function setupSecretLengthTooltip() {
    tippy(secretInput, {
        trigger: "manual",
        placement: "right",
        arrow: true,
        arrowTransform: "scale(0.75)",
        size: "large",
    });
}