import { PageMetadataModel } from "@/features/common/models/page-metadata.model";
import { HeroMetadataModel } from "@/features/common/models/hero-metadata.model";

export interface IntroductionDictionaryModel {
  metadata: PageMetadataModel;
  hero: HeroMetadataModel;
  content: {
    headings: {
      title: string,
      id: string
    }[]
  }
}
