import { ImagesDictionaryModel } from "@/features/localization/models/images-dictionary.model";
import { enImagesDictionary } from "@/features/localization/dictionaries/images/en";
import { jaImagesDictionary } from "@/features/localization/dictionaries/images/ja";

const imagesDictionaries: {
  [index: string]: ImagesDictionaryModel;
} = {
  en: enImagesDictionary,
  ja: jaImagesDictionary,
};

export const getImageDictionary = (language: string) =>
  imagesDictionaries[language];
