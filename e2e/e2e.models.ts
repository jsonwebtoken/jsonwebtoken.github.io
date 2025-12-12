import { EncodingValues } from "@/features/common/values/encoding.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export interface UnsecuredJwtModel {
  type: "unsecured";
  header: string;
  payload: string;
  jwt: string;
}

export interface JwtSignedWithHmacModel {
  type: "hmac";
  withUtf8Secret: {
    header: string;
    payload: string;
    secret: string;
    jwt: string;
    secretEncoding: EncodingValues.UTF8;
  };
  withBase64urlSecret: {
    header: string;
    payload: string;
    secret: string;
    jwt: string;
    secretEncoding: EncodingValues.BASE64URL;
  };
}

export interface JwtSignedWithDigitalModel {
  type: "digital";
  withPemKey: {
    header: string;
    payload: string;
    publicKey: string;
    publicKeyFormat: AsymmetricKeyFormatValues.PEM;
    privateKey: string;
    privateKeyFormat: AsymmetricKeyFormatValues.PEM;
    jwt: string;
  };
  withJwkKey: {
    header: string;
    payload: string;
    publicKey: object;
    publicKeyFormat: AsymmetricKeyFormatValues.JWK;
    privateKey: object;
    privateKeyFormat: AsymmetricKeyFormatValues.JWK;
    jwt: string;
  };
}

export type JwtDictionaryEntryModel =
  | UnsecuredJwtModel
  | JwtSignedWithHmacModel
  | JwtSignedWithDigitalModel;

export interface JwtDictionaryModel {
  byAlgorithm: {
    [index: string]: JwtDictionaryEntryModel;
    none: JwtDictionaryEntryModel;
    HS256: JwtDictionaryEntryModel;
    HS384: JwtDictionaryEntryModel;
    HS512: JwtDictionaryEntryModel;
    RS256: JwtDictionaryEntryModel;
    RS384: JwtDictionaryEntryModel;
    RS512: JwtDictionaryEntryModel;
    ES256: JwtDictionaryEntryModel;
    ES384: JwtDictionaryEntryModel;
    ES512: JwtDictionaryEntryModel;
    PS256: JwtDictionaryEntryModel;
    PS384: JwtDictionaryEntryModel;
    PS512: JwtDictionaryEntryModel;
    Ed25519: JwtDictionaryEntryModel;
  };
}
