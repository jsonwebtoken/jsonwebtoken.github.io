import { LinkMetadataModel } from "@/features/common/models/link-metadata.model";
import { ImageMetadataModel } from "@/features/common/models/image-metadata.model";
import { ThemeModel } from "@/features/common/models/theme.model";
import { UiLanguageModel } from "@/features/common/models/ui-language.model";

export interface RibbonPickerModel<T> {
  button: {
    ariaLabel: string;
  };
  list: {
    ariaLabel: string;
  };
  options: T[];
}

export interface LayoutDictionaryModel {
  ribbon: {
    cta: {
      title: string;
      description: string;
      link: {
        url: string;
        icon: {
          label: string;
        };
      };
    };
    themePicker: RibbonPickerModel<ThemeModel>;
  };
  header: {
    links: LinkMetadataModel[];
    labels: {
      close: string;
      open: string;
    };
  };
  footer: {
    site: {
      url: string;
      label: string;
    };
    copyright: string;
    resources: {
      title: string;
      links: LinkMetadataModel[];
    };
    legal: {
      title: string;
      links: LinkMetadataModel[];
      modalTriggers: {
        text: string;
        icon?: ImageMetadataModel;
      }[];
    };
    social: {
      title: string;
      links: {
        youtube: LinkMetadataModel;
        facebook: LinkMetadataModel;
        twitter: LinkMetadataModel;
        linkedin: LinkMetadataModel;
      };
    };
    modal: {
      title: string;
      content: string;
      list: {
        id: string;
      }[];
    };
    languagePicker: RibbonPickerModel<UiLanguageModel>;
  };
  errors: {
    notFound: {
      message: string;
      link: LinkMetadataModel;
    };
    unexpectedError: {
      message: string;
      actions: {
        tryAgain: {
          label: string;
        };
        report: LinkMetadataModel;
      };
    };
  };
}
