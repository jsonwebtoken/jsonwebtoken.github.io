import { ComponentDictionaryModel } from "@/features/localization/models/component-dictionary.model";
import { enComponentDictionary } from "@/features/localization/dictionaries/ui/components/en";
import { jaComponentDictionary } from "@/features/localization/dictionaries/ui/components/ja";
import { enModalsDictionary } from "@/features/localization/dictionaries/ui/modals/en";
import { jaModalsDictionary } from "@/features/localization/dictionaries/ui/modals/ja";
import { ModalsUiDictionaryModel } from "@/features/localization/models/ui/modals-ui-dictionary.model";

const componentDictionaries: {
  [index: string]: ComponentDictionaryModel;
} = {
  en: enComponentDictionary,
  ja: jaComponentDictionary,
};

const modalUiDictionaries: {
  [index: string]: ModalsUiDictionaryModel;
} = {
  en: enModalsDictionary,
  ja: jaModalsDictionary,
};

export const getComponentDictionary = (language: string) =>
  componentDictionaries[language];
export const getModalsUiDictionary = (language: string) =>
  modalUiDictionaries[language];
