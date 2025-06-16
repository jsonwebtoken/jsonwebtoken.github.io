"use client";

import React, { useMemo } from "react";
import styles from "./library-hero.module.scss";
import { BoxComponent } from "@/features/common/components/box/box.component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LIBRARIES_FILTER_QUERY_PARAM_KEY } from "@/libs/config/project.constants";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont } from "@/libs/theme/fonts";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";
import { DebuggerPickerComponent } from "@/features/common/components/debugger-picker/debugger-picker.component";

interface LibraryHeroComponentProps {
  languageCode: string;
  query: string;
  categoryOptions: { id: string; name: string }[];
  dictionary: LibrariesDictionaryModel;
}

export const LibraryHeroComponent: React.FC<LibraryHeroComponentProps> = ({
  languageCode,
  query,
  categoryOptions,
  dictionary,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelection = (selection: string) => {
    const params = new URLSearchParams(searchParams);

    if (selection) {
      params.set(LIBRARIES_FILTER_QUERY_PARAM_KEY, selection);
    } else {
      params.delete(LIBRARIES_FILTER_QUERY_PARAM_KEY);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const options = useMemo(() => {
    return [
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
    ];
  }, [
    categoryOptions,
    dictionary.filterPicker.defaultValue.label,
    dictionary.filterPicker.defaultValue.value,
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
            getLocalizedSecondaryFont(languageCode),
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
                options.filter((option) => option.value === query)[0]
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
