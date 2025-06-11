import { EBOOK_URL_JA } from "@/libs/config/project.constants";
import Link from "next/link";
import React from "react";
import { ComponentDictionaryModel } from "@/features/localization/models/component-dictionary.model";

export const jaComponentDictionary: ComponentDictionaryModel = {
  ebookAd: (
    <>
      <strong>レベルアップ！</strong>
      <Link href={EBOOK_URL_JA} target="_blank" rel="noreferrer noopener">
        JWTハンドブックを無料で入手
      </Link>
      して、JWTへの理解を深めましょう！
    </>
  ),
};
