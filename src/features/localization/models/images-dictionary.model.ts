import { StaticImageMetadataModel } from "@/features/common/models/static-image-metadata.model";

export interface ImagesDictionaryModel {
  logos: {
    site: StaticImageMetadataModel;
    auth0: StaticImageMetadataModel;
  };
}
