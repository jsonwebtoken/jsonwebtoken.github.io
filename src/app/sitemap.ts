import { MetadataRoute } from "next";
import { BASE_URL } from "@/libs/config/project.constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/introduction`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/libraries`,
      lastModified: new Date(),
    },
  ];
}
