#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const JF_URL = "https://a0us.jfrog.io";
const OIDC_PROVIDER_NAME = "vercel";
const ARTIFACTORY_NPM_HOST = "a0us.jfrog.io/artifactory/api/npm/npm";
const PUBLIC_NPM_HOST = "registry.npmjs.org";
const BUILD_NPMRC_PATH = ".npmrc.oidc";
const EXCHANGE_TIMEOUT_MS = 15_000;
const MAX_ERROR_BODY_LENGTH = 500;

async function exchangeVercelOidcTokenForArtifactoryToken(oidcToken) {
  const res = await fetch(`${JF_URL}/access/api/v1/oidc/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
      subject_token: oidcToken,
      provider_name: OIDC_PROVIDER_NAME,
    }),
    signal: AbortSignal.timeout(EXCHANGE_TIMEOUT_MS),
  });

  if (!res.ok) {
    const body = await res.text();
    const truncated =
      body.length > MAX_ERROR_BODY_LENGTH
        ? `${body.slice(0, MAX_ERROR_BODY_LENGTH)}… [truncated]`
        : body;

    throw new Error(
      `JFrog OIDC token exchange failed: ${res.status} ${res.statusText} — ${truncated}`
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

// Kept out of the default .npmrc so the registry override never leaks into
// installs outside this build (e.g. the GitHub Actions workflows).
function writeBuildScopedNpmrc(npmToken) {
  writeFileSync(
    BUILD_NPMRC_PATH,
    `registry=https://${ARTIFACTORY_NPM_HOST}/\n` +
      `//${ARTIFACTORY_NPM_HOST}/:_authToken=${npmToken}\n`
  );
}

async function main() {
  const vercelEnv = process.env.VERCEL_ENV;

  if (!vercelEnv) {
    execSync("npm ci", { stdio: "inherit" });

    return;
  }

  const oidcToken = process.env.VERCEL_OIDC_TOKEN;
  if (!oidcToken) {
    throw new Error(
      `VERCEL_OIDC_TOKEN is not set in ${vercelEnv}. Enable OIDC Federation in ` +
        "Vercel Project Settings > Security > Secure Backend Access with OIDC Federation."
    );
  }

  console.log(
    `Exchanging Vercel OIDC token for a JFrog access token (provider: ${OIDC_PROVIDER_NAME}, env: ${vercelEnv})...`
  );

  const npmToken = await exchangeVercelOidcTokenForArtifactoryToken(oidcToken);

  console.log("JFrog access token acquired.");

  // Safe to mutate: the Vercel build checkout is ephemeral and never committed.
  pointLockfileAtArtifactory();
  writeBuildScopedNpmrc(npmToken);

  try {
    execSync(`npm ci --userconfig ${BUILD_NPMRC_PATH}`, { stdio: "inherit" });
  } finally {
    rmSync(BUILD_NPMRC_PATH, { force: true });
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
