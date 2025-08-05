"use client";

import React, { useEffect, useState } from "react";
import { getIntroductionDictionary } from "@/features/localization/services/language-dictionary.service";
import styles from "./sidebar-nav.module.scss";
import clsx from "clsx";

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
  const headings = introductionDictionary.content.headings;
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            history.replaceState(null, "", `#${id}`);
          }
        });
      },
      {
        threshold: 0,
      }
    );
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

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
            className={clsx(
              styles.title,
              activeId === heading.id && styles.title__active
            )}
            onClick={() => handleClick(heading.id)}
          >
            {heading.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
