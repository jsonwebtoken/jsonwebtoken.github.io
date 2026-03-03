"use client";

import React from "react";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import styles from "./ribbon.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import Link from "next/link";

interface RibbonComponentProps {
  dictionary: LayoutDictionaryModel["ribbon"];
}

export const RibbonComponent: React.FC<RibbonComponentProps> = ({
  dictionary,
}) => {

  return (
    
        <div className={styles.cta}>
          <span className={styles.cta__title}>{dictionary.cta.title}</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={dictionary.cta.link.url}
            className={styles.cta__description}
          >
            {dictionary.cta.description}
            <div className={styles.cta__arrow}>
              <svg
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.10449 12.9991L12.8917 3.21191"
                  stroke="#FBFBFB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 3H13V13"
                  stroke="#FBFBFB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>
        </div>
  );
};
