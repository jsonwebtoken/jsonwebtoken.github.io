import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
} from "@/features/common/values/default-tokens.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import {
  EncoderStoreState,
  initialState,
  useEncoderStore,
} from "@/features/encoder/services/encoder.store";
import { TokenEncoderService } from "@/features/encoder/services/token-encoder.service";

const rs256 = DefaultTokensValues.RS256 as DefaultTokenWithKeysModel;
const es256 = DefaultTokensValues.ES256 as DefaultTokenWithKeysModel;

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
};

describe("handleAsymmetricPrivateKeyChange", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useEncoderStore.setState({
      ...initialState,
      alg: "ES256",
      header: JSON.stringify({ alg: "ES256", typ: "JWT" }),
    });
  });

  test("detects a JWK pasted while PEM is selected", async () => {
    const privateKey = JSON.stringify(es256.jwk, null, 2);

    await useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyChange(privateKey);

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPrivateKey: {
        value: privateKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signingErrors: null,
    });
    expect(useEncoderStore.getState().jwt).toMatch(
      /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    );
  });

  test("detects PEM pasted while JWK is selected", async () => {
    useEncoderStore.setState({
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.JWK,
    });

    await useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyChange(es256.privateKey);

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: es256.privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPrivateKey: {
        value: es256.privateKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
      signingErrors: null,
    });
    expect(useEncoderStore.getState().jwt).toMatch(
      /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    );
  });

  test("does not let an earlier key change overwrite a newer one", async () => {
    const earlier = deferred<Partial<EncoderStoreState>>();
    const newer = deferred<Partial<EncoderStoreState>>();
    const privateJwk = JSON.stringify(es256.jwk, null, 2);
    const handleAsymmetricPrivateKeyChange = vi.spyOn(
      TokenEncoderService,
      "handleAsymmetricPrivateKeyChange",
    );

    handleAsymmetricPrivateKeyChange
      .mockReturnValueOnce(earlier.promise)
      .mockReturnValueOnce(newer.promise);

    const earlierChange = useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyChange(privateJwk);
    const newerChange = useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyChange(es256.privateKey);

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: es256.privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPrivateKey: {
        value: es256.privateKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
    });

    newer.resolve({
      asymmetricPrivateKey: es256.privateKey,
      jwt: "newer.jwt",
      signingErrors: null,
    });
    await newerChange;

    earlier.resolve({
      asymmetricPrivateKey: privateJwk,
      jwt: "earlier.jwt",
      signingErrors: ["earlier error"],
    });
    await earlierChange;

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: es256.privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
      jwt: "newer.jwt",
      signingErrors: null,
    });
  });
});

describe("handleAsymmetricPrivateKeyFormatChange", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useEncoderStore.setState({
      ...initialState,
      alg: "RS256",
      header: JSON.stringify({ alg: "RS256", typ: "JWT" }),
      asymmetricPrivateKey: rs256.privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
    });
  });

  test("re-encodes the private key and signs atomically", async () => {
    await useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    const jwkState = useEncoderStore.getState();
    const jwk = JSON.parse(jwkState.asymmetricPrivateKey);

    expect(jwk).toMatchObject({
      kty: "RSA",
      d: expect.any(String),
    });
    expect(jwkState).toMatchObject({
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPrivateKey: {
        value: jwkState.asymmetricPrivateKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signingErrors: null,
    });
    expect(jwkState.jwt).toMatch(
      /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    );

    await useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyFormatChange(AsymmetricKeyFormatValues.PEM);

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: rs256.privateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPrivateKey: {
        value: rs256.privateKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
      signingErrors: null,
    });
  });

  test.each([
    {
      name: "JWK",
      privateKey: JSON.stringify(rs256.jwk, null, 2),
      sourceFormat: AsymmetricKeyFormatValues.PEM,
      targetFormat: AsymmetricKeyFormatValues.JWK,
    },
    {
      name: "PEM",
      privateKey: rs256.privateKey,
      sourceFormat: AsymmetricKeyFormatValues.JWK,
      targetFormat: AsymmetricKeyFormatValues.PEM,
    },
  ])(
    "accepts a $name private key already in the target format",
    async ({ privateKey, sourceFormat, targetFormat }) => {
      useEncoderStore.setState({
        asymmetricPrivateKey: privateKey,
        asymmetricPrivateKeyFormat: sourceFormat,
      });

      await useEncoderStore
        .getState()
        .handleAsymmetricPrivateKeyFormatChange(targetFormat);

      expect(useEncoderStore.getState()).toMatchObject({
        asymmetricPrivateKey: privateKey,
        asymmetricPrivateKeyFormat: targetFormat,
        controlledAsymmetricPrivateKey: {
          value: privateKey,
          format: targetFormat,
        },
        signingErrors: null,
      });
    },
  );

  test("does not let an earlier key change overwrite a newer format change", async () => {
    const earlier = deferred<Partial<EncoderStoreState>>();
    const newer = deferred<Partial<EncoderStoreState>>();
    const convertedPrivateKey = "converted earlier key";

    vi.spyOn(
      TokenEncoderService,
      "handleAsymmetricPrivateKeyChange",
    ).mockReturnValueOnce(earlier.promise);
    vi.spyOn(
      TokenEncoderService,
      "handleAsymmetricPrivateKeyFormatChange",
    ).mockReturnValueOnce(newer.promise);

    const earlierChange = useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyChange("earlier key");
    const newerChange = useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    expect(
      TokenEncoderService.handleAsymmetricPrivateKeyFormatChange,
    ).toHaveBeenCalledWith({
      alg: "RS256",
      header: JSON.stringify({ alg: "RS256", typ: "JWT" }),
      payload: initialState.payload,
      asymmetricPrivateKey: "earlier key",
      sourceFormat: AsymmetricKeyFormatValues.PEM,
      targetFormat: AsymmetricKeyFormatValues.JWK,
    });

    newer.resolve({
      asymmetricPrivateKey: convertedPrivateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPrivateKey: {
        id: 1,
        value: convertedPrivateKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      jwt: "newer.jwt",
      signingErrors: null,
    });
    await newerChange;

    earlier.resolve({
      asymmetricPrivateKey: "earlier key",
      jwt: "earlier.jwt",
      signingErrors: ["earlier error"],
    });
    await earlierChange;

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: convertedPrivateKey,
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.JWK,
      jwt: "newer.jwt",
      signingErrors: null,
    });
  });

  test("keeps the current key and format when conversion fails", async () => {
    useEncoderStore.setState({
      asymmetricPrivateKey: "not a PEM key",
    });

    await useEncoderStore
      .getState()
      .handleAsymmetricPrivateKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    expect(useEncoderStore.getState()).toMatchObject({
      asymmetricPrivateKey: "not a PEM key",
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues.PEM,
    });
    expect(useEncoderStore.getState().signingErrors).not.toBeNull();
  });
});
