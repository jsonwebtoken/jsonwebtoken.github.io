import { SiteTreeModel } from "@/features/seo/models/site-tree.model";
import { createUrlPath } from "@/libs/utils/path.utils";
import { BASE_URL } from "@/libs/config/project.constants";

export const originUrl = `${BASE_URL}`;

export const siteTree: SiteTreeModel = {
  originUrl: originUrl,
  root: {
    urlPath: "",
    id: "root",
    displayName: "JWT Debugger",
    sections: {
      introduction: {
        urlPath: "introduction",
        id: "introduction",
        displayName: "JWT Introduction",
        sections: {},
      },
      libraries: {
        urlPath: "libraries",
        id: "libraries",
        displayName: "JWT Libraries",
        sections: {},
      },
    },
  },
};

export const sitePaths = {
  root: createUrlPath([siteTree.root.urlPath]),
  home: createUrlPath([siteTree.root.urlPath]),
  introduction: createUrlPath([siteTree.root.sections.introduction.urlPath]),
  libraries: createUrlPath([siteTree.root.sections.libraries.urlPath]),
  ask: "https://community.auth0.com/c/jwt/8",
};
