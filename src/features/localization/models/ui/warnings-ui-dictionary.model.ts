import React from "react";

export interface WarningsUiDictionaryModel {
  [index: string]: {
    Modal: React.FC;
  };
  useHash: {
    Modal: React.FC;
  };
}
