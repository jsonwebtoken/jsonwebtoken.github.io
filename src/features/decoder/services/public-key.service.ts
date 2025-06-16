import { createRemoteJWKSet, exportJWK, KeyLike } from "jose";
import {
  DecodedJwtHeaderModel,
  DecodedJwtPayloadModel,
  DecodedTokenModel,
} from "@/features/common/models/decoded-token.model";
import { err, fromPromise, fromThrowable, ok, Result } from "neverthrow";
import { DebuggerErrorModel } from "@/features/common/models/debugger-error.model";
import { isHmacAlg } from "@/features/common/services/jwt.service";
import {
  safeJsonParse,
  safeJsonStringify,
} from "@/features/common/services/utils";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";

function getKeyFromX5c(x5c: unknown): Result<string, Error> {
  if (!Array.isArray(x5c) || typeof x5c[0] !== "string") {
    return err(Error("x5c claim not present or invalid"));
  }

  const newline = (x5c[0].match(/.{1,64}/g) || []).join("\n");

  return ok(
    `-----BEGIN CERTIFICATE-----\n${newline}\n-----END CERTIFICATE-----`,
  );
}

async function getKeyFromX5Claims(claims: any): Promise<Result<string, Error>> {
  if (claims.x5c) {
    const getKeyFromX5cResult = getKeyFromX5c(claims.x5c);

    if (getKeyFromX5cResult.isErr()) {
      return err(getKeyFromX5cResult.error);
    }

    return ok(getKeyFromX5cResult.value);
  }

  if (claims.x5u) {
    try {
      const response = await fetch(claims.x5u);
      const data = await response.text();

      const getKeyFromX5cResult = getKeyFromX5c(data);

      if (getKeyFromX5cResult.isErr()) {
        return err(getKeyFromX5cResult.error);
      }

      return ok(getKeyFromX5cResult.value);
    } catch (e) {
      return err(new Error("x5u claim not available"));
    }
  }

  return err(new Error("x5c or x5u claims not available"));
}

const safeJoseCreateRemoteJWKSet = fromThrowable(createRemoteJWKSet, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Unable to create remote JWKS.";
});

const safeCreateUrl = (url: string): Result<URL, string> => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return ok(parsedUrl);
    }

    return err("Unable to create URL from value");
  } catch (e) {
    return err("Unable to create URL from value");
  }
};

const safeExportJWK = (key: KeyLike | Uint8Array) => {
  return fromPromise(exportJWK(key), (e) => {
    console.error(e);

    return "Unable to export key to a JWK";
  });
};

async function getKeyFromJwkKeySetUrl(
  header: DecodedJwtHeaderModel,
  url: string,
): Promise<Result<string, string>> {
  const safeCreateUrlResult = safeCreateUrl(url);

  if (safeCreateUrlResult.isErr()) {
    return err(safeCreateUrlResult.error);
  }

  const urlObj = safeCreateUrlResult.value;

  const safeJoseCreateRemoteJWKSetResult = safeJoseCreateRemoteJWKSet(urlObj);

  if (safeJoseCreateRemoteJWKSetResult.isErr()) {
    return err(safeJoseCreateRemoteJWKSetResult.error);
  }

  const getKeyFromJwkKeySetUrlFn = safeJoseCreateRemoteJWKSetResult.value;

  try {
    const key = await getKeyFromJwkKeySetUrlFn(header);

    const safeExportJWKResult = await safeExportJWK(key);

    if (safeExportJWKResult.isErr()) {
      return err(safeExportJWKResult.error);
    }

    const jwk = safeExportJWKResult.value;

    const safeJsonStringifyResult = safeJsonStringify(jwk, null, 2);

    if (safeJsonStringifyResult.isErr()) {
      return err(safeJsonStringifyResult.error);
    }

    return ok(safeJsonStringifyResult.value);
  } catch (error) {
    return err("Unable to get public key from the JSON Web Key Set.");
  }
}

const safeFetch = (url: string) => {
  return fromPromise(fetch(url), (e) => {
    if (e instanceof Error) {
      return e.message;
    }

    return `Unable to fetch from ${url}`;
  });
};

const safeFetchPublicKeyFromJwtIssuer = async (
  payload: DecodedJwtPayloadModel,
  header: DecodedJwtHeaderModel,
): Promise<Result<string, string>> => {
  if (!payload.iss) {
    return err(`Payload does not have an "iss" claim.`);
  }

  const url =
    payload.iss +
    (payload.iss.charAt(payload.iss.length - 1) === "/"
      ? ".well-known/openid-configuration"
      : "/.well-known/openid-configuration");

  const fetchResult = await safeFetch(url);

  if (fetchResult.isErr()) {
    return err(fetchResult.error);
  }

  const response = fetchResult.value;
  const text = await response.text();

  const safeJsonParseResult = safeJsonParse(text);

  if (safeJsonParseResult.isErr()) {
    return err(safeJsonParseResult.error);
  }

  const data = safeJsonParseResult.value;

  if (!data || !data.jwks_uri || typeof data.jwks_uri !== "string") {
    return err(`Could not get jwks_uri from URL: ${url}`);
  }

  const getKeyFromJwkKeySetUrlResult = await getKeyFromJwkKeySetUrl(
    header,
    data.jwks_uri,
  );

  if (getKeyFromJwkKeySetUrlResult.isErr()) {
    return err(getKeyFromJwkKeySetUrlResult.error);
  }

  return ok(getKeyFromJwkKeySetUrlResult.value);
};

export async function downloadPublicKeyIfPossible(
  decodedToken: DecodedTokenModel,
): Promise<Result<string, DebuggerErrorModel>> {
  const defaultErrorMessage =
    "Unable to automatically download public key from JWT. Please enter public key manually to verify the JWT signature.";

  const header = decodedToken.header;
  const payload = decodedToken.payload;

  if (!header.alg || isHmacAlg(header.alg)) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.JWT,
      message: `Unsupported alg: ${header.alg}`,
    });
  }

  if (header.x5c || header.x5u) {
    const getKeyFromX5ClaimsResult = await getKeyFromX5Claims(header);

    if (getKeyFromX5ClaimsResult.isErr()) {
      console.error(getKeyFromX5ClaimsResult.error.message);
      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.KEY,
        message: defaultErrorMessage,
      });
    }

    return ok(getKeyFromX5ClaimsResult.value);
  }

  if (header.jku) {
    const getKeyFromJwkKeySetUrlResult = await getKeyFromJwkKeySetUrl(
      header,
      header.jku,
    );

    if (getKeyFromJwkKeySetUrlResult.isErr()) {
      console.error(getKeyFromJwkKeySetUrlResult.error);

      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.KEY,
        message: defaultErrorMessage,
      });
    }

    return ok(getKeyFromJwkKeySetUrlResult.value);
  }

  if (header.jwk) {
    const safeJsonStringifyResult = safeJsonStringify(header.jwk, null, 2);

    if (safeJsonStringifyResult.isErr()) {
      console.error(safeJsonStringifyResult.error);

      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.KEY,
        message: defaultErrorMessage,
      });
    }

    return ok(safeJsonStringifyResult.value);
  }

  if (typeof payload === "object" && "iss" in payload && payload.iss) {
    const invalidIssuerUrlErrorMessage = `Unable to retrieve public key from issuer (iss) '${payload.iss}'. Expected a valid HTTPS URL. Please enter public key manually to verify the JWT signature.`;

    const safeCreateUrlResult = safeCreateUrl(payload.iss);

    if (safeCreateUrlResult.isErr()) {
      console.error(safeCreateUrlResult.error);

      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.JWT,
        message: invalidIssuerUrlErrorMessage,
      });
    }

    const safeFetchPublicKeyFromJwtIssuerResult =
      await safeFetchPublicKeyFromJwtIssuer(payload, header);

    if (safeFetchPublicKeyFromJwtIssuerResult.isErr()) {
      console.error(safeFetchPublicKeyFromJwtIssuerResult.error);

      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.JWT,
        message: defaultErrorMessage,
      });
    }

    return ok(safeFetchPublicKeyFromJwtIssuerResult.value);
  }

  return err({
    task: DebuggerTaskValues.VERIFY,
    input: DebuggerInputValues.KEY,
    message: defaultErrorMessage,
  });
}
