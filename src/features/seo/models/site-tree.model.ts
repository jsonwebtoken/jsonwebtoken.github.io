export interface SiteTreeSectionModel {
  urlPath: string;
  id: string;
  displayName: string;
  sections: {
    [index: string]: SiteTreeSectionModel;
  };
}

export interface SiteTreeModel {
  originUrl: string;
  root: {
    urlPath: string;
    id: string;
    displayName: string;
    sections: {
      introduction: SiteTreeSectionModel;
      libraries: SiteTreeSectionModel;
    };
  };
}
