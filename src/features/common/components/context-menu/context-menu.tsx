"use client";

import React, { FC } from "react";
import { BrandDictionaryModel } from "@/features/localization/models/brand-dictionary.model";
import styles from "./context-menu.module.scss";
import jwtLogoString from "@/public/img/jwt-logo.svg?raw";
import jwtSymbolString from "@/public/img/jwt-symbol.svg?raw";
import jwtWordmarkString from "@/public/img/jwt-wordmark.svg?raw";
import { Button } from "react-aria-components";

interface ContextMenuProps {
  dictionary: BrandDictionaryModel;
  position: { x: number; y: number } | null;
  setIsCopied: (value: React.SetStateAction<boolean>) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
  dictionary,
  position,
  setIsCopied,
}) => {
  if (!position) return null;

  const handleIconCopy = async (svgString: string) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    try {
      await navigator.clipboard.writeText(svgString);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy SVG: ", err);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ top: position.y, left: position.x }}
    >
      <div className={styles.groupLabel}>{dictionary.menu.brand.label}</div>
      <div className={styles.list}>
        <Button
          className={styles.menuItem}
          onPress={() => handleIconCopy(jwtLogoString)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.svg.copyLabel}</span>
        </Button>
        <a
          className={styles.menuItem}
          href="/img/jwt-logo.svg"
          download="jwt-logo.svg"
        >
          <div>icon</div>
          {dictionary.menu.brand.svg.downloadLabel}
        </a>
        <Button
          className={styles.menuItem}
          onPress={() => handleIconCopy(jwtSymbolString)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.symbol.copyLabel}</span>
        </Button>
        <a
          className={styles.menuItem}
          href="/img/jwt-symbol.svg"
          download="jwt-symbol.svg"
        >
          <div>icon</div>
          {dictionary.menu.brand.symbol.downloadLabel}
        </a>
        <Button
          className={styles.menuItem}
          onPress={() => handleIconCopy(jwtWordmarkString)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.wordmark.copyLabel}</span>
        </Button>
        <a
          className={styles.menuItem}
          href="/img/jwt-wordmark.svg"
          download="jwt-wordmark.svg"
        >
          <div>icon</div>
          {dictionary.menu.brand.wordmark.downloadLabel}
        </a>
      </div>
    </div>
  );
};

export default ContextMenu;
