import { WarningsUiDictionaryModel } from "@/features/localization/models/ui/warnings-ui-dictionary.model";
import { enWarningsDictionary } from "@/features/localization/dictionaries/ui/warnings/en";
import { jaWarningsDictionary } from "@/features/localization/dictionaries/ui/warnings/ja";
import { trWarningsDictionary } from "@/features/localization/dictionaries/ui/warnings/tr";
import { ButtonsUiDictionaryModel } from "@/features/localization/models/ui/buttons-ui-dictionary.model";
import { enButtonsUiDictionary } from "@/features/localization/dictionaries/ui/buttons/en";
import { jaButtonsUiDictionary } from "@/features/localization/dictionaries/ui/buttons/ja";
import { trButtonsUiDictionary } from "@/features/localization/dictionaries/ui/buttons/tr";
import { PickersUiDictionaryModel } from "@/features/localization/models/ui/pickers-ui-dictionary.model";
import { enPickersUiDictionary } from "@/features/localization/dictionaries/ui/pickers/en";
import { jaPickersUiDictionary } from "@/features/localization/dictionaries/ui/pickers/ja";
import { trPickersUiDictionary } from "@/features/localization/dictionaries/ui/pickers/tr";
import { enAuth0Dictionary } from "@/features/localization/dictionaries/ui/auth0/en";
import { jaAuth0Dictionary } from "@/features/localization/dictionaries/ui/auth0/ja";
import { trAuth0Dictionary } from "@/features/localization/dictionaries/ui/auth0/tr";
import { Auth0DictionaryModel } from "@/features/localization/models/auth0-dictionary.model";
import { LinksUiDictionaryModel } from "@/features/localization/models/ui/links-ui-dictionary.model";
import { enLinksUiDictionary } from "@/features/localization/dictionaries/ui/links/en";
import { jaLinksUiDictionary } from "@/features/localization/dictionaries/ui/links/ja";
import { trLinksUiDictionary } from "@/features/localization/dictionaries/ui/links/tr";

const warningsUiDictionaries: {
  [index: string]: WarningsUiDictionaryModel;
} = {
  en: enWarningsDictionary,
  ja: jaWarningsDictionary,
  tr: trWarningsDictionary,
};

const buttonsUiDictionaries: {
  [index: string]: ButtonsUiDictionaryModel;
} = {
  en: enButtonsUiDictionary,
  ja: jaButtonsUiDictionary,
  tr: trButtonsUiDictionary,
};

const linksUiDictionaries: {
  [index: string]: LinksUiDictionaryModel;
} = {
  en: enLinksUiDictionary,
  ja: jaLinksUiDictionary,
  tr: trLinksUiDictionary,
};

const pickersUiDictionaries: {
  [index: string]: PickersUiDictionaryModel;
} = {
  en: enPickersUiDictionary,
  ja: jaPickersUiDictionary,
  tr: trPickersUiDictionary,
};

const auth0Dictionaries: { [index: string]: Auth0DictionaryModel } = {
  en: enAuth0Dictionary,
  ja: jaAuth0Dictionary,
  tr: trAuth0Dictionary,
};

export const getWarningsUiDictionary = (language: string) =>
  warningsUiDictionaries[language];
export const getButtonsUiDictionary = (language: string) =>
  buttonsUiDictionaries[language];
export const getLinksUiDictionary = (language: string) =>
  linksUiDictionaries[language];
export const getPickersUiDictionary = (language: string) =>
  pickersUiDictionaries[language];
export const getAuth0Dictionary = (language: string) =>
  auth0Dictionaries[language];
