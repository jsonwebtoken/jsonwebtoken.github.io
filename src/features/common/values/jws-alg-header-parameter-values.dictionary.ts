export interface JwsAlgHeaderParameterModel {
  name: string;
  description: string;
  curves?: string[];
}

export interface JwsAlgHeaderParameterValuesDictionaryModel {
  unsecured: {
    [index: string]: JwsAlgHeaderParameterModel;
    none: JwsAlgHeaderParameterModel;
  };
  mac: {
    [index: string]: JwsAlgHeaderParameterModel;
    HS256: JwsAlgHeaderParameterModel;
    HS384: JwsAlgHeaderParameterModel;
    HS512: JwsAlgHeaderParameterModel;
  };
  digitalSignature: {
    [index: string]: JwsAlgHeaderParameterModel;
    RS256: JwsAlgHeaderParameterModel;
    RS384: JwsAlgHeaderParameterModel;
    RS512: JwsAlgHeaderParameterModel;
    ES256: JwsAlgHeaderParameterModel;
    ES384: JwsAlgHeaderParameterModel;
    ES512: JwsAlgHeaderParameterModel;
    PS256: JwsAlgHeaderParameterModel;
    PS384: JwsAlgHeaderParameterModel;
    PS512: JwsAlgHeaderParameterModel;
    Ed25519: JwsAlgHeaderParameterModel;
    Ed448: JwsAlgHeaderParameterModel;
  };
}

export const jwsExampleAlgHeaderParameterValuesDictionary: JwsAlgHeaderParameterValuesDictionaryModel =
  {
    unsecured: {
      none: {
        name: "none",
        description: "No digital signature or MAC or performed",
      },
    },
    mac: {
      HS256: {
        name: "HS256",
        description: "HMAC using SHA-256",
      },
      HS384: { name: "HS384", description: "HMAC using SHA-256" },
      HS512: { name: "HS512", description: "HMAC using SHA-256" },
    },
    digitalSignature: {
      RS256: { name: "RS256", description: "HMAC using SHA-256" },
      RS384: { name: "RS384", description: "HMAC using SHA-256" },
      RS512: { name: "RS512", description: "HMAC using SHA-256" },
      ES256: { name: "ES256", description: "HMAC using SHA-256" },
      ES384: { name: "ES384", description: "HMAC using SHA-256" },
      ES512: { name: "ES512", description: "HMAC using SHA-256" },
      PS256: { name: "PS256", description: "HMAC using SHA-256" },
      PS384: { name: "PS384", description: "HMAC using SHA-256" },
      PS512: { name: "PS512", description: "HMAC using SHA-256" },
      Ed25519: {
        name: "EdDSA (Ed25519)",
        description: "Edwards-curve Digital Signature Algorithm",
      },
      Ed448: {
        name: "EdDSA (Ed448)",
        description: "Edwards-curve Digital Signature Algorithm",
      },
    },
  };

export interface JwsExampleAlgHeaderParameterValuesDictionaryModel {
  none: {
    [index: string]: JwsAlgHeaderParameterModel;
    none: JwsAlgHeaderParameterModel;
  };
  mac: {
    [index: string]: JwsAlgHeaderParameterModel;
    HS256: JwsAlgHeaderParameterModel;
    HS384: JwsAlgHeaderParameterModel;
    HS512: JwsAlgHeaderParameterModel;
  };
  digitalSignature: {
    [index: string]: JwsAlgHeaderParameterModel;
    RS256: JwsAlgHeaderParameterModel;
    RS384: JwsAlgHeaderParameterModel;
    RS512: JwsAlgHeaderParameterModel;
    ES256: JwsAlgHeaderParameterModel;
    ES384: JwsAlgHeaderParameterModel;
    ES512: JwsAlgHeaderParameterModel;
    PS256: JwsAlgHeaderParameterModel;
    PS384: JwsAlgHeaderParameterModel;
    PS512: JwsAlgHeaderParameterModel;
    EdDSA: JwsAlgHeaderParameterModel;
  };
}

export const jwsAlgHeaderParameterValuesDictionary: JwsExampleAlgHeaderParameterValuesDictionaryModel =
  {
    none: {
      none: {
        name: "none",
        description: "Unsecured JWT",
      },
    },
    mac: {
      HS256: {
        name: "HS256",
        description: "HMAC using SHA-256",
      },
      HS384: { name: "HS384", description: "HMAC using SHA-256" },
      HS512: { name: "HS512", description: "HMAC using SHA-256" },
    },
    digitalSignature: {
      RS256: { name: "RS256", description: "HMAC using SHA-256" },
      RS384: { name: "RS384", description: "HMAC using SHA-256" },
      RS512: { name: "RS512", description: "HMAC using SHA-256" },
      ES256: { name: "ES256", description: "HMAC using SHA-256" },
      ES384: { name: "ES384", description: "HMAC using SHA-256" },
      ES512: { name: "ES512", description: "HMAC using SHA-256" },
      PS256: { name: "PS256", description: "HMAC using SHA-256" },
      PS384: { name: "PS384", description: "HMAC using SHA-256" },
      PS512: { name: "PS512", description: "HMAC using SHA-256" },
      EdDSA: {
        name: "EdDSA",
        description: "Edwards-curve Digital Signature Algorithm",
      },
    },
  };

export const algDictionary = {
  NONE: "none",
  ES512: "ES512",
  ECDSA: "ECDSA",
  EdDSA: "EdDSA",
  Ed25519: "Ed25519",
  Ed448: "Ed448",
};
