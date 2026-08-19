import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { downloadPublicKeyIfPossible } from "@/features/decoder/services/public-key.service";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";

const joseMocks = vi.hoisted(() => {
  const resolveRemoteJwk = vi.fn(async () => ({}));

  return {
    createRemoteJWKSet: vi.fn(() => resolveRemoteJwk),
    exportJWK: vi.fn(async () => ({
      kty: "RSA",
      n: "public-key",
      e: "AQAB",
    })),
    resolveRemoteJwk,
  };
});

vi.mock("jose", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jose")>();

  return {
    ...actual,
    createRemoteJWKSet: joseMocks.createRemoteJWKSet,
    exportJWK: joseMocks.exportJWK,
  };
});

const response = (body: unknown, status = 200) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  }) as Response;

describe("downloadPublicKeyIfPossible issuer discovery", () => {
  const header = { alg: "RS256", kid: "signing-key" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("uses RFC 8414 discovery and inserts it before the issuer path", async () => {
    const issuer = "https://issuer.example/tenant/";
    const fetchMock = vi.fn(async () =>
      response({
        issuer,
        jwks_uri: "https://issuer.example/tenant/jwks",
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadPublicKeyIfPossible({
      header,
      payload: { iss: issuer },
      errors: false,
      warnings: [],
    });

    expect(result.isOk()).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://issuer.example/.well-known/oauth-authorization-server/tenant",
    );
    expect(joseMocks.createRemoteJWKSet).toHaveBeenCalledWith(
      new URL("https://issuer.example/tenant/jwks"),
    );
    expect(joseMocks.resolveRemoteJwk).toHaveBeenCalledWith(header);
  });

  test("falls back to OpenID discovery after RFC 8414 discovery fails", async () => {
    const issuer = "https://issuer.example/tenant";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response("Not Found", 404))
      .mockResolvedValueOnce(
        response({
          issuer,
          jwks_uri: "https://issuer.example/openid/jwks",
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadPublicKeyIfPossible({
      header,
      payload: { iss: issuer },
      errors: false,
      warnings: [],
    });

    expect(result.isOk()).toBe(true);
    expect(fetchMock.mock.calls).toEqual([
      ["https://issuer.example/.well-known/oauth-authorization-server/tenant"],
      ["https://issuer.example/tenant/.well-known/openid-configuration"],
    ]);
    expect(joseMocks.createRemoteJWKSet).toHaveBeenCalledWith(
      new URL("https://issuer.example/openid/jwks"),
    );
  });

  test("does not use RFC 8414 metadata with a mismatched issuer", async () => {
    const issuer = "https://issuer.example";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        response({
          issuer: "https://attacker.example",
          jwks_uri: "https://attacker.example/jwks",
        }),
      )
      .mockResolvedValueOnce(
        response({
          issuer,
          jwks_uri: "https://issuer.example/jwks",
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadPublicKeyIfPossible({
      header,
      payload: { iss: issuer },
      errors: false,
      warnings: [],
    });

    expect(result.isOk()).toBe(true);
    expect(joseMocks.createRemoteJWKSet).toHaveBeenCalledOnce();
    expect(joseMocks.createRemoteJWKSet).toHaveBeenCalledWith(
      new URL("https://issuer.example/jwks"),
    );
  });

  test("does not use OpenID metadata with a mismatched issuer", async () => {
    const issuer = "https://issuer.example";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response("Not Found", 404))
      .mockResolvedValueOnce(
        response({
          issuer: "https://attacker.example",
          jwks_uri: "https://attacker.example/jwks",
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadPublicKeyIfPossible({
      header,
      payload: { iss: issuer },
      errors: false,
      warnings: [],
    });

    expect(result.isErr()).toBe(true);
    expect(joseMocks.createRemoteJWKSet).not.toHaveBeenCalled();
  });

  test("requires an HTTPS issuer URL", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadPublicKeyIfPossible({
      header,
      payload: { iss: "http://issuer.example" },
      errors: false,
      warnings: [],
    });

    expect(result.isErr()).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result._unsafeUnwrapErr().input).toBe(DebuggerInputValues.JWT);
  });
});
