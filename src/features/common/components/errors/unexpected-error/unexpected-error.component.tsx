"use client";

import React from "react";
import { BoxComponent } from "@/features/common/components/box/box.component";
import styles from "./unexpected-error.module.scss";
import { usePathname } from "next/navigation";
import { LANGUAGE_CODES } from "@/features/localization/localization.config";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { getPathnameSegments } from "@/libs/utils/path.utils";
import { ErrorBannerComponent } from "@/features/common/components/errors/error-banner/error-banner.component";

interface UnexpectedErrorComponentProps {
  metadata: LayoutDictionaryModel["errors"]["unexpectedError"];
  reset?: () => void;
}

export const UnexpectedErrorComponent: React.FC<
  UnexpectedErrorComponentProps
> = ({ metadata, reset }) => {
  const pathname = usePathname();
  const pathnameSegments = getPathnameSegments(pathname);
  const languageCode =
    pathnameSegments[0] && LANGUAGE_CODES.includes(pathnameSegments[0])
      ? pathnameSegments[0]
      : "";

  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
    >
      <ErrorBannerComponent
        languageCode={languageCode}
        message={metadata.message}
        navLink={{
          path: metadata.actions.report.path,
          label: metadata.actions.report.label,
          shouldOpenNewTab: true,
        }}
        ctaButton={
          reset
            ? {
                label: metadata.actions.tryAgain.label,
                handleClick: reset,
              }
            : null
        }
      />
    </BoxComponent>
  );
};
