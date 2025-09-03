import { BrandDictionaryModel } from "@/features/localization/models/images-dictionary.model";
import { enBrandDictionary } from "@/features/localization/dictionaries/images/en";
import { jaImagesDictionary } from "@/features/localization/dictionaries/images/ja";

const imagesDictionaries: {
  [index: string]: BrandDictionaryModel;
} = {
  en: enBrandDictionary,
  ja: jaImagesDictionary,
};

export const getImageDictionary = (language: string) =>
  imagesDictionaries[language];
