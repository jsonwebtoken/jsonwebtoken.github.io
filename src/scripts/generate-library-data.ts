import { Octokit } from "octokit";
import { join } from "path";
import { createAppAuth } from "@octokit/auth-app";
import { err, ok, Result } from "neverthrow";

import "dotenv/config";
import { writeFileSync } from "node:fs";
import { LibraryCategoryModel } from "@/features/libraries/models/library-category.model";
import { safeDecodeBase64url } from "@/features/common/services/utils";

// TODO: we need to update this with the repository that's going to be public with only the JSON files
const owner = "auth0-developer-hub";
const repository = "jsonwebtoken.github.io";
const branch = "chore/update-footer-links";

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
    installationId: process.env.GITHUB_INSTALLATION_ID,
  },
});

function numericCompare(a: string, b: string): number {
  const lhs = parseInt(a, 10);
  const rhs = parseInt(b, 10);

  return lhs - rhs;
}

async function authenticateGitHubApp(): Promise<Result<boolean, string>> {
  try {
    await octokit.rest.apps.getAuthenticated();

    return ok(true);
  } catch (error) {
    console.error(error);

    return err("Something went wrong when authenticating the GitHub App");
  }
}

async function getLanguageJsonFilePaths(): Promise<Result<string[], string>> {
  const path = "views/website/libraries";

  const response = await octokit.rest.repos.getContent({
    owner: owner,
    repo: repository,
    ref: branch,
    path: path,
  });

  const { data } = response;

  if (!Array.isArray(data)) {
    return err("Unable to get language JSON file paths.");
  }

  return ok(
    data.filter((file) => file.name.endsWith(".json")).map((file) => file.path),
  );
}

async function getContentLanguage(
  filePath: string,
): Promise<Result<LibraryCategoryModel, string>> {
  const contentResponse = await octokit.rest.repos.getContent({
    owner: owner,
    repo: repository,
    ref: branch,
    path: filePath,
  });

  const { data } = contentResponse;

  if (Array.isArray(data)) {
    return err(`Invalid content response`);
  }

  if (data.type !== "file") {
    return err(`Invalid data type in content response`);
  }

  const { content } = data;

  const safeDecodeBase64urlResult = safeDecodeBase64url(content);

  if (safeDecodeBase64urlResult.isErr()) {
    return err(safeDecodeBase64urlResult.error);
  }

  const decodedContentData = safeDecodeBase64urlResult.value;

  return ok(JSON.parse(decodedContentData));
}

async function getCategories(): Promise<
  Result<LibraryCategoryModel[], string>
> {
  const getLanguageJsonFilePathsResult = await getLanguageJsonFilePaths();

  if (getLanguageJsonFilePathsResult.isErr()) {
    return err(getLanguageJsonFilePathsResult.error);
  }

  const filePaths = getLanguageJsonFilePathsResult.value.sort(numericCompare);

  const categories: LibraryCategoryModel[] = [];

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];

    const result = await getContentLanguage(filePath);

    if (result.isErr()) {
      return err(`No language data available for path: ${filePath}`);
    }

    categories.push(result.value);
  }

  categories.sort((a: LibraryCategoryModel, b: LibraryCategoryModel) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return ok(categories);
}

async function aggregateLibraryStars() {
  const isAuthenticated = await authenticateGitHubApp();

  if (isAuthenticated.isOk()) {
    const getCategoriesResult = await getCategories();

    if (getCategoriesResult.isErr()) {
      console.error(getCategoriesResult.error);

      return;
    }

    const categories = getCategoriesResult.value;

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      if (!category) {
        continue;
      }

      for (let j = 0; j < category.libs.length; j++) {
        const lib = category.libs[j];

        if (!lib) {
          continue;
        }

        const { gitHubRepoPath } = lib;

        if (!gitHubRepoPath) {
          continue;
        }

        const [owner, repo] = gitHubRepoPath.split("/");

        const response = await octokit.rest.repos.get({ owner, repo });

        lib.stars = response.data.stargazers_count;
      }
    }

    const dictionary: { [index: string]: LibraryCategoryModel } = {};

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      if (dictionary[category.name]) {
        continue;
      }

      dictionary[category.name] = category;
    }

    writeFileSync(
      join(process.cwd(), "src", "data", "libraries.json"),
      JSON.stringify(dictionary, null, 2),
    );
  }
}

(async () => {
  await aggregateLibraryStars();
})();
