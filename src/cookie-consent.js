const COOKIE_CONSENT_NECESSARY = 1;
const COOKIE_CONSENT_PERFORMANCE = 2;
const COOKIE_CONSENT_FUNCTIONAL = 3;
const COOKIE_CONSENT_ADVERTISING = 4;

function addScripts(lvl) {
    //Reject all
    if (!lvl) {
        return;
    }

    // Necessary
    if (lvl.includes(COOKIE_CONSENT_NECESSARY)) {
        // GTM
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-W7FRLJ');
    }

    // Functional
    if (lvl.includes(COOKIE_CONSENT_FUNCTIONAL)) {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        })(document, 'script', 'twitter-wjs');
    }
}

// Add required scripts without waiting for the user consent
addScripts(window.OnetrustActiveGroups);

// Poll for the consent being onscreen.
const POLL_MAX = 10;
const POLL_INTERVAL = 200;
let tries = 0;
const poll = window.setInterval(() => {
    if (tries >= POLL_MAX) {
        addScripts(window.OnetrustActiveGroups)
        return window.clearInterval(poll);
    }

    if (document.getElementById("onetrust-accept-btn-handler")) {
        window.OneTrust.OnConsentChanged(() => addScripts(window.OnetrustActiveGroups));
        return window.clearInterval(poll);
    } else {
        tries++;
    }
}, POLL_INTERVAL);