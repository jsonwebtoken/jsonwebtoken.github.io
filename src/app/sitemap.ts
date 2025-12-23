import { MetadataRoute } from "next";
import { BASE_URL } from "@/libs/config/project.constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/`,
          ja: `${BASE_URL}/ja/`,
          "x-default": `${BASE_URL}/`,
        },
      },
    },
    {
      url: `${BASE_URL}/introduction`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/introduction`,
          ja: `${BASE_URL}/ja/introduction`,
          "x-default": `${BASE_URL}/introduction`,
        },
      },
    },
    {
      url: `${BASE_URL}/libraries`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/libraries`,
          ja: `${BASE_URL}/ja/libraries`,
          "x-default": `${BASE_URL}/libraries`,
        },
      },
    },
  ];
}