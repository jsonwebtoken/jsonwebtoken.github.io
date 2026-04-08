"use client";

import React from "react";

import EnIntroduction from "@/features/introduction/docs/en.introduction.mdx";
import JaIntroduction from "@/features/introduction/docs/ja.introduction.mdx";
import TrIntroduction from "@/features/introduction/docs/tr.introduction.mdx";
import { getIntroductionDictionary } from "./language-dictionary.service";

interface GetIntroductionContentParams {
  languageCode: string;
}

const introductionComponents: { [index: string]: React.FC<{ headings: any }> } = {
  en: EnIntroduction,
  ja: JaIntroduction,
  tr: TrIntroduction,
};

export const getIntroductionContent = (
  params: GetIntroductionContentParams
) => {
  const { languageCode } = params;
  const introductionDictionary = getIntroductionDictionary(languageCode)
  const headings = introductionDictionary.content.headings
  const IntroductionComponent = introductionComponents[languageCode] || EnIntroduction;
  return <IntroductionComponent headings={headings}/>;
};
