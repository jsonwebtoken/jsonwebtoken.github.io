import {
  err,
  fromAsyncThrowable,
  fromPromise,
  fromThrowable,
  ok,
  Result,
} from "neverthrow";
import {
  DecodedJwtHeaderModel,
  DecodedJwtPayloadModel,
} from "@/features/common/models/decoded-token.model";
import { JwtTypeValues } from "@/features/common/values/jwt-type.values";
import {
  CompactJWSHeaderParameters,
  CompactSign,
  CompactVerifyResult,
  importPKCS8,
  type JWK,
  KeyLike,
} from "jose";
import nodeForge from "node-forge";
import { EncodingValues } from "@/features/common/values/encoding.values";
import {
  getAlgName,
  getOperationException,
  safeBase64url,
  safeBase64urlToBuffer,
  safeBufferFrom,
  safeCompactVerify,
  safeDecodeBase64url,
  safeImportJWK,
  safeImportSPKI,
  safeImportX509,
  safeJsonParse,
  safeJsonStringify,
  safeNewUint8ArrayFromBuffer,
  safeParseInt,
  safePublicKeyFromPem,
  safePublicKeyToPem,
  safeTextEncode,
} from "@/features/common/services/utils";
import {
  DebuggerErrorModel,
  DebuggerErrorModelWithData,
} from "@/features/common/models/debugger-error.model";
import {
  algDictionary,
  jwsAlgHeaderParameterValuesDictionary,
} from "@/features/common/values/jws-alg-header-parameter-values.dictionary";
import {
  JwtHeaderDecoderSchema,
  JwtHeaderEncoderSchema,
} from "@/features/encoder/schemas/jwt-header.schema";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export function isSupportedAlg(algorithm: string): boolean {
  const noneAlg = jwsAlgHeaderParameterValuesDictionary.none[algorithm];

  const macAlg = jwsAlgHeaderParameterValuesDictionary.mac[algorithm];

  const digitalSignatureAlg =
    jwsAlgHeaderParameterValuesDictionary.digitalSignature[algorithm];

  return !!noneAlg || !!macAlg || !!digitalSignatureAlg;
}

export function isNoneAlg(algorithm: string): boolean {
  const alg = jwsAlgHeaderParameterValuesDictionary.none[algorithm];

  return !!alg;
}

export function isHmacAlg(algorithm: string): boolean {
  const alg = jwsAlgHeaderParameterValuesDictionary.mac[algorithm];

  return !!alg;
}

export function isDigitalSignatureAlg(algorithm: string): boolean {
  const alg = jwsAlgHeaderParameterValuesDictionary.digitalSignature[algorithm];

  return !!alg || algorithm === algDictionary.EdDSA;
}

export const getAlgSize = (value: string): Result<{ size: number }, string> => {
  const algorithm = getAlgName(value);

  if (!isSupportedAlg(algorithm)) {
    return err(
      `Invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
    );
  }

  const algRegex = /^([a-zA-Z]+)(\d+)$/;
  const match = algorithm.match(algRegex);
  const isEdDSA = algorithm === algDictionary.EdDSA;
  const isNone = algorithm === algDictionary.NONE;

  if (isNone) {
    return err(`Can't calculate length for Unsecured JWT.`);
  }

  if (isEdDSA) {
    return err(`Can't calculate length from EdDSA algorithm.`);
  }

  if (!match) {
    return err(
      `Invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
    );
  }

  const algSize = match[2];

  const safeParseIntResult = safeParseInt(algSize, 10);

  if (safeParseIntResult.isErr()) {
    return err(safeParseIntResult.error);
  }

  return ok({
    size: safeParseIntResult.value,
  });
};

export const isValidBase64UrlString = (source: string): boolean => {
  if (source === undefined) {
    return false;
  }

  const base64UrlPattern = /^[A-Za-z0-9_-]*$/;

  return base64UrlPattern.test(source);
};

export const parseStringIntoValidJsonObject = (
  text: string,
): Result<object, string> => {
  const safeJsonParseResult = safeJsonParse(text);

  if (safeJsonParseResult.isErr()) {
    return err(safeJsonParseResult.error);
  }

  const parsedText = safeJsonParseResult.value;

  if (
    parsedText !== null &&
    typeof parsedText === "object" &&
    !Array.isArray(parsedText)
  ) {
    return ok(parsedText);
  }

  return err(`The given string does not represent a valid JSON object.`);
};

export const stringifyJsonObject = (obj: object): Result<string, string> => {
  const result = safeJsonStringify(obj, null, 2);

  if (result.isErr()) {
    return err(result.error);
  }

  return ok(result.value);
};

export const getValidatedEncoderHeader = (
  value: object,
): Result<
  {
    header: DecodedJwtHeaderModel;
    headerWarnings: string[] | null;
  },
  { headerErrors: string[]; signingErrors: string[] }
> => {
  const jwtHeaderParseResult = JwtHeaderEncoderSchema.safeParse(value);
  const headerWarnings: string[] = [];

  if (!jwtHeaderParseResult.success) {
    const { fieldErrors } = jwtHeaderParseResult.error.flatten();

    return err({
      headerErrors: fieldErrors.alg ? [...fieldErrors.alg] : [],
      signingErrors: fieldErrors.alg
        ? ["Fix any errors in the JWT header to enable editing this field."]
        : [],
    });
  }

  if ("typ" in value && value.typ !== "JWT") {
    headerWarnings.push(
      '[RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-5.1) recommends for the "typ" claim value to be "JWT" when used.',
    );
  }

  return ok({
    header: value as DecodedJwtHeaderModel,
    headerWarnings: headerWarnings.length > 0 ? headerWarnings : null,
  });
};

export const getValidatedDecoderHeader = (
  value: object,
): Result<
  {
    header: DecodedJwtHeaderModel;
    headerWarnings: string[] | null;
  },
  { headerErrors: string[] }
> => {
  const jwtHeaderParseResult = JwtHeaderDecoderSchema.safeParse(value);
  const headerWarnings: string[] = [];

  if (!jwtHeaderParseResult.success) {
    const { fieldErrors } = jwtHeaderParseResult.error.flatten();

    return err({
      headerErrors: fieldErrors.alg ? [...fieldErrors.alg] : [],
    });
  }

  if (!("typ" in value && value.typ === "JWT")) {
    headerWarnings.push(
      '[RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-5.1) recommends for the "typ" claim value to be "JWT" when used.',
    );
  }

  return ok({
    header: value as DecodedJwtHeaderModel,
    headerWarnings: headerWarnings.length > 0 ? headerWarnings : null,
  });
};

export const validateJwtFormat = (
  value: string,
): Result<
  {
    type: JwtTypeValues;
    signingAlgorithm: string;
    decoded: { header: DecodedJwtHeaderModel; payload: DecodedJwtPayloadModel };
  },
  // TODO: Update with proper types
  DebuggerErrorModelWithData<{
    header: any;
    payload: any;
  }>
> => {
  if (!value) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `JWT must not be empty.`,
    });
  }

  const segmentLabelMap: { [index: number]: string } = {
    0: "first (header)",
    1: "second (payload)",
    2: "third (signature)",
  };

  const segments = value.split(".");

  // TODO: Update with proper types
  const error: DebuggerErrorModelWithData<{
    header: any;
    payload: any;
  }> = {
    task: DebuggerTaskValues.DECODE,
    input: DebuggerInputValues.JWT,
    message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
  };

  if (!isValidBase64UrlString(segments[0])) {
    return err(error);
  }

  const decodedHeaderSegmentResult = safeDecodeBase64url(segments[0]);

  if (decodedHeaderSegmentResult.isErr()) {
    return err(error);
  }

  const decodedHeaderSegment = decodedHeaderSegmentResult.value;

  const headerParsingResult =
    parseStringIntoValidJsonObject(decodedHeaderSegment);

  if (headerParsingResult.isErr()) {
    return err(error);
  }

  if (segments.length === 1 || (segments.length === 2 && segments[1] === "")) {
    return err({
      ...error,
      data: {
        header: headerParsingResult.value,
        payload: null,
      },
    });
  }

  if (!isValidBase64UrlString(segments[1])) {
    return err(error);
  }

  const decodedPayloadSegmentResult = safeDecodeBase64url(segments[1]);

  if (decodedPayloadSegmentResult.isErr()) {
    return err(error);
  }

  const decodedPayloadSegment = decodedPayloadSegmentResult.value;

  const payloadParsingResult = parseStringIntoValidJsonObject(
    decodedPayloadSegment,
  );

  if (
    isNoneAlg((headerParsingResult.value as DecodedJwtHeaderModel).alg) &&
    segments.length === 2 &&
    segments[1] !== ""
  ) {
    if (payloadParsingResult.isErr()) {
      return err({
        ...error,
        data: {
          header: headerParsingResult.value,
          payload: decodedPayloadSegment,
        },
      });
    }

    return err({
      ...error,
      data: {
        header: headerParsingResult.value,
        payload: payloadParsingResult.value,
      },
    });
  }

  if (
    !isNoneAlg((headerParsingResult.value as DecodedJwtHeaderModel).alg) &&
    ((segments.length === 2 && segments[1] !== "") ||
      (segments.length === 3 && segments[2] === ""))
  ) {
    if (payloadParsingResult.isErr()) {
      return err({
        ...error,
        data: {
          header: headerParsingResult.value,
          payload: decodedPayloadSegment,
        },
      });
    }

    return err({
      ...error,
      data: {
        header: headerParsingResult.value,
        payload: payloadParsingResult.value,
      },
    });
  }

  if (segments.length !== 3) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `This tool only supports a JWT that uses the JWS Compact Serialization, which must have three base64url-encoded segments separated by two period ('.') characters as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3)`,
    });
  }

  const signatureSegment = segments[2];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (i < 2 && !segment) {
      return err({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `The ${segmentLabelMap[i]} segment cannot be an empty string as defined on [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515#section-3.3).`,
      });
    }

    if (!isValidBase64UrlString(segment)) {
      return err({
        task: DebuggerTaskValues.DECODE,
        input: DebuggerInputValues.JWT,
        message: `Each JWT segment must be a base64url-encoded as defined on [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3). The ${segmentLabelMap[i]} segment isn't.`,
      });
    }
  }

  if (decodedHeaderSegmentResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `Each JWT segment must be a base64url-encoded as defined on [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3). The ${segmentLabelMap[0]} segment isn't.`,
    });
  }

  if (decodedPayloadSegmentResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `Each JWT segment must be a base64url-encoded as defined on [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3). The ${segmentLabelMap[1]} segment isn't.`,
    });
  }

  if (headerParsingResult.isErr() && payloadParsingResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `The first segment, the JWT header, and the second segment, the JWT payload, must represent a completely valid JSON object conforming to [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3).`,
      data: {
        header: decodedHeaderSegment,
        payload: decodedPayloadSegment,
      },
    });
  }

  if (headerParsingResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `The first segment, the JWT header, must represent a completely valid JSON object conforming to [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3).`,
      data: {
        header: decodedHeaderSegment,
        payload: payloadParsingResult.isOk() ? payloadParsingResult.value : "",
      },
    });
  }

  if (payloadParsingResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `The second segment, the JWT payload, must represent a completely valid JSON object conforming to [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-3).`,
      data: {
        header: headerParsingResult.isOk() ? headerParsingResult.value : "",
        payload: decodedPayloadSegment,
      },
    });
  }

  const payloadJsonObject =
    payloadParsingResult.value as DecodedJwtPayloadModel;

  const getValidatedHeaderResult = getValidatedDecoderHeader(
    headerParsingResult.value,
  );

  if (getValidatedHeaderResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: getValidatedHeaderResult.error.headerErrors.join(" "),
      data: {
        header: headerParsingResult.value,
        payload: payloadParsingResult.value,
      },
    });
  }

  const { header } = getValidatedHeaderResult.value;

  let type: JwtTypeValues | null = null;

  if (isNoneAlg(header.alg) && !signatureSegment) {
    type = JwtTypeValues.Unsecured;
  }

  if (isNoneAlg(header.alg) && signatureSegment) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `Unsecured JWTs must not have a signature part as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
    });
  }

  if (isHmacAlg(header.alg)) {
    type = JwtTypeValues.MACed;
  }

  if (isDigitalSignatureAlg(header.alg)) {
    type = JwtTypeValues.DigitallySigned;
  }

  if (!type) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: `The JWT header does not have a valid "alg" claim as required by [RFC 7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1)`,
    });
  }

  return ok({
    type,
    signingAlgorithm: header.alg,
    decoded: {
      header: header,
      payload: payloadJsonObject,
    },
  });
};

export const validateSymmetricSecret = async ({
  symmetricSecretKey,
  symmetricSecretKeyEncoding,
}: {
  symmetricSecretKey: string;
  symmetricSecretKeyEncoding: EncodingValues;
}): Promise<Result<Uint8Array, DebuggerErrorModel>> => {
  if (!symmetricSecretKey) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.SECRET,
      message: "Enter a secret to verify the JWT signature.",
    });
  }

  if (
    symmetricSecretKeyEncoding === EncodingValues.BASE64URL &&
    !isValidBase64UrlString(symmetricSecretKey)
  ) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.SECRET,
      message:
        "Invalid base64url string. Use the Base64 encoding using the URL and filename-safe character set as defined in [Section 5 of RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5).",
    });
  }

  if (
    symmetricSecretKeyEncoding === EncodingValues.BASE64URL &&
    symmetricSecretKey.length < 2
  ) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.SECRET,
      message:
        "The smallest possible binary input is a single byte (8 bits), which is represented by 2 base64url characters.",
    });
  }

  const getSymmetricSecretKeyByteArrayResult = getSymmetricSecretKeyByteArray(
    symmetricSecretKey,
    symmetricSecretKeyEncoding,
  );

  if (getSymmetricSecretKeyByteArrayResult.isErr()) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.SECRET,
      message: getSymmetricSecretKeyByteArrayResult.error,
    });
  }

  const symmetricSecretKeyByteArray =
    getSymmetricSecretKeyByteArrayResult.value;

  return ok(symmetricSecretKeyByteArray);
};

type VerifyMACedJwtParams = {
  jwt: string;
  symmetricSecretKey: string;
  symmetricSecretKeyEncoding: EncodingValues;
};

export const verifyMACedJwt = async ({
  symmetricSecretKey,
  symmetricSecretKeyEncoding,
  jwt,
}: VerifyMACedJwtParams): Promise<
  Result<CompactVerifyResult, DebuggerErrorModel>
> => {
  const validateSymmetricSecretResult = await validateSymmetricSecret({
    symmetricSecretKey,
    symmetricSecretKeyEncoding,
  });

  if (validateSymmetricSecretResult.isErr()) {
    return err(validateSymmetricSecretResult.error);
  }

  const validatedSymmetricKey = validateSymmetricSecretResult.value;

  const safeCompactVerifyResult = await safeCompactVerify(
    jwt,
    validatedSymmetricKey,
  );

  if (safeCompactVerifyResult.isErr()) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.SECRET,
      message: safeCompactVerifyResult.error.message,
    });
  }

  return ok(safeCompactVerifyResult.value);
};

export async function validateAsymmetricKey({
  alg,
  asymmetricPublicKey,
  asymmetricPublicKeyFormat,
}: {
  alg: string;
  asymmetricPublicKey: KeyLike | string;
  asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
}): Promise<Result<KeyLike | Uint8Array, DebuggerErrorModel>> {
  const spki = `-----BEGIN PUBLIC KEY-----`;
  const pkcs1 = `-----BEGIN RSA PUBLIC KEY-----`;
  const x509 = `-----BEGIN CERTIFICATE-----`;

  if (!asymmetricPublicKey) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.KEY,
      message: "Enter a public key to verify the JWT signature.",
    });
  }

  try {
    if (
      typeof asymmetricPublicKey === "string" &&
      asymmetricPublicKeyFormat === AsymmetricKeyFormatValues.PEM
    ) {
      if (asymmetricPublicKey.startsWith(x509)) {
        const safeImportX509Result = await safeImportX509(
          asymmetricPublicKey,
          alg,
        );

        if (safeImportX509Result.isErr()) {
          return err({
            task: DebuggerTaskValues.VERIFY,
            input: DebuggerInputValues.KEY,
            message: safeImportX509Result.error,
          });
        }

        const cryptoKey = safeImportX509Result.value;

        return ok(cryptoKey);
      }

      if (asymmetricPublicKey.startsWith(spki)) {
        const safeImportSPKIResult = await safeImportSPKI(
          asymmetricPublicKey,
          alg,
        );

        if (safeImportSPKIResult.isErr()) {
          return err({
            task: DebuggerTaskValues.VERIFY,
            input: DebuggerInputValues.KEY,
            message: safeImportSPKIResult.error,
          });
        }

        const cryptoKey = safeImportSPKIResult.value;

        return ok(cryptoKey);
      }

      if (asymmetricPublicKey.startsWith(pkcs1)) {
        const publicKeyFromPemResult =
          safePublicKeyFromPem(asymmetricPublicKey);

        if (publicKeyFromPemResult.isErr()) {
          return err({
            task: DebuggerTaskValues.VERIFY,
            input: DebuggerInputValues.KEY,
            message: publicKeyFromPemResult.error,
          });
        }

        const publicKeyFromPem = publicKeyFromPemResult.value;

        const PublicKeyToPemResult = safePublicKeyToPem(publicKeyFromPem);

        if (PublicKeyToPemResult.isErr()) {
          return err({
            task: DebuggerTaskValues.VERIFY,
            input: DebuggerInputValues.KEY,
            message: PublicKeyToPemResult.error,
          });
        }

        const spkiKey = PublicKeyToPemResult.value;

        const safeImportSPKIResult = await safeImportSPKI(spkiKey, alg);

        if (safeImportSPKIResult.isErr()) {
          return err({
            task: DebuggerTaskValues.VERIFY,
            input: DebuggerInputValues.KEY,
            message: safeImportSPKIResult.error,
          });
        }

        const cryptoKey = safeImportSPKIResult.value;

        return ok(cryptoKey);
      }
    }

    if (
      typeof asymmetricPublicKey === "string" &&
      asymmetricPublicKeyFormat === AsymmetricKeyFormatValues.JWK
    ) {
      const safeJsonParseResult = safeJsonParse(asymmetricPublicKey);

      if (safeJsonParseResult.isErr()) {
        return err({
          task: DebuggerTaskValues.VERIFY,
          input: DebuggerInputValues.KEY,
          message: `The provided key is not a valid JWK. Ensure it is a correctly formatted JSON Web Key (JWK) as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-4).`,
        });
      }

      const parsedPublicKey = safeJsonParseResult.value;

      if (!("kty" in parsedPublicKey)) {
        return err({
          task: DebuggerTaskValues.VERIFY,
          input: DebuggerInputValues.KEY,
          message: `The provided key is not a valid JWK. The 'kty' member must be present in a JWK as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-4.1).`,
        });
      }

      const safeImportJWKResult = await safeImportJWK(parsedPublicKey, alg);

      if (safeImportJWKResult.isErr()) {
        return err({
          task: DebuggerTaskValues.VERIFY,
          input: DebuggerInputValues.KEY,
          message: safeImportJWKResult.error,
        });
      }

      const jwk = safeImportJWKResult.value;

      return ok(jwk);
    }

    if (typeof asymmetricPublicKey !== "string") {
      return ok(asymmetricPublicKey);
    }

    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.KEY,
      message: `Invalid public key format or structure.`,
    });
  } catch (e) {
    if (e instanceof Error) {
      return err({
        task: DebuggerTaskValues.VERIFY,
        input: DebuggerInputValues.KEY,
        message: e.message,
      });
    }

    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.KEY,
      message: `Invalid public key format or structure.`,
    });
  }
}

type VerifyDigitallySignedJwtParams = {
  jwt: string;
  alg: string;
  asymmetricPublicKey: KeyLike | string;
  asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
};

export async function verifyDigitallySignedJwt({
  jwt,
  asymmetricPublicKey,
  alg,
  asymmetricPublicKeyFormat,
}: VerifyDigitallySignedJwtParams): Promise<
  Result<boolean, DebuggerErrorModel>
> {
  const validateAsymmetricKeyResult = await validateAsymmetricKey({
    alg,
    asymmetricPublicKey,
    asymmetricPublicKeyFormat,
  });

  if (validateAsymmetricKeyResult.isErr()) {
    return err(validateAsymmetricKeyResult.error);
  }

  const validatedAsymmetricKey = validateAsymmetricKeyResult.value;

  const safeCompactVerifyResult = await safeCompactVerify(
    jwt,
    validatedAsymmetricKey,
  );

  if (safeCompactVerifyResult.isErr()) {
    return err({
      task: DebuggerTaskValues.VERIFY,
      input: DebuggerInputValues.KEY,
      message: safeCompactVerifyResult.error.message,
    });
  }

  return ok(true);
}

export const getSymmetricSecretKeyByteArray = (
  key: string,
  encoding: EncodingValues = EncodingValues.UTF8,
): Result<Uint8Array, string> => {
  if (encoding === EncodingValues.BASE64URL) {
    const safeBase64urlToBufferResult = safeBase64urlToBuffer(key);

    if (safeBase64urlToBufferResult.isErr()) {
      return err(safeBase64urlToBufferResult.error);
    }

    const buffer = safeBase64urlToBufferResult.value;

    const safeNewUint8ArrayResult = safeNewUint8ArrayFromBuffer(buffer);

    if (safeNewUint8ArrayResult.isErr()) {
      return err(safeNewUint8ArrayResult.error);
    }

    const uint8Array = safeNewUint8ArrayResult.value;

    return ok(uint8Array);
  }

  const safeTextEncodeResult = safeTextEncode(key);

  if (safeTextEncodeResult.isErr()) {
    return err(safeTextEncodeResult.error);
  }

  return ok(safeTextEncodeResult.value);
};

export const getJwk = ({ alg, use, key_ops, ext, ...jwk }: JWK): JWK => jwk;

const safePrivateKeyFromPem = fromThrowable(
  nodeForge.pki.privateKeyFromPem,
  (e) => {
    const message = "Cannot get private key from PEM";

    if (e instanceof Error) {
      return e.message || message;
    }

    return message;
  },
);

const safePrivateKeyToAsn1 = fromThrowable(
  nodeForge.pki.privateKeyToAsn1,
  (e) => {
    const message = "Cannot convert private key ASN.1";

    if (e instanceof Error) {
      return e.message || message;
    }

    return message;
  },
);

const safeWrapRsaPrivateKey = fromThrowable(
  nodeForge.pki.wrapRsaPrivateKey,
  (e) => {
    const message = "Cannot wrap RSA private key";

    if (e instanceof Error) {
      return e.message || message;
    }

    return message;
  },
);

const safePrivateKeyInfoToPem = fromThrowable(
  nodeForge.pki.privateKeyInfoToPem,
  (e) => {
    const message = "Cannot convert private key info to PEM";

    if (e instanceof Error) {
      return e.message || message;
    }

    return message;
  },
);

const safeImportPKCS8 = fromAsyncThrowable(importPKCS8, (e) => {
  const message =
    "Cannot import PEM-encoded PKCS#8 string as a runtime-specific private key representation.";

  return getOperationException({
    e,
    defaultMessage: message,
  });
});

export const getAsymmetricKeyCryptoKey = async (
  key: string,
  alg: string,
  keyFormat: AsymmetricKeyFormatValues,
): Promise<Result<KeyLike | Uint8Array, string>> => {
  if (keyFormat === AsymmetricKeyFormatValues.PEM) {
    if (key.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
      const safePrivateKeyFromPemResult = safePrivateKeyFromPem(key);

      if (safePrivateKeyFromPemResult.isErr()) {
        return err(safePrivateKeyFromPemResult.error);
      }

      const privateKeyFromPem = safePrivateKeyFromPemResult.value;

      const safePrivateKeyToAsn1Result =
        safePrivateKeyToAsn1(privateKeyFromPem);

      if (safePrivateKeyToAsn1Result.isErr()) {
        return err(safePrivateKeyToAsn1Result.error);
      }

      const privateKeyToAsn1 = safePrivateKeyToAsn1Result.value;

      const safeWrapRsaPrivateKeyResult =
        safeWrapRsaPrivateKey(privateKeyToAsn1);

      if (safeWrapRsaPrivateKeyResult.isErr()) {
        return err(safeWrapRsaPrivateKeyResult.error);
      }

      const wrapRsaPrivateKey = safeWrapRsaPrivateKeyResult.value;

      const safePrivateKeyInfoToPemResult =
        safePrivateKeyInfoToPem(wrapRsaPrivateKey);

      if (safePrivateKeyInfoToPemResult.isErr()) {
        return err(safePrivateKeyInfoToPemResult.error);
      }

      key = safePrivateKeyInfoToPemResult.value;
    }

    if (key.startsWith("-----BEGIN")) {
      const safeImportPKCS8Result = await safeImportPKCS8(key, alg);

      if (safeImportPKCS8Result.isErr()) {
        return err(safeImportPKCS8Result.error);
      }

      const cryptoKey = safeImportPKCS8Result.value;

      return ok(cryptoKey);
    }
  }

  if (keyFormat === AsymmetricKeyFormatValues.JWK) {
    const safeJsonParseResult = safeJsonParse(key);

    if (safeJsonParseResult.isErr()) {
      return err(
        `The provided key is not a valid JWK. Ensure it is a correctly formatted JSON Web Key (JWK) as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-4).`,
      );
    }

    const parsedKey = safeJsonParseResult.value;
    const jwk = getJwk(parsedKey);

    if (!("kty" in jwk) && !("d" in jwk)) {
      return err(
        `The provided key is not a valid JWK. Ensure it is a correctly formatted JSON Web Key (JWK) as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-4).`,
      );
    }

    if (!("kty" in jwk)) {
      return err(
        `The provided key is not a valid JWK. The 'kty' member must be present in a JWK as defined on [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517#section-4.1).`,
      );
    }

    if (!("d" in jwk)) {
      return err(
        `Private key is not a private JWK. The 'd' parameter must be present as defined on [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518#section-6).`,
      );
    }

    const safeImportJWKResult = await safeImportJWK(jwk, alg);

    if (safeImportJWKResult.isErr()) {
      return err(safeImportJWKResult.error);
    }

    const cryptoKey = safeImportJWKResult.value;

    return ok(cryptoKey);
  }

  return err("Missing or incorrect private key format.");
};

const createCompactSignObject = fromThrowable(
  (payload: Uint8Array) => new CompactSign(payload),
  () => "Unable to create object to build and sign Compact JWS strings",
);

const setProtectedHeader = fromThrowable(
  (compactSign: CompactSign, header: CompactJWSHeaderParameters) =>
    compactSign.setProtectedHeader(header),
  () => "Unable to set the JWS Protected Header on the Compact Sign object.",
);

const signValue = (compactSign: CompactSign, key: Uint8Array) => {
  return fromPromise(compactSign.sign(key), (e) => {
    if (e instanceof Error) {
      return new Error(e.message);
    }

    return new Error("Unable to sign token.");
  });
};

const signValueWithPrivateKey = (
  compactSign: CompactSign,
  key: KeyLike | Uint8Array,
) => {
  return fromPromise(compactSign.sign(key), (e) => {
    console.error(e);

    if (e instanceof Error) {
      return new Error(e.message);
    }

    return new Error("Unable to sign token with private key.");
  });
};

export const createUnsecuredJwt = async (
  header: { [index: string]: any } | string,
  payload: { [index: string]: any } | string,
): Promise<Result<string, DebuggerErrorModel>> => {
  if (!(typeof header === "string" || header instanceof String)) {
    const result = safeJsonStringify(header);

    if (result.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.HEADER,
        message: "Given header is not a valid JSON object representation.",
      });
    }

    header = result.value;
  }

  if (!(typeof payload === "string" || payload instanceof String)) {
    const result = safeJsonStringify(payload);

    if (result.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.PAYLOAD,
        message: "Given payload is not a valid JSON object representation.",
      });
    }

    payload = result.value;
  }

  const encodedHeaderResult = safeBase64url(header as string);

  if (encodedHeaderResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: encodedHeaderResult.error,
    });
  }

  const encodedPayloadResult = safeBase64url(payload as string);

  if (encodedPayloadResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.PAYLOAD,
      message: encodedPayloadResult.error,
    });
  }

  const unsecureJwt = `${encodedHeaderResult.value}.${encodedPayloadResult.value}.`;

  return ok(unsecureJwt);
};

export const signWithSymmetricSecretKey = async (
  header: CompactJWSHeaderParameters,
  payload: { [index: string]: any } | string,
  key: string,
  encodingFormat: EncodingValues = EncodingValues.UTF8,
): Promise<Result<string, DebuggerErrorModel>> => {
  if (!header.alg) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: 'Missing "alg" claim in header',
    });
  }

  const getSymmetricSecretKeyByteArrayResult = getSymmetricSecretKeyByteArray(
    key,
    encodingFormat,
  );

  if (getSymmetricSecretKeyByteArrayResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.SECRET,
      message: getSymmetricSecretKeyByteArrayResult.error,
    });
  }

  const symmetricSecretKeyByteArray =
    getSymmetricSecretKeyByteArrayResult.value;

  if (!(typeof payload === "string" || payload instanceof String)) {
    const result = safeJsonStringify(payload);

    if (result.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.PAYLOAD,
        message: "Given payload is not a valid JSON object representation.",
      });
    }

    payload = result.value;
  }

  const safeTextEncodeResult = safeTextEncode(payload as string);

  if (safeTextEncodeResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.PAYLOAD,
      message:
        "Given payload cannot be encoded into an array of 8-bit unsigned integers.",
    });
  }

  const encodedPayload = safeTextEncodeResult.value;

  const createCompactSignObjectResult = createCompactSignObject(encodedPayload);

  if (createCompactSignObjectResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.PAYLOAD,
      message: createCompactSignObjectResult.error,
    });
  }

  const compactSign = createCompactSignObjectResult.value;

  const setProtectedHeaderResult = setProtectedHeader(compactSign, header);

  if (setProtectedHeaderResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: setProtectedHeaderResult.error,
    });
  }

  const compactSignWithProtectedHeader = setProtectedHeaderResult.value;

  const signValueResult = await signValue(
    compactSignWithProtectedHeader,
    symmetricSecretKeyByteArray,
  );

  if (signValueResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.SECRET,
      message: signValueResult.error.message,
    });
  }

  return ok(signValueResult.value);
};

export const signWithAsymmetricPrivateKey = async (
  header: CompactJWSHeaderParameters,
  payload: { [index: string]: any } | string,
  key: string,
  keyFormat: AsymmetricKeyFormatValues,
): Promise<Result<string, DebuggerErrorModel>> => {
  if (!header.alg) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: 'Missing "alg" claim in header',
    });
  }

  const getAsymmetricKeyCryptoKeyResult = await getAsymmetricKeyCryptoKey(
    key,
    header.alg,
    keyFormat,
  );

  if (getAsymmetricKeyCryptoKeyResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.KEY,
      message: getAsymmetricKeyCryptoKeyResult.error,
    });
  }

  const asymmetricKeyCryptoKey = getAsymmetricKeyCryptoKeyResult.value;

  if (!(typeof payload === "string" || payload instanceof String)) {
    const result = safeJsonStringify(payload);

    if (result.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.PAYLOAD,
        message: "Given payload is not a valid JSON object representation.",
      });
    }

    payload = result.value;
  }

  const safeTextEncodeResult = safeTextEncode(payload as string);

  if (safeTextEncodeResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.PAYLOAD,
      message:
        "Given payload cannot be encoded into an array of 8-bit unsigned integers.",
    });
  }

  const encodedPayload = safeTextEncodeResult.value;

  const createCompactSignObjectResult = createCompactSignObject(encodedPayload);

  if (createCompactSignObjectResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.PAYLOAD,
      message: createCompactSignObjectResult.error,
    });
  }

  const compactSign = createCompactSignObjectResult.value;

  const setProtectedHeaderResult = setProtectedHeader(compactSign, header);

  if (setProtectedHeaderResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: setProtectedHeaderResult.error,
    });
  }

  const compactSignWithProtectedHeader = setProtectedHeaderResult.value;

  const signValueResult = await signValueWithPrivateKey(
    compactSignWithProtectedHeader,
    asymmetricKeyCryptoKey,
  );

  if (signValueResult.isErr()) {
    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.KEY,
      message: signValueResult.error.message,
    });
  }

  return ok(signValueResult.value);
};

// TODO: Update with proper types
export const getStringifiedHeaderAndPayload = (
  header: any,
  payload: any,
): Result<{ header: string; payload: string }, DebuggerErrorModel> => {
  const stringifyHeaderResult = stringifyJsonObject(header);
  const stringifyPayloadResult = stringifyJsonObject(payload);

  if (stringifyHeaderResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: stringifyHeaderResult.error,
    });
  }

  if (stringifyPayloadResult.isErr()) {
    return err({
      task: DebuggerTaskValues.DECODE,
      input: DebuggerInputValues.JWT,
      message: stringifyPayloadResult.error,
    });
  }

  return ok({
    header: stringifyHeaderResult.value,
    payload: stringifyPayloadResult.value,
  });
};

export const checkHmacSecretLength = (
  secret: string,
  algSize: number,
  encodingFormat: EncodingValues = EncodingValues.UTF8,
): Result<void, DebuggerErrorModel> => {
  if (encodingFormat === EncodingValues.BASE64URL) {
    const safeBase64urlToBufferResult = safeBase64urlToBuffer(secret);

    if (safeBase64urlToBufferResult.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.KEY,
        message: safeBase64urlToBufferResult.error,
      });
    }

    const buffer = safeBase64urlToBufferResult.value;

    const inputBits = buffer.length * 8;

    if (inputBits >= algSize) {
      return ok(void 0);
    }
  }

  if (encodingFormat !== EncodingValues.BASE64URL) {
    const safeBufferFromResult = safeBufferFrom(secret);

    if (safeBufferFromResult.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.KEY,
        message: safeBufferFromResult.error,
      });
    }

    const buffer = safeBufferFromResult.value;

    const inputBits = buffer.length * 8;

    if (inputBits >= algSize) {
      return ok(void 0);
    }
  }

  return err({
    task: DebuggerTaskValues.ENCODE,
    input: DebuggerInputValues.KEY,
    message: `A key of ${algSize} bits or larger MUST be used with HS${algSize} as specified on [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518#section-3.2).`,
  });
};

export const isP521Supported = async (): Promise<boolean> => {
  try {
    await window.crypto.subtle.generateKey(
      {
        name: algDictionary.ECDSA,
        namedCurve: "P-521",
      },
      true,
      ["sign", "verify"],
    );

    return true;
  } catch (e) {
    return false;
  }
};

export const isEd25519Supported = async (): Promise<boolean> => {
  try {
    await window.crypto.subtle.generateKey(
      {
        name: algDictionary.Ed25519,
      },
      true,
      ["sign", "verify"],
    );

    return true;
  } catch (e) {
    return false;
  }
};

export const isEd448Supported = async (): Promise<boolean> => {
  try {
    await window.crypto.subtle.generateKey(
      {
        name: algDictionary.Ed448,
      },
      true,
      ["sign", "verify"],
    );

    return true;
  } catch (e) {
    return false;
  }
};
