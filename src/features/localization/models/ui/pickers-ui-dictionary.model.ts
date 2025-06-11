export interface PickersUiDictionaryModel {
  algPicker: {
    label: string;
    compactLabel: string;
    description: string;
  };
  exampleAlgPicker: {
    label: string;
    compactLabel: string;
    defaultValue: string;
    description: string;
    closeButton: {
      label: string;
    };
  };
  encodingFormatPicker: {
    label: string;
  };
  publicKeyFormatPicker: {
    label: string;
  };
  privateKeyFormatPicker: {
    label: string;
  };
}
