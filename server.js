const express = require("express");
const enforce = require("express-sslify");
const languages = require("./libraries.json");
const dotenv = require("dotenv").config();

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
    res.locals.COOKIE_CONSENT_DOMAIN_ID = process.env.COOKIE_CONSENT_DOMAIN_ID;
    next();
});
app.use(express.static("dist/website"));
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/introduction", function(req, res) {
    res.render("introduction");
});

app.get("/libraries", function(req, res) {
    res.render("libraries", {
        languages: languages
    });
});

// Fallback for the homepage JWT handbook CTA A/B experiment we ran
app.get("/home", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Started.");
});