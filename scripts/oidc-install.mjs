#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const JF_URL = "https://a0us.jfrog.io";
const OIDC_PROVIDER_NAME = "vercel";
const ARTIFACTORY_NPM_HOST = "a0us.jfrog.io/artifactory/api/npm/npm";
const PUBLIC_NPM_HOST = "registry.npmjs.org";
const BUILD_NPMRC_PATH = ".npmrc.oidc";

async function exchangeVercelOidcTokenForArtifactoryToken() {
  const oidcToken = process.env.VERCEL_OIDC_TOKEN;
  if (!oidcToken) {
    throw new Error(
      "VERCEL_OIDC_TOKEN is not set. Enable OIDC Federation for this " +
        "environment in Vercel Project Settings > Security > OIDC Federation."
    );
  }

  const res = await fetch(`${JF_URL}/access/api/v1/oidc/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
      subject_token: oidcToken,
      provider_name: OIDC_PROVIDER_NAME,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `JFrog OIDC token exchange failed (${res.status}): ${await res.text()}`
    );
  }

  const { access_token } = await res.json();
  if (!access_token) {
    throw new Error("JFrog OIDC token exchange returned no access_token.");
  }

  return access_token;
}

function pointLockfileAtArtifactory() {
  const lockfile = readFileSync("package-lock.json", "utf8");
  const rewritten = lockfile.replaceAll(
    `https://${PUBLIC_NPM_HOST}/`,
    `https://${ARTIFACTORY_NPM_HOST}/`
  );
  writeFileSync("package-lock.json", rewritten);
}

// Written fresh for this build only, under --userconfig, so the Artifactory
// registry override never leaks into a plain `npm ci` elsewhere (e.g. the
// GitHub Actions test workflows, which install straight from the public
// registry and have no access to this token).
function writeBuildScopedNpmrc(npmToken) {
  writeFileSync(
    BUILD_NPMRC_PATH,
    `registry=https://${ARTIFACTORY_NPM_HOST}/\n` +
      `//${ARTIFACTORY_NPM_HOST}/:_authToken=${npmToken}\n`
  );
}

const npmToken = await exchangeVercelOidcTokenForArtifactoryToken();

// Only this ephemeral Vercel build checkout is rewritten to fetch through
// Artifactory; the committed lockfile (used by GitHub Actions' npm ci) is
// untouched and keeps resolving against the public registry.
pointLockfileAtArtifactory();
writeBuildScopedNpmrc(npmToken);

execSync(`npm ci --userconfig ${BUILD_NPMRC_PATH}`, { stdio: "inherit" });
