import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";

import "dotenv/config";

import type { LibraryCategoryModel } from "@/features/libraries/models/library-category.model";
import type { LibraryModel } from "@/features/libraries/models/library.model";

const DATA_FILE_PATH = join(
  process.cwd(),
  "src",
  "data",
  "libraries-next.json",
);
const GITHUB_API_URL = "https://api.github.com";
const REQUEST_CONCURRENCY = 8;

type LibraryDictionary = Record<string, LibraryCategoryModel>;

interface GitHubRepository {
  owner: string;
  repo: string;
  fullName: string;
}

interface RepositoryLibraries extends GitHubRepository {
  libraries: LibraryModel[];
}

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertLibraryDictionary(
  value: unknown,
): asserts value is LibraryDictionary {
  if (!isRecord(value)) {
    throw new Error("Library data must be a JSON object");
  }

  for (const [categoryName, category] of Object.entries(value)) {
    if (!isRecord(category) || !Array.isArray(category.libs)) {
      throw new Error(`Invalid library category: ${categoryName}`);
    }
  }
}

async function readLibraryDictionary(): Promise<LibraryDictionary> {
  let source: string;

  try {
    source = await readFile(DATA_FILE_PATH, "utf8");
  } catch (cause) {
    throw new Error(`Unable to read ${DATA_FILE_PATH}`, { cause });
  }

  let dictionary: unknown;

  try {
    dictionary = JSON.parse(source);
  } catch (cause) {
    throw new Error(`Unable to parse ${DATA_FILE_PATH}`, { cause });
  }

  assertLibraryDictionary(dictionary);

  return dictionary;
}

function parseGitHubRepositoryPath(gitHubRepoPath: string): GitHubRepository {
  const [owner, repo] = gitHubRepoPath.split("/");

  if (!owner || !repo) {
    throw new Error(`Invalid GitHub repository path: ${gitHubRepoPath}`);
  }

  return {
    owner,
    repo,
    fullName: `${owner}/${repo}`,
  };
}

function collectLibrariesByRepository(
  dictionary: LibraryDictionary,
): RepositoryLibraries[] {
  const repositories = new Map<string, RepositoryLibraries>();

  for (const category of Object.values(dictionary)) {
    for (const library of category.libs) {
      if (!library.gitHubRepoPath) {
        continue;
      }

      const repository = parseGitHubRepositoryPath(library.gitHubRepoPath);
      const existing = repositories.get(repository.fullName);

      if (existing) {
        existing.libraries.push(library);
      } else {
        repositories.set(repository.fullName, {
          ...repository,
          libraries: [library],
        });
      }
    }
  }

  return Array.from(repositories.values());
}

async function requestGitHubApi(
  token: string,
  path: string,
): Promise<Response> {
  const response = await fetch(new URL(path, GITHUB_API_URL), {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "jsonwebtoken.github.io",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed with ${response.status} ${response.statusText}`,
    );
  }

  return response;
}

async function authenticateGitHubToken(token: string): Promise<void> {
  try {
    await requestGitHubApi(token, "/rate_limit");
  } catch (cause) {
    throw new Error("Unable to authenticate GITHUB_TOKEN", { cause });
  }
}

async function getStarCount(
  token: string,
  repository: GitHubRepository,
): Promise<number> {
  try {
    const owner = encodeURIComponent(repository.owner);
    const repo = encodeURIComponent(repository.repo);
    const response = await requestGitHubApi(token, `/repos/${owner}/${repo}`);
    const data: unknown = await response.json();

    if (!isRecord(data) || typeof data.stargazers_count !== "number") {
      throw new Error("GitHub API response has no star count");
    }

    return data.stargazers_count;
  } catch (cause) {
    throw new Error(`Unable to get the star count for ${repository.fullName}`, {
      cause,
    });
  }
}

async function getStarCounts(
  token: string,
  repositories: RepositoryLibraries[],
): Promise<Map<string, number>> {
  const starCounts = new Map<string, number>();

  for (
    let index = 0;
    index < repositories.length;
    index += REQUEST_CONCURRENCY
  ) {
    const batch = repositories.slice(index, index + REQUEST_CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (repository) => {
        const stars = await getStarCount(token, repository);

        return [repository.fullName, stars] as const;
      }),
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        const [repository, stars] = result.value;
        starCounts.set(repository, stars);
      } else {
        console.warn(
          result.reason instanceof Error
            ? result.reason.message
            : "Unable to get a repository star count",
        );
      }
    }
  }

  return starCounts;
}

function updateStarCounts(
  repositories: RepositoryLibraries[],
  starCounts: Map<string, number>,
): number {
  let updatedLibraries = 0;

  for (const repository of repositories) {
    const stars = starCounts.get(repository.fullName);

    if (stars === undefined) {
      continue;
    }

    for (const library of repository.libraries) {
      library.stars = stars;
      updatedLibraries += 1;
    }
  }

  return updatedLibraries;
}

async function writeLibraryDictionary(
  dictionary: LibraryDictionary,
): Promise<void> {
  const temporaryFilePath = `${DATA_FILE_PATH}.${process.pid}.tmp`;
  const output = await format(JSON.stringify(dictionary), { parser: "json" });

  try {
    await writeFile(temporaryFilePath, output, "utf8");
    await rename(temporaryFilePath, DATA_FILE_PATH);
  } catch (cause) {
    throw new Error(`Unable to write ${DATA_FILE_PATH}`, { cause });
  }
}

async function main(): Promise<void> {
  const dictionary = await readLibraryDictionary();
  const repositories = collectLibrariesByRepository(dictionary);
  const token = getRequiredEnvironmentVariable("GITHUB_TOKEN");

  await authenticateGitHubToken(token);

  const starCounts = await getStarCounts(token, repositories);
  const updatedLibraries = updateStarCounts(repositories, starCounts);
  const failedRepositories = repositories.length - starCounts.size;

  await writeLibraryDictionary(dictionary);

  console.log(
    `Updated ${updatedLibraries} library entries from ${starCounts.size} GitHub repositories.`,
  );

  if (failedRepositories > 0) {
    console.warn(
      `Skipped ${failedRepositories} GitHub repositories whose star counts could not be fetched.`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
