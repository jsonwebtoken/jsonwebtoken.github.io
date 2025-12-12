import { SigningAlgCategoryValues } from "@/features/common/values/signing-alg-category.values";
import { EncodingValues } from "@/features/common/values/encoding.values";
import { AsymmetricKeyFormatValues } from "@/features/common/values/asymmetric-key-format.values";

export type EncoderInputsModel =
  | {
      algType: SigningAlgCategoryValues.SYMMETRIC;
      alg: string;
      header: string;
      payload: string;
      symmetricSecretKey: string;
      symmetricSecretKeyEncoding: EncodingValues;
    }
  | {
      algType: SigningAlgCategoryValues.ASYMMETRIC;
      alg: string;
      header: string;
      payload: string;
      asymmetricPrivateKey: string;
      asymmetricPrivateKeyFormat: AsymmetricKeyFormatValues;
    }
  | {
      algType: SigningAlgCategoryValues.NONE;
      alg: string;
      header: string;
      payload: string;
    }
  | {
      algType: SigningAlgCategoryValues.NOOP;
      alg: string;
      header: string;
      payload: string;
    };
