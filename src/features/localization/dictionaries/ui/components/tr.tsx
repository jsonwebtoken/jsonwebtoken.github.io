import { EBOOK_URL } from "@/libs/config/project.constants";
import Link from "next/link";
import React from "react";
import { ComponentDictionaryModel } from "@/features/localization/models/component-dictionary.model";

export const trComponentDictionary: ComponentDictionaryModel = {
  ebookAd: (
    <>
      <strong>Seviyenizi yükseltin!</strong>{" "}
      <Link href={EBOOK_URL} target="_blank" rel="noreferrer noopener">
        JWT El Kitabını ücretsiz edinin
      </Link>{" "}
      ve JWT konusunda derinlemesine bilgi edinin!
    </>
  ),
};
