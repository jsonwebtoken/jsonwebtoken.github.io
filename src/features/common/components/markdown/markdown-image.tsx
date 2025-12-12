import Image from "next/image";
import React from "react";
import styles from "./markdown-image.module.css";

export const MarkdownImage = (props: any) => {
  const { src, alt } = props;

  return (
    <Image
      className={styles.image}
      src={src}
      alt={alt}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      width={480}
      height={480}
    />
  );
};
