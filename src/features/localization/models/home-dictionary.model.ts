import { PageMetadataModel } from "@/features/common/models/page-metadata.model";
import { HeroMetadataModel } from "@/features/common/models/hero-metadata.model";
import { EncoderDictionaryModel } from "@/features/localization/models/encoder-dictionary.model";
import { DecoderDictionaryModel } from "@/features/localization/models/decoder-dictionary.model";
import { LinkMetadataModel } from "@/features/common/models/link-metadata.model";
import { ImageMetadataModel } from "@/features/common/models/image-metadata.model";

export interface HomeDictionaryModel {
  metadata: PageMetadataModel;
  hero: HeroMetadataModel;
  info: {
    summary: string;
    description: string;
    ctaButton?: LinkMetadataModel;
    secondaryCtaButton?: LinkMetadataModel;
    image?: ImageMetadataModel;
    resources: {
      spec: {
        name: string;
        link: string;
      };
    };
  };
  warning: {
    summary: string;
    title: string;
    description: string;
  };
  decoder: DecoderDictionaryModel;
  encoder: EncoderDictionaryModel;
}
