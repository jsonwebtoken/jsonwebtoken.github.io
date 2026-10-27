import {
  compactVerify,
  createLocalJWKSet,
  createRemoteJWKSet,
  decodeProtectedHeader,
  errors,
  type CompactVerifyGetKey,
  type JSONWebKeySet,
} from "jose";
import { err, fromPromise, ok, Result } from "neverthrow";
import { DebuggerErrorModel } from "@/features/common/models/debugger-error.model";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { safeJsonParse } from "@/features/common/services/utils";

type JwksSource =
  | { kind: "uri"; url: URL }
  | { kind: "set"; jwks: JSONWebKeySet };

type RemoteKeySet = ReturnType<typeof createRemoteJWKSet>;

const URI_PATTERN = /^https?:\/\//i;
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);
const REMOTE_KEY_SET_OPTIONS = { cacheMaxAge: 30_000, cooldownDuration: 0 };

const MESSAGES = {
  empty: "Enter a JWKS URI or JWKS JSON to verify the JWT signature.",
  invalidJwks:
    'The provided value is not a valid JWKS URI or JWKS JSON. A JWKS is a JSON object with a "keys" array as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-5).',
  invalidUri: "The JWKS URI is not a valid URL.",
  insecureUri: "The JWKS URI must use https.",
  timeout: "Timed out while fetching the JWKS.",
  signature: "Signature verification failed. Try again with another value.",
  fallback: "Unable to verify the signature using the JWKS.",
} as const;

let lastRemoteKeySet: { href: string; keySet: RemoteKeySet } | null = null;

const toVerifyKeyError = (message: string): DebuggerErrorModel => ({
  task: DebuggerTaskValues.VERIFY,
  input: DebuggerInputValues.KEY,
  message,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isJwks = (value: unknown): value is JSONWebKeySet =>
  isRecord(value) && Array.isArray(value.keys) && value.keys.every(isRecord);

const isSecureUrl = ({ protocol, hostname }: URL): boolean =>
  protocol === "https:" ||
  (protocol === "http:" && LOOPBACK_HOSTNAMES.has(hostname));

const parseUri = (value: string): Result<URL, string> => {
  try {
    const url = new URL(value);

    return isSecureUrl(url) ? ok(url) : err(MESSAGES.insecureUri);
  } catch {
    return err(MESSAGES.invalidUri);
  }
};

const parseJwksJson = (value: string): Result<JSONWebKeySet, string> =>
  safeJsonParse(value)
    .mapErr(() => MESSAGES.invalidJwks)
    .andThen((parsed) =>
      isJwks(parsed) ? ok(parsed) : err(MESSAGES.invalidJwks),
    );

export const isJwksUri = (value: string): boolean =>
  URI_PATTERN.test(value.trim());

export const isJwksInput = (value: string): boolean =>
  isJwksUri(value) || parseJwksJson(value.trim()).isOk();

export const parseJwksInput = (value: string): Result<JwksSource, string> => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return err(MESSAGES.empty);
  }

  if (isJwksUri(trimmedValue)) {
    return parseUri(trimmedValue).map((url) => ({ kind: "uri", url }));
  }

  return parseJwksJson(trimmedValue).map((jwks) => ({ kind: "set", jwks }));
};

export const validateJwksInput = (
  value: string,
): Result<undefined, DebuggerErrorModel> =>
  parseJwksInput(value)
    .map(() => undefined)
    .mapErr(toVerifyKeyError);

const getRemoteKeySet = (url: URL): RemoteKeySet => {
  if (lastRemoteKeySet?.href !== url.href) {
    lastRemoteKeySet = {
      href: url.href,
      keySet: createRemoteJWKSet(url, REMOTE_KEY_SET_OPTIONS),
    };
  }

  return lastRemoteKeySet.keySet;
};

const getKeyResolver = (source: JwksSource): CompactVerifyGetKey =>
  source.kind === "uri"
    ? getRemoteKeySet(source.url)
    : createLocalJWKSet(source.jwks);

const verifyWithEachCandidate = async (
  jwt: string,
  candidates: AsyncIterable<unknown>,
): Promise<void> => {
  for await (const candidate of candidates) {
    const outcome = await fromPromise(
      compactVerify(jwt, candidate as Parameters<typeof compactVerify>[1]),
      (e) => e,
    );

    if (outcome.isOk()) {
      return;
    }

    if (!(outcome.error instanceof errors.JWSSignatureVerificationFailed)) {
      throw outcome.error;
    }
  }

  throw new errors.JWSSignatureVerificationFailed();
};

const verifyWithKeyResolver = async (
  jwt: string,
  getKey: CompactVerifyGetKey,
): Promise<void> => {
  try {
    await compactVerify(jwt, getKey);
  } catch (e) {
    if (e instanceof errors.JWKSMultipleMatchingKeys) {
      return verifyWithEachCandidate(jwt, e);
    }

    throw e;
  }
};

const toFetchFailureMessage = (source: JwksSource): string =>
  source.kind === "uri"
    ? `Unable to fetch the JWKS from ${source.url.host}. The server may be unreachable or may not allow cross-origin requests (CORS). Paste the JWKS JSON instead.`
    : MESSAGES.fallback;

const describeHeaderMatchCriteria = (jwt: string): string => {
  try {
    const { kid, alg } = decodeProtectedHeader(jwt);
    const criteria = [kid && `kid "${kid}"`, alg && `alg "${alg}"`].filter(
      Boolean,
    );

    return criteria.length > 0 ? ` (${criteria.join(", ")})` : "";
  } catch {
    return "";
  }
};

const toNoMatchingKeyMessage = (jwt: string): string =>
  `No key in the JWKS matches the "kid" and "alg" header values of the JWT${describeHeaderMatchCriteria(jwt)}.`;

const toVerificationMessage = (
  e: unknown,
  source: JwksSource,
  jwt: string,
): string => {
  if (e instanceof errors.JWKSNoMatchingKey) {
    return toNoMatchingKeyMessage(jwt);
  }

  if (e instanceof errors.JWKSTimeout) {
    return MESSAGES.timeout;
  }

  if (e instanceof errors.JWSSignatureVerificationFailed) {
    return MESSAGES.signature;
  }

  if (e instanceof errors.JOSEError) {
    return e.message;
  }

  return e instanceof TypeError
    ? toFetchFailureMessage(source)
    : MESSAGES.fallback;
};

export const verifyJwtWithJwks = async ({
  jwt,
  jwksInput,
}: {
  jwt: string;
  jwksInput: string;
}): Promise<Result<boolean, DebuggerErrorModel>> => {
  const sourceResult = parseJwksInput(jwksInput);

  if (sourceResult.isErr()) {
    return err(toVerifyKeyError(sourceResult.error));
  }

  const source = sourceResult.value;

  return fromPromise(verifyWithKeyResolver(jwt, getKeyResolver(source)), (e) =>
    toVerifyKeyError(toVerificationMessage(e, source, jwt)),
  ).map(() => true);
};

export const wrapKeyInJwks = (jwk: string): Result<string, string> =>
  safeJsonParse(jwk)
    .map((parsed) => JSON.stringify({ keys: [parsed] }, null, 2))
    .mapErr(() => MESSAGES.invalidJwks);

export const extractSingleJwk = (jwksInput: string): Result<string, string> =>
  parseJwksInput(jwksInput).andThen((source) => {
    if (source.kind === "uri") {
      return err(
        "A JWKS URI cannot be converted. Paste a PEM or JWK public key instead.",
      );
    }

    const { keys } = source.jwks;

    return keys.length === 1
      ? ok(JSON.stringify(keys[0], null, 2))
      : err(
          `The JWKS contains ${keys.length} keys. Keep a single key to convert it to another format.`,
        );
  });
