const express = require("express");
const enforce = require("express-sslify");
const languages = require("./libraries.json");
const dotenv = require("dotenv").config();
const Negotiator = require("negotiator");
const localeMatcher = require("@formatjs/intl-localematcher");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views/website");

if (process.env.NODE_ENV === "production") {
    console.log("Redirecting to TLS endpoint.");
    app.use(
        enforce.HTTPS({
            // Required for proper use under a reverse proxy (Heroku, etc.).
            trustProtoHeader: true,
        })
    );
}

app.use((req, res, next) => {
    const languagesFromRequestHeaders = new Negotiator(req).languages();
    const LANGUAGE_CODES = ["en", "ja"]
    const DEFAULT_LANGUAGE_CODE = ["en"]

    const languageFromRequestHeader = localeMatcher.match(
        languagesFromRequestHeaders,
        LANGUAGE_CODES,
        DEFAULT_LANGUAGE_CODE,
    );

    req.preferredLanguage = languageFromRequestHeader;
    next();
})

app.use((req, res, next) => {
    res.locals.COOKIE_CONSENT_DOMAIN_ID = process.env.COOKIE_CONSENT_DOMAIN_ID;
    next();
});
app.use(express.static("dist/website"));
app.get("/", function(req, res) {
    res.render("index", {
        preferredLanguage: req.preferredLanguage,
    });
});

app.get("/introduction", function(req, res) {
    res.render("introduction", {
        preferredLanguage: req.preferredLanguage,
    });
});

app.get("/libraries", function(req, res) {
    res.render("libraries", {
        languages: languages,
        preferredLanguage: req.preferredLanguage,
    });
});

// Fallback for the homepage JWT handbook CTA A/B experiment we ran
app.get("/home", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Started.");
});
