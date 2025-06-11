import { LinkMetadataModel } from "@/features/common/models/link-metadata.model";
import { StaticImageMetadataModel } from "@/features/common/models/static-image-metadata.model";

export interface JwtDictionaryModel {
  libraries: {
    title: string;
    description: string;
    ctaButton: LinkMetadataModel;
  };
  assets: {
    badges: {
      title: string;
      images: {
        viewOn: StaticImageMetadataModel;
        compatible: StaticImageMetadataModel;
      };
    };
    logotype: {
      title: string;
      images: {
        icon: StaticImageMetadataModel;
        iconWithLabel: StaticImageMetadataModel;
      };
    };
  };
}
