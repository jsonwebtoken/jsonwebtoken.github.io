import {
  err,
  fromAsyncThrowable,
  fromPromise,
  fromThrowable,
  ok,
  Result,
} from "neverthrow";
import {
  compactVerify,
  importJWK,
  importSPKI,
  importX509,
  KeyLike,
} from "jose";
import nodeForge from "node-forge";
import base64url from "base64url";
import { algDictionary } from "@/features/common/values/jws-alg-header-parameter-values.dictionary";

export const extractJwt = (value: string): string => {
  if (!value) {
    return "";
  }

  // Check if it's a JWT string with newlines - compact it if so
  if (value.trim().startsWith("ey") && (value.match(/\./g) || []).length >= 2) {
    // It looks like a valid JWT, so remove all whitespace (including newlines)
    return value.replace(/\s+/g, "");
  }

  // Otherwise, use the extraction logic to find JWT in a larger text block
  const jwt = value.split(/\s+/).filter((element) => element.startsWith("ey"));
  return jwt[0] || value;
};

export const safeParseInt = fromThrowable(parseInt, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot parse string into number.";
});

export const safeJsonParse = fromThrowable(JSON.parse, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot parse string into JSON.";
});

export const safeBase64url = fromThrowable(base64url, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot encode value into base64url.";
});

export const safeDecodeBase64url = fromThrowable(base64url.decode, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot decode value from base64url.";
});

export const safeBase64urlToBuffer = fromThrowable(base64url.toBuffer, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot convert base64url-encoded value to a Buffer containing the decoded bytes.";
});

export const safeBufferFrom = fromThrowable(Buffer.from, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot creates a new Buffer using the passed value";
});

export const safeJsonStringify = fromThrowable(JSON.stringify, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Cannot convert object into JSON string.";
});

export const safeNewUint8ArrayFromBuffer = fromThrowable(
  (buffer: ArrayBufferLike) => new Uint8Array(buffer),
  (e) => {
    if (e instanceof Error) {
      return e.message;
    }

    return "Can't create array of 8-bit unsigned integers.";
  },
);

/**
 * Why do we need to create this binding?
 * Source: https://ardislu.dev/illegal-invocation-on-map
 */
const encode = TextEncoder.prototype.encode.bind(new TextEncoder());

export const safeTextEncode = fromThrowable(encode, (e) => {
  if (e instanceof Error) {
    return e.message;
  }

  return "Unable to encode given string into an array of 8-bit unsigned integers.";
});

export const getTimeClaimProcessedValue = (
  time: string,
): Result<string, string> => {
  try {
    if (/\d+,?$/.test(time)) {
      return ok(new Date(parseInt(time, 10) * 1000).toString());
    } else {
      return ok(new Date(time.replace(/[",]/g, "")).toString());
    }
  } catch (e) {
    return err("Invalid date");
  }
};

export const operationExceptionDictionary = {
  TypeError:
    "Operation could not be performed as value is not of the expected type.",
  NotSupportedError: "The algorithm is not supported.",
  SyntaxError: "A required parameter was missing or out-of-range.",
  InvalidAccessError:
    "The requested operation is not valid for the provided key.",
  DataError: "Data provided to the operation does not meet requirements.",
  OperationError: "The operation failed for an operation-specific reason.",
};

export const getOperationException = ({
  e,
  defaultMessage,
}: {
  e: unknown;
  defaultMessage: string;
}): string => {
  if (!(e instanceof Error)) {
    return defaultMessage;
  }

  if (e.name === "TypeError") {
    return operationExceptionDictionary.TypeError;
  }

  if (e.name === "NotSupportedError" || e.name === "JOSENotSupported") {
    return operationExceptionDictionary.NotSupportedError;
  }

  if (e.name === "SyntaxError") {
    return operationExceptionDictionary.SyntaxError;
  }

  if (e.name === "InvalidAccessError") {
    return operationExceptionDictionary.InvalidAccessError;
  }

  if (e.name === "DataError") {
    return operationExceptionDictionary.DataError;
  }

  if (e.name === "OperationError") {
    return operationExceptionDictionary.OperationError;
  }

  return e.message || defaultMessage;
};

export const safeImportSPKI = fromAsyncThrowable(importSPKI, (e) => {
  const message =
    "Cannot import PEM-encoded SPKI string as a runtime-specific public key representation.";

  return getOperationException({
    e,
    defaultMessage: message,
  });
});

export const safeImportX509 = fromAsyncThrowable(importX509, (e) => {
  const message = `"x509" must be X.509 formatted string. [Learn more](https://en.wikipedia.org/wiki/X.509).`;

  return getOperationException({
    e,
    defaultMessage: message,
  });
});

export const safeImportJWK = fromAsyncThrowable(importJWK, (e) => {
  const message = "Cannot import JWK to a runtime-specific key representation.";

  return getOperationException({
    e,
    defaultMessage: message,
  });
});

export const safeCompactVerify = (jws: string, key: Uint8Array | KeyLike) => {
  return fromPromise(compactVerify(jws, key), (e) => {
    if (e instanceof Error) {
      if (e.name === "JWSSignatureVerificationFailed") {
        return new Error(
          "Signature verification failed. Try again with another value.",
        );
      }

      return new Error(e.message);
    }

    return new Error("Unable to verify signature using that value.");
  });
};

export const safePublicKeyFromPem = fromThrowable(
  nodeForge.pki.publicKeyFromPem,
  (e) => {
    if (e instanceof Error) {
      return e.message;
    }

    return "Unable to get public key from PEM string.";
  },
);

export const safePublicKeyToPem = fromThrowable(
  nodeForge.pki.publicKeyToPem,
  (e) => {
    if (e instanceof Error) {
      return e.message;
    }

    return "Unable to transform public key to PEM string.";
  },
);

export const getAlgName = (value: string) => {
  return value === algDictionary.Ed25519 || value === algDictionary.Ed448
    ? algDictionary.EdDSA
    : value;
};
