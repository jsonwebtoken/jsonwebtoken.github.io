import {
  DefaultTokensValues,
  DefaultTokenWithSecretModel,
} from "@/features/common/values/default-tokens.values";

export const algoTypeLabels: { [index: string]: string } = {
  HS: "HMACSHA",
  RS: "RSASHA",
  PS: "RSAPSSSHA",
  ES: "ECDSASHA",
};

export const DEFAULT_ALG = `HS256`;

export const DEFAULT_JWT = DefaultTokensValues[
  DEFAULT_ALG
] as DefaultTokenWithSecretModel;

export const DEFAULT_HEADER = JSON.stringify(
  {
    alg: "HS256",
    typ: "JWT",
  },
  null,
  2,
);

export const DEFAULT_PAYLOAD = JSON.stringify(
  {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022,
  },
  null,
  2,
);

export const DEFAULT_SYMMETRIC_SECRET = DEFAULT_JWT.secret;
