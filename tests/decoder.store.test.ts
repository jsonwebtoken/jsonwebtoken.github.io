import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  DefaultTokensValues,
  DefaultTokenWithKeysModel,
} from "@/features/common/values/default-tokens.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { JwtSignatureStatusValues } from "@/features/common/values/jwt-signature-status.values";
import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import {
  DecoderStoreState,
  initialState,
  useDecoderStore,
} from "@/features/decoder/services/decoder.store";
import { TokenDecoderService } from "@/features/decoder/services/token-decoder.service";

const rs256 = DefaultTokensValues.RS256 as DefaultTokenWithKeysModel;
const rs256PublicJwk = rs256.jwk as { n: string; e: string };
const es256 = DefaultTokensValues.ES256 as DefaultTokenWithKeysModel;
const es256Jwk = es256.jwk as {
  kty: string;
  crv: string;
  x: string;
  y: string;
};
const es256PublicJwk = {
  kty: es256Jwk.kty,
  crv: es256Jwk.crv,
  x: es256Jwk.x,
  y: es256Jwk.y,
};

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
};

describe("loadDecoderUrlInputs", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useDecoderStore.setState(initialState);
  });

  test("loads a digitally signed JWT and explicit key together", async () => {
    const publicKey = JSON.stringify(rs256.jwk);
    const loadDecoderInputs = vi
      .spyOn(TokenDecoderService, "loadDecoderInputs")
      .mockResolvedValue({
        jwt: rs256.token,
        alg: "RS256",
        asymmetricPublicKey: publicKey,
        asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
        controlledAsymmetricPublicKey: {
          id: 1,
          value: publicKey,
          format: AsymmetricKeyFormatValues.JWK,
        },
        signatureStatus: JwtSignatureStatusValues.VALID,
      });
    const handleJwtChange = vi.spyOn(TokenDecoderService, "handleJwtChange");

    await useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: rs256.token,
      publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.JWK,
    });

    expect(loadDecoderInputs).toHaveBeenCalledOnce();
    expect(loadDecoderInputs).toHaveBeenCalledWith({
      algType: SigningAlgCategoryValues.ASYMMETRIC,
      alg: "RS256",
      jwt: rs256.token,
      asymmetricPublicKey: publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
    });
    expect(handleJwtChange).not.toHaveBeenCalled();
    expect(useDecoderStore.getState()).toMatchObject({
      jwt: rs256.token,
      asymmetricPublicKey: publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      isLoading: false,
    });
  });

  test.each([
    {
      name: "the public key is missing",
      jwt: rs256.token,
      publicKey: undefined,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    },
    {
      name: "the public key is blank",
      jwt: rs256.token,
      publicKey: " \n ",
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    },
    {
      name: "the public key format is missing",
      jwt: rs256.token,
      publicKey: rs256.publicKey,
      publicKeyFormat: undefined,
    },
    {
      name: "the JWT is invalid",
      jwt: "not-a-jwt",
      publicKey: rs256.publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    },
    {
      name: "the JWT is not digitally signed",
      jwt: DefaultTokensValues.HS256.token,
      publicKey: rs256.publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    },
  ])("preserves normal JWT handling when $name", async (params) => {
    const loadDecoderInputs = vi.spyOn(
      TokenDecoderService,
      "loadDecoderInputs",
    );
    const handleJwtChange = vi
      .spyOn(TokenDecoderService, "handleJwtChange")
      .mockResolvedValue({ jwt: params.jwt });

    await useDecoderStore.getState().loadDecoderUrlInputs(params);

    expect(loadDecoderInputs).not.toHaveBeenCalled();
    expect(handleJwtChange).toHaveBeenCalledOnce();
    expect(handleJwtChange).toHaveBeenCalledWith({
      alg: initialState.alg,
      symmetricSecretKey: initialState.symmetricSecretKey,
      symmetricSecretKeyEncoding: initialState.symmetricSecretKeyEncoding,
      asymmetricPublicKey: initialState.asymmetricPublicKey,
      asymmetricPublicKeyFormat: initialState.asymmetricPublicKeyFormat,
      newToken: params.jwt,
    });
    expect(useDecoderStore.getState()).toMatchObject({
      jwt: params.jwt,
      isLoading: false,
    });
  });

  test.each([
    {
      name: "PEM",
      publicKey: "not a PEM public key",
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    },
    {
      name: "JWK",
      publicKey: JSON.stringify({ not: "a JWK" }),
      publicKeyFormat: AsymmetricKeyFormatValues.JWK,
    },
  ])(
    "keeps an invalid explicit $name key controlled and bypasses discovery",
    async ({ publicKey, publicKeyFormat }) => {
      const loadDecoderInputs = vi.spyOn(
        TokenDecoderService,
        "loadDecoderInputs",
      );
      const handleJwtChange = vi.spyOn(TokenDecoderService, "handleJwtChange");

      await useDecoderStore.getState().loadDecoderUrlInputs({
        jwt: rs256.token,
        publicKey,
        publicKeyFormat,
      });

      expect(loadDecoderInputs).toHaveBeenCalledOnce();
      expect(handleJwtChange).not.toHaveBeenCalled();
      expect(useDecoderStore.getState()).toMatchObject({
        jwt: rs256.token,
        asymmetricPublicKey: publicKey,
        asymmetricPublicKeyFormat: publicKeyFormat,
        controlledAsymmetricPublicKey: {
          value: publicKey,
          format: publicKeyFormat,
        },
        isLoading: false,
      });
      expect(useDecoderStore.getState().verificationInputErrors).not.toBeNull();
    },
  );

  test("keeps the explicit key controlled when signature verification fails", async () => {
    const signatureSeparatorIndex = rs256.token.lastIndexOf(".");
    const signature = rs256.token.slice(signatureSeparatorIndex + 1);
    const invalidSignatureJwt = `${rs256.token.slice(
      0,
      signatureSeparatorIndex + 1,
    )}${signature.startsWith("A") ? "B" : "A"}${signature.slice(1)}`;

    await useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: invalidSignatureJwt,
      publicKey: rs256.publicKey,
      publicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });

    expect(useDecoderStore.getState()).toMatchObject({
      jwt: invalidSignatureJwt,
      asymmetricPublicKey: rs256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPublicKey: {
        value: rs256.publicKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
      signatureStatus: JwtSignatureStatusValues.INVALID,
      isLoading: false,
    });
    expect(useDecoderStore.getState().verificationInputErrors).not.toBeNull();
  });

  test("does not let an earlier JWT change overwrite a newer URL load", async () => {
    const earlier = deferred<Partial<DecoderStoreState>>();
    const newer = deferred<Partial<DecoderStoreState>>();

    vi.spyOn(TokenDecoderService, "handleJwtChange").mockReturnValueOnce(
      earlier.promise,
    );
    vi.spyOn(TokenDecoderService, "loadDecoderUrlInputs").mockReturnValueOnce(
      newer.promise,
    );

    const earlierLoad = useDecoderStore
      .getState()
      .handleJwtChange("earlier.jwt");
    const newerLoad = useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: "newer.jwt",
    });

    newer.resolve({
      jwt: "newer.jwt",
      asymmetricPublicKey: "newer key",
    });
    await newerLoad;

    earlier.resolve({
      jwt: "earlier.jwt",
      asymmetricPublicKey: "earlier key",
    });
    await earlierLoad;

    expect(useDecoderStore.getState()).toMatchObject({
      jwt: "newer.jwt",
      asymmetricPublicKey: "newer key",
      isLoading: false,
    });
  });

  test("does not let an earlier URL load overwrite newer decoder inputs", async () => {
    const earlier = deferred<Partial<DecoderStoreState>>();
    const newer = deferred<Partial<DecoderStoreState>>();

    vi.spyOn(TokenDecoderService, "loadDecoderUrlInputs").mockReturnValueOnce(
      earlier.promise,
    );
    vi.spyOn(TokenDecoderService, "loadDecoderInputs").mockReturnValueOnce(
      newer.promise,
    );

    const earlierLoad = useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: "earlier.jwt",
    });
    const newerLoad = useDecoderStore.getState().loadDecoderInputs({
      algType: SigningAlgCategoryValues.NONE,
      alg: "none",
      jwt: "newer.jwt",
    });

    newer.resolve({ jwt: "newer.jwt" });
    await newerLoad;

    earlier.resolve({ jwt: "earlier.jwt" });
    await earlierLoad;

    expect(useDecoderStore.getState()).toMatchObject({
      jwt: "newer.jwt",
      isLoading: false,
    });
  });

  test("keeps loading while a newer URL load is still pending", async () => {
    const earlier = deferred<Partial<DecoderStoreState>>();
    const newer = deferred<Partial<DecoderStoreState>>();
    const loadDecoderUrlInputs = vi.spyOn(
      TokenDecoderService,
      "loadDecoderUrlInputs",
    );

    loadDecoderUrlInputs
      .mockReturnValueOnce(earlier.promise)
      .mockReturnValueOnce(newer.promise);

    const earlierLoad = useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: "earlier.jwt",
    });
    const newerLoad = useDecoderStore.getState().loadDecoderUrlInputs({
      jwt: "newer.jwt",
    });

    earlier.resolve({ jwt: "earlier.jwt" });
    await earlierLoad;

    expect(useDecoderStore.getState().isLoading).toBe(true);

    newer.resolve({ jwt: "newer.jwt" });
    await newerLoad;

    expect(useDecoderStore.getState()).toMatchObject({
      jwt: "newer.jwt",
      isLoading: false,
    });
  });
});

describe("handleAsymmetricPublicKeyChange", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useDecoderStore.setState({
      ...initialState,
      jwt: es256.token,
      alg: "ES256",
    });
  });

  test("detects a JWK pasted while PEM is selected", async () => {
    const publicKey = JSON.stringify(es256PublicJwk, null, 2);

    await useDecoderStore.getState().handleAsymmetricPublicKeyChange(publicKey);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPublicKey: {
        value: publicKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
      verificationInputErrors: null,
    });
  });

  test("detects PEM pasted while JWK is selected", async () => {
    useDecoderStore.setState({
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
    });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange(es256.publicKey);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: es256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPublicKey: {
        value: es256.publicKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
      verificationInputErrors: null,
    });
  });

  test("does not let an earlier key change overwrite a newer one", async () => {
    const earlier = deferred<Partial<DecoderStoreState>>();
    const newer = deferred<Partial<DecoderStoreState>>();
    const publicJwk = JSON.stringify(es256PublicJwk, null, 2);
    const handleAsymmetricPublicKeyChange = vi.spyOn(
      TokenDecoderService,
      "handleAsymmetricPublicKeyChange",
    );

    handleAsymmetricPublicKeyChange
      .mockReturnValueOnce(earlier.promise)
      .mockReturnValueOnce(newer.promise);

    const earlierChange = useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange(publicJwk);
    const newerChange = useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange(es256.publicKey);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: es256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPublicKey: {
        value: es256.publicKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
    });

    newer.resolve({
      asymmetricPublicKey: es256.publicKey,
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
    await newerChange;

    earlier.resolve({
      asymmetricPublicKey: publicJwk,
      signatureStatus: JwtSignatureStatusValues.INVALID,
    });
    await earlierChange;

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: es256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
  });
});

describe("handleAsymmetricPublicKeyFormatChange", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useDecoderStore.setState({
      ...initialState,
      jwt: rs256.token,
      alg: "RS256",
      asymmetricPublicKey: rs256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
  });

  test("re-encodes the public key and verifies atomically", async () => {
    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    const jwkState = useDecoderStore.getState();

    expect(JSON.parse(jwkState.asymmetricPublicKey)).toStrictEqual({
      kty: "RSA",
      n: rs256PublicJwk.n,
      e: rs256PublicJwk.e,
    });
    expect(jwkState).toMatchObject({
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPublicKey: {
        value: jwkState.asymmetricPublicKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
      verificationInputErrors: null,
    });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.PEM);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: rs256.publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      controlledAsymmetricPublicKey: {
        value: rs256.publicKey,
        format: AsymmetricKeyFormatValues.PEM,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
      verificationInputErrors: null,
    });
  });

  test("accepts a public key already in the target format", async () => {
    const publicKey = JSON.stringify(es256PublicJwk, null, 2);

    useDecoderStore.setState({
      jwt: es256.token,
      alg: "ES256",
      asymmetricPublicKey: publicKey,
      signatureStatus: JwtSignatureStatusValues.INVALID,
    });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: publicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPublicKey: {
        value: publicKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
      verificationInputErrors: null,
    });
  });

  test("does not let an earlier key change overwrite a newer format change", async () => {
    const earlier = deferred<Partial<DecoderStoreState>>();
    const newer = deferred<Partial<DecoderStoreState>>();
    const convertedPublicKey = "converted earlier key";

    vi.spyOn(
      TokenDecoderService,
      "handleAsymmetricPublicKeyChange",
    ).mockReturnValueOnce(earlier.promise);
    vi.spyOn(
      TokenDecoderService,
      "handleAsymmetricPublicKeyFormatChange",
    ).mockReturnValueOnce(newer.promise);

    const earlierChange = useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyChange("earlier key");
    const newerChange = useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    expect(
      TokenDecoderService.handleAsymmetricPublicKeyFormatChange,
    ).toHaveBeenCalledWith({
      jwt: rs256.token,
      alg: "RS256",
      asymmetricPublicKey: "earlier key",
      sourceFormat: AsymmetricKeyFormatValues.PEM,
      targetFormat: AsymmetricKeyFormatValues.JWK,
    });

    newer.resolve({
      asymmetricPublicKey: convertedPublicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      controlledAsymmetricPublicKey: {
        id: 1,
        value: convertedPublicKey,
        format: AsymmetricKeyFormatValues.JWK,
      },
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
    await newerChange;

    earlier.resolve({
      asymmetricPublicKey: "earlier key",
      signatureStatus: JwtSignatureStatusValues.INVALID,
    });
    await earlierChange;

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: convertedPublicKey,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWK,
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
  });

  test("keeps the current key and format when conversion fails", async () => {
    useDecoderStore.setState({
      asymmetricPublicKey: "not a PEM key",
    });

    await useDecoderStore
      .getState()
      .handleAsymmetricPublicKeyFormatChange(AsymmetricKeyFormatValues.JWK);

    expect(useDecoderStore.getState()).toMatchObject({
      asymmetricPublicKey: "not a PEM key",
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
      signatureStatus: JwtSignatureStatusValues.VALID,
    });
    expect(useDecoderStore.getState().verificationInputErrors).not.toBeNull();
  });
});
