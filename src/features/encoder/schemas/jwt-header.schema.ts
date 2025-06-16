import { z } from "zod";
import { isSupportedAlg } from "@/features/common/services/jwt.service";

export const JwtHeaderEncoderSchema = z.object({
  alg: z
    .string({
      required_error: `Missing "alg" claim in header. Required by [RFC 7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1).`,
      invalid_type_error:
        '"alg" claim value must be a string as specified by [RFC 7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1)',
    })
    .refine((value) => isSupportedAlg(value), {
      message: `Invalid cryptographic algorithm. Only use "alg" parameter values in the header as defined by [RFC 7518 (JSON Web Algorithms)](https://datatracker.ietf.org/doc/html/rfc7518#section-3.1).`,
    }),
});

export const JwtHeaderDecoderSchema = z.object({
  alg: z
    .string({
      required_error: `Missing "alg" claim in header. Required by [RFC 7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1).`,
      invalid_type_error:
        '"alg" claim value must be a string as specified by [RFC 7515 (JSON Web Signature)](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1)',
    })
    .superRefine((value, ctx) => {
      if (!isSupportedAlg(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The ${value} algorithm is not supported by this tool, which only supports JWTs that use the JWS Compact Serialization.`,
        });
      }

      return;
    }),
});
