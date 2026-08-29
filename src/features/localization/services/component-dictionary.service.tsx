import { ComponentDictionaryModel } from "@/features/localization/models/component-dictionary.model";
import { enComponentDictionary } from "@/features/localization/dictionaries/ui/components/en";
import { jaComponentDictionary } from "@/features/localization/dictionaries/ui/components/ja";
import { trComponentDictionary } from "@/features/localization/dictionaries/ui/components/tr";
import { enModalsDictionary } from "@/features/localization/dictionaries/ui/modals/en";
import { jaModalsDictionary } from "@/features/localization/dictionaries/ui/modals/ja";
import { trModalsDictionary } from "@/features/localization/dictionaries/ui/modals/tr";
import { ModalsUiDictionaryModel } from "@/features/localization/models/ui/modals-ui-dictionary.model";

const componentDictionaries: {
  [index: string]: ComponentDictionaryModel;
} = {
  en: enComponentDictionary,
  ja: jaComponentDictionary,
  tr: trComponentDictionary,
};

const modalUiDictionaries: {
  [index: string]: ModalsUiDictionaryModel;
} = {
  en: enModalsDictionary,
  ja: jaModalsDictionary,
  tr: trModalsDictionary,
};

export const getComponentDictionary = (language: string) =>
  componentDictionaries[language];
export const getModalsUiDictionary = (language: string) =>
  modalUiDictionaries[language];
