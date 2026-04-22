import { PageMetadataModel } from "@/features/common/models/page-metadata.model";
import { HeroMetadataModel } from "@/features/common/models/hero-metadata.model";
import { FaqMetadataModel } from "@/features/seo/models/faq-metadata.model";

export interface IntroductionDictionaryModel {
  metadata: PageMetadataModel;
  hero: HeroMetadataModel;
  content: {
    headings: {
      title: string;
      id: string;
    }[];
  };
  faq: FaqMetadataModel;
}
