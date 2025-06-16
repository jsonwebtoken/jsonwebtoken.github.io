"use client";

import React from "react";
import styles from "./not-found.module.scss";
import { usePathname } from "next/navigation";
import { LANGUAGE_CODES } from "@/features/localization/localization.config";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { getPathnameSegments } from "@/libs/utils/path.utils";
import { ErrorBannerComponent } from "@/features/common/components/errors/error-banner/error-banner.component";

interface NotFoundComponentProps {
  metadata: LayoutDictionaryModel["errors"]["notFound"];
}

export const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
  metadata,
}) => {
  const pathname = usePathname();
  const pathnameSegments = getPathnameSegments(pathname);
  const languageCode =
    pathnameSegments[0] && LANGUAGE_CODES.includes(pathnameSegments[0])
      ? pathnameSegments[0]
      : "";

  return (
    <BoxComponent
      containerClassName={styles.container}
      wrapperClassName={styles.wrapper}
      contentClassName={styles.content}
    >
      <ErrorBannerComponent
        languageCode={languageCode}
        message={metadata.message}
        navLink={{
          path: metadata.link.path,
          label: metadata.link.label,
          shouldOpenNewTab: false,
        }}
        ctaButton={null}
      />
    </BoxComponent>
  );
};
