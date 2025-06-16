import React from "react";

export interface ModalsUiDictionaryModel {
  [index: string]: {
    Modal: React.FC;
  };
  cookies: {
    Modal: React.FC;
  };
  email: {
    Modal: React.FC;
  };
}
