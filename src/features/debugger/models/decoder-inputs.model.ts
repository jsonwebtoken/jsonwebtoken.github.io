import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export type DecoderInputsModel =
  | {
      algType: SigningAlgCategoryValues.SYMMETRIC;
      alg: string;
      jwt: string;
      symmetricSecretKey: string;
      symmetricSecretKeyEncoding: EncodingValues;
    }
  | {
      algType: SigningAlgCategoryValues.ASYMMETRIC;
      alg: string;
      jwt: string;
      asymmetricPublicKey: string;
      asymmetricPublicKeyFormat: AsymmetricKeyFormatValues;
    }
  | {
      algType: SigningAlgCategoryValues.NONE;
      alg: string;
      jwt: string;
    }
  | {
      algType: SigningAlgCategoryValues.NOOP;
      alg: string;
      jwt: string;
    };
