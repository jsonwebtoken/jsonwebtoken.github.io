import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Octokit } from "octokit";
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

function createOctokit(): Octokit {
  return new Octokit({
    auth: getRequiredEnvironmentVariable("GITHUB_TOKEN"),
  });
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

async function authenticateGitHubToken(octokit: Octokit): Promise<void> {
  try {
    await octokit.rest.rateLimit.get();
  } catch (cause) {
    throw new Error("Unable to authenticate GITHUB_TOKEN", { cause });
  }
}

async function getStarCount(
  octokit: Octokit,
  repository: GitHubRepository,
): Promise<number> {
  try {
    const response = await octokit.rest.repos.get({
      owner: repository.owner,
      repo: repository.repo,
    });

    return response.data.stargazers_count;
  } catch (cause) {
    throw new Error(`Unable to get the star count for ${repository.fullName}`, {
      cause,
    });
  }
}

async function getStarCounts(
  octokit: Octokit,
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
        const stars = await getStarCount(octokit, repository);

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
  const octokit = createOctokit();

  await authenticateGitHubToken(octokit);

  const starCounts = await getStarCounts(octokit, repositories);
  const updatedLibraries = updateStarCounts(repositories, starCounts);
  const failedRepositories = repositories.length - starCounts.size;

  await writeLibraryDictionary(dictionary);

  console.log(
    `Updated ${updatedLibraries} library entries from ${starCounts.size} GitHub repositories.`,
  );

  if (failedRepositories > 0) {
    console.warn(
      `Retained existing star counts for ${failedRepositories} GitHub repositories.`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
