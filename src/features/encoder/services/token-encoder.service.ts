import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
  DefaultTokenWithSecretModel,
} from "@/features/common/values/default-tokens.values";
import { CompactJWSHeaderParameters } from "jose";
import {
  DecodedJwtHeaderModel,
  DecodedJwtPayloadModel,
} from "@/features/common/models/decoded-token.model";
import {
  checkHmacSecretLength,
  createUnsecuredJwt,
  getAlgSize,
  getValidatedEncoderHeader,
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
  isValidBase64UrlString,
  parseStringIntoValidJsonObject,
  signWithAsymmetricPrivateKey,
  signWithSymmetricSecretKey,
} from "@/features/common/services/jwt.service";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { err, ok, Result } from "neverthrow";
import { DebuggerErrorModel } from "@/features/common/models/debugger-error.model";
import {
  getAlgName,
  safeJsonParse,
  safeJsonStringify,
} from "@/features/common/services/utils";
import { EncoderStoreState } from "@/features/encoder/services/encoder.store";
import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { EncoderInputsModel } from "@/features/debugger/models/encoder-inputs.model";
import { EncoderResult } from "@/features/common/models/encoder-result.model";

type EncodingHeaderErrors = {
  headerErrors: string[] | null;
  signingErrors: string[] | null;
};

type EncodingPayloadErrors = {
  payloadErrors: string[] | null;
};

type EncodingSymmetricSecretKeyErrors = {
  headerErrors: string[] | null;
  signingErrors: string[] | null;
  payloadErrors: string[] | null;
  encodingErrors: string[] | null;
  symmetricSecretKeyErrors: string[] | null;
};

type EncodingAsymmetricPrivateKeyErrors = {
  headerErrors: string[] | null;
  signingErrors: string[] | null;
  payloadErrors: string[] | null;
  encodingErrors: string[] | null;
};

type EncodingJwtErrors = {
  headerErrors: string[] | null;
  signingErrors: string[] | null;
  payloadErrors: string[] | null;
  encodingErrors: string[] | null;
};

class _TokenEncoderService {
  async selectEncodingExample(
    algorithmPickerOptionValue: string,
  ): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      signingErrors: null,
      headerErrors: null,
      headerWarnings: null,
      payloadErrors: null,
      encodingWarnings: null,
    };

    const jwt = DefaultTokensValues[algorithmPickerOptionValue];

    const algorithm = getAlgName(algorithmPickerOptionValue);

    const header = isNoneAlg(algorithm)
      ? {
          alg: algorithm,
        }
      : {
          alg: algorithm,
          typ: "JWT",
        };

    /**
     * We need to update the value of this payload; otherwise, the controlledPayload observable
     * won't emit anything as its value would not change.
     */
    const payload = {
      sub: "1234567890",
      name: "John Doe",
      admin: true,
      /**
       * iat must be numeric value representing the number of seconds from
       * 1970-01-01T00:00:00Z UTC until the specified UTC date/time,
       * ignoring leap seconds.
       */
      iat: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24,
    };

    stateUpdate.exampleAlg = algorithmPickerOptionValue;
    stateUpdate.alg = algorithm;

    const stringifiedHeaderResult = safeJsonStringify(header, null, 2);
    const stringifiedPayloadResult = safeJsonStringify(payload, null, 2);

    if (stringifiedHeaderResult.isErr()) {
      stateUpdate.headerErrors = [
        "Given header is not a valid JSON object representation.",
      ];
      stateUpdate.signingErrors = [
        "Fix any errors in the JWT header to enable editing this field.",
      ];
    }

    if (stringifiedHeaderResult.isOk()) {
      stateUpdate.header = stringifiedHeaderResult.value;
      stateUpdate.controlledHeader = {
        id: new Date().valueOf(),
        value: stringifiedHeaderResult.value,
      };
    }

    if (stringifiedPayloadResult.isErr()) {
      stateUpdate.payloadErrors = [
        "Given payload is not a valid JSON object representation.",
      ];
    }

    if (stringifiedPayloadResult.isOk()) {
      stateUpdate.payload = stringifiedPayloadResult.value;
      stateUpdate.controlledPayload = {
        id: new Date().valueOf(),
        value: stringifiedPayloadResult.value,
      };
    }

    if (isNoneAlg(algorithm)) {
      const encodeJWTResult = await this.encodeUnsecuredJWT(header, payload);

      if (encodeJWTResult.isErr()) {
        stateUpdate.headerErrors = encodeJWTResult.error.headerErrors;
        stateUpdate.payloadErrors = encodeJWTResult.error.payloadErrors;
        stateUpdate.signingErrors = encodeJWTResult.error.signingErrors;
        stateUpdate.encodingErrors = encodeJWTResult.error.encodingErrors;
      }

      if (encodeJWTResult.isOk()) {
        stateUpdate.jwt = encodeJWTResult.value.jwt.trim();
        stateUpdate.encodingWarnings = [
          `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
        ];
      }

      return {
        ...stateUpdate,
      };
    }

    if (isHmacAlg(algorithm)) {
      const secret = (jwt as DefaultTokenWithSecretModel).secret;

      const encodeJWTResult = await this.encodeJWTWithHmacAlg(
        header,
        payload,
        secret,
        EncodingValues.UTF8,
      );

      if (encodeJWTResult.isErr()) {
        stateUpdate.signingErrors = [encodeJWTResult.error.message];
      }

      if (encodeJWTResult.isOk()) {
        stateUpdate.jwt = encodeJWTResult.value.jwt.trim();
        stateUpdate.signingErrors = encodeJWTResult.value.signingErrors;
      }

      return {
        ...stateUpdate,
        symmetricSecretKey: secret,
        symmetricSecretKeyEncoding: EncodingValues.UTF8,
        controlledSymmetricSecretKey: {
          id: new Date().valueOf(),
          value: secret,
          encoding: EncodingValues.UTF8,
        },
      };
    }

    if (isDigitalSignatureAlg(algorithm)) {
      const digitallySignedToken = jwt as DefaultTokenWithKeysModel;
      const privateKey = digitallySignedToken.privateKey;

      const encodeJWTResult = await this.encodeJWTWithDigitalSignatureAlg(
        header,
        payload,
        privateKey,
        AsymmetricKeyFormatValues.PEM,
      );

      if (encodeJWTResult.isErr()) {
        stateUpdate.signingErrors = [encodeJWTResult.error.message];
      }

      if (encodeJWTResult.isOk()) {
        stateUpdate.jwt = encodeJWTResult.value.jwt.trim();

        useDebuggerStore.getState().setStash$({
          asymmetricPublicKey: digitallySignedToken.publicKey,
          asymmetricPublicKeyFormat: digitallySignedToken.publicKeyFormat,
        });
      }

      return {
        ...stateUpdate,
        asymmetricPrivateKey: privateKey,
        asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
        controlledAsymmetricPrivateKey: {
          id: new Date().valueOf(),
          value: privateKey,
          format: AsymmetricKeyFormatValues.PEM,
        },
      };
    }

    return stateUpdate;
  }

  async loadEncoderInput(
    params: EncoderInputsModel,
  ): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      signingErrors: null,
      headerErrors: null,
      headerWarnings: null,
      payloadErrors: null,
      encodingWarnings: null,
      jwt: null,
    };

    if (params.algType === SigningAlgCategoryValues.SYMMETRIC) {
      stateUpdate.symmetricSecretKey = params.symmetricSecretKey;
      stateUpdate.symmetricSecretKeyEncoding =
        params.symmetricSecretKeyEncoding;
      stateUpdate.controlledSymmetricSecretKey = {
        id: new Date().valueOf(),
        value: params.symmetricSecretKey,
        encoding: params.symmetricSecretKeyEncoding,
      };
    }

    if (params.algType === SigningAlgCategoryValues.ASYMMETRIC) {
      stateUpdate.asymmetricPrivateKey = params.asymmetricPrivateKey;
      stateUpdate.asymmetricPrivateKeyFormat =
        params.asymmetricPrivateKeyFormat;
      stateUpdate.controlledAsymmetricPrivateKey = {
        id: new Date().valueOf(),
        value: params.asymmetricPrivateKey,
        format: params.asymmetricPrivateKeyFormat,
      };
    }

    stateUpdate.alg = params.alg;

    stateUpdate.header = params.header;
    stateUpdate.controlledHeader = {
      id: new Date().valueOf(),
      value: params.header,
    };

    stateUpdate.payload = params.payload;
    stateUpdate.controlledPayload = {
      id: new Date().valueOf(),
      value: params.payload,
    };

    const safeJsonParseHeaderResult = safeJsonParse(params.header);
    const safeJsonParsePayloadResult = safeJsonParse(params.payload);

    if (
      safeJsonParseHeaderResult.isErr() &&
      safeJsonParsePayloadResult.isErr()
    ) {
      stateUpdate.headerErrors = [
        "Given header is not a valid JSON object representation.",
      ];
      stateUpdate.signingErrors = [
        "Fix any errors in the JWT header to enable editing this field.",
      ];
      stateUpdate.payloadErrors = [
        "Given payload is not a valid JSON object representation.",
      ];

      return {
        ...stateUpdate,
      };
    }

    if (safeJsonParseHeaderResult.isErr()) {
      stateUpdate.headerErrors = [
        "Given header is not a valid JSON object representation.",
      ];
      stateUpdate.signingErrors = [
        "Fix any errors in the JWT header to enable editing this field.",
      ];

      return {
        ...stateUpdate,
      };
    }

    if (safeJsonParsePayloadResult.isErr()) {
      stateUpdate.payloadErrors = [
        "The payload must be a valid JSON object. [Learn more](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1).",
        safeJsonParsePayloadResult.error,
      ];

      if (params.algType === SigningAlgCategoryValues.NOOP) {
        stateUpdate.headerErrors = [
          `Missing or invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
        ];
      }

      return {
        ...stateUpdate,
      };
    }

    const header = safeJsonParseHeaderResult.value;
    const payload = safeJsonParsePayloadResult.value;

    if (params.algType === SigningAlgCategoryValues.NONE) {
      const encodeUnsecuredJWTResult = await this.encodeUnsecuredJWT(
        header,
        payload,
      );

      if (encodeUnsecuredJWTResult.isErr()) {
        return {
          ...stateUpdate,
          ...encodeUnsecuredJWTResult.error,
        };
      }

      if (encodeUnsecuredJWTResult.isOk()) {
        stateUpdate.encodingWarnings = [
          `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
        ];

        stateUpdate.jwt = encodeUnsecuredJWTResult.value.jwt.trim();
      }

      return {
        ...stateUpdate,
      };
    }

    if (params.algType === SigningAlgCategoryValues.SYMMETRIC) {
      const encodeJWTResult = await this.encodeJWTWithHmacAlg(
        header,
        payload,
        params.symmetricSecretKey,
        params.symmetricSecretKeyEncoding,
      );

      if (encodeJWTResult.isErr()) {
        stateUpdate.signingErrors = [encodeJWTResult.error.message];
      }

      if (encodeJWTResult.isOk()) {
        stateUpdate.jwt = encodeJWTResult.value.jwt.trim();
      }

      return {
        ...stateUpdate,
        symmetricSecretKey: params.symmetricSecretKey,
        symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
        controlledSymmetricSecretKey: {
          id: new Date().valueOf(),
          value: params.symmetricSecretKey,
          encoding: params.symmetricSecretKeyEncoding,
        },
      };
    }

    if (params.algType === SigningAlgCategoryValues.ASYMMETRIC) {
      const privateKey = params.asymmetricPrivateKey || "";

      const encodeJWTResult = await this.encodeJWTWithDigitalSignatureAlg(
        header,
        payload,
        privateKey,
        params.asymmetricPrivateKeyFormat,
      );

      if (encodeJWTResult.isErr()) {
        stateUpdate.signingErrors = [encodeJWTResult.error.message];
      }

      if (encodeJWTResult.isOk()) {
        stateUpdate.jwt = encodeJWTResult.value.jwt.trim();
      }

      return {
        ...stateUpdate,
        asymmetricPrivateKey: privateKey,
        asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
        controlledAsymmetricPrivateKey: {
          id: new Date().valueOf(),
          value: privateKey,
          format: params.asymmetricPrivateKeyFormat,
        },
      };
    }

    if (params.algType === SigningAlgCategoryValues.NOOP) {
      stateUpdate.headerErrors = [
        `Missing or invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
      ];

      return {
        ...stateUpdate,
      };
    }

    return stateUpdate;
  }

  private async encodeUnsecuredJWT(
    header: DecodedJwtHeaderModel,
    payload: DecodedJwtPayloadModel,
  ): Promise<
    Result<
      {
        jwt: string;
      },
      EncodingJwtErrors
    >
  > {
    if (!isNoneAlg(header.alg)) {
      const errors: EncodingJwtErrors = {
        headerErrors: [
          `Only use the "alg" parameter set to "none" in the header to create an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
        ],
        payloadErrors: null,
        signingErrors: null,
        encodingErrors: null,
      };

      return err(errors);
    }

    const createUnsecuredJwtResult = await createUnsecuredJwt(header, payload);

    if (createUnsecuredJwtResult.isErr()) {
      const errors: EncodingJwtErrors = {
        headerErrors: null,
        payloadErrors: [createUnsecuredJwtResult.error.message],
        signingErrors: null,
        encodingErrors: null,
      };

      return err(errors);
    }

    return ok({
      jwt: createUnsecuredJwtResult.value,
    });
  }

  private async encodeJWTWithHmacAlg(
    header: DecodedJwtHeaderModel,
    payload: DecodedJwtPayloadModel,
    key: string,
    encodingFormat: EncodingValues,
  ): Promise<Result<EncoderResult, DebuggerErrorModel>> {
    if (!isHmacAlg(header.alg)) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.HEADER,
        message: `Invalid MAC algorithm. Only use MAC "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
      });
    }

    if (!key) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.KEY,
        message: "Secret must not be empty.",
      });
    }

    const getAlgSizeResult = getAlgSize(header.alg);

    if (getAlgSizeResult.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.KEY,
        message: getAlgSizeResult.error,
      });
    }

    const checkHmacSecretLengthResult = checkHmacSecretLength(
      key,
      getAlgSizeResult.value.size,
      encodingFormat,
    );

    const signingError = checkHmacSecretLengthResult.isErr()
      ? [checkHmacSecretLengthResult.error.message]
      : null;

    const signWithSymmetricSecretKeyResult =  await signWithSymmetricSecretKey(
      header as CompactJWSHeaderParameters,
      payload,
      key,
      encodingFormat,
    );

    if (signWithSymmetricSecretKeyResult.isErr()) {
      return err({
        task: DebuggerTaskValues.ENCODE,
        input: DebuggerInputValues.KEY,
        message: signWithSymmetricSecretKeyResult.error.message,
      });
    }

    return ok<EncoderResult>({
      jwt: signWithSymmetricSecretKeyResult.value,
      signingErrors: signingError,
    });
  }

  private async encodeJWTWithDigitalSignatureAlg(
    header: DecodedJwtHeaderModel,
    payload: DecodedJwtPayloadModel,
    key: string,
    keyFormat: AsymmetricKeyFormatValues,
  ): Promise<Result<EncoderResult, DebuggerErrorModel>> {
    if (isDigitalSignatureAlg(header.alg)) {
      if (!key) {
        return err({
          task: DebuggerTaskValues.ENCODE,
          input: DebuggerInputValues.KEY,
          message: "Private key must not be empty.",
        });
      }

      const jwt = await signWithAsymmetricPrivateKey(
        header as CompactJWSHeaderParameters,
        payload,
        key,
        keyFormat,
      );

      if (jwt.isErr()) {
        return err({
          task: DebuggerTaskValues.ENCODE,
          input: DebuggerInputValues.KEY,
          message: "Private key must not be empty.",
        })
      }

      return ok({
        jwt: jwt.value,
        signingErrors: null,
      });
    }

    return err({
      task: DebuggerTaskValues.ENCODE,
      input: DebuggerInputValues.HEADER,
      message: `Invalid Digital Signature algorithm. Only use Digital Signature "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
    });
  }

  processHeader(params: {
    header: string;
    signingAlgCategory: SigningAlgCategoryValues;
  }): Result<
    {
      header: DecodedJwtHeaderModel;
      headerWarnings: string[] | null;
    },
    EncodingHeaderErrors
  > {
    const header = params.header;
    const signingAlgCategory = params.signingAlgCategory;

    const headerParsingResult = parseStringIntoValidJsonObject(header);

    if (headerParsingResult.isErr()) {
      const errors: EncodingHeaderErrors = {
        headerErrors: [
          "The header must be a valid JSON Object. [See examples](https://datatracker.ietf.org/doc/html/rfc8259#section-13)",
          headerParsingResult.error,
        ],
        signingErrors: [
          "Fix any errors in the JWT header to enable editing this field.",
        ],
      };

      return err(errors);
    }

    const getValidatedHeaderResult = getValidatedEncoderHeader(
      headerParsingResult.value,
    );

    if (getValidatedHeaderResult.isErr()) {
      return err({
        ...getValidatedHeaderResult.error,
      });
    }

    const decodedHeader = getValidatedHeaderResult.value.header;

    if (isNoneAlg(decodedHeader.alg)) {
      return ok({
        header: decodedHeader,
        headerWarnings:
          getValidatedHeaderResult.value.headerWarnings &&
          getValidatedHeaderResult.value.headerWarnings.length > 0
            ? getValidatedHeaderResult.value.headerWarnings
            : null,
      });
    }

    if (
      signingAlgCategory === SigningAlgCategoryValues.SYMMETRIC &&
      !isHmacAlg(decodedHeader.alg)
    ) {
      const errors: EncodingHeaderErrors = {
        headerErrors: [
          `Invalid MAC algorithm. Only use MAC "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
        ],
        signingErrors: [
          "Fix any errors in the JWT header to enable editing this field.",
        ],
      };

      return err(errors);
    }

    if (
      signingAlgCategory === SigningAlgCategoryValues.ASYMMETRIC &&
      !isDigitalSignatureAlg(decodedHeader.alg)
    ) {
      const errors: EncodingHeaderErrors = {
        headerErrors: [
          `Invalid Digital Signature algorithm. Only use Digital Signature "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
        ],
        signingErrors: [
          "Fix any errors in the JWT header to enable editing this field.",
        ],
      };

      return err(errors);
    }

    return ok({
      header: decodedHeader,
      headerWarnings:
        getValidatedHeaderResult.value.headerWarnings &&
        getValidatedHeaderResult.value.headerWarnings.length > 0
          ? getValidatedHeaderResult.value.headerWarnings
          : null,
    });
  }

  processPayload(params: { payload: string }): Result<
    {
      payload: DecodedJwtPayloadModel;
    },
    EncodingPayloadErrors
  > {
    const payloadParsingResult = parseStringIntoValidJsonObject(params.payload);

    if (payloadParsingResult.isErr()) {
      const errors: EncodingPayloadErrors = {
        payloadErrors: [
          "The payload must be a valid JSON object. [Learn more](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1).",
          payloadParsingResult.error,
        ],
      };

      return err(errors);
    }

    return ok({
      payload: payloadParsingResult.value as DecodedJwtPayloadModel,
    });
  }

  async processSymmetricSecretKey(params: {
    header: string;
    payload: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
  }): Promise<
    Result<
      EncoderResult,
      EncodingSymmetricSecretKeyErrors
    >
  > {
    const processHeaderResult = this.processHeader({
      signingAlgCategory: SigningAlgCategoryValues.SYMMETRIC,
      header: params.header,
    });

    if (processHeaderResult.isErr()) {
      const errors: EncodingSymmetricSecretKeyErrors = {
        payloadErrors: null,
        encodingErrors: null,
        symmetricSecretKeyErrors: null,
        ...processHeaderResult.error,
      };

      return err(errors);
    }

    const { header } = processHeaderResult.value;

    const symmetricSecretKey = params.symmetricSecretKey;
    const symmetricSecretKeyEncoding = params.symmetricSecretKeyEncoding;

    if (
      symmetricSecretKeyEncoding === EncodingValues.BASE64URL &&
      !isValidBase64UrlString(symmetricSecretKey)
    ) {
      const errors: EncodingSymmetricSecretKeyErrors = {
        headerErrors: null,
        payloadErrors: null,
        encodingErrors: null,
        symmetricSecretKeyErrors: [
          "Invalid base64url string. Use the Base64 encoding using the URL and filename-safe character set as defined in [Section 5 of RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5).",
        ],
        signingErrors: [
          "Invalid base64url string. Use the Base64 encoding using the URL and filename-safe character set as defined in [Section 5 of RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5).",
        ],
      };

      return err(errors);
    }

    const processPayloadResult = this.processPayload({
      payload: params.payload,
    });

    if (processPayloadResult.isErr()) {
      const errors: EncodingSymmetricSecretKeyErrors = {
        headerErrors: null,
        signingErrors: null,
        encodingErrors: null,
        symmetricSecretKeyErrors: null,
        ...processPayloadResult.error,
      };

      return err(errors);
    }

    const { payload } = processPayloadResult.value;

    const encodeJwtResult = await this.encodeJwt({
      algType: SigningAlgCategoryValues.SYMMETRIC,
      header,
      payload,
      symmetricSecretKey,
      symmetricSecretKeyEncoding: symmetricSecretKeyEncoding,
    });

    if (encodeJwtResult.isErr()) {
      const errors: EncodingSymmetricSecretKeyErrors = {
        symmetricSecretKeyErrors: null,
        ...encodeJwtResult.error,
      };

      return err(errors);
    }

    return ok({
      jwt: encodeJwtResult.value.jwt.trim(),
      signingErrors: encodeJwtResult.value.signingErrors,
    });
  }

  async processAsymmetricPrivateKey(params: {
    header: string;
    payload: string;
    asymmetricPrivateKey: string;
    asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Result<{ jwt: string }, EncodingAsymmetricPrivateKeyErrors>> {
    const processHeaderResult = this.processHeader({
      signingAlgCategory: SigningAlgCategoryValues.ASYMMETRIC,
      header: params.header,
    });

    if (processHeaderResult.isErr()) {
      const errors: EncodingAsymmetricPrivateKeyErrors = {
        payloadErrors: null,
        encodingErrors: null,
        ...processHeaderResult.error,
      };

      return err(errors);
    }

    const { header } = processHeaderResult.value;

    const processPayloadResult = this.processPayload({
      payload: params.payload,
    });

    if (processPayloadResult.isErr()) {
      const errors: EncodingAsymmetricPrivateKeyErrors = {
        headerErrors: null,
        signingErrors: null,
        encodingErrors: null,
        ...processPayloadResult.error,
      };

      return err(errors);
    }

    const { payload } = processPayloadResult.value;

    const asymmetricPrivateKey = params.asymmetricPrivateKey;
    const asymmetricPrivateKeyFormat = params.asymmetricPrivateKeyFormat;

    const encodeJwtResult = await this.encodeJwt({
      algType: SigningAlgCategoryValues.ASYMMETRIC,
      header,
      payload,
      asymmetricPrivateKey: asymmetricPrivateKey,
      asymmetricPrivateKeyFormat: asymmetricPrivateKeyFormat,
    });

    if (encodeJwtResult.isErr()) {
      const errors: EncodingAsymmetricPrivateKeyErrors = {
        ...encodeJwtResult.error,
      };

      return err(errors);
    }

    return ok({
      jwt: encodeJwtResult.value.jwt.trim(),
    });
  }

  async encodeJwt(
    params:
      | {
          algType: SigningAlgCategoryValues.ANY;
          header: DecodedJwtHeaderModel;
          payload: DecodedJwtPayloadModel;
          symmetricSecretKey: string;
          symmetricSecretKeyEncoding: EncodingValues;
          asymmetricPrivateKey: string;
          asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
        }
      | {
          algType: SigningAlgCategoryValues.SYMMETRIC;
          header: DecodedJwtHeaderModel;
          payload: DecodedJwtPayloadModel;
          symmetricSecretKey: string;
          symmetricSecretKeyEncoding: EncodingValues;
        }
      | {
          algType: SigningAlgCategoryValues.ASYMMETRIC;
          header: DecodedJwtHeaderModel;
          payload: DecodedJwtPayloadModel;
          asymmetricPrivateKey: string;
          asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
        },
  ): Promise<
    Result<
      EncoderResult,
      EncodingJwtErrors
    >
  > {
    const algType = params.algType;
    const header = params.header;
    const payload = params.payload;

    let encodeJWTResult: Result<EncoderResult, DebuggerErrorModel> | null = null;

    if (algType === SigningAlgCategoryValues.ANY) {
      const symmetricSecretKey = params.symmetricSecretKey;
      const symmetricSecretKeyEncoding = params.symmetricSecretKeyEncoding;
      const asymmetricPrivateKey = params.asymmetricPrivateKey;
      const asymmetricPrivateKeyFormat = params.asymmetricPrivateKeyFormat;

      encodeJWTResult = isHmacAlg(header.alg)
        ? await this.encodeJWTWithHmacAlg(
            header,
            payload,
            symmetricSecretKey,
            symmetricSecretKeyEncoding,
          )
        : isDigitalSignatureAlg(header.alg)
          ? await this.encodeJWTWithDigitalSignatureAlg(
              header,
              payload,
              asymmetricPrivateKey,
              asymmetricPrivateKeyFormat,
            )
          : null;
    }

    if (
      algType === SigningAlgCategoryValues.SYMMETRIC &&
      isHmacAlg(header.alg)
    ) {
      const symmetricSecretKey = params.symmetricSecretKey;
      const symmetricSecretKeyEncoding = params.symmetricSecretKeyEncoding;

      encodeJWTResult = await this.encodeJWTWithHmacAlg(
        header,
        payload,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
      );
    }

    if (
      algType === SigningAlgCategoryValues.ASYMMETRIC &&
      isDigitalSignatureAlg(header.alg)
    ) {
      const asymmetricPrivateKey = params.asymmetricPrivateKey;
      const asymmetricPrivateKeyFormat = params.asymmetricPrivateKeyFormat;

      encodeJWTResult = await this.encodeJWTWithDigitalSignatureAlg(
        header,
        payload,
        asymmetricPrivateKey,
        asymmetricPrivateKeyFormat,
      );
    }

    if (!encodeJWTResult) {
      const errors: EncodingJwtErrors = {
        headerErrors: [
          `Invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
        ],
        signingErrors: [
          "Fix any errors in the JWT header to enable editing this field.",
        ],
        payloadErrors: null,
        encodingErrors: null,
      };

      return err(errors);
    }

    if (encodeJWTResult.isErr()) {
      switch (encodeJWTResult.error.input) {
        case DebuggerInputValues.HEADER: {
          const errors: EncodingJwtErrors = {
            headerErrors: [encodeJWTResult.error.message],
            signingErrors: [
              "Fix any errors in the JWT header to enable editing this field.",
            ],
            payloadErrors: null,
            encodingErrors: null,
          };

          return err(errors);
        }
        case DebuggerInputValues.PAYLOAD: {
          const errors: EncodingJwtErrors = {
            headerErrors: null,
            signingErrors: null,
            payloadErrors: [encodeJWTResult.error.message],
            encodingErrors: null,
          };

          return err(errors);
        }
        case DebuggerInputValues.SECRET: {
          const errors: EncodingJwtErrors = {
            headerErrors: null,
            signingErrors: [encodeJWTResult.error.message],
            payloadErrors: null,
            encodingErrors: null,
          };

          return err(errors);
        }
        case DebuggerInputValues.KEY: {
          const errors: EncodingJwtErrors = {
            headerErrors: null,
            signingErrors: [encodeJWTResult.error.message],
            payloadErrors: null,
            encodingErrors: null,
          };

          return err(errors);
        }
        default: {
          const errors: EncodingJwtErrors = {
            headerErrors: null,
            signingErrors: null,
            payloadErrors: null,
            encodingErrors: [encodeJWTResult.error.message],
          };

          return err(errors);
        }
      }
    }

    return ok<EncoderResult>({
      jwt: encodeJWTResult.value.jwt,
      signingErrors: encodeJWTResult.value.signingErrors,
    });
  }

  async handleHeaderChange(params: {
    header: string;
    payload: string;
    alg: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
    asymmetricPrivateKey: string;
    asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      header: params.header,
      headerErrors: null,
      headerWarnings: null,
      encodingWarnings: null,
      signingErrors: null,
    };

    const processHeaderResult = this.processHeader({
      signingAlgCategory: SigningAlgCategoryValues.ANY,
      header: params.header,
    });

    if (processHeaderResult.isErr()) {
      return {
        ...stateUpdate,
        ...processHeaderResult.error,
      };
    }

    const { header, headerWarnings } = processHeaderResult.value;

    if (headerWarnings) {
      stateUpdate.headerWarnings = headerWarnings;
    }

    stateUpdate.alg = header.alg;

    /**
     * We only need to parse and validate the payload for the encoding process,
     * not before the parse and validate the header, which is the focus of this
     * change handler.
     */
    const processPayloadResult = this.processPayload({
      payload: params.payload,
    });

    if (processPayloadResult.isErr()) {
      return {
        ...stateUpdate,
        ...processPayloadResult.error,
      };
    }

    const { payload } = processPayloadResult.value;

    const encodeJwtResult = isNoneAlg(header.alg)
      ? await this.encodeUnsecuredJWT(header, payload)
      : await this.encodeJwt({
          algType: SigningAlgCategoryValues.ANY,
          header,
          payload,
          symmetricSecretKey: params.symmetricSecretKey,
          symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
          asymmetricPrivateKey: params.asymmetricPrivateKey,
          asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
        });

    if (encodeJwtResult.isErr()) {
      return {
        ...stateUpdate,
        ...encodeJwtResult.error,
      };
    }

    if (isNoneAlg(header.alg)) {
      stateUpdate.encodingWarnings = [
        `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
      ];
    }

    stateUpdate.jwt = encodeJwtResult.value.jwt.trim();

    const hasHmacToDigitalSignatureAlgChange =
      isHmacAlg(params.alg) && isDigitalSignatureAlg(header.alg);
    const hasDigitalSignatureToHmacAlgChange =
      isHmacAlg(header.alg) && isDigitalSignatureAlg(params.alg);

    if (hasHmacToDigitalSignatureAlgChange) {
      stateUpdate.controlledAsymmetricPrivateKey = {
        id: new Date().valueOf(),
        value: params.asymmetricPrivateKey,
        format:
          params.asymmetricPrivateKeyFormat || AsymmetricKeyFormatValues.PEM,
      };

      stateUpdate.signingErrors = null;
    }

    if (hasDigitalSignatureToHmacAlgChange) {
      stateUpdate.controlledSymmetricSecretKey = {
        id: new Date().valueOf(),
        value: params.symmetricSecretKey,
        encoding: params.symmetricSecretKeyEncoding || EncodingValues.UTF8,
      };

      stateUpdate.signingErrors = null;
    }

    stateUpdate.signingErrors = null;

    return stateUpdate;
  }

  async handlePayloadChange(params: {
    payload: string;
    header: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
    asymmetricPrivateKey: string;
    asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      payload: params.payload,
      payloadErrors: null,
      encodingWarnings: null,
      signingErrors: params.header ? null : [
        "Fix any errors in the JWT header to enable editing this field.",
      ],
    };

    const processPayloadResult = this.processPayload({
      payload: params.payload,
    });

    if (processPayloadResult.isErr()) {
      return {
        ...stateUpdate,
        ...processPayloadResult.error,
      };
    }

    const { payload } = processPayloadResult.value;

    /**
     * We only need to parse and validate the header for the encoding process,
     * not before the parse and validate the payload, which is the focus of this
     * change handler.
     */
    const processHeaderResult = this.processHeader({
      signingAlgCategory: SigningAlgCategoryValues.ANY,
      header: params.header,
    });

    if (processHeaderResult.isErr()) {
      return {
        ...stateUpdate,
        ...processHeaderResult.error,
      };
    }

    const { header } = processHeaderResult.value;

    const encodeJwtResult = isNoneAlg(header.alg)
      ? await this.encodeUnsecuredJWT(header, payload)
      : await this.encodeJwt({
          algType: SigningAlgCategoryValues.ANY,
          header,
          payload,
          symmetricSecretKey: params.symmetricSecretKey,
          symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
          asymmetricPrivateKey: params.asymmetricPrivateKey,
          asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
        });

    if (encodeJwtResult.isErr()) {
      return {
        ...stateUpdate,
        ...encodeJwtResult.error,
      };
    }

    if (isNoneAlg(header.alg)) {
      stateUpdate.encodingWarnings = [
        `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
      ];
    }

    stateUpdate.jwt = encodeJwtResult.value.jwt.trim();

    return stateUpdate;
  }

  async handleSymmetricSecretKeyChange(params: {
    header: string;
    payload: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      symmetricSecretKey: params.symmetricSecretKey,
      encodingWarnings: null,
      signingErrors: null,
    };

    if (!params.symmetricSecretKey) {
      stateUpdate.signingErrors = ["Secret must not be empty."];

      return stateUpdate;
    }

    const processSymmetricSecretKeyResult =
      await this.processSymmetricSecretKey({
        header: params.header,
        payload: params.payload,
        symmetricSecretKey: params.symmetricSecretKey,
        symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
      });

    if (processSymmetricSecretKeyResult.isErr()) {
      return {
        ...stateUpdate,
        ...processSymmetricSecretKeyResult.error,
      };
    }

    stateUpdate.jwt = processSymmetricSecretKeyResult.value.jwt.trim();
    stateUpdate.signingErrors = processSymmetricSecretKeyResult.value.signingErrors;

    return stateUpdate;
  }

  async handleSymmetricSecretKeyEncodingChange(params: {
    header: string;
    payload: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
      encodingWarnings: null,
      signingErrors: null,
    };

    const processSymmetricSecretKeyResult =
      await this.processSymmetricSecretKey({
        header: params.header,
        payload: params.payload,
        symmetricSecretKey: params.symmetricSecretKey,
        symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
      });

    if (processSymmetricSecretKeyResult.isErr()) {
      return {
        ...stateUpdate,
        ...processSymmetricSecretKeyResult.error,
      };
    }

    stateUpdate.jwt = processSymmetricSecretKeyResult.value.jwt.trim();
    stateUpdate.signingErrors = processSymmetricSecretKeyResult.value.signingErrors;

    return stateUpdate;
  }

  async handleAsymmetricPrivateKeyChange(params: {
    header: string;
    payload: string;
    asymmetricPrivateKey: string;
    asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      asymmetricPrivateKey: params.asymmetricPrivateKey,
      encodingWarnings: null,
      signingErrors: null,
    };

    const processAsymmetricPrivateKeyResult =
      await this.processAsymmetricPrivateKey({
        header: params.header,
        payload: params.payload,
        asymmetricPrivateKey: params.asymmetricPrivateKey,
        asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
      });

    if (processAsymmetricPrivateKeyResult.isErr()) {
      return {
        ...stateUpdate,
        ...processAsymmetricPrivateKeyResult.error,
      };
    }

    stateUpdate.jwt = processAsymmetricPrivateKeyResult.value.jwt.trim();

    return stateUpdate;
  }

  async handleAsymmetricPrivateKeyFormatChange(params: {
    header: string;
    payload: string;
    asymmetricPrivateKey: string;
    asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Partial<EncoderStoreState>> {
    const stateUpdate: Partial<EncoderStoreState> = {
      jwt: "",
      exampleAlg: "",
      asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
      encodingWarnings: null,
      signingErrors: null,
    };

    const processAsymmetricPrivateKeyResult =
      await this.processAsymmetricPrivateKey({
        header: params.header,
        payload: params.payload,
        asymmetricPrivateKey: params.asymmetricPrivateKey,
        asymmetricPrivateKeyFormat: params.asymmetricPrivateKeyFormat,
      });

    if (processAsymmetricPrivateKeyResult.isErr()) {
      return {
        ...stateUpdate,
        ...processAsymmetricPrivateKeyResult.error,
      };
    }

    stateUpdate.jwt = processAsymmetricPrivateKeyResult.value.jwt.trim();

    return stateUpdate;
  }
}

export const TokenEncoderService = new _TokenEncoderService();
