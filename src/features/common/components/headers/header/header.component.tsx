"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { createUrlPath, getPathnameSegments } from "@/libs/utils/path.utils";
import { sitePaths } from "@/features/seo/site-tree";
import styles from "./header.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import Link from "next/link";
import { SiteBrandComponent } from "@/features/common/components/site-brand/site-brand.component";

interface HeaderComponentProps {
  languageCode: string;
  dictionary: LayoutDictionaryModel["header"];
  siteLogo: React.ReactNode;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  languageCode,
  dictionary,
  siteLogo,
}) => {
  const pathname = usePathname();
  const pathnameSegments = getPathnameSegments(pathname);
  const topSegment =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? pathnameSegments[0]
      : pathnameSegments[1];
  const topSegmentPath = createUrlPath([topSegment]);

  const languagePathPrefix: string =
    languageCode === DEFAULT_LANGUAGE_CODE
      ? sitePaths.root
      : createUrlPath([languageCode]);

  return (
    <header className={styles.header}>
      <BoxComponent
        contentAs="nav"
        containerClassName={styles.container}
        wrapperClassName={styles.wrapper}
        contentClassName={styles.content}
        aria-label="Main navigation"
      >
        <SiteBrandComponent path={languagePathPrefix}>
          {siteLogo}
        </SiteBrandComponent>
        <div className={styles.navTabs}>
          <ul className={styles.navList}>
            {dictionary.links.map((link) => {
              const linkPath =
                languageCode === DEFAULT_LANGUAGE_CODE || link.isExternal
                  ? link.path
                  : createUrlPath([languagePathPrefix, link.path]);

              return (
                <li
                  className={styles.navList__item}
                  key={link.label}
                  data-active={topSegmentPath === link.path}
                >
                  <Link
                    {...(link.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    href={linkPath}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </BoxComponent>
    </header>
  );
};
