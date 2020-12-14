const express = require("express");
const enforce = require("express-sslify");
const languages = require("./libraries.json");

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

// app.use(fetchGithubStars);
app.use(express.static("dist/website"));
app.get("/", function(req, res) {
    res.render("index", { languages: languages });
});

app.get("/introduction", function(req, res) {
    res.render("introduction");
});

// Fallback for the homepage JWT handbook CTA A/B experiment we ran
app.get("/home", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Started.");
});