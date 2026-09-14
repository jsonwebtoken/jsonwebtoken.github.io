"use client";

import React from "react";
import styles from "@/features/localization/dictionaries/ui/modals/footer.module.scss";
import { ModalsUiDictionaryModel } from "@/features/localization/models/ui/modals-ui-dictionary.model";

const CookiesModal: React.FC = () => {
  return (
    <>
      Kişisel verilerinizin çerezlerle bağlantılı paylaşımından vazgeçmek
      istiyorsanız, lütfen{" "}
      <button
        className={styles.modalButton}
        onClick={() => window.OneTrust.ToggleInfoDisplay()}
      >
        çerez ayarlarınızı
      </button>{" "}
      güncelleyin.
    </>
  );
};

const EmailModal: React.FC = () => {
  return (
    <>
      E-posta tabanlı paylaşımdan vazgeçmek istiyorsanız, e-posta adresinizi{" "}
      <a
        className={styles.modalLink}
        href="https://www.okta.com/your-privacy-choices"
        target="_blank"
        rel="noopener noreferrer"
      >
        bu bağlantıda
      </a>{" "}
      belirtin.
    </>
  );
};

export const trModalsDictionary: ModalsUiDictionaryModel = {
  cookies: {
    Modal: CookiesModal,
  },
  email: {
    Modal: EmailModal,
  },
};
