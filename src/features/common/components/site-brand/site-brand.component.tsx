import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./site-brand.module.scss";
import Link from "next/link";
import { getBrandDictionary } from "@/features/localization/services/brand-dictionary.service";
import { SecondaryFont } from "@/libs/theme/fonts";
import clsx from "clsx";
import { JwtLogoComponent } from "../../assets/jwt-logo.component";
import { JwtWordmarkComponent } from "../../assets/jwt-wordmark.component";
import ContextMenu from "../context-menu/context-menu";
import Notification from "../notification/notification.component";

interface SiteBrandComponentProps extends PropsWithChildren {
  path: string;
  languageCode: string;
}

export const SiteBrandComponent: React.FC<SiteBrandComponentProps> = ({
  path,
  languageCode,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleRightClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault(); // Prevent the browser's default context menu
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  useEffect(() => {
    // Hide the menu on any click on the document
    document.addEventListener("click", handleCloseMenu);
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  const brandDictionary = getBrandDictionary(languageCode);

  return (
    <div className={styles.container}>
      <Link
        className={styles.brand}
        href={path}
        title={brandDictionary.tooltip}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onContextMenu={handleRightClick}
      >
        <div className={styles.brand__logo}>
          <JwtLogoComponent />
        </div>
        <div className={styles.brand__wordmark}>
          <JwtWordmarkComponent />
        </div>
        <div className={clsx(SecondaryFont.className, styles.brand__headline)}>
          <span className={styles.brand__subtitle}>Debugger</span>
        </div>
        {isTooltipVisible && (
          <div className={styles.tooltip}>{brandDictionary.tooltip}</div>
        )}
      </Link>
      <ContextMenu dictionary={brandDictionary} position={menuPosition} setIsCopied={setIsCopied}/>
      {isCopied && (
        <Notification message={brandDictionary.alertMessage} onClose={() => setIsCopied(false)}/>
      )}
    </div>
  );
};
