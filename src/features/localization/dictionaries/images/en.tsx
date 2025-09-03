import { BrandDictionaryModel } from "@/features/localization/models/images-dictionary.model";

export const enBrandDictionary: BrandDictionaryModel = {
  title: "Right-click or long-press for logo options",
  menu: {
    brand: {
      label: "Brand",
      items: [
        {icon: "",
          label: "Copy Logo SVG"
        },
        {icon: "",
          label: "Download Logo"
        },
        {icon: "",
          label: "Copy Symbol SVG"
        },
        {icon: "",
          label: "Download Symbol"
        },
        {icon: "",
          label: "Copy Wordmark SVG"
        },
        {icon: "",
          label: "Download Wordmark"
        },
      ]
    },
    tools: {
      label: "Tools",
      items: [
      ]
    }
  }
};
