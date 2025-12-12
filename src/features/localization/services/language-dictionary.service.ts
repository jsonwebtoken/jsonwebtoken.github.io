import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import { CommonDictionaryModel } from "@/features/localization/models/common-dictionary.model";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { IntroductionDictionaryModel } from "@/features/localization/models/introduction-dictionary.model";

import { enLayoutDictionary } from "../dictionaries/layout/en";
import { jaLayoutDictionary } from "@/features/localization/dictionaries/layout/ja";
import { enCommonDictionary } from "@/features/localization/dictionaries/common/en";
import { jaCommonDictionary } from "@/features/localization/dictionaries/common/ja";
import { enHomeDictionary } from "@/features/localization/dictionaries/home/en";
import { jaHomeDictionary } from "@/features/localization/dictionaries/home/ja";
import { enIntroductionDictionary } from "@/features/localization/dictionaries/introduction/en";
import { jaIntroductionDictionary } from "@/features/localization/dictionaries/introduction/ja";
import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";
import { jaJwtDictionary } from "@/features/localization/dictionaries/jwt/ja";
import { enJwtDictionary } from "@/features/localization/dictionaries/jwt/en";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";
import { enLibrariesDictionary } from "@/features/localization/dictionaries/libraries/en";
import { jaLibrariesDictionary } from "@/features/localization/dictionaries/libraries/ja";

const commonDictionaries: { [index: string]: CommonDictionaryModel } = {
  en: enCommonDictionary,
  ja: jaCommonDictionary,
};

const layoutDictionaries: { [index: string]: LayoutDictionaryModel } = {
  en: enLayoutDictionary,
  ja: jaLayoutDictionary,
};

const homeDictionaries: { [index: string]: HomeDictionaryModel } = {
  en: enHomeDictionary,
  ja: jaHomeDictionary,
};

const jwtDictionaries: {
  [index: string]: JwtDictionaryModel;
} = {
  en: enJwtDictionary,
  ja: jaJwtDictionary,
};

const introductionDictionaries: {
  [index: string]: IntroductionDictionaryModel;
} = {
  en: enIntroductionDictionary,
  ja: jaIntroductionDictionary,
};

const librariesDictionaries: {
  [index: string]: LibrariesDictionaryModel;
} = {
  en: enLibrariesDictionary,
  ja: jaLibrariesDictionary,
};

export const getCommonDictionary = (language: string) =>
  commonDictionaries[language];
export const getLayoutDictionary = (language: string) =>
  layoutDictionaries[language];
export const getHomeDictionary = (language: string) =>
  homeDictionaries[language];
export const getJwtDictionary = (language: string) => jwtDictionaries[language];
export const getIntroductionDictionary = (language: string) =>
  introductionDictionaries[language];
export const getLibrariesDictionary = (language: string) =>
  librariesDictionaries[language];
