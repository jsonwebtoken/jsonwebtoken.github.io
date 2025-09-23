interface BrandMenuItem {
  icon: string;
  label: string;
}
interface BrandMenuSection {
  label: string;
  items: BrandMenuItem[];
}
interface BrandMenu {
  brand: BrandMenuSection;
  tools: BrandMenuSection;
}

export interface BrandDictionaryModel {
  title: string;
  menu: BrandMenu;
}
