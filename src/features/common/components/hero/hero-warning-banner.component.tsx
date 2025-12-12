import React from "react";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { HeroModalStateValues } from "@/features/home/values/hero-modal-state.values";
import { JWT_WARNING_STATE_KEY } from "@/features/home/config/home.config";
import { HeroBannerComponent } from "@/features/common/components/hero/hero-banner.component";
import { HeroModalTypeValues } from "@/features/home/values/hero-modal-type.values";

type HeroWarningBannerComponentProps = {
  dictionary: HomeDictionaryModel["warning"];
  modalState: HeroModalStateValues;
};

export const HeroWarningBannerComponent: React.FC<
  HeroWarningBannerComponentProps
> = ({ dictionary, modalState }) => {
  return (
    <HeroBannerComponent
      initialModalState={modalState}
      modalType={HeroModalTypeValues.WARNING}
      modalCookieKey={JWT_WARNING_STATE_KEY}
      modalSummary={dictionary.summary}
      modalContent={
        <>
          <strong>{dictionary.title}</strong>{" "}
          <span>{dictionary.description}</span>
        </>
      }
      modalCta={null}
    />
  );
};
