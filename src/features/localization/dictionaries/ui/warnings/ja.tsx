import React from "react";
import { WarningsUiDictionaryModel } from "@/features/localization/models/ui/warnings-ui-dictionary.model";

const CookiesModal: React.FC = () => {
  return (
    <span>
      <code>?token=[jwt]</code>のようなクエリ文字列の代わりにハッシュ
      <code>#token=[jwt]</code>
      をURLに追加し、トークンをプリロードしてください。
    </span>
  );
};

export const jaWarningsDictionary: WarningsUiDictionaryModel = {
  useHash: {
    Modal: CookiesModal,
  },
};
