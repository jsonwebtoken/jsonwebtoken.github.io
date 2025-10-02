import { enBrandDictionary } from "@/features/localization/dictionaries/images/en";
import { jaBrandDictionary } from "@/features/localization/dictionaries/images/ja";
import { BrandDictionaryModel } from "../models/brand-dictionary.model";

const brandDictionaries: {
  [index: string]: BrandDictionaryModel;
} = {
  en: enBrandDictionary,
  ja: jaBrandDictionary,
};

export const getBrandDictionary = (language: string) =>
  brandDictionaries[language];
