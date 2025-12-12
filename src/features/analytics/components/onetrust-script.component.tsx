import Script from "next/script";
import React from "react";
import { COOKIE_CONSENT_STATUS } from "@/features/analytics/models/cookie-consent-status.constants";

interface OneTrustScriptProps {
  id: string;
}

export const OnetrustScriptComponent: React.FC<OneTrustScriptProps> = ({
  id,
}) => (
  <>
    <Script
      src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      type="text/javascript"
      data-domain-script={id}
      id="consent-script"
    />
    <Script
      id="consent-wrapper"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
    function OptanonWrapper() {
      const consentStatus = document.getElementById("onetrust-accept-btn-handler") ? '${COOKIE_CONSENT_STATUS.WAITING_FOR_CONSENT}' : '${COOKIE_CONSENT_STATUS.EXPRESSED_CONSENT}';
      window.top.postMessage(consentStatus, '*');
    }
  `,
      }}
    />
  </>
);
