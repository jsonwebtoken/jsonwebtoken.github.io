export interface LibraryModel {
  minimumVersion: string | null;
  support: {
    sign: boolean;
    verify: boolean;
    iss: boolean;
    sub: boolean;
    aud: boolean;
    exp: boolean;
    nbf: boolean;
    iat: boolean;
    jti: boolean;
    typ?: boolean;
    hs256: boolean;
    hs384: boolean;
    hs512: boolean;
    rs256: boolean;
    rs384: boolean;
    rs512: boolean;
    es256: boolean;
    es384: boolean;
    es512: boolean;
    ps256?: boolean;
    ps384?: boolean;
    ps512?: boolean;
    eddsa?: boolean;
    es256k?: boolean;
    ed25519?: boolean;
    ed448?: boolean;
  };
  authorUrl: string | null;
  authorName: string;
  gitHubRepoPath: string | null;
  altRepoPath?: string;
  repoUrl: string;
  installCommandMarkdown: string[];
  stars?: number | null;
}
