import React from "react";
import { WarningsUiDictionaryModel } from "@/features/localization/models/ui/warnings-ui-dictionary.model";

const CookiesModal: React.FC = () => {
  return (
    <span>
      Bir token ön yüklemek için sorgu parametresi (<code>?token=[jwt]</code>)
      yerine URL içinde hash <code>#token=[jwt]</code> kullanın.
    </span>
  );
};

export const trWarningsDictionary: WarningsUiDictionaryModel = {
  useHash: {
    Modal: CookiesModal,
  },
};
