"use client";

import React from "react";

import EnIntroduction from "@/features/introduction/docs/en.introduction.mdx";
import JaIntroduction from "@/features/introduction/docs/ja.introduction.mdx";

interface GetIntroductionContentParams {
  languageCode: string;
}

interface GetIntroductionContentResult {
  Component: React.FC;
}

export const getIntroductionContent = (
  params: GetIntroductionContentParams,
): GetIntroductionContentResult => {
  const { languageCode } = params;

  if (languageCode === "ja") {
    return {
      Component: JaIntroduction,
    };
  }

  return {
    Component: EnIntroduction,
  };
};
