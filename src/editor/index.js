import { deferToNextLoop } from "../utils.js";
import { downloadPublicKeyIfPossible } from "./public-key-download.js";
import { setupClaimsTooltip } from "./claims-tooltip.js";
import { tokenEditor, headerEditor, payloadEditor } from "./instances.js";
import {
    getTrimmedValue,
    stringify,
    fixEditorHeight,
    getSelectedAlgorithm,
    disableUnsupportedAlgorithms,
} from "./utils.js";
import { sign, verify, decode } from "./jwt.js";
import EventManager from "./event-manager.js";
import strings from "../strings.js";
import defaultTokens from "./default-tokens.js";
import {
    minSecretLengthCheck,
    setupSecretLengthTooltip,
} from "./secret-length-tooltip.js";
import {
    algorithmSelect,
    signatureStatusElement,
    editorElement,
    headerElement,
    payloadElement,
    secretInput,
    privateKeyTextArea,
    publicKeyTextArea,
    hmacShaTextSpan,
    rsaShaTextSpan,
    keyEditorContainer,
    secretEditorContainer,
    secretBase64Checkbox,
    encodedTabLink,
    decodedTabLink,
    encodedTabElement,
    decodedTabElement,
    editorWarnings,
} from "../dom-elements.js";

import log from "loglevel";

// The event manager lets us enable/disable events as needed without
// manually tracking them. Events that need to be disabled should be
// passed to the event manager.
const eventManager = new EventManager();

function isSharedSecretAlgorithm(algorithm) {
    return algorithm && algorithm.indexOf("HS") === 0;
}

function isPublicKeyAlgorithm(algorithm) {
    return algorithm && algorithm.indexOf("HS") === -1;
}

function markAsInvalid(errorMessages = []) {
    signatureStatusElement.classList.remove("valid-token");
    signatureStatusElement.classList.add("invalid-token");

    if (errorMessages.length > 0) {
        editorWarnings.classList.remove("hidden");

        errorMessages.forEach((message) => {
            const errorElement = document.createElement("p");
            const errorLabel = document.createElement("strong");
            const errorMessage = document.createTextNode(message);
            errorLabel.innerText = "Error: ";
            errorElement.appendChild(errorLabel);
            errorElement.appendChild(errorMessage);
            editorWarnings.appendChild(errorElement);
        });
    } else {
        signatureStatusElement.innerHTML = `<i class="icon-budicon-501"></i> ${strings.editor.signatureInvalid}`;
    }
}

function markJWTAsInvalid() {
    signatureStatusElement.classList.remove("valid-token");
    signatureStatusElement.classList.add("invalid-token");
    signatureStatusElement.innerHTML = `<i class="icon-budicon-501"></i> ${strings.editor.jwtInvalid}`;
}

function markAsValid() {
    const elementsWithError = document.getElementsByClassName("error");
    Array.prototype.forEach.call(elementsWithError, (element) => {
        element.classList.remove("error");
    });

    signatureStatusElement.classList.remove("invalid-token");
    signatureStatusElement.classList.add("valid-token");
    signatureStatusElement.innerHTML = `<i class="icon-budicon-499"></i> ${strings.editor.signatureVerified}`;
}

function displaySecretOrKeys(algorithm) {
    const algoType = algorithm.substr(0, 2);
    const algoSize = algorithm.substr(2, 3);

    if (algoType === "HS") {
        hmacShaTextSpan.firstChild.textContent = `HMACSHA${algoSize}`;
        secretEditorContainer.style.display = "";
        keyEditorContainer.style.display = "none";
    } else {
        const texts = {
            RS: "RSASHA",
            PS: "RSAPSSSHA",
            ES: "ECDSASHA",
        };

        rsaShaTextSpan.firstChild.textContent = `${texts[algoType]}${algoSize}`;
        secretEditorContainer.style.display = "none";
        keyEditorContainer.style.display = "";
    }

    deferToNextLoop(fixEditorHeight);
}

function selectAlgorithm(algorithm) {
    eventManager.withDisabledEvents(() => {
        const selected = algorithmSelect.querySelector(
            `option[value="${algorithm}"]`
        );

        if (!selected) {
            log.info(`Invalid algorithm ${algorithm}, ignoring...`);
            return;
        }

        selected.selected = true;

        displaySecretOrKeys(algorithm);
    });
}

function isDefaultToken(token) {
    for (const algorithm of Object.keys(defaultTokens)) {
        if (defaultTokens[algorithm].token === token) {
            return true;
        }
    }

    return false;
}

export function useDefaultToken(algorithm) {
    eventManager.withDisabledEvents(() => {
        const defaults = defaultTokens[algorithm.toLowerCase()];
        const decoded = decode(defaults.token);

        tokenEditor.setValue(defaults.token);
        headerEditor.setValue(stringify(decoded.header));
        payloadEditor.setValue(stringify(decoded.payload));

        if (isSharedSecretAlgorithm(algorithm)) {
            secretInput.value = defaults.secret;
        } else {
            publicKeyTextArea.value = defaults.publicKey;
            privateKeyTextArea.value = defaults.privateKey;
        }

        markAsValid();
    });
}

function setAlgorithmInHeader(algorithm) {
    eventManager.withDisabledEvents(() => {
        try {
            const header = JSON.parse(headerEditor.getValue());
            header.alg = algorithm;
            headerEditor.setValue(stringify(header));
        } catch (e) {
            // SyntaxError is expected while things are being edited, ignore those
            // errors.
            if (!(e instanceof SyntaxError)) {
                // If it's not a SyntaxError, log the error.
                log.warn("Failed to encode token: ", e);
            }
        }

        try {
            encodeToken();
        } catch (e) {
            // Ignore error, this may fail in unexpected ways if the data
            // is being edited.
        }
    });
}

function algorithmChangeHandler() {
    const algorithm = getSelectedAlgorithm();

    displaySecretOrKeys(algorithm);

    if (isDefaultToken(getTrimmedValue(tokenEditor))) {
        useDefaultToken(algorithm);
    } else {
        setAlgorithmInHeader(algorithm);
    }
}

function markAsInvalidWithElement(
    element,
    clearTokenEditor = true,
    errors = []
) {
    element.classList.add("error");
    markAsInvalid(errors);

    if (clearTokenEditor) {
        eventManager.withDisabledEvents(() => {
            tokenEditor.setValue("");
        });
    }
}

function showEditorWarnings(warnings) {
    editorElement.classList.add("warning");
    editorWarnings.classList.remove("hidden");
    editorWarnings.innerHTML = "";

    warnings.forEach((warning) => {
        const warningElement = document.createElement("p");
        const warningLabel = document.createElement("strong");
        const warningMessage = document.createTextNode(warning);
        warningLabel.innerText = "Warning: ";
        warningElement.appendChild(warningLabel);
        warningElement.appendChild(warningMessage);
        editorWarnings.appendChild(warningElement);
    });
}

function hideEditorWarnings() {
    editorElement.classList.remove("warning");
    editorWarnings.classList.add("hidden");
    editorWarnings.innerHTML = "";
}

function encodeToken() {
    deferToNextLoop(fixEditorHeight);
    resetEditorWarnings();

    eventManager.withDisabledEvents(() => {
        let header;
        try {
            header = JSON.parse(headerEditor.getValue());
        } catch (e) {
            markAsInvalidWithElement(headerElement, true);
            return;
        }

        if (!header.alg) {
            setAlgorithmInHeader(getSelectedAlgorithm());
            return;
        } else {
            selectAlgorithm(header.alg);
        }

        let payload;
        try {
            payload = JSON.parse(payloadEditor.getValue());
        } catch (e) {
            markAsInvalidWithElement(payloadElement, true);
            return;
        }

        const key = isSharedSecretAlgorithm(header.alg) ?
            secretInput.value :
            privateKeyTextArea.value;

        sign(header, payload, key, secretBase64Checkbox.checked)
            .then((encoded) => {
                eventManager.withDisabledEvents(() => {
                    tokenEditor.setValue(encoded);
                });
            })
            .catch((e) => {
                eventManager.withDisabledEvents(() => {
                    log.warn("Failed to sign/encode token: ", e);
                    markAsInvalid();
                    tokenEditor.setValue("");
                });
            })
            .finally(() => {
                verifyToken();
            });
    });
}

function decodeToken() {
    deferToNextLoop(fixEditorHeight);
    resetEditorWarnings();

    eventManager.withDisabledEvents(() => {
        try {
            const jwt = getTrimmedValue(tokenEditor);
            const decoded = decode(jwt);

            selectAlgorithm(decoded.header.alg);
            if (isPublicKeyAlgorithm(decoded.header.alg)) {
                downloadPublicKeyIfPossible(decoded).then((publicKey) => {
                    eventManager.withDisabledEvents(() => {
                        publicKeyTextArea.value = publicKey;
                        verifyToken();
                    });
                });
            }

            headerEditor.setValue(stringify(decoded.header));
            payloadEditor.setValue(stringify(decoded.payload));

            if (decoded.errors) {
                markAsInvalidWithElement(editorElement, false, decoded.warnings);

                if (decoded.warnings.includes(strings.warnings.payloadInvalidJSON)) {
                    markAsInvalidWithElement(payloadElement, false);
                }
            } else {
                if (decoded.warnings && decoded.warnings.length > 0) {
                    showEditorWarnings(decoded.warnings);
                    markJWTAsInvalid();
                } else {
                    hideEditorWarnings();
                }

                verifyToken();
            }
        } catch (e) {
            log.warn("Failed to decode token: ", e);
        }
    });
}

function verifyToken() {
    const jwt = getTrimmedValue(tokenEditor);
    const decoded = decode(jwt);

    if (!decoded.header.alg || decoded.header.alg === "none") {
        markAsInvalid();
        return;
    }

    const publicKeyOrSecret = isSharedSecretAlgorithm(decoded.header.alg) ?
        secretInput.value :
        publicKeyTextArea.value;
    verify(jwt, publicKeyOrSecret, secretBase64Checkbox.checked).then(
        (result) => {
            if (result.validSignature) {
                if (!result.validBase64) {
                    markJWTAsInvalid();
                } else {
                    markAsValid();
                }
            } else {
                markAsInvalid();
            }
        }
    );
}

// The last saved token functionality has been flagged as a security issue.
// This function removes any locally stored tokens in the past.
// Once a considerable amount of time has passed since this was put in place,
// it may be safe to remove it. Enabled at: 2018-06-12.
function removeSavedTokens() {
    localStorage.removeItem("lastToken");
    localStorage.removeItem("lastPublicKey");
}

function setupTabEvents() {
    // These are relevant for portrait or mobile screens.

    encodedTabLink.addEventListener("click", (event) => {
        event.preventDefault();

        decodedTabLink.parentNode.classList.remove("current");
        encodedTabLink.parentNode.classList.add("current");
        decodedTabElement.classList.remove("current");
        encodedTabElement.classList.add("current");
    });

    decodedTabLink.addEventListener("click", (event) => {
        event.preventDefault();

        encodedTabLink.parentNode.classList.remove("current");
        decodedTabLink.parentNode.classList.add("current");
        encodedTabElement.classList.remove("current");
        decodedTabElement.classList.add("current");
    });
}

function setupEvents() {
    // The event manager lets us enable/disable events as needed without
    // manually tracking them. Events that need to be disabled should be
    // passed to the event manager.

    eventManager.addDomEvent(algorithmSelect, "change", algorithmChangeHandler);

    // When an encoded token is inserted, it must be decoded.
    eventManager.addCodeMirrorEvent(tokenEditor, "change", decodeToken);
    // When parts of the decoded token are changed, it must be reencoded.
    eventManager.addCodeMirrorEvent(headerEditor, "change", encodeToken);
    eventManager.addCodeMirrorEvent(payloadEditor, "change", encodeToken);

    // HMAC secret, show tooltip if secret is too short.
    eventManager.addDomEvent(secretInput, "input", minSecretLengthCheck);
    // HMAC secret, when changed the encoded token must be updated.
    eventManager.addDomEvent(secretInput, "input", encodeToken);
    // Base64 checkbox, when changes the encoded token must be updated.
    eventManager.addDomEvent(secretBase64Checkbox, "change", encodeToken);
    // Private key, when changed the encoded token must be updated.
    eventManager.addDomEvent(privateKeyTextArea, "input", encodeToken);
    // Public key, when changed the encoded token must NOT be updated
    // (only verified).
    eventManager.addDomEvent(publicKeyTextArea, "input", verifyToken);

    // The following events are never disabled, so it is not necessary to go
    // through the event manager for them.
    setupTabEvents();
}

export function setTokenEditorValue(value) {
    tokenEditor.setValue(value);
}

export function getTokenEditorValue() {
    return {
        token: getTrimmedValue(tokenEditor),
        publicKey: isPublicKeyAlgorithm(getSelectedAlgorithm()) ?
            publicKeyTextArea.value :
            undefined,
    };
}

export function resetEditorWarnings() {
    signatureStatusElement.classList.add("valid-token");
    signatureStatusElement.classList.remove("invalid-token");
    payloadElement.classList.remove("error");
    editorElement.classList.remove("error");
    editorElement.classList.remove("warning");
    editorWarnings.classList.add("hidden");
    editorWarnings.innerHTML = "";
}

export function setupTokenEditor() {
    disableUnsupportedAlgorithms();
    setupEvents();
    selectAlgorithm("HS256");
    useDefaultToken("HS256");
    fixEditorHeight();
    setupSecretLengthTooltip();
    setupClaimsTooltip();
    removeSavedTokens();
}