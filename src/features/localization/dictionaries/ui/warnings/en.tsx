import React from "react";
import { WarningsUiDictionaryModel } from "@/features/localization/models/ui/warnings-ui-dictionary.model";

const CookiesModal: React.FC = () => {
  return (
    <span>
      Use a hash <code>#token=[jwt]</code> in the URL to preload a token instead
      of a query parameter, such <code>?token=[jwt]</code>.
    </span>
  );
};

export const enWarningsDictionary: WarningsUiDictionaryModel = {
  useHash: {
    Modal: CookiesModal,
  },
};
