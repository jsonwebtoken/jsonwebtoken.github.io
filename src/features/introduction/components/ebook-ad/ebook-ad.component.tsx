import React from "react";
import styles from "./ebook-ad.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";

type EbookAdComponentProps = {
  copy: React.ReactNode;
};

export const EbookAdComponent: React.FC<EbookAdComponentProps> = ({ copy }) => {
  return (
    <BoxComponent contentClassName={styles.content}>
      <p className={styles.copy}>{copy}</p>
    </BoxComponent>
  );
};
