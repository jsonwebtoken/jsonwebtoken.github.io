export interface EncoderDictionaryModel {
  title: string;
  compactTitle: string;
  description: string;
  syncButton: {
    label: string;
    compactLabel: string;
  };
  unsyncButton: {
    label: string;
    compactLabel: string;
  };
  exampleGenerator: {
    label: string;
  };
  headerEditor: {
    title: string;
    compactTitle: string;
    successMessage: string;
  };
  payloadEditor: {
    title: string;
    compactTitle: string;
    successMessage: string;
  };
  signatureEditor: {
    title: {
      secret: string;
      privateKey: string;
    };
    compactTitle: {
      secret: string;
      privateKey: string;
    };
    successMessage: {
      secret: string;
      privateKey: string;
    };
    placeholder: {
      privateKey: string;
    };
  };
  encodedJwt: {
    title: string;
  };
}
