import { PageMetadataModel } from "@/features/common/models/page-metadata.model";

export interface LibrariesDictionaryModel {
  metadata: PageMetadataModel;
  title: string;
  filterPicker: {
    label: string;
    defaultValue: {
      label: string;
      value: string;
    };
  };
  result: {
    viewRepo: {
      label: string;
    };
    minimumVersion: {
      label: string;
      resource: {
        label: string;
        url: string;
      };
    };
  };
}
