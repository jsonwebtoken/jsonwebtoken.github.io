import { LANGUAGE_CODES } from "@/features/localization/localization.config";

export const createUrlPath = (segments: string[]) => {
  if (!segments) {
    return "/";
  }

  const pathSegments: string[] = [];

  segments.forEach((segment) => {
    if (!segment) {
      return;
    }

    const paths = segment.split("/");

    paths.forEach((path) => {
      if (path) {
        pathSegments.push(path);
      }
    });
  });

  return "/" + pathSegments.join("/");
};

export const getPathnameSegments = (
  pathname: string | null | undefined,
): string[] => {
  return pathname ? pathname.split("/").filter((segment) => segment) : ["/"];
};

export const isSupportedLanguage = (language: string) => {
  return LANGUAGE_CODES.includes(language);
};
