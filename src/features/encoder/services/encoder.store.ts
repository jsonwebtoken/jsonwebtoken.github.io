import { create } from "zustand";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { TokenEncoderService } from "@/features/encoder/services/token-encoder.service";
import { subscribeWithSelector } from "zustand/middleware";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import {
  algoTypeLabels,
  DEFAULT_ALG,
  DEFAULT_HEADER,
  DEFAULT_JWT,
  DEFAULT_PAYLOAD,
  DEFAULT_SYMMETRIC_SECRET,
} from "@/features/encoder/services/encoder.config";
import { EncoderInputsModel } from "@/features/debugger/models/encoder-inputs.model";

export type EncoderStoreState = {
  jwt: string | null;
  alg: string;
  exampleAlg: string;
  signatureAlgLabel: string;
  symmetricSecretKey: string;
  symmetricSecretKeyEncoding: EncodingValues;
  asymmetricPrivateKey: string;
  asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
  header: string;
  payload: string;
  controlledHeader: {
    id: number;
    value: string;
  };
  controlledPayload: {
    id: number;
    value: string;
  };
  controlledSymmetricSecretKey: {
    id: number;
    value: string;
    encoding: EncodingValues;
  } | null;
  controlledAsymmetricPrivateKey: {
    id: number;
    value: string;
    format: AsymmetricKeyFormatValues;
  } | null;
  headerErrors: string[] | null;
  headerWarnings: string[] | null;
  payloadErrors: string[] | null;
  signingErrors: string[] | null;
  encodingWarnings: string[] | null;
  encodingErrors: string[] | null;
};

type EncoderStoreActions = {
  selectEncodingExample: (algorithm: string) => void;
  resetSymmetricSecretKeyError: () => void;
  resetAsymmetricPrivateKeyError: () => void;
  handleHeaderChange: (newHeader: string) => void;
  handlePayloadChange: (newPayload: string) => void;
  handleSymmetricSecretKeyChange: (newSecret: string) => void;
  handleSymmetricSecretKeyEncodingChange: (newEncoding: EncodingValues) => void;
  handleAsymmetricPrivateKeyChange: (newPrivateKey: string) => void;
  handleAsymmetricPrivateKeyFormatChange: (
    newFormat: AsymmetricKeyFormatValues,
  ) => void;
  resetControlledHeader: () => void;
  setControlledPayload: (value: string) => void;
  setControlledHeader: (value: string) => void;
  resetControlledPayload: () => void;
  resetControlledSymmetricSecretKey: () => void;
  resetControlledAsymmetricPrivateKey: () => void;
  loadEncoderInputs: (params: EncoderInputsModel) => void;
};

export const initialState: EncoderStoreState = {
  jwt: DEFAULT_JWT.token,
  alg: DEFAULT_ALG,
  exampleAlg: DEFAULT_ALG,
  signatureAlgLabel: `${algoTypeLabels["HS"]}256}`,

  header: DEFAULT_HEADER,
  controlledHeader: { id: new Date().valueOf(), value: DEFAULT_HEADER },
  headerErrors: null,

  payload: DEFAULT_PAYLOAD,
  controlledPayload: { id: new Date().valueOf(), value: DEFAULT_PAYLOAD },
  payloadErrors: null,

  symmetricSecretKey: DEFAULT_SYMMETRIC_SECRET,
  controlledSymmetricSecretKey: {
    id: new Date().valueOf(),
    value: DEFAULT_SYMMETRIC_SECRET,
    encoding: EncodingValues.UTF8,
  },
  symmetricSecretKeyEncoding: EncodingValues.UTF8,

  asymmetricPrivateKey: "",
  controlledAsymmetricPrivateKey: {
    id: new Date().valueOf(),
    value: "",
    format: AsymmetricKeyFormatValues.PEM,
  },
  asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,

  signingErrors: null,
  headerWarnings: null,

  encodingErrors: null,
  encodingWarnings: null,
};

export type EncoderStore = EncoderStoreState & EncoderStoreActions;

export const useEncoderStore = create<EncoderStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    selectEncodingExample: async (algorithm) => {
      const update = await TokenEncoderService.selectEncodingExample(algorithm);

      set(update);
    },
    resetSymmetricSecretKeyError: () =>
      set(() => ({
        symmetricSecretKeyErrors: null,
        signingErrors: null,
      })),
    resetAsymmetricPrivateKeyError: () =>
      set(() => ({
        asymmetricPrivateKeyErrors: null,
        symmetricSecretKeyErrors: null,
        signingErrors: null,
      })),
    handleHeaderChange: async (newHeader) => {
      const {
        payload,
        alg,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPrivateKey,
        asymmetricPrivateKeyFormat,
      } = get();

      const update = await TokenEncoderService.handleHeaderChange({
        header: newHeader,
        payload,
        alg,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPrivateKey,
        asymmetricPrivateKeyFormat,
      });

      set(update);
    },
    handlePayloadChange: async (newPayload) => {
      const {
        header,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPrivateKey,
        asymmetricPrivateKeyFormat,
      } = get();

      const update = await TokenEncoderService.handlePayloadChange({
        header,
        payload: newPayload,
        symmetricSecretKey,
        symmetricSecretKeyEncoding,
        asymmetricPrivateKey,
        asymmetricPrivateKeyFormat,
      });

      set(update);
    },
    handleSymmetricSecretKeyChange: async (newSecret) => {
      const { header, payload, symmetricSecretKeyEncoding } = get();

      const update = await TokenEncoderService.handleSymmetricSecretKeyChange({
        symmetricSecretKey: newSecret,
        header,
        payload,
        symmetricSecretKeyEncoding,
      });

      set(update);
    },
    handleSymmetricSecretKeyEncodingChange: async (newEncoding) => {
      const { header, payload, symmetricSecretKey } = get();

      const update =
        await TokenEncoderService.handleSymmetricSecretKeyEncodingChange({
          header,
          payload,
          symmetricSecretKey,
          symmetricSecretKeyEncoding: newEncoding,
        });

      set(update);
    },
    handleAsymmetricPrivateKeyChange: async (newPrivateKey) => {
      const { header, payload, asymmetricPrivateKeyFormat } = get();

      const update = await TokenEncoderService.handleAsymmetricPrivateKeyChange(
        {
          header,
          payload,
          asymmetricPrivateKey: newPrivateKey,
          asymmetricPrivateKeyFormat,
        },
      );

      set(update);
    },
    handleAsymmetricPrivateKeyFormatChange: async (newFormat) => {
      const { header, payload, asymmetricPrivateKey } = get();

      const update =
        await TokenEncoderService.handleAsymmetricPrivateKeyFormatChange({
          header,
          payload,
          asymmetricPrivateKey,
          asymmetricPrivateKeyFormat: newFormat,
        });

      set(update);
    },
    setControlledHeader: (value) =>
      set(() => ({
        controlledHeader: { id: new Date().valueOf(), value: value },
      })),
    resetControlledHeader: () =>
      set(() => ({
        controlledHeader: {
          id: new Date().valueOf(),
          value: "",
        },
      })),
    setControlledPayload: (value) =>
      set(() => ({
        controlledPayload: { id: new Date().valueOf(), value: value },
      })),
    resetControlledPayload: () =>
      set(() => ({
        controlledPayload: { id: new Date().valueOf(), value: "" },
      })),
    resetControlledSymmetricSecretKey: () => {
      const { symmetricSecretKeyEncoding } = get();

      set({
        controlledSymmetricSecretKey: {
          id: new Date().valueOf(),
          value: "",
          encoding: symmetricSecretKeyEncoding,
        },
      });
    },
    resetControlledAsymmetricPrivateKey: () => {
      const { asymmetricPrivateKeyFormat } = get();

      set({
        controlledAsymmetricPrivateKey: {
          id: new Date().valueOf(),
          value: "",
          format: asymmetricPrivateKeyFormat,
        },
      });
    },
    loadEncoderInputs: async (params) => {
      const update = await TokenEncoderService.loadEncoderInput(params);

      set(update);
    },
  })),
);
