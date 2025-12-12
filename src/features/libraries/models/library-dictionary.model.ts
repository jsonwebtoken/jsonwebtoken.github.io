import { LibraryCategoryModel } from "@/features/libraries/models/library-category.model";

export interface LibraryDictionaryModel {
  [index: string]: LibraryCategoryModel;
}
