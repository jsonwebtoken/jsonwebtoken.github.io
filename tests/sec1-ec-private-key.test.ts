import { describe, expect, test } from "vitest";
import {
  getAsymmetricKeyCryptoKey,
  signWithAsymmetricPrivateKey,
  verifyDigitallySignedJwt,
} from "@/features/common/services/jwt.service";
import { convertSec1EcPrivateKeyToPkcs8 } from "@/features/common/services/sec1-ec-private-key.service";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

const pem = (lines: string[]) => lines.join("\n");

// Generated with `openssl ecparam -genkey -noout`, `openssl pkcs8 -topk8 -nocrypt`
// and `openssl ec -pubout`.
const ecKeys = {
  ES256: {
    sec1: pem(["-----BEGIN EC PRIVATE KEY-----", "MHcCAQEEIGVO/eFcax0cgQ1UE5dMrdKicPsEJB+JEYgsVpzsvXXKoAoGCCqGSM49", "AwEHoUQDQgAE+wqjW5QaNLLkRTnFibBrLmPwmv6Lxl1E6H81YaHw/7qIvtbC71+U", "PRHgx2Lirf6fLp+8iHgyPEbzVCxoVDtdvg==", "-----END EC PRIVATE KEY-----"]),
    pkcs8: pem(["-----BEGIN PRIVATE KEY-----", "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgZU794VxrHRyBDVQT", "l0yt0qJw+wQkH4kRiCxWnOy9dcqhRANCAAT7CqNblBo0suRFOcWJsGsuY/Ca/ovG", "XUTofzVhofD/uoi+1sLvX5Q9EeDHYuKt/p8un7yIeDI8RvNULGhUO12+", "-----END PRIVATE KEY-----"]),
    pub: pem(["-----BEGIN PUBLIC KEY-----", "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+wqjW5QaNLLkRTnFibBrLmPwmv6L", "xl1E6H81YaHw/7qIvtbC71+UPRHgx2Lirf6fLp+8iHgyPEbzVCxoVDtdvg==", "-----END PUBLIC KEY-----"]),
  },
  ES384: {
    sec1: pem(["-----BEGIN EC PRIVATE KEY-----", "MIGkAgEBBDDOiWzUZhqT3lxKtxnZYyqozvUDfUn1ekYBZYleI7FaEQ4UCNrUVxoG", "wTyUmyIXtvigBwYFK4EEACKhZANiAAQDZ17H1w8LJlNlyIdtJ7dqbcY/z319fARy", "g/90cNqeT2XohpS6GyP8JaXbZlnKLHz88qDBx4CaA3bgrPSjwBAL+uF3CwKjhSs7", "JSb8AGNH2oyUNN80k1FT9T7TAPiI2Rg=", "-----END EC PRIVATE KEY-----"]),
    pkcs8: pem(["-----BEGIN PRIVATE KEY-----", "MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDDOiWzUZhqT3lxKtxnZ", "YyqozvUDfUn1ekYBZYleI7FaEQ4UCNrUVxoGwTyUmyIXtvihZANiAAQDZ17H1w8L", "JlNlyIdtJ7dqbcY/z319fARyg/90cNqeT2XohpS6GyP8JaXbZlnKLHz88qDBx4Ca", "A3bgrPSjwBAL+uF3CwKjhSs7JSb8AGNH2oyUNN80k1FT9T7TAPiI2Rg=", "-----END PRIVATE KEY-----"]),
    pub: pem(["-----BEGIN PUBLIC KEY-----", "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEA2dex9cPCyZTZciHbSe3am3GP899fXwE", "coP/dHDank9l6IaUuhsj/CWl22ZZyix8/PKgwceAmgN24Kz0o8AQC/rhdwsCo4Ur", "OyUm/ABjR9qMlDTfNJNRU/U+0wD4iNkY", "-----END PUBLIC KEY-----"]),
  },
  ES512: {
    sec1: pem(["-----BEGIN EC PRIVATE KEY-----", "MIHcAgEBBEIBhkQwKFQvB3btYL/BW1Kz387SJXwLQSGvw3q6Afa2EZC0XT2l77Lx", "CCfRz7ilAQbxPc6MyVGKnKTTePCHh6kQv/6gBwYFK4EEACOhgYkDgYYABAFUt5Bx", "ehHtLp9oOXNw8Ds6WWssHSxfTxKiWtGtcpd5JJmkG+177y9JrygsMX6Ojm/ZfrDj", "qFkGONzQ3wRe9YjjZQHc+FN1DhscQ6h4UPBUNndJRKy/wTb/SP0jE8Mc6YWoh5vq", "Lmh6PdrzMGB0UT8p6MmEFQDYhWoIHp6iRlQ/9201fA==", "-----END EC PRIVATE KEY-----"]),
    pkcs8: pem(["-----BEGIN PRIVATE KEY-----", "MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBhkQwKFQvB3btYL/B", "W1Kz387SJXwLQSGvw3q6Afa2EZC0XT2l77LxCCfRz7ilAQbxPc6MyVGKnKTTePCH", "h6kQv/6hgYkDgYYABAFUt5BxehHtLp9oOXNw8Ds6WWssHSxfTxKiWtGtcpd5JJmk", "G+177y9JrygsMX6Ojm/ZfrDjqFkGONzQ3wRe9YjjZQHc+FN1DhscQ6h4UPBUNndJ", "RKy/wTb/SP0jE8Mc6YWoh5vqLmh6PdrzMGB0UT8p6MmEFQDYhWoIHp6iRlQ/9201", "fA==", "-----END PRIVATE KEY-----"]),
    pub: pem(["-----BEGIN PUBLIC KEY-----", "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBVLeQcXoR7S6faDlzcPA7OllrLB0s", "X08SolrRrXKXeSSZpBvte+8vSa8oLDF+jo5v2X6w46hZBjjc0N8EXvWI42UB3PhT", "dQ4bHEOoeFDwVDZ3SUSsv8E2/0j9IxPDHOmFqIeb6i5oej3a8zBgdFE/KejJhBUA", "2IVqCB6eokZUP/dtNXw=", "-----END PUBLIC KEY-----"]),
  },
} as const;

const sec1WithCurveParameters = pem(["-----BEGIN EC PARAMETERS-----", "BggqhkjOPQMBBw==", "-----END EC PARAMETERS-----", "-----BEGIN EC PRIVATE KEY-----", "MHcCAQEEIEFMkZys1GVqIfKKVh7xD6s7SJMSbVJrnHdYV2mC9w3doAoGCCqGSM49", "AwEHoUQDQgAERBWHf5bkbRrQ4iixJqQjIGzMCx77cGbrSjLPUTOB60qZBlOjk6Uk", "ajaFTz1cHW9qQn6tD2MDbuneX2uVM94O1A==", "-----END EC PRIVATE KEY-----"]);
const encryptedSec1 = pem(["-----BEGIN EC PRIVATE KEY-----", "Proc-Type: 4,ENCRYPTED", "DEK-Info: AES-256-CBC,43350ED0D6F2A3D8198CEA5EB7DEFE64", "", "NaXCpZowzEhUd3JZjW90P/+h/c5jX6667o36NJ+ShaPlGooNyrMco90mGnbM2aEE", "9fRCHAakHfVxQyvd9dgTyjJPqe7Rr2fiIISerTI2sgdYBgrO/w97r9ovcA+8gyTj", "8CrIp1KL3rk1rXJ8gL/9zzhERzndqRDu6iW4pWFhgP4=", "-----END EC PRIVATE KEY-----"]);

type EcAlg = keyof typeof ecKeys;

const ecAlgs = Object.keys(ecKeys) as EcAlg[];

describe("convertSec1EcPrivateKeyToPkcs8", () => {
  test.each(ecAlgs)("matches the OpenSSL PKCS#8 output for %s", (alg) => {
    const result = convertSec1EcPrivateKeyToPkcs8(ecKeys[alg].sec1);

    expect(result._unsafeUnwrap()).toBe(ecKeys[alg].pkcs8);
  });

  test("ignores the EC PARAMETERS block that `openssl ecparam -genkey` emits", () => {
    const result = convertSec1EcPrivateKeyToPkcs8(sec1WithCurveParameters);

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toMatch(/^-----BEGIN PRIVATE KEY-----/);
  });

  test("rejects encrypted keys with an actionable message", () => {
    const result = convertSec1EcPrivateKeyToPkcs8(encryptedSec1);

    expect(result._unsafeUnwrapErr()).toContain("Encrypted EC private keys");
  });

  test("rejects malformed keys", () => {
    const malformed = [
      "-----BEGIN EC PRIVATE KEY-----",
      "AAAA",
      "-----END EC PRIVATE KEY-----",
    ].join("\n");

    expect(convertSec1EcPrivateKeyToPkcs8(malformed).isErr()).toBe(true);
  });
});

describe("SEC1 EC private keys", () => {
  test.each(ecAlgs)("are imported for %s", async (alg) => {
    const result = await getAsymmetricKeyCryptoKey(
      ecKeys[alg].sec1,
      alg,
      AsymmetricKeyFormatValues.PEM,
    );

    expect(result.isOk()).toBe(true);
  });

  test.each(ecAlgs)("sign a JWT that %s public key verifies", async (alg) => {
    const signed = await signWithAsymmetricPrivateKey(
      { alg, typ: "JWT" },
      { sub: "1234567890" },
      ecKeys[alg].sec1,
      AsymmetricKeyFormatValues.PEM,
    );

    const verified = await verifyDigitallySignedJwt({
      jwt: signed._unsafeUnwrap(),
      alg,
      asymmetricPublicKey: ecKeys[alg].pub,
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues.PEM,
    });

    expect(verified.isOk()).toBe(true);
  });

  test("reject a key whose curve does not match the algorithm", async () => {
    const result = await getAsymmetricKeyCryptoKey(
      ecKeys.ES256.sec1,
      "ES384",
      AsymmetricKeyFormatValues.PEM,
    );

    expect(result.isErr()).toBe(true);
  });

  test("keep PKCS#8 keys working unchanged", async () => {
    const result = await getAsymmetricKeyCryptoKey(
      ecKeys.ES256.pkcs8,
      "ES256",
      AsymmetricKeyFormatValues.PEM,
    );

    expect(result.isOk()).toBe(true);
  });
});
