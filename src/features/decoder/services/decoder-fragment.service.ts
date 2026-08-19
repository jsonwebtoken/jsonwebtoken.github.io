import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";
import { detectAsymmetricKeyFormat } from "@/features/common/services/asymmetric-key-input.service";

const TOKEN_PARAM_PRIORITY = [
  "id_token",
  "access_token",
  "value",
  "token",
] as const;
const LEGACY_TOKEN_PARAM = "debugger-io?token";
const PUBLIC_KEY_PARAM = "publicKey";

const TOKEN_PARAMS = new Set<string>([
  ...TOKEN_PARAM_PRIORITY,
  LEGACY_TOKEN_PARAM,
]);

export type DecoderFragmentResult = {
  jwt?: string;
  publicKey?: string;
  publicKeyFormat?: AsymmetricKeyFormatValues;
  normalizedHash?: string;
};

const normalizeLegacyFragment = (
  params: URLSearchParams,
  jwt: string,
  publicKey?: string,
): string => {
  const normalizedParams = new URLSearchParams();

  normalizedParams.set("token", jwt);

  if (publicKey) {
    normalizedParams.set(PUBLIC_KEY_PARAM, publicKey);
  }

  params.forEach((value, key) => {
    if (TOKEN_PARAMS.has(key) || key === PUBLIC_KEY_PARAM) {
      return;
    }

    normalizedParams.append(key, value);
  });

  return `#${normalizedParams.toString()}`;
};

export const parseDecoderFragment = (hash: string): DecoderFragmentResult => {
  if (!hash.startsWith("#")) {
    return {};
  }

  const params = new URLSearchParams(hash.slice(1));
  let jwt: string | undefined;

  for (const tokenParam of TOKEN_PARAM_PRIORITY) {
    const candidate = params.get(tokenParam);

    if (candidate) {
      jwt = candidate;
      break;
    }
  }

  const legacyJwt = params.get(LEGACY_TOKEN_PARAM) || undefined;
  const usesLegacySyntax = jwt === undefined && legacyJwt !== undefined;

  if (usesLegacySyntax) {
    jwt = legacyJwt;
  }

  const publicKey = params.get(PUBLIC_KEY_PARAM) || undefined;
  if (!jwt) {
    return {};
  }

  const result: DecoderFragmentResult = { jwt };

  if (publicKey) {
    result.publicKey = publicKey;
    result.publicKeyFormat =
      detectAsymmetricKeyFormat(publicKey) ?? AsymmetricKeyFormatValues.PEM;
  }

  if (usesLegacySyntax) {
    result.normalizedHash = normalizeLegacyFragment(params, jwt, publicKey);
  }

  return result;
};
