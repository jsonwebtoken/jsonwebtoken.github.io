import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
  DefaultTokenWithSecretModel,
  DefaultUnsecuredTokenModel,
} from "@/features/common/values/default-tokens.values";
import {
  extractJwt,
  getAlgName,
  operationExceptionDictionary,
} from "@/features/common/services/utils";
import {
  getStringifiedHeaderAndPayload,
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
  isSupportedAlg,
  parseStringIntoValidJsonObject,
  validateAsymmetricKey,
  validateJwtFormat,
  validateSymmetricSecret,
  verifyDigitallySignedJwt,
  verifyMACedJwt,
} from "@/features/common/services/jwt.service";
import { JwtTypeValues } from "@/features/common/values/jwt-type.values";
import { downloadPublicKeyIfPossible } from "@/features/decoder/services/public-key.service";
import { EncodingValues } from "@/features/common/values/encoding.values";
import {
  DecoderStore,
  DecoderStoreState,
} from "@/features/decoder/services/decoder.store";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";
import { err, ok, Result } from "neverthrow";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { useDebuggerStore } from "@/features/debugger/services/debugger.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import { StringValues } from "@/features/common/values/string.values";
import { DecoderInputsModel } from "@/features/debugger/models/decoder-inputs.model";
import { NOOP_ALG } from "@/features/common/values/constants";

export const DEFAULT_ALG_TYPE = "HS";
export const DEFAULT_ALG_SIZE = 256;
export const DEFAULT_ALG = `${DEFAULT_ALG_TYPE}${DEFAULT_ALG_SIZE}`;

export const DEFAULT_JWT = DefaultTokensValues[
  DEFAULT_ALG
] as DefaultTokenWithSecretModel;

type HandleSymmetricSecretKeyHelperOk = Pick<
  DecoderStoreState,
  "signatureStatus"
>;
type HandleSymmetricSecretKeyHelperError = Pick<
  DecoderStoreState,
  "signatureStatus" | "verificationInputErrors" | "signatureWarnings"
>;

type HandleAsymmetricPublicKeyHelperOk = Pick<
  DecoderStoreState,
  "signatureStatus"
>;
type HandleAsymmetricPublicKeyHelperError = Pick<
  DecoderStoreState,
  "signatureStatus" | "verificationInputErrors" | "signatureWarnings"
>;

class _TokenDecoderService {
  async selectDecodingExample(
    algorithmPickerOptionValue: string,
  ): Promise<Partial<DecoderStoreState>> {
    const defaultToken =
      DefaultTokensValues[algorithmPickerOptionValue] || DEFAULT_JWT;

    const algorithm = getAlgName(algorithmPickerOptionValue);

    if (isNoneAlg(algorithm)) {
      const token = defaultToken as DefaultUnsecuredTokenModel;

      return await this.loadDecoderInputs({
        jwt: token.token,
        alg: algorithm,
        algType: SigningAlgCategoryValues.NONE,
      });
    }

    if (isHmacAlg(algorithm)) {
      const token = defaultToken as DefaultTokenWithSecretModel;

      return await this.loadDecoderInputs({
        jwt: token.token,
        alg: algorithm,
        algType: SigningAlgCategoryValues.SYMMETRIC,
        symmetricSecretKey: token.secret,
        symmetricSecretKeyEncoding: token.secretEncoding,
      });
    }

    if (isDigitalSignatureAlg(algorithm)) {
      const token = defaultToken as DefaultTokenWithKeysModel;

      const stateUpdate = await this.loadDecoderInputs({
        jwt: token.token,
        alg: algorithm,
        algType: SigningAlgCategoryValues.ASYMMETRIC,
        asymmetricPublicKey: token.publicKey,
        asymmetricPublicKeyFormat: token.publicKeyFormat,
      });

      useDebuggerStore.getState().setStash$({
        asymmetricPrivateKey: token.privateKey,
        asymmetricPrivateKeyFormat: token.privateKeyFormat,
      });

      return stateUpdate;
    }

    return {};
  }

  async loadDecoderInputs(
    params: DecoderInputsModel,
  ): Promise<Partial<DecoderStoreState>> {
    const cleanJwtInput = extractJwt(params.jwt);

    const stateUpdate: Partial<DecoderStore> = {
      jwt: cleanJwtInput,
      decodingErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
      verificationInputErrors: null,
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

      const validateSymmetricSecretResult = await validateSymmetricSecret({
        symmetricSecretKey: params.symmetricSecretKey,
        symmetricSecretKeyEncoding: params.symmetricSecretKeyEncoding,
      });

      if (validateSymmetricSecretResult.isErr()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
        stateUpdate.signatureWarnings = [
          "Fix secret input errors to verify signature.",
        ];
        stateUpdate.verificationInputErrors = [
          validateSymmetricSecretResult.error.message,
        ];
      }
    }

    if (params.algType === SigningAlgCategoryValues.ASYMMETRIC) {
      stateUpdate.asymmetricPublicKey = params.asymmetricPublicKey;
      stateUpdate.asymmetricPublicKeyFormat = params.asymmetricPublicKeyFormat;
      stateUpdate.controlledAsymmetricPublicKey = {
        id: new Date().valueOf(),
        value: params.asymmetricPublicKey,
        format: params.asymmetricPublicKeyFormat,
      };

      const validateAsymmetricKeyResult = await validateAsymmetricKey({
        alg: params.alg,
        asymmetricPublicKey: params.asymmetricPublicKey,
        asymmetricPublicKeyFormat: params.asymmetricPublicKeyFormat,
      });

      if (validateAsymmetricKeyResult.isErr()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
        stateUpdate.signatureWarnings = [
          "Fix public key input errors to verify signature.",
        ];
        stateUpdate.verificationInputErrors = [
          validateAsymmetricKeyResult.error.message,
        ];
      }
    }

    const validateJwtFormatResult = validateJwtFormat(cleanJwtInput);

    if (validateJwtFormatResult.isErr()) {
      stateUpdate.decodingErrors = [validateJwtFormatResult.error.message];
      stateUpdate.decodedHeader = "";
      stateUpdate.decodedPayload = "";
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [StringValues.editor.signatureWarning];

      return stateUpdate;
    }

    const { type, decoded } = validateJwtFormatResult.value;

    stateUpdate.alg = decoded.header.alg;

    const getStringifiedHeaderAndPayloadResult = getStringifiedHeaderAndPayload(
      decoded.header,
      decoded.payload,
    );

    if (getStringifiedHeaderAndPayloadResult.isErr()) {
      stateUpdate.decodingErrors = [
        getStringifiedHeaderAndPayloadResult.error.message,
      ];
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [StringValues.editor.signatureWarning];

      return stateUpdate;
    }

    const { payload: decodedPayload, header: decodedHeader } =
      getStringifiedHeaderAndPayloadResult.value;

    stateUpdate.decodedHeader = decodedHeader;
    stateUpdate.decodedPayload = decodedPayload;

    if (type === JwtTypeValues.Unsecured) {
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [
        `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
      ];
      stateUpdate.verificationInputErrors = [
        "Can't verify signature for an Unsecured JWT.",
      ];

      return stateUpdate;
    }

    if (
      type === JwtTypeValues.MACed &&
      params.algType === SigningAlgCategoryValues.SYMMETRIC
    ) {
      const symmetricSecretKey = params.symmetricSecretKey;
      const symmetricSecretKeyEncoding = params.symmetricSecretKeyEncoding;

      const verificationResult = await verifyMACedJwt({
        jwt: cleanJwtInput,
        symmetricSecretKey: symmetricSecretKey,
        symmetricSecretKeyEncoding: symmetricSecretKeyEncoding,
      });

      if (verificationResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          verificationResult.error.message,
        ];
        stateUpdate.signatureStatus = JwtSignatureStatusValues.INVALID;
        stateUpdate.symmetricSecretKey = symmetricSecretKey;
        stateUpdate.symmetricSecretKeyEncoding = symmetricSecretKeyEncoding;
        stateUpdate.controlledSymmetricSecretKey = {
          id: new Date().valueOf(),
          value: symmetricSecretKey,
          encoding: symmetricSecretKeyEncoding,
        };

        return stateUpdate;
      }

      if (verificationResult.isOk()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.VALID;
        stateUpdate.symmetricSecretKey = symmetricSecretKey;
        stateUpdate.symmetricSecretKeyEncoding = symmetricSecretKeyEncoding;
        stateUpdate.controlledSymmetricSecretKey = {
          id: new Date().valueOf(),
          value: symmetricSecretKey,
          encoding: symmetricSecretKeyEncoding,
        };
      }

      return stateUpdate;
    }

    if (
      type === JwtTypeValues.DigitallySigned &&
      params.algType === SigningAlgCategoryValues.ASYMMETRIC
    ) {
      const asymmetricPublicKey = params.asymmetricPublicKey;
      const keyFormat = params.asymmetricPublicKeyFormat;

      const verificationResult = await verifyDigitallySignedJwt({
        jwt: cleanJwtInput,
        asymmetricPublicKey: asymmetricPublicKey,
        alg: params.alg,
        asymmetricPublicKeyFormat: keyFormat,
      });

      if (verificationResult.isErr()) {
        if (
          verificationResult.error.message ===
          operationExceptionDictionary.NotSupportedError
        ) {
          stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
          stateUpdate.verificationInputErrors = [
            verificationResult.error.message,
          ];
          stateUpdate.signatureWarnings = [
            `Unable to validate signature as signing algorithm is not supported.`,
          ];
          stateUpdate.asymmetricPublicKeyFormat = keyFormat;
          stateUpdate.controlledAsymmetricPublicKey = {
            id: new Date().valueOf(),
            value: asymmetricPublicKey,
            format: keyFormat,
          };

          return stateUpdate;
        }

        stateUpdate.signatureStatus = JwtSignatureStatusValues.INVALID;
        stateUpdate.verificationInputErrors = [
          verificationResult.error.message,
        ];
        stateUpdate.asymmetricPublicKey = asymmetricPublicKey;
        stateUpdate.asymmetricPublicKeyFormat = keyFormat;
        stateUpdate.controlledAsymmetricPublicKey = {
          id: new Date().valueOf(),
          value: asymmetricPublicKey,
          format: keyFormat,
        };

        return stateUpdate;
      }

      if (verificationResult.isOk()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.VALID;
        stateUpdate.asymmetricPublicKey = asymmetricPublicKey;
        stateUpdate.asymmetricPublicKeyFormat = keyFormat;
        stateUpdate.controlledAsymmetricPublicKey = {
          id: new Date().valueOf(),
          value: asymmetricPublicKey,
          format: keyFormat,
        };
      }

      return stateUpdate;
    }

    return stateUpdate;
  }

  async handleJwtChange({
    alg,
    symmetricSecretKey,
    symmetricSecretKeyEncoding,
    asymmetricPublicKey: initialAsymmetricPublicKey,
    asymmetricPublicKeyFormat: initialAsymmetricPublicKeyFormat,
    newToken,
  }: {
    alg: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
    asymmetricPublicKey: string;
    asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
    newToken: string;
  }): Promise<Partial<DecoderStoreState>> {
    const cleanJwtInput = extractJwt(newToken);

    const stateUpdate: Partial<DecoderStoreState> = {
      decodingErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
      verificationInputErrors: null,
      jwt: cleanJwtInput,
      decodedHeader: "",
      decodedPayload: "",
    };

    if (!cleanJwtInput) {
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [StringValues.editor.signatureWarning];
    }

    if (isHmacAlg(alg)) {
      const validateSymmetricSecretResult = await validateSymmetricSecret({
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
      });

      if (validateSymmetricSecretResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          validateSymmetricSecretResult.error.message,
        ];
      }
    }

    if (isDigitalSignatureAlg(alg)) {
      const validateAsymmetricKeyResult = await validateAsymmetricKey({
        alg,
        asymmetricPublicKey: initialAsymmetricPublicKey,
        asymmetricPublicKeyFormat: initialAsymmetricPublicKeyFormat,
      });

      if (validateAsymmetricKeyResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          validateAsymmetricKeyResult.error.message,
        ];
      }
    }

    const validateJwtFormatResult = validateJwtFormat(cleanJwtInput);

    if (validateJwtFormatResult.isErr()) {
      switch (validateJwtFormatResult.error.input) {
        case DebuggerInputValues.JWT: {
          if (validateJwtFormatResult.error.data?.header) {
            stateUpdate.alg = isSupportedAlg(
              validateJwtFormatResult.error.data.header.alg,
            )
              ? validateJwtFormatResult.error.data.header.alg
              : NOOP_ALG;

            const getStringifiedHeaderAndPayloadResult =
              getStringifiedHeaderAndPayload(
                validateJwtFormatResult.error.data.header,
                {},
              );

            if (getStringifiedHeaderAndPayloadResult.isOk()) {
              stateUpdate.decodedHeader =
                getStringifiedHeaderAndPayloadResult.value.header;
            }
          }

          if (validateJwtFormatResult.error.data?.payload) {
            const getStringifiedHeaderAndPayloadResult =
              getStringifiedHeaderAndPayload(
                {},
                validateJwtFormatResult.error.data.payload,
              );

            if (getStringifiedHeaderAndPayloadResult.isOk()) {
              stateUpdate.decodedPayload =
                getStringifiedHeaderAndPayloadResult.value.payload;
            }
          }

          stateUpdate.decodingErrors = [validateJwtFormatResult.error.message];
          stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
          stateUpdate.signatureWarnings = [
            StringValues.editor.signatureWarning,
          ];

          break;
        }
        default: {
          stateUpdate.decodingErrors = [validateJwtFormatResult.error.message];
          stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
          stateUpdate.signatureWarnings = [
            StringValues.editor.signatureWarning,
          ];
        }
      }

      return stateUpdate;
    }

    const { type, decoded } = validateJwtFormatResult.value;
    const getStringifiedHeaderAndPayloadResult = getStringifiedHeaderAndPayload(
      decoded.header,
      decoded.payload,
    );

    if (getStringifiedHeaderAndPayloadResult.isErr()) {
      stateUpdate.decodingErrors = [
        getStringifiedHeaderAndPayloadResult.error.message,
      ];
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [StringValues.editor.signatureWarning];

      return stateUpdate;
    }

    const { payload: decodedPayload, header: decodedHeader } =
      getStringifiedHeaderAndPayloadResult.value;

    stateUpdate.decodedHeader = decodedHeader;
    stateUpdate.decodedPayload = decodedPayload;

    stateUpdate.alg = decoded.header.alg;

    if (type === JwtTypeValues.Unsecured) {
      stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
      stateUpdate.signatureWarnings = [
        `This is an Unsecured JWT as defined by [Section 6 of RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-6).`,
      ];
      stateUpdate.verificationInputErrors = [
        "Can't verify signature for an Unsecured JWT.",
      ];

      return stateUpdate;
    }

    let asymmetricPublicKey = initialAsymmetricPublicKey;
    let asymmetricPublicKeyFormat = initialAsymmetricPublicKeyFormat;

    if (symmetricSecretKey && type === JwtTypeValues.MACed) {
      const verificationResult = await verifyMACedJwt({
        jwt: cleanJwtInput,
        symmetricSecretKey: symmetricSecretKey,
        symmetricSecretKeyEncoding: symmetricSecretKeyEncoding,
      });

      if (verificationResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          verificationResult.error.message,
        ];
        stateUpdate.signatureStatus = JwtSignatureStatusValues.INVALID;

        return stateUpdate;
      }

      if (verificationResult.isOk()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.VALID;
        stateUpdate.symmetricSecretKey = symmetricSecretKey;
        stateUpdate.symmetricSecretKeyEncoding = symmetricSecretKeyEncoding;
        stateUpdate.controlledSymmetricSecretKey = {
          id: new Date().valueOf(),
          value: symmetricSecretKey,
          encoding: symmetricSecretKeyEncoding,
        };
      }

      return stateUpdate;
    }

    if (type === JwtTypeValues.DigitallySigned) {
      const downloadPublicKeyResult = await downloadPublicKeyIfPossible({
        header: decoded.header,
        payload: decoded.payload,
        errors: false,
        warnings: [],
      });

      if (downloadPublicKeyResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          downloadPublicKeyResult.error.message,
        ];
        stateUpdate.signatureWarnings = [
          `Fix public key input errors to verify signature.`,
        ];
        stateUpdate.signatureStatus = JwtSignatureStatusValues.WARNING;
        stateUpdate.asymmetricPublicKey = "";
        stateUpdate.controlledAsymmetricPublicKey = {
          id: new Date().valueOf(),
          value: "",
          format: asymmetricPublicKeyFormat,
        };

        return stateUpdate;
      }

      if (downloadPublicKeyResult.isOk()) {
        asymmetricPublicKey = downloadPublicKeyResult.value;

        const parseResult = parseStringIntoValidJsonObject(asymmetricPublicKey);

        if (parseResult.isOk()) {
          asymmetricPublicKeyFormat = AsymmetricKeyFormatValues.JWK;
        }

        if (parseResult.isErr()) {
          asymmetricPublicKeyFormat = AsymmetricKeyFormatValues.PEM;
        }

        if (asymmetricPublicKeyFormat) {
          stateUpdate.asymmetricPublicKeyFormat = asymmetricPublicKeyFormat;
          stateUpdate.controlledAsymmetricPublicKey = {
            id: new Date().valueOf(),
            value: asymmetricPublicKey,
            format: asymmetricPublicKeyFormat,
          };
        }
      }

      const verificationResult = await verifyDigitallySignedJwt({
        jwt: cleanJwtInput,
        asymmetricPublicKey: asymmetricPublicKey,
        alg: decoded.header.alg,
        asymmetricPublicKeyFormat:
          asymmetricPublicKeyFormat || AsymmetricKeyFormatValues.PEM,
      });

      if (verificationResult.isErr()) {
        stateUpdate.verificationInputErrors = [
          verificationResult.error.message,
        ];
        stateUpdate.signatureStatus = JwtSignatureStatusValues.INVALID;

        return stateUpdate;
      }

      if (verificationResult.isOk()) {
        stateUpdate.signatureStatus = JwtSignatureStatusValues.VALID;
        stateUpdate.asymmetricPublicKey = asymmetricPublicKey;
        stateUpdate.asymmetricPublicKeyFormat = asymmetricPublicKeyFormat;
        stateUpdate.controlledAsymmetricPublicKey = {
          id: new Date().valueOf(),
          value: asymmetricPublicKey,
          format: asymmetricPublicKeyFormat,
        };

        return stateUpdate;
      }
    }

    return stateUpdate;
  }

  async handleSymmetricSecretKeyHelper(params: {
    jwt: string;
    symmetricSecretKeyEncoding: EncodingValues;
    symmetricSecretKey: string;
  }): Promise<
    Result<
      HandleSymmetricSecretKeyHelperOk,
      HandleSymmetricSecretKeyHelperError
    >
  > {
    const { jwt, symmetricSecretKey, symmetricSecretKeyEncoding } = params;

    if (!jwt) {
      const validateSymmetricSecretResult = await validateSymmetricSecret({
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
      });

      if (validateSymmetricSecretResult.isErr()) {
        const error: HandleSymmetricSecretKeyHelperError = {
          signatureStatus: JwtSignatureStatusValues.WARNING,
          signatureWarnings: ["Fix secret input errors to verify signature."],
          verificationInputErrors: [
            validateSymmetricSecretResult.error.message,
          ],
        };

        return err(error);
      }

      const error: HandleSymmetricSecretKeyHelperError = {
        signatureStatus: JwtSignatureStatusValues.WARNING,
        signatureWarnings: [StringValues.editor.signatureWarning],
        verificationInputErrors: null,
      };

      return err(error);
    }

    const verificationResult = await verifyMACedJwt({
      jwt: jwt,
      symmetricSecretKey: symmetricSecretKey,
      symmetricSecretKeyEncoding: symmetricSecretKeyEncoding,
    });

    if (verificationResult.isErr()) {
      const error: HandleSymmetricSecretKeyHelperError = {
        signatureStatus: JwtSignatureStatusValues.INVALID,
        verificationInputErrors: [verificationResult.error.message],
        signatureWarnings: null,
      };

      return err(error);
    }

    return ok({
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
  }

  async handleSymmetricSecretKeyChange({
    jwt,
    symmetricSecretKeyEncoding,
    symmetricSecretKey,
  }: {
    jwt: string;
    symmetricSecretKeyEncoding: EncodingValues;
    symmetricSecretKey: string;
  }): Promise<Partial<DecoderStoreState>> {
    const stateUpdate: Partial<DecoderStoreState> = {
      symmetricSecretKey: symmetricSecretKey,
      verificationInputErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
    };

    const handleSymmetricSecretChangeHelperResult =
      await this.handleSymmetricSecretKeyHelper({
        jwt,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
      });

    if (handleSymmetricSecretChangeHelperResult.isErr()) {
      const { verificationInputErrors, signatureStatus, signatureWarnings } =
        handleSymmetricSecretChangeHelperResult.error;

      return {
        ...stateUpdate,
        verificationInputErrors,
        signatureStatus,
        signatureWarnings,
      };
    }

    return {
      ...stateUpdate,
      signatureStatus:
        handleSymmetricSecretChangeHelperResult.value.signatureStatus,
    };
  }

  async handleSymmetricSecretKeyEncodingChange({
    jwt,
    symmetricSecretKey,
    symmetricSecretKeyEncoding,
  }: {
    jwt: string;
    symmetricSecretKey: string;
    symmetricSecretKeyEncoding: EncodingValues;
  }): Promise<Partial<DecoderStoreState>> {
    const stateUpdate: Partial<DecoderStoreState> = {
      symmetricSecretKeyEncoding: symmetricSecretKeyEncoding,
      verificationInputErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
    };

    const handleSymmetricSecretChangeHelperResult =
      await this.handleSymmetricSecretKeyHelper({
        jwt,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
      });

    if (handleSymmetricSecretChangeHelperResult.isErr()) {
      const { verificationInputErrors, signatureStatus, signatureWarnings } =
        handleSymmetricSecretChangeHelperResult.error;

      return {
        ...stateUpdate,
        verificationInputErrors,
        signatureStatus,
        signatureWarnings,
      };
    }

    return {
      ...stateUpdate,
      signatureStatus:
        handleSymmetricSecretChangeHelperResult.value.signatureStatus,
    };
  }
  async handleAsymmetricPublicKeyHelper({
    jwt,
    alg,
    asymmetricPublicKeyFormat,
    asymmetricPublicKey,
  }: {
    jwt: string;
    alg: string;
    asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
    asymmetricPublicKey: string;
  }): Promise<
    Result<
      HandleAsymmetricPublicKeyHelperOk,
      HandleAsymmetricPublicKeyHelperError
    >
  > {
    if (!jwt) {
      const validateAsymmetricKeyResult = await validateAsymmetricKey({
        alg,
        asymmetricPublicKey,
        asymmetricPublicKeyFormat,
      });

      if (validateAsymmetricKeyResult.isErr()) {
        const error: HandleAsymmetricPublicKeyHelperError = {
          signatureStatus: JwtSignatureStatusValues.WARNING,
          signatureWarnings: [
            "Fix public key input errors to verify signature.",
          ],
          verificationInputErrors: [validateAsymmetricKeyResult.error.message],
        };

        return err(error);
      }

      const error: HandleSymmetricSecretKeyHelperError = {
        signatureStatus: JwtSignatureStatusValues.WARNING,
        signatureWarnings: [StringValues.editor.signatureWarning],
        verificationInputErrors: null,
      };

      return err(error);
    }

    const verificationResult = await verifyDigitallySignedJwt({
      jwt: jwt,
      asymmetricPublicKey: asymmetricPublicKey,
      alg: alg,
      asymmetricPublicKeyFormat: asymmetricPublicKeyFormat,
    });

    if (verificationResult.isErr()) {
      if (
        verificationResult.error.message ===
        operationExceptionDictionary.NotSupportedError
      ) {
        const error: HandleAsymmetricPublicKeyHelperError = {
          signatureStatus: JwtSignatureStatusValues.WARNING,
          verificationInputErrors: [verificationResult.error.message],
          signatureWarnings: [
            `Unable to validate signature as signing algorithm is not supported.`,
          ],
        };

        return err(error);
      }

      const error: HandleAsymmetricPublicKeyHelperError = {
        signatureStatus: JwtSignatureStatusValues.INVALID,
        verificationInputErrors: [verificationResult.error.message],
        signatureWarnings: null,
      };

      return err(error);
    }

    return ok({
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
  }

  async handleAsymmetricPublicKeyChange({
    jwt,
    alg,
    asymmetricPublicKeyFormat,
    asymmetricPublicKey,
  }: {
    jwt: string;
    alg: string;
    asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
    asymmetricPublicKey: string;
  }): Promise<Partial<DecoderStoreState>> {
    const stateUpdate: Partial<DecoderStoreState> = {
      asymmetricPublicKey: asymmetricPublicKey,
      verificationInputErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
    };

    const handleAsymmetricPublicKeyHelperResult =
      await this.handleAsymmetricPublicKeyHelper({
        jwt: jwt,
        alg: alg,
        asymmetricPublicKey: asymmetricPublicKey,
        asymmetricPublicKeyFormat: asymmetricPublicKeyFormat,
      });

    if (handleAsymmetricPublicKeyHelperResult.isErr()) {
      const { verificationInputErrors, signatureStatus, signatureWarnings } =
        handleAsymmetricPublicKeyHelperResult.error;

      return {
        ...stateUpdate,
        verificationInputErrors,
        signatureStatus,
        signatureWarnings,
      };
    }

    return {
      ...stateUpdate,
      signatureStatus:
        handleAsymmetricPublicKeyHelperResult.value.signatureStatus,
    };
  }

  async handleAsymmetricPublicKeyFormatChange({
    jwt,
    alg,
    asymmetricPublicKey,
    asymmetricPublicKeyFormat,
  }: {
    jwt: string;
    alg: string;
    asymmetricPublicKey: string;
    asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
  }): Promise<Partial<DecoderStoreState>> {
    const stateUpdate: Partial<DecoderStoreState> = {
      asymmetricPublicKeyFormat: asymmetricPublicKeyFormat,
      verificationInputErrors: null,
      signatureStatus: JwtSignatureStatusValues.UNKNOWN,
      signatureWarnings: null,
    };

    const handleAsymmetricPublicKeyHelperResult =
      await this.handleAsymmetricPublicKeyHelper({
        jwt: jwt,
        alg: alg,
        asymmetricPublicKey: asymmetricPublicKey,
        asymmetricPublicKeyFormat: asymmetricPublicKeyFormat,
      });

    if (handleAsymmetricPublicKeyHelperResult.isErr()) {
      const { verificationInputErrors, signatureStatus, signatureWarnings } =
        handleAsymmetricPublicKeyHelperResult.error;

      return {
        ...stateUpdate,
        verificationInputErrors,
        signatureStatus,
        signatureWarnings,
      };
    }

    return {
      ...stateUpdate,
      signatureStatus:
        handleAsymmetricPublicKeyHelperResult.value.signatureStatus,
    };
  }
}

export const TokenDecoderService = new _TokenDecoderService();
