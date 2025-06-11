import { create } from "zustand";
import { EncodingValues } from "@/features/common/values/encoding.values";
import {
  DefaultTokensValues,
  DefaultTokenWithSecretModel,
} from "@/features/common/values/default-tokens.values";
import { TokenDecoderService } from "@/features/decoder/services/token-decoder.service";
import { subscribeWithSelector } from "zustand/middleware";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import { DecoderInputsModel } from "@/features/debugger/models/decoder-inputs.model";

export enum HashWarningVisibilityValues {
  VISIBLE = "VISIBLE",
  HIDDEN = "HIDDEN",
}

export const DEFAULT_ALG_TYPE = "HS";
export const DEFAULT_ALG_SIZE = 256;
export const DEFAULT_ALG = `${DEFAULT_ALG_TYPE}${DEFAULT_ALG_SIZE}`;

export const DEFAULT_JWT = DefaultTokensValues[
  DEFAULT_ALG
] as DefaultTokenWithSecretModel;

export const DEFAULT_HEADER = {
  alg: "HS256",
  typ: "JWT",
};

export const DEFAULT_DECODED_HEADER = JSON.stringify(DEFAULT_HEADER, null, 2);

export const DEFAULT_PAYLOAD = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

export const DEFAULT_DECODED_PAYLOAD = JSON.stringify(DEFAULT_PAYLOAD, null, 2);

export type DecoderStoreState = {
  jwt: string;
  alg: string;
  symmetricSecretKey: string;
  symmetricSecretKeyEncoding: EncodingValues;
  asymmetricPublicKey: string;
  asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
  decodedHeader: string;
  decodedPayload: string;
  signatureStatus: JwtSignatureStatusValues;
  controlledSymmetricSecretKey: {
    id: number;
    value: string;
    encoding: EncodingValues;
  } | null;
  controlledAsymmetricPublicKey: {
    id: number;
    value: string;
    format: AsymmetricKeyFormatValues;
  } | null;
  decodingErrors: string[] | null;
  signatureWarnings: string[] | null;
  verificationInputErrors: string[] | null;
  useHashWarningVisibility: HashWarningVisibilityValues;
};

type DecoderStoreActions = {
  selectDecodingExample: (algorithm: string) => void;
  handleJwtChange: (newToken: string) => void;
  handleSymmetricSecretKeyChange: (newSymmetricSecretKey: string) => void;
  handleSymmetricSecretKeyEncodingChange: (
    newSymmetricSecretKey: EncodingValues,
  ) => void;
  handleAsymmetricPublicKeyChange: (newAsymmetricPublicKey: string) => void;
  handleAsymmetricPublicKeyFormatChange: (
    newFormat: AsymmetricKeyFormatValues,
  ) => void;
  resetControlledSymmetricSecretKey: () => void;
  resetControlledAsymmetricPublicKey: () => void;
  showUseHashWarning: () => void;
  hideUseHashWarning: () => void;
  loadDecoderInputs: (params: DecoderInputsModel) => void;
};

export const initialState: DecoderStoreState = {
  jwt: DEFAULT_JWT.token,
  alg: DEFAULT_ALG,
  symmetricSecretKey: DEFAULT_JWT.secret,
  symmetricSecretKeyEncoding: EncodingValues.UTF8,
  asymmetricPublicKey: "",
  asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
  decodedHeader: DEFAULT_DECODED_HEADER,
  decodedPayload: DEFAULT_DECODED_PAYLOAD,
  signatureStatus: JwtSignatureStatusValues.VALID,
  signatureWarnings: null,
  decodingErrors: null,
  controlledSymmetricSecretKey: null,
  controlledAsymmetricPublicKey: null,
  verificationInputErrors: null,
  useHashWarningVisibility: HashWarningVisibilityValues.HIDDEN,
};

export type DecoderStore = DecoderStoreState & DecoderStoreActions;

export const useDecoderStore = create<DecoderStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    selectDecodingExample: async (algorithm) => {
      const update = await TokenDecoderService.selectDecodingExample(algorithm);

      set(update);
    },
    handleJwtChange: async (newToken) => {
      const {
        alg,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPublicKey,
        asymmetricPublicKeyFormat,
      } = get();

      const update = await TokenDecoderService.handleJwtChange({
        alg,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPublicKey,
        asymmetricPublicKeyFormat,
        newToken,
      });

      set(update);
    },
    handleSymmetricSecretKeyChange: async (newSymmetricSecretKey) => {
      const { jwt, symmetricSecretKeyEncoding } = get();
      const update = await TokenDecoderService.handleSymmetricSecretKeyChange({
        jwt,
        symmetricSecretKeyEncoding,
        symmetricSecretKey: newSymmetricSecretKey,
      });

      set(update);
    },
    handleSymmetricSecretKeyEncodingChange: async (newEncoding) => {
      const update =
        await TokenDecoderService.handleSymmetricSecretKeyEncodingChange({
          jwt: get().jwt,
          symmetricSecretKey: get().symmetricSecretKey,
          symmetricSecretKeyEncoding: newEncoding,
        });

      set(update);
    },

    handleAsymmetricPublicKeyChange: async (newAsymmetricPublicKey) => {
      const { jwt, alg, asymmetricPublicKeyFormat } = get();

      const update = await TokenDecoderService.handleAsymmetricPublicKeyChange({
        jwt,
        alg,
        asymmetricPublicKeyFormat,
        asymmetricPublicKey: newAsymmetricPublicKey,
      });

      set(update);
    },
    handleAsymmetricPublicKeyFormatChange: async (newFormat) => {
      const { jwt, alg, asymmetricPublicKey } = get();

      const update =
        await TokenDecoderService.handleAsymmetricPublicKeyFormatChange({
          jwt,
          alg,
          asymmetricPublicKey,
          asymmetricPublicKeyFormat: newFormat,
        });

      set(update);
    },
    resetControlledSymmetricSecretKey: () =>
      set((state) => ({
        controlledSymmetricSecretKey: {
          id: new Date().valueOf(),
          value: "",
          encoding: state.symmetricSecretKeyEncoding,
        },
      })),
    resetControlledAsymmetricPublicKey: () =>
      set((state) => ({
        controlledAsymmetricPublicKey: {
          id: new Date().valueOf(),
          value: "",
          format: state.asymmetricPublicKeyFormat,
        },
      })),
    showUseHashWarning: () => {
      set({
        useHashWarningVisibility: HashWarningVisibilityValues.VISIBLE,
      });
    },
    hideUseHashWarning: () => {
      set({
        useHashWarningVisibility: HashWarningVisibilityValues.HIDDEN,
      });
    },
    loadDecoderInputs: async (params) => {
      const update = await TokenDecoderService.loadDecoderInputs(params);

      set(update);
    },
  })),
);
