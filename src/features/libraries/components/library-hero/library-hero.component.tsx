"use client";

import React, { useMemo } from "react";
import styles from "./library-hero.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { usePathname, useRouter } from "next/navigation";
import {
  LIBRARIES_FILTER_ALGORITHM_KEY,
  LIBRARIES_FILTER_PROGRAMMING_LANGUAGE_KEY,
} from "@/libs/config/project.constants";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";
import { LibraryFilterLabel } from "../../models/library-filters.model";
import { DebuggerPickerOptionModel } from "@/features/common/models/debugger-picker-option.model";
import { GroupBase } from "react-select";

interface LibraryHeroComponentProps {
  languageCode: string;
  query: string;
  categoryOptions: { id: string; name: string }[];
  algorithmOptions: { value: string; label: string }[];
  dictionary: LibrariesDictionaryModel;
}

export const LibraryHeroComponent: React.FC<LibraryHeroComponentProps> = ({
  languageCode,
  query,
  categoryOptions,
  algorithmOptions,
  dictionary,
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelection = (
    selection: string,
    parentLabel?: LibraryFilterLabel
  ) => {
    if (!parentLabel) {
      return;
    }
    const params = new URLSearchParams("");
    switch (parentLabel) {
      case "ProgrammingLanguage":
        params.set(LIBRARIES_FILTER_PROGRAMMING_LANGUAGE_KEY, selection);
        break;
      case "Algorithm":
        params.set(LIBRARIES_FILTER_ALGORITHM_KEY, selection);
        break;
      default:
        break;
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const options = useMemo(() => {
    return [
      {
        label: "ProgrammingLanguage",
        options: [
          {
            value: dictionary.filterPicker.defaultValue.value,
            label: dictionary.filterPicker.defaultValue.label,
          },
          ...categoryOptions.map((categoryOption) => {
            return {
              value: categoryOption.id,
              label: categoryOption.name,
            };
          }),
        ],
      },
      {
        label: "Algorithm",
        options: [...algorithmOptions],
      },
    ] as GroupBase<DebuggerPickerOptionModel>[];
  }, [
    categoryOptions,
    dictionary.filterPicker.defaultValue.label,
    dictionary.filterPicker.defaultValue.value,
    algorithmOptions,
  ]);

  return (
    <BoxComponent
      containerClassName={styles.container}
      contentClassName={styles.content}
    >
      <div className={styles.hero}>
        <h1
          className={clsx(
            styles.heroTitle,
            getLocalizedSecondaryFont(languageCode)
          )}
        >
          {dictionary.title}
        </h1>
        <div className={styles.filter}>
          <span className={styles.label}>{dictionary.filterPicker.label}</span>
          <div className={styles.select__wrapper}>
            <DebuggerPickerComponent
              label={null}
              languageCode={languageCode}
              options={options}
              selectedOptionCode={
                options
                  .flatMap((group) => group.options)
                  .filter((option) => option.value === query)[0]
              }
              handleSelection={handleSelection}
              placeholder={null}
              minWidth="6.125rem"
            />
          </div>
        </div>
      </div>
    </BoxComponent>
  );
};
