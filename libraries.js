const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const dotenv = require("dotenv").config();
const getLanguages = require("./views/website/libraries/support/get-languages.js");
const octokit = new Octokit({
    auth: process.env.GITHUB || process.env.GITHUB_TOKEN,
});

function fetchGithubStars() {
    const requests = [];
    const languages = getLanguages();

    console.log("----------------------");
    console.log("Fetching GitHub Data");
    console.log("----------------------");

    languages.forEach((language) => {
        language.libs.forEach((lib) => {
            if (lib.gitHubRepoPath) {
                const owner = lib.gitHubRepoPath.split("/")[0];
                const repo = lib.gitHubRepoPath.split("/")[1];
                requests.push(
                    octokit.repos
                    .get({
                        owner,
                        repo,
                    })
                    .then((repo) => {
                        console.log(
                            "Stars",
                            lib.gitHubRepoPath,
                            repo.data.stargazers_count
                        );

                        lib.stars = repo.data.stargazers_count;
                        return repo.data.stargazers_count;
                    })
                    .catch((error) => console.log(error))
                );
            }
        });
    });

    Promise.all(requests).then(() => {
        console.log("----------------------");
        console.log("Writing libraries.json");
        console.log("----------------------");
        fs.writeFileSync(`${__dirname}/libraries.json`, JSON.stringify(languages));
    });
}

fetchGithubStars();