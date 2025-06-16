"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_CODES,
} from "@/features/localization/localization.config";
import { sitePaths } from "@/features/seo/site-tree";
import { createUrlPath, getPathnameSegments } from "@/libs/utils/path.utils";

interface MdxAnchorComponentProps {
  href: string;
  text?: string;
  type?: "internal" | "external";
}

export const MdxAnchorComponent: React.FC<
  PropsWithChildren<MdxAnchorComponentProps>
> = ({ href, text, type, children }) => {
  const pathname = usePathname();

  if (type === "external") {
    return (
      <a rel="noreferrer noopener" href={href} target="_blank">
        {text || children}
      </a>
    );
  }

  const pathnameSegments = getPathnameSegments(pathname);
  const currentLanguage =
    pathnameSegments[0] && LANGUAGE_CODES.includes(pathnameSegments[0])
      ? pathnameSegments[0]
      : "";

  const languagePathPrefix = !currentLanguage
    ? sitePaths.root
    : currentLanguage && currentLanguage === DEFAULT_LANGUAGE_CODE
      ? sitePaths.root
      : createUrlPath([currentLanguage]);

  const linkRef =
    currentLanguage === DEFAULT_LANGUAGE_CODE
      ? href
      : createUrlPath([languagePathPrefix, href]);

  return (
    <Link href={linkRef} target="_blank" rel="noreferrer noopener">
      {text || children}
    </Link>
  );
};
