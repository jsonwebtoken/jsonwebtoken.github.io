"use client";

import React from "react";

import EnIntroduction from "@/features/introduction/docs/en.introduction.mdx";
import JaIntroduction from "@/features/introduction/docs/ja.introduction.mdx";
import { getIntroductionDictionary } from "./language-dictionary.service";

interface GetIntroductionContentParams {
  languageCode: string;
}

export const getIntroductionContent = (
  params: GetIntroductionContentParams
) => {
  const { languageCode } = params;
  const introductionDictionary = getIntroductionDictionary(languageCode)
  const headings = introductionDictionary.content.headings
  return languageCode === "ja" ? <JaIntroduction headings={headings}/> : <EnIntroduction headings={headings}/>;
};
