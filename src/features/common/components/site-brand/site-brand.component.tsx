import React, { PropsWithChildren } from "react";
import styles from "./site-brand.module.scss";
import Link from "next/link";

interface SiteBrandComponentProps extends PropsWithChildren {
  path: string;
}

export const SiteBrandComponent: React.FC<SiteBrandComponentProps> = ({
  path,
  children,
}) => {
  return (
    <Link className={styles.brand} href={path}>
      {children}
    </Link>
  );
};
