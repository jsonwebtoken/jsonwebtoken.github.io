interface ToolsMenuItem {
  label: string,
  url: string,
}
export interface BrandMenuItem {
  type: "COPY" | "DOWNLOAD";
  icon: string;
  label: string;
  assetSrc: string;
}
interface MenuSection {
  label: string;
  items: BrandMenuItem[] | ToolsMenuItem[];
}

interface BrandMenu {
  brand: MenuSection;
  tools: MenuSection;
}

export interface BrandDictionaryModel {
  tooltip: string;
  menu: BrandMenu;
}
