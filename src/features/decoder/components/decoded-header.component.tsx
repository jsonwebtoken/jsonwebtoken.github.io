"use client";

import React from "react";
import { JsonViewerComponent } from "@/features/common/components/json-viewer/json-viewer.component";
import { jwtClaimsTooltipDictionary } from "@/features/decoder/jwt-claims.dictionary";

interface DecodedHeaderComponentProps {
  decodedHeader: string;
}

export const DecodedHeaderComponent: React.FC<DecodedHeaderComponentProps> = ({
  decodedHeader,
}) => {
  return (
    <JsonViewerComponent
      jsonString={decodedHeader}
      tooltips={jwtClaimsTooltipDictionary}
    />
  );
};
