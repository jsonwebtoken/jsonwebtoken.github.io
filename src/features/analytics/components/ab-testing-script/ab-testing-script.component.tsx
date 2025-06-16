import React, { useEffect } from "react";

const dataLayerInfo = {
  event: "ab-viewed",
  experiment: "JWT_NEW_DESIGN",
  variation: "variant",
};

export const AbTestingScriptComponent: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!window.digitalData) {
      window.digitalData = {};
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.digitalData.abInfo = dataLayerInfo;
    window.dataLayer.push(dataLayerInfo);
  }, []);

  return <></>;
};
