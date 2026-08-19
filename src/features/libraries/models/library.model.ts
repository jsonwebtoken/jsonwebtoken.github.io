import type { LibrarySupport } from "@/features/libraries/values/library-support.values";

export interface LibraryModel {
  minimumVersion: string | null;
  support: LibrarySupport;
  authorUrl: string | null;
  authorName: string;
  gitHubRepoPath: string | null;
  altRepoPath?: string;
  repoUrl: string;
  installCommandMarkdown: string[];
  stars?: number | null;
}
