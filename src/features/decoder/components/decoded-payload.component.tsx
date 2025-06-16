"use client";

import React from "react";
import "prismjs/components/prism-json";
import { JsonViewerComponent } from "@/features/common/components/json-viewer/json-viewer.component";
import { jwtClaimsTooltipDictionary } from "@/features/decoder/jwt-claims.dictionary";

interface DecodedPayloadComponentProps {
  decodedPayload: string;
}

export const DecodedPayloadComponent: React.FC<
  DecodedPayloadComponentProps
> = ({ decodedPayload }) => {
  return (
    <JsonViewerComponent
      jsonString={decodedPayload}
      tooltips={jwtClaimsTooltipDictionary}
    />
  );
};
