import { PickersUiDictionaryModel } from "@/features/localization/models/ui/pickers-ui-dictionary.model";

export const jaPickersUiDictionary: PickersUiDictionaryModel = {
  algPicker: {
    label: "アルゴリズム",
    compactLabel: "Alg",
    description: "JWTを生成",
  },
  exampleAlgPicker: {
    label: "サンプルを生成",
    compactLabel: "Alg",
    defaultValue: "署名アルゴリズムを選択",
    description: "JWTを生成",
    closeButton: {
      label: "署名アルゴリズムのリストを閉じる",
    },
  },
  encodingFormatPicker: {
    label: "エンコード形式",
  },
  publicKeyFormatPicker: {
    label: "公開鍵の形式",
  },
  privateKeyFormatPicker: {
    label: "秘密鍵の形式",
  },
  base64checkbox: {
    label: "Base64URLエンコード",
  },
};
