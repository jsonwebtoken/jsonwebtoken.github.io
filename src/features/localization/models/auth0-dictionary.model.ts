import { LinkMetadataModel } from "@/features/common/models/link-metadata.model";
import { ImageMetadataModel } from "@/features/common/models/image-metadata.model";

export interface Auth0DictionaryModel {
  banner: {
    title: string;
    description: string;
    image: ImageMetadataModel;
    ctaButton: LinkMetadataModel;
  };
  ebook: {
    title: string;
    description: string;
    ctaButton: {
      url: string;
      label: string;
    };
  };
}
