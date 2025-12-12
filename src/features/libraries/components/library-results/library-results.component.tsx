"use client";

import React, { useEffect } from "react";
import styles from "./library-results..module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { LibraryCardComponent } from "@/features/libraries/components/library-card/library-card.component";
import { LibraryCategoryModel } from "@/features/libraries/models/library-category.model";
import { useRouter } from "next/navigation";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";

interface ResultsComponentProps {
  languageCode: string;
  categories: LibraryCategoryModel[];
  dictionary: LibrariesDictionaryModel;
}

export const LibraryResultsComponent: React.FC<ResultsComponentProps> = ({
  categories,
  languageCode,
  dictionary,
}) => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);

    if (!hash.includes("=")) {
      return;
    }

    const segments = hash.split("=");

    if (segments.length !== 2) {
      return;
    }
    const currentUrl = window.location.href.split("#")[0];

    if (!currentUrl) {
      return;
    }

    const key = segments[0];
    const value = segments[1];

    const newUrl = `${currentUrl}?${key}=${value}`;

    window.location.replace(newUrl);
  }, [router]);

  return (
    <BoxComponent className={styles.content}>
      <div className={styles.grid}>
        {categories.map((category) => {
          return category.libs.map((library, index) => {
            return (
              <LibraryCardComponent
                languageCode={languageCode}
                key={index}
                category={category}
                library={library}
                dictionary={dictionary.result}
              />
            );
          });
        })}
      </div>
    </BoxComponent>
  );
};
