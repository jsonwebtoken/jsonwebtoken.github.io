"use client";

import React, { FC, useState } from "react";
import { BrandDictionaryModel } from "@/features/localization/models/brand-dictionary.model";
import styles from "./context-menu.module.scss";
import jwtLogoString from "@/public/img/jwt-logo.svg?raw";
import jwtSymbolString from "@/public/img/jwt-symbol.svg?raw";
import jwtWordmark from "@/public/img/jwt-wordmark.svg?raw";

interface ContextMenuProps {
  dictionary: BrandDictionaryModel;
  position: { x: number; y: number } | null;
  setIsCopied: (value: React.SetStateAction<boolean>) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ dictionary, position, setIsCopied }) => {
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
      <ul className={styles.list}>
        <li
          className={styles.menuItem}
          onClick={() => handleIconCopy(jwtLogoString)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.svg.copyLabel}</span>
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleIconCopy(jwtSymbolString)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.symbol.copyLabel}</span>
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleIconCopy(jwtWordmark)}
        >
          <div>icon</div>
          <span>{dictionary.menu.brand.wordmark.copyLabel}</span>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
