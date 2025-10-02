import { PickersUiDictionaryModel } from "@/features/localization/models/ui/pickers-ui-dictionary.model";

export const enPickersUiDictionary: PickersUiDictionaryModel = {
  algPicker: {
    label: "Algorithm",
    compactLabel: "Alg",
    description: "Generate a JWT",
  },
  exampleAlgPicker: {
    label: "Generate example",
    compactLabel: "Alg",
    defaultValue: "Select signing algorithm",
    description: "Generate a JWT",
    closeButton: {
      label: "Close signing algorithm list",
    },
  },
  encodingFormatPicker: {
    label: "Encoding Format",
  },
  publicKeyFormatPicker: {
    label: "Public Key Format",
  },
  privateKeyFormatPicker: {
    label: "Private Key Format",
  },
};
