import { EBOOK_URL } from "@/libs/config/project.constants";
import Link from "next/link";
import React from "react";
import { ComponentDictionaryModel } from "@/features/localization/models/component-dictionary.model";

export const enComponentDictionary: ComponentDictionaryModel = {
  ebookAd: (
    <>
      <strong>Level up!</strong> Get the{" "}
      <Link href={EBOOK_URL} target="_blank" rel="noreferrer noopener">
        JWT Handbook for free
      </Link>{" "}
      and learn JWTs in depth!
    </>
  ),
};
