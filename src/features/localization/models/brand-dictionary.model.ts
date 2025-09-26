interface ToolsMenuItem {
  label: string,
  url: string,
}
export interface BrandMenuItem {
  copyLabel: string,
  downloadLabel: string,
}
interface BrandMenuSection {
  label: string;
  svg: BrandMenuItem,
  symbol: BrandMenuItem,
  wordmark: BrandMenuItem,
}

interface ToolsMenuSection {
  label: string;
  items: ToolsMenuItem[];
}

interface BrandMenu {
  brand: BrandMenuSection;
  tools: ToolsMenuSection;
}

export interface BrandDictionaryModel {
  tooltip: string;
  menu: BrandMenu;
}
