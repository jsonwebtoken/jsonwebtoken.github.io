import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { exportJWK, generateKeyPair } from "jose";
import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
} from "@/features/common/values/default-tokens.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import {
  initialState,
  useDecoderStore,
} from "@/features/decoder/services/decoder.store";
import { detectPublicKeyFormat } from "@/features/decoder/services/public-key-input.service";

const rs256 = DefaultTokensValues.RS256 as DefaultTokenWithKeysModel;
const rs384 = DefaultTokensValues.RS384 as DefaultTokenWithKeysModel;

const toPublicJwk = ({
  d,
  p,
  q,
  dp,
  dq,
  qi,
  ...publicJwk
}: Record<string, unknown>) => publicJwk;

const rs256Jwk = toPublicJwk(rs256.jwk as Record<string, unknown>);
const rs384Jwk = toPublicJwk(rs384.jwk as Record<string, unknown>);

let unrelatedJwk: Record<string, unknown>;

beforeAll(async () => {
  const { publicKey } = await generateKeyPair("RS256", { extractable: true });
  unrelatedJwk = { ...(await exportJWK(publicKey)), kid: "unrelated" };
});

const jwksOf = (...jwks: object[]) => JSON.stringify({ keys: jwks });

describe("detectPublicKeyFormat", () => {
  test.each([
    [jwksOf(rs256Jwk), AsymmetricKeyFormatValues.JWKS],
    ["https://issuer.example/jwks.json", AsymmetricKeyFormatValues.JWKS],
    [JSON.stringify(rs256Jwk), AsymmetricKeyFormatValues.JWK],
    [rs256.publicKey, AsymmetricKeyFormatValues.PEM],
  ])("detects %#", (value, expected) => {
    expect(detectPublicKeyFormat(value)).toBe(expected);
  });

  test("does not guess unknown input", () => {
    expect(detectPublicKeyFormat("not a key")).toBeNull();
  });
});

describe("decoder store with a JWKS", () => {
  beforeEach(() => {
    useDecoderStore.setState(initialState);
  });

  test("verifies the current token against a pasted JWKS", async () => {
    useDecoderStore.setState({ jwt: rs256.token, alg: "RS256" });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange(jwksOf(rs384Jwk, rs256Jwk));

    const state = useDecoderStore.getState();

    expect(state.asymmetricPublicKeyFormat).toBe(
      AsymmetricKeyFormatValues.JWKS,
    );
    expect(state.signatureStatus).toBe(JwtSignatureStatusValues.VALID);
  });

  test("marks the signature invalid when the JWKS lacks the signing key", async () => {
    useDecoderStore.setState({ jwt: rs256.token, alg: "RS256" });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange(jwksOf(unrelatedJwk));

    const state = useDecoderStore.getState();

    expect(state.signatureStatus).toBe(JwtSignatureStatusValues.INVALID);
    expect(state.verificationInputErrors).not.toBeNull();
  });

  test("keeps the JWKS and re-verifies when a new token is pasted", async () => {
    useDecoderStore.setState({
      jwt: rs384.token,
      alg: "RS384",
      asymmetricPublicKey: jwksOf(rs256Jwk, rs384Jwk),
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWKS,
    });

    await useDecoderStore.getState().handleJwtChange(rs256.token);

    const state = useDecoderStore.getState();

    expect(state.jwt).toBe(rs256.token);
    expect(state.asymmetricPublicKey).toBe(jwksOf(rs256Jwk, rs384Jwk));
    expect(state.asymmetricPublicKeyFormat).toBe(
      AsymmetricKeyFormatValues.JWKS,
    );
    expect(state.signatureStatus).toBe(JwtSignatureStatusValues.VALID);
  });

  test("converts a single PEM key to a JWKS and back", async () => {
    useDecoderStore.setState({
      jwt: rs256.token,
      alg: "RS256",
      asymmetricPublicKey: rs256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.JWKS);

    const toJwks = useDecoderStore.getState();

    expect(toJwks.asymmetricPublicKeyFormat).toBe(
      AsymmetricKeyFormatValues.JWKS,
    );
    expect(JSON.parse(toJwks.asymmetricPublicKey).keys).toHaveLength(1);
    expect(toJwks.signatureStatus).toBe(JwtSignatureStatusValues.VALID);

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.PEM);

    const backToPem = useDecoderStore.getState();

    expect(backToPem.asymmetricPublicKey).toContain("BEGIN PUBLIC KEY");
    expect(backToPem.signatureStatus).toBe(JwtSignatureStatusValues.VALID);
  });
});
