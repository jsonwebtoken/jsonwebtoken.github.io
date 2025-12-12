"use client";

import React from "react";
import styles from "@/features/localization/dictionaries/ui/modals/footer.module.scss";
import { ModalsUiDictionaryModel } from "@/features/localization/models/ui/modals-ui-dictionary.model";

const CookiesModal: React.FC = () => {
  return (
    <>
      If you wish to opt out of this sharing of your personal data in connection
      with cookies, please update your{" "}
      <button
        className={styles.modalButton}
        onClick={() => window.OneTrust.ToggleInfoDisplay()}
      >
        cookie settings
      </button>
      .
    </>
  );
};

const EmailModal: React.FC = () => {
  return (
    <>
      If you wish to opt out of email-based sharing, provide your email address
      at{" "}
      <a
        className={styles.modalLink}
        href="https://www.okta.com/your-privacy-choices"
        target="_blank"
        rel="noopener noreferrer"
      >
        this link
      </a>
      .
    </>
  );
};

export const enModalsDictionary: ModalsUiDictionaryModel = {
  cookies: {
    Modal: CookiesModal,
  },
  email: {
    Modal: EmailModal,
  },
};
