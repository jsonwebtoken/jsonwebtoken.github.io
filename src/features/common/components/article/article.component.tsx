"use client";

import React, { PropsWithChildren } from "react";
import styles from "./article.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";

export const ArticleComponent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
    >
      <div className={styles.article}>{children}</div>
    </BoxComponent>
  );
};
