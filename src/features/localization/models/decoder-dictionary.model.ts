export interface DecoderDictionaryModel {
  title: string;
  compactTitle: string;
  description: string;
  syncButton: {
    label: string;
    compactLabel: string;
  };
  jwtEditor: {
    headline: string;
    label: string;
    title: string;
    compactTitle: string;
    successMessage: string;
    autoFocusLabel: string;
  };
  exampleGenerator: {
    label: string;
  };
  decodedHeader: {
    title: string;
    tabs: {
      json: {
        label: string;
      };
      claims: {
        label: string;
      };
    };
  };
  decodedPayload: {
    title: string;
    tabs: {
      json: {
        label: string;
      };
      claims: {
        label: string;
      };
    };
  };
  signatureVerification: {
    title: string;
    subtitle: string;
    description: {
      secret: string;
      publicKey: string;
    };
    editor: {
      title: {
        secret: string;
        publicKey: string;
      };
      successMessage: {
        secret: string;
        publicKey: string;
      };
      placeholder: {
        secret: string;
        publicKey: string;
      };
    };
  };
}
