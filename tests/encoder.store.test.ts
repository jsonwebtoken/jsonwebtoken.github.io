import { beforeEach, describe, expect, test } from "vitest";
import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
} from "@/features/common/values/default-tokens.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import {
  initialState,
  useEncoderStore,
} from "@/features/encoder/services/encoder.store";

const rs256 = DefaultTokensValues.RS256 as DefaultTokenWithKeysModel;

describe("handleAsymmetricPrivateKeyFormatChange", () => {
  beforeEach(() => {
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
