import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { DebuggerModeValues } from "@/features/common/values/debugger-mode.values";
import { DebuggerWidgetValues } from "@/features/common/values/debugger-widget.values";
import { useDecoderStore } from "@/features/decoder/services/decoder.store";
import {
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { ClaimDescriptionVisibilityValues } from "@/features/common/values/claim-description-visibility.values";
import { DecoderInputsModel } from "@/features/debugger/models/decoder-inputs.model";
import { EncoderInputsModel } from "@/features/debugger/models/encoder-inputs.model";
import { NOOP_ALG } from "@/features/common/values/constants";

export enum DebuggerOutputModalValues {
  OPEN = "open",
  CLOSED = "closed",
}

type DebuggerStash = {
  symmetricSecretKey: string;
  symmetricSecretKeyEncoding: EncodingValues;
  asymmetricPublicKey: string;
  asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
  asymmetricPrivateKey: string;
  asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
};

export type DebuggerStoreState = {
  decoderInputs$: Partial<DecoderInputsModel>;
  encoderInputs$: Partial<EncoderInputsModel>;
  mode$: DebuggerModeValues | null;
  activeWidget$: DebuggerWidgetValues;
  stash$: Partial<DebuggerStash>;

  decodedHeaderTabId$: string | null;
  decodedPayloadTabId$: string | null;
  decodedHeaderDescriptionVisibility$: ClaimDescriptionVisibilityValues | null;
  decodedPayloadDescriptionVisibility$: ClaimDescriptionVisibilityValues | null;

  outputModalState$: DebuggerOutputModalValues;
  outputModalId$: string | null;
};

type DebuggerStoreActions = {
  setDecoderInputs$: (params: Partial<DecoderInputsModel>) => void;
  setEncoderInputs$: (params: Partial<EncoderInputsModel>) => void;
  setStash$: (params: Partial<DebuggerStash>) => void;
  setMode$: (mode: DebuggerModeValues, widget: DebuggerWidgetValues) => void;
  setActiveWidget$: (widget: DebuggerWidgetValues) => void;
  setDecodedHeaderTabId$: (key: string) => void;
  setDecodedPayloadTabId$: (key: string) => void;
  setDecodedHeaderDescriptionVisibility$: (
    value: ClaimDescriptionVisibilityValues,
  ) => void;
  setDecodedPayloadDescriptionVisibility$: (
    value: ClaimDescriptionVisibilityValues,
  ) => void;
  openOutputModal$: (id: string) => void;
  closeOutputModal$: () => void;
};

export const initialState: DebuggerStoreState = {
  mode$: null,
  activeWidget$: DebuggerWidgetValues.DECODER,
  decoderInputs$: {},
  encoderInputs$: {},
  stash$: {},
  decodedHeaderTabId$: null,
  decodedPayloadTabId$: null,
  decodedHeaderDescriptionVisibility$: null,
  decodedPayloadDescriptionVisibility$: null,
  outputModalState$: DebuggerOutputModalValues.CLOSED,
  outputModalId$: null,
};

export type DebuggerStore = DebuggerStoreState & DebuggerStoreActions;

export const useDebuggerStore = create<DebuggerStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    setDecoderInputs$: (params) =>
      set(({ decoderInputs$ }) => ({
        decoderInputs$: {
          ...decoderInputs$,
          ...params,
        },
      })),
    setEncoderInputs$: (params) =>
      set(({ encoderInputs$ }) => ({
        encoderInputs$: {
          ...encoderInputs$,
          ...params,
        },
      })),
    setStash$: (params) =>
      set(({ stash$ }) => ({
        stash$: {
          ...stash$,
          ...params,
        },
      })),
    setMode$: (mode, widget) =>
      set((state) => {
        if (
          mode === DebuggerModeValues.UNIFIED &&
          widget === DebuggerWidgetValues.DECODER
        ) {
          const decoderState = useDecoderStore.getState();

          if (isNoneAlg(decoderState.alg)) {
            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
            };

            const encoderUpdate: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
            };

            const encoderInputsUpdate: Partial<EncoderInputsModel> =
              encoderUpdate;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputsUpdate,
              },
            };
          }

          if (isHmacAlg(decoderState.alg)) {
            const debuggerStash = structuredClone(state.stash$);

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            const encoderUpdate: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            const encoderInputsUpdate: Partial<EncoderInputsModel> =
              encoderUpdate;

            debuggerStash.symmetricSecretKey = decoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              decoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputsUpdate,
              },
              debuggerStash: {
                ...debuggerStash,
              },
            };
          }

          if (isDigitalSignatureAlg(decoderState.alg)) {
            const debuggerStash = structuredClone(state.stash$);

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
              asymmetricPublicKey: decoderState.asymmetricPublicKey,
              asymmetricPublicKeyFormat: decoderState.asymmetricPublicKeyFormat,
            };

            const encoderUpdate: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              asymmetricPrivateKey: debuggerStash.asymmetricPrivateKey || "",
              asymmetricPrivateKeyFormat:
                debuggerStash.asymmetricPrivateKeyFormat ||
                AsymmetricKeyFormatValues.PEM,
            };

            const encoderInputsUpdate: Partial<EncoderInputsModel> =
              encoderUpdate;

            // debuggerStash.asymmetricPrivateKey =
            //   encoderState.asymmetricPrivateKey;
            // debuggerStash.asymmetricPrivateKeyFormat =
            //   encoderState.asymmetricPrivateKeyFormat;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputsUpdate,
              },
              debuggerStash: {
                ...debuggerStash,
              },
            };
          }
        }

        if (
          mode === DebuggerModeValues.UNIFIED &&
          widget === DebuggerWidgetValues.ENCODER
        ) {
          const encoderState = useEncoderStore.getState();

          if (isNoneAlg(encoderState.alg) && encoderState.jwt) {
            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
            };

            const decoderUpdate: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
            };

            const decoderInputsUpdate: Partial<EncoderInputsModel> =
              decoderUpdate;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputsUpdate,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
            };
          }

          if (isHmacAlg(encoderState.alg) && encoderState.jwt) {
            const debuggerStash = structuredClone(state.stash$);

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            const decoderUpdate: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            const decoderInputsUpdate: Partial<EncoderInputsModel> =
              decoderUpdate;

            debuggerStash.symmetricSecretKey = encoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              encoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputsUpdate,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              stash$: {
                ...debuggerStash,
              },
            };
          }

          if (isDigitalSignatureAlg(encoderState.alg) && encoderState.jwt) {
            const debuggerStash = structuredClone(state.stash$);

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
              asymmetricPrivateKey: encoderState.asymmetricPrivateKey,
              asymmetricPrivateKeyFormat:
                encoderState.asymmetricPrivateKeyFormat,
            };

            const decoderUpdate: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
              asymmetricPublicKey: debuggerStash.asymmetricPublicKey || "",
              asymmetricPublicKeyFormat:
                debuggerStash.asymmetricPublicKeyFormat ||
                AsymmetricKeyFormatValues.PEM,
            };

            const decoderInputsUpdate: Partial<EncoderInputsModel> =
              decoderUpdate;

            // debuggerStash.symmetricSecretKey = encoderState.symmetricSecretKey;
            // debuggerStash.symmetricSecretKeyEncoding =
            //   encoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputsUpdate,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              stash$: {
                ...debuggerStash,
              },
            };
          }
        }

        if (
          mode === DebuggerModeValues.SPLIT &&
          widget === DebuggerWidgetValues.DECODER
        ) {
          const decoderState = useDecoderStore.getState();

          if (isNoneAlg(decoderState.alg)) {
            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
            };

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
            };

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
            };
          }

          if (isHmacAlg(decoderState.alg)) {
            const debuggerStash = structuredClone(state.stash$);

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            debuggerStash.symmetricSecretKey = decoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              decoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              debuggerStash: {
                ...debuggerStash,
              },
            };
          }

          if (isDigitalSignatureAlg(decoderState.alg)) {
            const debuggerStash = structuredClone(state.stash$);

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              jwt: decoderState.jwt,
              asymmetricPublicKey: decoderState.asymmetricPublicKey,
              asymmetricPublicKeyFormat: decoderState.asymmetricPublicKeyFormat,
            };

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              asymmetricPrivateKey: debuggerStash.asymmetricPrivateKey || "",
              asymmetricPrivateKeyFormat:
                debuggerStash.asymmetricPrivateKeyFormat ||
                AsymmetricKeyFormatValues.PEM,
            };

            // debuggerStash.asymmetricPrivateKey =
            //   encoderState.asymmetricPrivateKey;
            // debuggerStash.asymmetricPrivateKeyFormat =
            //   encoderState.asymmetricPrivateKeyFormat;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              debuggerStash: {
                ...debuggerStash,
              },
            };
          }
        }

        if (
          mode === DebuggerModeValues.SPLIT &&
          widget === DebuggerWidgetValues.ENCODER
        ) {
          const encoderState = useEncoderStore.getState();

          if (isNoneAlg(encoderState.alg) && encoderState.jwt) {
            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
            };

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
            };

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
            };
          }

          if (isHmacAlg(encoderState.alg) && encoderState.jwt) {
            const debuggerStash = structuredClone(state.stash$);

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            debuggerStash.symmetricSecretKey = encoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              encoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              stash$: {
                ...debuggerStash,
              },
            };
          }

          if (isDigitalSignatureAlg(encoderState.alg) && encoderState.jwt) {
            const debuggerStash = structuredClone(state.stash$);

            const encoderInputSnapshot: EncoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              header: encoderState.header,
              payload: encoderState.payload,
              asymmetricPrivateKey: encoderState.asymmetricPrivateKey,
              asymmetricPrivateKeyFormat:
                encoderState.asymmetricPrivateKeyFormat,
            };

            const decoderInputSnapshot: DecoderInputsModel = {
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              jwt: encoderState.jwt,
              asymmetricPublicKey: debuggerStash.asymmetricPublicKey || "",
              asymmetricPublicKeyFormat:
                debuggerStash.asymmetricPublicKeyFormat ||
                AsymmetricKeyFormatValues.PEM,
            };

            // debuggerStash.symmetricSecretKey = encoderState.symmetricSecretKey;
            // debuggerStash.symmetricSecretKeyEncoding =
            //   encoderState.symmetricSecretKeyEncoding;

            return {
              activeWidget$: widget,
              mode$: mode,
              decoderInputs$: {
                ...decoderInputSnapshot,
              },
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              stash$: {
                ...debuggerStash,
              },
            };
          }
        }

        return {
          mode$: mode,
        };
      }),
    setActiveWidget$: (widget) =>
      set((state) => {
        const debuggerStash = structuredClone(state.stash$);

        // From DECODER to ENCODER
        if (widget === DebuggerWidgetValues.ENCODER) {
          const decoderState = useDecoderStore.getState();

          let decoderInputSnapshot: Partial<DecoderInputsModel> = {};
          let encoderInputsUpdate: Partial<EncoderInputsModel> = {};

          if (isNoneAlg(decoderState.alg)) {
            decoderInputSnapshot = {
              jwt: decoderState.jwt,
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
            };

            encoderInputsUpdate = {
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              algType: SigningAlgCategoryValues.NONE,
              alg: decoderState.alg,
            };
          }

          if (isHmacAlg(decoderState.alg)) {
            decoderInputSnapshot = {
              jwt: decoderState.jwt,
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            encoderInputsUpdate = {
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: decoderState.alg,
              symmetricSecretKey: decoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                decoderState.symmetricSecretKeyEncoding,
            };

            debuggerStash.symmetricSecretKey = decoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              decoderState.symmetricSecretKeyEncoding;
          }

          if (isDigitalSignatureAlg(decoderState.alg)) {
            decoderInputSnapshot = {
              jwt: decoderState.jwt,
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              asymmetricPublicKey: decoderState.asymmetricPublicKey,
              asymmetricPublicKeyFormat: decoderState.asymmetricPublicKeyFormat,
            };

            debuggerStash.asymmetricPublicKey =
              decoderState.asymmetricPublicKey;
            debuggerStash.asymmetricPublicKeyFormat =
              decoderState.asymmetricPublicKeyFormat;

            encoderInputsUpdate = {
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: decoderState.alg,
              asymmetricPrivateKey: debuggerStash.asymmetricPrivateKey,
              asymmetricPrivateKeyFormat:
                debuggerStash.asymmetricPublicKeyFormat,
            };
          }

          if (decoderState.alg === NOOP_ALG) {
            decoderInputSnapshot = {
              jwt: decoderState.jwt,
              algType: SigningAlgCategoryValues.NOOP,
              alg: decoderState.alg,
            };

            encoderInputsUpdate = {
              header: decoderState.decodedHeader,
              payload: decoderState.decodedPayload,
              algType: SigningAlgCategoryValues.NOOP,
              alg: decoderState.alg,
            };
          }

          if (!(decoderState.decodedHeader && decoderState.decodedPayload)) {
            return {
              activeWidget$: widget,
              decoderInputs$: { ...decoderInputSnapshot },
              encoderInputs$: {
                ...encoderInputsUpdate,
              },
              stash$: { ...debuggerStash },
            };
          }

          return {
            activeWidget$: widget,
            decoderInputs$: { ...decoderInputSnapshot },
            encoderInputs$: {
              ...encoderInputsUpdate,
            },
            stash$: { ...debuggerStash },
          };
        }

        // From ENCODER to DECODER
        if (widget === DebuggerWidgetValues.DECODER) {
          const encoderState = useEncoderStore.getState();

          let encoderInputSnapshot: Partial<EncoderInputsModel> = {};
          let decoderInputsUpdate: Partial<DecoderInputsModel> = {};

          if (isNoneAlg(encoderState.alg)) {
            encoderInputSnapshot = {
              header: encoderState.header,
              payload: encoderState.payload,
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
            };

            decoderInputsUpdate = {
              jwt: encoderState.jwt || state.decoderInputs$.jwt,
              algType: SigningAlgCategoryValues.NONE,
              alg: encoderState.alg,
            };
          }

          if (isHmacAlg(encoderState.alg)) {
            encoderInputSnapshot = {
              header: encoderState.header,
              payload: encoderState.payload,
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            decoderInputsUpdate = {
              jwt: encoderState.jwt || state.decoderInputs$.jwt,
              algType: SigningAlgCategoryValues.SYMMETRIC,
              alg: encoderState.alg,
              symmetricSecretKey: encoderState.symmetricSecretKey,
              symmetricSecretKeyEncoding:
                encoderState.symmetricSecretKeyEncoding,
            };

            debuggerStash.symmetricSecretKey = encoderState.symmetricSecretKey;
            debuggerStash.symmetricSecretKeyEncoding =
              encoderState.symmetricSecretKeyEncoding;
          }

          if (isDigitalSignatureAlg(encoderState.alg)) {
            encoderInputSnapshot = {
              header: encoderState.header,
              payload: encoderState.payload,
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              asymmetricPrivateKey: encoderState.asymmetricPrivateKey,
              asymmetricPrivateKeyFormat:
                encoderState.asymmetricPrivateKeyFormat,
            };

            decoderInputsUpdate = {
              jwt: encoderState.jwt || state.decoderInputs$.jwt,
              algType: SigningAlgCategoryValues.ASYMMETRIC,
              alg: encoderState.alg,
              asymmetricPublicKey: debuggerStash.asymmetricPublicKey,
              asymmetricPublicKeyFormat:
                debuggerStash.asymmetricPublicKeyFormat,
            };

            debuggerStash.asymmetricPrivateKey =
              encoderState.asymmetricPrivateKey;
            debuggerStash.asymmetricPrivateKeyFormat =
              encoderState.asymmetricPrivateKeyFormat;
          }

          if (!encoderState.jwt) {
            return {
              activeWidget$: widget,
              encoderInputs$: {
                ...encoderInputSnapshot,
              },
              decoderInputs$: {
                ...state.decoderInputs$,
              },
              stash$: { ...debuggerStash },
            };
          }

          return {
            activeWidget$: widget,
            encoderInputs$: {
              ...encoderInputSnapshot,
            },
            decoderInputs$: {
              ...decoderInputsUpdate,
            },
            stash$: { ...debuggerStash },
          };
        }

        return {};
      }),
    setDecodedHeaderTabId$: (value) =>
      set({
        decodedHeaderTabId$: value,
      }),
    setDecodedPayloadTabId$: (value) =>
      set({
        decodedPayloadTabId$: value,
      }),
    setDecodedHeaderDescriptionVisibility$: (value) =>
      set({
        decodedHeaderDescriptionVisibility$: value,
      }),
    setDecodedPayloadDescriptionVisibility$: (value) =>
      set({
        decodedPayloadDescriptionVisibility$: value,
      }),
    openOutputModal$: (id) => {
      document.body.classList.add("mobile-scroll-lock");

      set({
        outputModalState$: DebuggerOutputModalValues.OPEN,
        outputModalId$: id,
      });
    },
    closeOutputModal$: () => {
      document.body.classList.remove("mobile-scroll-lock");

      set({
        outputModalState$: DebuggerOutputModalValues.CLOSED,
        outputModalId$: null,
      });
    },
  })),
);
