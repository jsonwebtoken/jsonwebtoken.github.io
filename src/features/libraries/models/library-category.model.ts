import { LibraryModel } from "@/features/libraries/models/library.model";

export interface LibraryCategoryModel {
  id: string;
  name: string;
  uniqueClass: string;
  image: string;
  bgColor: string;
  libs: LibraryModel[];
}
