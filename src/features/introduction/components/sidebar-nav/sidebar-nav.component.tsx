"use client";

import React from "react";
import { getIntroductionDictionary } from "@/features/localization/services/language-dictionary.service";
import styles from "./sidebar-nav.module.scss";
import { useRouter } from "next/navigation";

interface SidebarNavComponentProps {
  languageCode: string;
}

const scrollToElementWithOffset = (id: string, offset = 0) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export const SidebarNavComponent: React.FC<SidebarNavComponentProps> = ({
  languageCode,
}) => {
  const introductionDictionary = getIntroductionDictionary(languageCode);
  const router = useRouter();
  const handleClick = (id: string) => {
    scrollToElementWithOffset(id, -120);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {introductionDictionary.content.headings.map((heading, index) => (
          <li
            key={index}
            className={styles.title}
            onClick={() => handleClick(heading.id)}
          >
            {heading.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
