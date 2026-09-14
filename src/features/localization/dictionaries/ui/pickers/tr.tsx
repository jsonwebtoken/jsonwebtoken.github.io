import { PickersUiDictionaryModel } from "@/features/localization/models/ui/pickers-ui-dictionary.model";

export const trPickersUiDictionary: PickersUiDictionaryModel = {
  algPicker: {
    label: "Algoritma",
    compactLabel: "Alg",
    description: "Bir JWT oluştur",
  },
  exampleAlgPicker: {
    label: "Örnek oluştur",
    compactLabel: "Alg",
    defaultValue: "İmzalama algoritmasını seçin",
    description: "Bir JWT oluştur",
    closeButton: {
      label: "İmzalama algoritması listesini kapat",
    },
  },
  encodingFormatPicker: {
    label: "Kodlama Formatı",
  },
  publicKeyFormatPicker: {
    label: "Açık Anahtar Formatı",
  },
  privateKeyFormatPicker: {
    label: "Özel Anahtar Formatı",
  },
  base64checkbox: {
    label: "Base64URL Kodlanmış",
  },
};
