import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_CODES,
  PREFERRED_LANGUAGE_COOKIE_KEY,
} from "@/features/localization/localization.config";
import { createUrlPath, isSupportedLanguage } from "@/libs/utils/path.utils";
import dictionary from "@/data/libraries-next.json";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDefaultLanguageCodeInPathname =
    pathname.startsWith(`/${DEFAULT_LANGUAGE_CODE}/`) ||
    pathname === `/${DEFAULT_LANGUAGE_CODE}`;

  if (isDefaultLanguageCodeInPathname) {
    request.nextUrl.pathname = createUrlPath([
      pathname.replace(`/${DEFAULT_LANGUAGE_CODE}`, ""),
    ]);

    return NextResponse.redirect(request.nextUrl);
  }

  const isLanguageCodeInPathname = LANGUAGE_CODES.some(
    (languageCode) =>
      pathname.startsWith(`/${languageCode}/`) ||
      pathname === `/${languageCode}`,
  );

  if (isLanguageCodeInPathname) {
    return;
  }

  /* const tokenParam =
    request.nextUrl.searchParams.get("token") ||
    request.nextUrl.searchParams.get("id_token") ||
    request.nextUrl.searchParams.get("access_token") ||
    request.nextUrl.searchParams.get("value");
  const isHomePage = pathname === "/";

  if (tokenParam && isHomePage) {
    request.nextUrl.searchParams.delete("token");
    request.nextUrl.searchParams.delete("id_token");
    request.nextUrl.searchParams.delete("access_token");
    request.nextUrl.searchParams.delete("value");

    request.nextUrl.hash = `token=${tokenParam}`;

    return NextResponse.redirect(request.nextUrl);
  } */

  const libraryFilter = request.nextUrl.searchParams.get("language");
  const isLibrariesPage = pathname === "/libraries";

  if (libraryFilter && isLibrariesPage) {
    const adjustedLibraryFilter = libraryFilter.replaceAll(" ", "+");

    const categoryOptions = Object.values(dictionary).map((library) => ({
      id: library.id,
      name: library.name,
      uniqueClass: library.uniqueClass,
    }));

    categoryOptions.forEach((categoryOption) => {
      const { id, uniqueClass, name } = categoryOption;

      if (
        adjustedLibraryFilter.toLowerCase() ===
          uniqueClass.toLocaleLowerCase() &&
        id !== uniqueClass.toLocaleLowerCase()
      ) {
        request.nextUrl.searchParams.delete("language");
        request.nextUrl.searchParams.append("filter", id);

        return;
      }

      if (
        adjustedLibraryFilter.toLowerCase() === name.toLocaleLowerCase() &&
        id !== name.toLocaleLowerCase()
      ) {
        request.nextUrl.searchParams.delete("language");
        request.nextUrl.searchParams.append("filter", id);

        return;
      }

      if (adjustedLibraryFilter.toLowerCase() === id) {
        request.nextUrl.searchParams.delete("language");
        request.nextUrl.searchParams.append("filter", id);

        return;
      }
    });

    return NextResponse.redirect(request.nextUrl);
  }

  const preferredLanguageCookie = request.cookies.get(
    PREFERRED_LANGUAGE_COOKIE_KEY,
  );

  if (preferredLanguageCookie) {
    const languageFromCookie = preferredLanguageCookie.value;
    const shouldRenderDefaultLanguageContent =
      !isSupportedLanguage(languageFromCookie) ||
      languageFromCookie === DEFAULT_LANGUAGE_CODE;

    if (shouldRenderDefaultLanguageContent) {
      request.nextUrl.pathname = `/${DEFAULT_LANGUAGE_CODE}${pathname}`;

      return NextResponse.rewrite(request.nextUrl, { request });
    }

    request.nextUrl.pathname = createUrlPath([languageFromCookie, pathname]);

    return NextResponse.redirect(request.nextUrl);
  }

  try {
    const languagesFromRequestHeaders = new Negotiator({
      headers: Object.fromEntries(request.headers),
    }).languages();

    const languageFromRequestHeader = match(
      languagesFromRequestHeaders,
      LANGUAGE_CODES,
      DEFAULT_LANGUAGE_CODE,
    );

    const shouldRenderAltLanguageContent =
      isSupportedLanguage(languageFromRequestHeader) &&
      languageFromRequestHeader !== DEFAULT_LANGUAGE_CODE;

    if (shouldRenderAltLanguageContent) {
      request.nextUrl.pathname = createUrlPath([
        languageFromRequestHeader,
        pathname,
      ]);

      return NextResponse.redirect(request.nextUrl);
    }

    request.nextUrl.pathname = createUrlPath([DEFAULT_LANGUAGE_CODE, pathname]);

    return NextResponse.rewrite(request.nextUrl, { request });
  } catch (e) {
    request.nextUrl.pathname = createUrlPath([DEFAULT_LANGUAGE_CODE, pathname]);

    return NextResponse.rewrite(request.nextUrl, { request });
  }
}

export const config = {
  matcher: [
    "/((?!api/|favicon.ico|sitemap.xml|robots.txt|google30e29a6679a06e08.html|manifest.webmanifest|_next/static|_next/image|diagrams/|icons/|images/|img/|apple-icon/|icon/).*)",
    "/",
  ],
};
