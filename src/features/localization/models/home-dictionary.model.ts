import { PageMetadataModel } from "@/features/common/models/page-metadata.model";
import { HeroMetadataModel } from "@/features/common/models/hero-metadata.model";
import { EncoderDictionaryModel } from "@/features/localization/models/encoder-dictionary.model";
import { DecoderDictionaryModel } from "@/features/localization/models/decoder-dictionary.model";

export interface HomeDictionaryModel {
  metadata: PageMetadataModel;
  hero: HeroMetadataModel;
  info: {
    description: string;
    resources: {
      spec: {
        name: string;
        link: string;
      };
    };
  };
  decoder: DecoderDictionaryModel;
  encoder: EncoderDictionaryModel;
}
