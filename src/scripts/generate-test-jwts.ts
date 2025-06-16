import { DefaultTokensValues } from "@/features/common/values/default-tokens.values";
import {
  generateKeyPairSync,
  JsonWebKeyInput,
  PrivateKeyInput,
  randomBytes,
} from "crypto";
import {
  getAlgSize,
  isDigitalSignatureAlg,
  isHmacAlg,
  isNoneAlg,
} from "@/features/common/services/jwt.service";
import { customAlphabet } from "nanoid";
import {
  CompactJWSHeaderParameters,
  CompactSign,
  exportJWK,
  KeyLike,
  UnsecuredJWT,
} from "jose";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { writeFileSync } from "node:fs";
import { join } from "path";
import { getAlgName } from "@/features/common/services/utils";
import { createPrivateKey } from "node:crypto";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import {
  JwtDictionaryEntryModel,
  JwtSignedWithDigitalModel,
  JwtSignedWithHmacModel,
  UnsecuredJwtModel,
} from "../../e2e/e2e.models";

const jwtDictionary: {
  byAlgorithm: {
    [index: string]:
      | UnsecuredJwtModel
      | JwtSignedWithHmacModel
      | JwtSignedWithDigitalModel;
  };
} = {
  byAlgorithm: {},
};

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const algs = Object.keys(DefaultTokensValues);

function createJwtWithPrivateKey(
  header: CompactJWSHeaderParameters,
  payload: object,
  key: PrivateKeyInput | string | Buffer | JsonWebKeyInput,
): Promise<string> {
  const jwsPayload = JSON.stringify(payload); // Convert payload to JSON string

  const privateKey = createPrivateKey(key);

  return new CompactSign(new TextEncoder().encode(jwsPayload))
    .setProtectedHeader(header)
    .sign(privateKey);
}

async function createJWT({
  header,
  payload,
  secret,
}: {
  header: CompactJWSHeaderParameters;
  payload: object;
  secret: Uint8Array | KeyLike;
}): Promise<string> {
  try {
    const jwsPayload = JSON.stringify(payload);

    return await new CompactSign(new TextEncoder().encode(jwsPayload))
      .setProtectedHeader(header)
      .sign(secret);
  } catch (error) {
    console.error("Failed to create JWT:", error);
    throw error;
  }
}

function generateBase64urlSecret(length: number) {
  if (length < 1) throw new Error("Length must be a positive integer");

  const secretBytes = randomBytes(length);

  return secretBytes.toString("base64url").replace(/=+$/, "");
}

function generateUtf8Secret(length: number) {
  if (length < 1) throw new Error("Length must be a positive integer");

  return customAlphabet(alphabet, length)();
}

interface KeyPair {
  publicKey: string;
  privateKey: string;
  publicJWK: any;
  privateJWK: any;
}

async function generateKeys(algorithm: string): Promise<KeyPair> {
  let keyPair;

  if (algorithm === "RS256") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 2048 });
  }
  if (algorithm === "RS384") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 3072 });
  }
  if (algorithm === "RS512") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 4096 });
  }
  if (algorithm === "ES256") {
    keyPair = generateKeyPairSync("ec", { namedCurve: "P-256" });
  }
  if (algorithm === "ES384") {
    keyPair = generateKeyPairSync("ec", { namedCurve: "P-384" });
  }
  if (algorithm === "ES512") {
    keyPair = generateKeyPairSync("ec", { namedCurve: "P-521" });
  }
  if (algorithm === "ES256K") {
    // Support for ES256K
    keyPair = generateKeyPairSync("ec", { namedCurve: "secp256k1" });
  }
  if (algorithm === "PS256") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 2048 });
  }
  if (algorithm === "PS384") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 3072 });
  }
  if (algorithm === "PS512") {
    keyPair = generateKeyPairSync("rsa", { modulusLength: 4096 });
  }
  if (algorithm === "Ed25519") {
    keyPair = generateKeyPairSync("ed25519");
  }
  if (algorithm === "Ed448") {
    // Support for Ed448
    keyPair = generateKeyPairSync("ed448");
  }

  if (!keyPair) {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  const publicJWK = await exportJWK(keyPair.publicKey);
  const privateJWK = await exportJWK(keyPair.privateKey);

  const publicKeyPEM = keyPair.publicKey
    .export({ type: "spki", format: "pem" })
    .toString();
  const privateKeyPEM = keyPair.privateKey
    .export({ type: "pkcs8", format: "pem" })
    .toString();

  return {
    publicKey: publicKeyPEM,
    privateKey: privateKeyPEM,
    publicJWK,
    privateJWK,
  };
}

(async function () {
  for (let i = 0; i < algs.length; i++) {
    const alg = algs[i];
    const cleanAlg = getAlgName(alg);

    const header = {
      alg: cleanAlg,
      type: "JWT",
    };

    const payload = {
      name: "Eric Arthur Blair",
      given_name: "Eric",
      middle_name: "Arthur",
      family_name: "Blair",
      nickname: "George Orwell",
      preferred_username: "Orwell",
      profile: "https://en.wikipedia.org/wiki/George_Orwell",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/George_Orwell_press_photo.jpg",
      website:
        "https://www.orwellfoundation.com/the-orwell-foundation/orwell/books-by-orwell/",
      birthdate: -2099242800,
      locale: "en-GB",
      updated_at: 441781200,
      zoneinfo: "Europe/London",
    };

    if (isNoneAlg(alg)) {
      const header = {
        alg: alg,
      };

      const unsecureJwt = new UnsecuredJWT(payload).encode();

      jwtDictionary.byAlgorithm[alg] = {
        type: "unsecured",
        header: JSON.stringify(header, null, 2).trim(),
        payload: JSON.stringify(payload, null, 2).trim(),
        jwt: unsecureJwt.trim(),
      } as JwtDictionaryEntryModel;

      continue;
    }

    if (isHmacAlg(alg)) {
      const getAlgSizeResult = getAlgSize(alg);

      if (getAlgSizeResult.isErr()) {
        console.error(`${alg} algorithm does not have a size.`);

        continue;
      }

      const { size: algSize } = getAlgSizeResult.value;

      const base64urlSecret = generateBase64urlSecret(algSize / 8);
      const utf8Secret = generateUtf8Secret(algSize / 8);

      const decoder = new TextEncoder();

      const jwtWithSymmetricUtf8EncodedSecret = await createJWT({
        header,
        payload,
        secret: decoder.encode(
          Buffer.from(utf8Secret, "utf-8").toString("binary"),
        ),
      });

      const jwtWithSymmetricBase64urlEncodedSecret = await createJWT({
        header,
        payload,
        secret: Buffer.from(base64urlSecret, "base64url"),
      });

      jwtDictionary.byAlgorithm[alg] = {
        type: "hmac",
        withUtf8Secret: {
          header: JSON.stringify(header, null, 2).trim(),
          payload: JSON.stringify(payload, null, 2).trim(),
          secret: utf8Secret.trim(),
          secretEncoding: EncodingValues.UTF8,
          jwt: jwtWithSymmetricUtf8EncodedSecret.trim(),
        },
        withBase64urlSecret: {
          header: JSON.stringify(header, null, 2).trim(),
          payload: JSON.stringify(payload, null, 2).trim(),
          secret: base64urlSecret.trim(),
          secretEncoding: EncodingValues.BASE64URL,
          jwt: jwtWithSymmetricBase64urlEncodedSecret.trim(),
        },
      } as JwtDictionaryEntryModel;
    }

    if (isDigitalSignatureAlg(cleanAlg)) {
      const { privateKey, privateJWK, publicKey, publicJWK } =
        await generateKeys(alg);

      const jwtWithPemPrivateKey = await createJwtWithPrivateKey(
        header,
        payload,
        {
          key: privateKey,
          type: "pkcs8",
          format: "pem",
        },
      );

      const jwtWithJwkPrivateKey = await createJwtWithPrivateKey(
        header,
        payload,
        {
          key: privateJWK,
          format: "jwk",
        },
      );

      jwtDictionary.byAlgorithm[alg] = {
        type: "digital",
        withPemKey: {
          header: JSON.stringify(header, null, 2).trim(),
          payload: JSON.stringify(payload, null, 2).trim(),
          publicKey: publicKey.trim(),
          publicKeyFormat: AsymmetricKeyFormatValues.PEM,
          privateKey: privateKey.trim(),
          privateKeyFormat: AsymmetricKeyFormatValues.PEM,
          jwt: jwtWithPemPrivateKey.trim(),
        },
        withJwkKey: {
          header: JSON.stringify(header, null, 2).trim(),
          payload: JSON.stringify(payload, null, 2).trim(),
          publicKey: publicJWK,
          publicKeyFormat: AsymmetricKeyFormatValues.JWK,
          privateKey: privateJWK,
          privateKeyFormat: AsymmetricKeyFormatValues.JWK,
          jwt: jwtWithJwkPrivateKey.trim(),
        },
      } as JwtDictionaryEntryModel;
    }
  }

  writeFileSync(
    join(".", "jwt.json"),
    JSON.stringify(jwtDictionary, null, 2),
    "utf8",
  );
})();
