interface LibrarySupportDefinition {
  value: string;
  label: string;
  cardLabel: string;
  code: string | null;
}

interface LibraryAlgorithmDefinition {
  value: string;
  label: string;
}

export const librarySupportDefinitions = [
  {
    value: "sign",
    label: "SIGN",
    cardLabel: "Sign",
    code: null,
  },
  {
    value: "verify",
    label: "VERIFY",
    cardLabel: "Verify",
    code: null,
  },
  {
    value: "iss",
    label: "ISS",
    cardLabel: "check",
    code: "iss",
  },
  {
    value: "sub",
    label: "SUB",
    cardLabel: "check",
    code: "sub",
  },
  {
    value: "aud",
    label: "AUD",
    cardLabel: "check",
    code: "aud",
  },
  {
    value: "exp",
    label: "EXP",
    cardLabel: "check",
    code: "exp",
  },
  {
    value: "nbf",
    label: "NBF",
    cardLabel: "check",
    code: "nbf",
  },
  {
    value: "iat",
    label: "IAT",
    cardLabel: "check",
    code: "iat",
  },
  {
    value: "jti",
    label: "JTI",
    cardLabel: "check",
    code: "jti",
  },
  {
    value: "typ",
    label: "TYP",
    cardLabel: "check",
    code: "typ",
  },
] as const satisfies readonly LibrarySupportDefinition[];

export const libraryAlgorithmDefinitions = [
  { value: "hs256", label: "HS256" },
  { value: "hs384", label: "HS384" },
  { value: "hs512", label: "HS512" },
  { value: "rs256", label: "RS256" },
  { value: "rs384", label: "RS384" },
  { value: "rs512", label: "RS512" },
  { value: "es256", label: "ES256" },
  { value: "es256k", label: "ES256K" },
  { value: "es384", label: "ES384" },
  { value: "es512", label: "ES512" },
  { value: "ps256", label: "PS256" },
  { value: "ps384", label: "PS384" },
  { value: "ps512", label: "PS512" },
  { value: "eddsa", label: "EdDSA" },
  { value: "ed25519", label: "Ed25519" },
  { value: "ed448", label: "Ed448" },
  { value: "ml-dsa-44", label: "ML-DSA-44" },
  { value: "ml-dsa-65", label: "ML-DSA-65" },
  { value: "ml-dsa-87", label: "ML-DSA-87" },
] as const satisfies readonly LibraryAlgorithmDefinition[];

type LibrarySupportKey =
  | (typeof librarySupportDefinitions)[number]["value"]
  | (typeof libraryAlgorithmDefinitions)[number]["value"];

export type LibrarySupport = Partial<Record<LibrarySupportKey, boolean>>;
