"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./mobile-header.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { MobileMenuStateValues } from "@/features/common/values/mobile-menu-state.values";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { DEFAULT_LANGUAGE_CODE } from "@/features/localization/localization.config";
import { sitePaths } from "@/features/seo/site-tree";
import { createUrlPath, getPathnameSegments } from "@/libs/utils/path.utils";
import { SiteBrandComponent } from "@/features/common/components/site-brand/site-brand.component";

interface MobileHeaderComponentProps {
  languageCode: string;
  dictionary: LayoutDictionaryModel["header"];
  siteLogo: React.ReactNode;
  ribbon: React.ReactNode;
}

export const MobileHeaderComponent: React.FC<MobileHeaderComponentProps> = ({
  languageCode,
  dictionary,
  siteLogo,
  ribbon,
}) => {
  const pathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState<string | null>(null);
  const [mobileMenuState, setMobileMenuState] = useState(
    MobileMenuStateValues.CLOSED,
  );

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

  const closeMobileMenu = useCallback(() => {
    document.body.classList.remove("mobile-scroll-lock");
    setMobileMenuState(MobileMenuStateValues.CLOSED);
  }, []);

  const openMobileMenu = useCallback(() => {
    document.body.classList.add("mobile-scroll-lock");
    setMobileMenuState(MobileMenuStateValues.OPEN);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (mobileMenuState === MobileMenuStateValues.OPEN) {
      closeMobileMenu();

      return;
    }

    openMobileMenu();
  }, [closeMobileMenu, mobileMenuState, openMobileMenu]);

  const handleLinkClick = useCallback(
    (isActive: boolean) => {
      if (isActive) {
        closeMobileMenu();
      }
    },
    [closeMobileMenu],
  );

  useEffect(() => {
    if (currentPathname !== pathname) {
      closeMobileMenu();
      setCurrentPathname(pathname);
    }
  }, [closeMobileMenu, currentPathname, pathname]);

  return (
    <>
      <header className={styles.header}>
        {ribbon}
        <BoxComponent
          contentAs="nav"
          containerClassName={styles.container}
          wrapperClassName={styles.wrapper}
          contentClassName={styles.content}
        >
          <div className={styles.logo}>
            <SiteBrandComponent path={languagePathPrefix}>
              {siteLogo}
            </SiteBrandComponent>
          </div>
          <button
            className={styles.burgerIconWrapper}
            onClick={toggleMobileMenu}
            aria-label={
              mobileMenuState === MobileMenuStateValues.OPEN
                ? dictionary.labels.close
                : dictionary.labels.open
            }
            aria-expanded={mobileMenuState === MobileMenuStateValues.OPEN}
          >
            <span
              className={styles.burgerIcon}
              aria-hidden={mobileMenuState === MobileMenuStateValues.CLOSED}
            />
          </button>
        </BoxComponent>
      </header>
      <section
        className={styles.menu}
        aria-hidden={mobileMenuState === MobileMenuStateValues.CLOSED}
      >
        <BoxComponent
          containerClassName={styles.menuContainer}
          contentClassName={styles.menuContent}
        >
          <ul className={styles.menu__list}>
            {dictionary.links.map((link) => {
              const linkPath =
                languageCode === DEFAULT_LANGUAGE_CODE || link.isExternal
                  ? link.path
                  : createUrlPath([languagePathPrefix, link.path]);
              const isActiveLink = topSegmentPath === link.path;

              return (
                <li
                  key={link.label}
                  className={styles.menu__item}
                  role="menuitem"
                >
                  <Link
                    {...(link.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    href={linkPath}
                    className={styles.menu__item__link}
                    data-active={isActiveLink}
                    onClick={() => handleLinkClick(isActiveLink)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </BoxComponent>
      </section>
    </>
  );
};
