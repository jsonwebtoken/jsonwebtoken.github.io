import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  exportJWK,
  generateKeyPair,
  SignJWT,
  type JSONWebKeySet,
  type JWK,
} from "jose";
import {
  extractSingleJwk,
  isJwksInput,
  isJwksUri,
  parseJwksInput,
  validateJwksInput,
  verifyJwtWithJwks,
  wrapKeyInJwks,
} from "@/features/common/services/jwks.service";
import {
  convertAsymmetricPublicKeyFormat,
  verifyDigitallySignedJwt,
} from "@/features/common/services/jwt.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

type TestKey = {
  alg: string;
  kid: string;
  jwk: JWK;
  sign: (header?: Record<string, string>) => Promise<string>;
};

const createTestKey = async (alg: string, kid: string): Promise<TestKey> => {
  const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
  });
  const jwk = { ...(await exportJWK(publicKey)), kid, alg, use: "sig" };

  return {
    alg,
    kid,
    jwk,
    sign: (header = {}) =>
      new SignJWT({ sub: "jwks-test" })
        .setProtectedHeader({ alg, typ: "JWT", ...header })
        .sign(privateKey),
  };
};

const jwksOf = (...keys: TestKey[]): JSONWebKeySet => ({
  keys: keys.map(({ jwk }) => jwk),
});

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

let rsa1: TestKey;
let rsa2: TestKey;
let ec1: TestKey;

beforeAll(async () => {
  [rsa1, rsa2, ec1] = await Promise.all([
    createTestKey("RS256", "rsa-1"),
    createTestKey("RS256", "rsa-2"),
    createTestKey("ES256", "ec-1"),
  ]);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("JWKS input detection", () => {
  test.each(["https://example.com/jwks.json", "  http://localhost:3000/k "])(
    "treats %j as a URI",
    (value) => {
      expect(isJwksUri(value)).toBe(true);
      expect(isJwksInput(value)).toBe(true);
    },
  );

  test("treats a JSON object with a keys array as a JWKS", () => {
    expect(isJwksInput(JSON.stringify(jwksOf(rsa1)))).toBe(true);
    expect(isJwksInput('{"keys":[]}')).toBe(true);
  });

  test.each([
    "",
    "not a key",
    "-----BEGIN PUBLIC KEY-----\nabc\n-----END PUBLIC KEY-----",
    '{"kty":"RSA","n":"x","e":"AQAB"}',
    '{"keys":"nope"}',
    '{"keys":[1]}',
    "[]",
  ])("does not treat %j as a JWKS", (value) => {
    expect(isJwksInput(value)).toBe(false);
  });
});

describe("parseJwksInput", () => {
  test("rejects empty input", () => {
    expect(parseJwksInput("  ")._unsafeUnwrapErr()).toContain("Enter a JWKS");
  });

  test("rejects insecure remote URIs but allows loopback http", () => {
    expect(parseJwksInput("http://example.com/jwks")._unsafeUnwrapErr()).toBe(
      "The JWKS URI must use https.",
    );
    expect(parseJwksInput("http://localhost:4455/jwks.json").isOk()).toBe(true);
    expect(parseJwksInput("https://example.com/jwks.json").isOk()).toBe(true);
  });

  test("rejects a malformed URI", () => {
    expect(parseJwksInput("https://")._unsafeUnwrapErr()).toBe(
      "The JWKS URI is not a valid URL.",
    );
  });

  test("rejects JSON that is not a JWKS", () => {
    expect(parseJwksInput('{"kty":"RSA"}')._unsafeUnwrapErr()).toContain(
      "not a valid JWKS",
    );
  });

  test("validateJwksInput reports a verify/key error", () => {
    const error = validateJwksInput("nope")._unsafeUnwrapErr();

    expect(error.message).toContain("not a valid JWKS");
  });
});

describe("verifyJwtWithJwks with JWKS JSON", () => {
  test("selects the key by kid", async () => {
    const jwks = JSON.stringify(jwksOf(rsa1, rsa2, ec1));

    for (const key of [rsa1, rsa2, ec1]) {
      const result = await verifyJwtWithJwks({
        jwt: await key.sign({ kid: key.kid }),
        jwksInput: jwks,
      });

      expect(result.isOk()).toBe(true);
    }
  });

  test("tries every candidate when the token has no kid", async () => {
    const result = await verifyJwtWithJwks({
      jwt: await rsa2.sign(),
      jwksInput: JSON.stringify(jwksOf(rsa1, rsa2)),
    });

    expect(result.isOk()).toBe(true);
  });

  test("reports an invalid signature when no candidate verifies", async () => {
    const forged = (await rsa1.sign({ kid: "rsa-1" }))
      .split(".")
      .slice(0, 2)
      .concat((await rsa2.sign({ kid: "rsa-1" })).split(".")[2] as string)
      .join(".");

    const result = await verifyJwtWithJwks({
      jwt: forged,
      jwksInput: JSON.stringify(jwksOf(rsa1, rsa2)),
    });

    expect(result._unsafeUnwrapErr().message).toBe(
      "Signature verification failed. Try again with another value.",
    );
  });

  test("reports when no key matches the kid", async () => {
    const result = await verifyJwtWithJwks({
      jwt: await rsa1.sign({ kid: "missing" }),
      jwksInput: JSON.stringify(jwksOf(rsa1, rsa2)),
    });

    expect(result._unsafeUnwrapErr().message).toContain('kid "missing"');
  });

  test("names the kid and alg it could not match", async () => {
    const result = await verifyJwtWithJwks({
      jwt: await ec1.sign({ kid: "ec-9" }),
      jwksInput: JSON.stringify(jwksOf(rsa1)),
    });

    expect(result._unsafeUnwrapErr().message).toContain(
      'kid "ec-9", alg "ES256"',
    );
  });

  test("reports an empty key set as having no matching key", async () => {
    const result = await verifyJwtWithJwks({
      jwt: await rsa1.sign(),
      jwksInput: '{"keys":[]}',
    });

    expect(result._unsafeUnwrapErr().message).toContain("No key in the JWKS");
  });

  test("never accepts a token signed by a key outside the set", async () => {
    const outsider = await createTestKey("RS256", "rsa-1");

    const result = await verifyJwtWithJwks({
      jwt: await outsider.sign({ kid: "rsa-1" }),
      jwksInput: JSON.stringify(jwksOf(rsa1)),
    });

    expect(result.isErr()).toBe(true);
  });
});

describe("verifyJwtWithJwks with a JWKS URI", () => {
  test("fetches the set and verifies the token", async () => {
    const fetchMock = vi.fn(async () => jsonResponse(jwksOf(rsa1, ec1)));
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyJwtWithJwks({
      jwt: await ec1.sign({ kid: "ec-1" }),
      jwksInput: "https://issuer.example/jwks.json",
    });

    expect(result.isOk()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("explains a network or CORS failure and suggests pasting JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );

    const result = await verifyJwtWithJwks({
      jwt: await rsa1.sign({ kid: "rsa-1" }),
      jwksInput: "https://no-cors.example/jwks.json",
    });

    const { message } = result._unsafeUnwrapErr();

    expect(message).toContain("no-cors.example");
    expect(message).toContain("CORS");
    expect(message).toContain("Paste the JWKS JSON");
  });

  test("reports a non-200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}, 404)),
    );

    const result = await verifyJwtWithJwks({
      jwt: await rsa1.sign({ kid: "rsa-1" }),
      jwksInput: "https://missing.example/jwks.json",
    });

    expect(result._unsafeUnwrapErr().message).toContain("200 OK");
  });

  test("never sends the token to the JWKS host", async () => {
    const jwt = await rsa1.sign({ kid: "rsa-1" });
    const fetchMock = vi.fn(async () => jsonResponse(jwksOf(rsa1)));
    vi.stubGlobal("fetch", fetchMock);

    await verifyJwtWithJwks({
      jwt,
      jwksInput: "https://privacy.example/jwks.json",
    });

    expect(JSON.stringify(fetchMock.mock.calls)).not.toContain(jwt);
  });
});

describe("JWKS through the shared verification entry point", () => {
  test("verifyDigitallySignedJwt dispatches the JWKS format", async () => {
    const result = await verifyDigitallySignedJwt({
      jwt: await rsa2.sign({ kid: "rsa-2" }),
      alg: "RS256",
      asymmetricPublicKey: JSON.stringify(jwksOf(rsa1, rsa2)),
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.JWKS,
    });

    expect(result.isOk()).toBe(true);
  });
});

describe("JWKS format conversion", () => {
  test("wraps a single JWK into a JWKS", () => {
    const wrapped = wrapKeyInJwks(JSON.stringify(rsa1.jwk))._unsafeUnwrap();

    expect(JSON.parse(wrapped)).toEqual({ keys: [rsa1.jwk] });
  });

  test("extracts the only key of a one-key JWKS", () => {
    const single = extractSingleJwk(
      JSON.stringify(jwksOf(rsa1)),
    )._unsafeUnwrap();

    expect(JSON.parse(single)).toEqual(rsa1.jwk);
  });

  test("refuses to collapse a multi-key JWKS or a URI", () => {
    expect(
      extractSingleJwk(JSON.stringify(jwksOf(rsa1, rsa2)))._unsafeUnwrapErr(),
    ).toContain("contains 2 keys");
    expect(
      extractSingleJwk("https://example.com/jwks.json")._unsafeUnwrapErr(),
    ).toContain("cannot be converted");
  });

  test("converts JWK to JWKS and back through the public key converter", async () => {
    const toJwks = await convertAsymmetricPublicKeyFormat({
      alg: "RS256",
      key: JSON.stringify(rsa1.jwk),
      sourceFormat: AsymmetricKeyFormatValues.JWK,
      targetFormat: AsymmetricKeyFormatValues.JWKS,
    });

    expect(JSON.parse(toJwks._unsafeUnwrap()).keys).toHaveLength(1);

    const back = await convertAsymmetricPublicKeyFormat({
      alg: "RS256",
      key: toJwks._unsafeUnwrap(),
      sourceFormat: AsymmetricKeyFormatValues.JWKS,
      targetFormat: AsymmetricKeyFormatValues.JWK,
    });

    expect(JSON.parse(back._unsafeUnwrap()).kid).toBe("rsa-1");
  });
});
