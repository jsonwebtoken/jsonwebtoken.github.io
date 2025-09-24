import React from "react";
import { CardComponent } from "@/features/common/components/card/card.component";
import { EncodedTokenComponent } from "@/features/encoder/components/encoded-token.component";
import { useEncoderStore } from "@/features/encoder/services/encoder.store";
import { HomeDictionaryModel } from "@/features/localization/models/home-dictionary.model";
import { dataTestidDictionary } from "@/libs/testing/data-testid.dictionary";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";
import styles from "./encoded-jwt-output.module.scss";

type EncodedJwtOutputComponentProps = {
  languageCode: string;
  dictionary: HomeDictionaryModel["encoder"]["encodedJwt"];
};

export const EncodedJwtOutputComponent: React.FC<
  EncodedJwtOutputComponentProps
> = ({ languageCode, dictionary }) => {
  const encodedToken$ = useEncoderStore((state) => state.jwt);
  const encodingWarnings = useEncoderStore((state) => state.encodingWarnings);
  const encodingErrors = useEncoderStore((state) => state.encodingErrors);

  return (
    <>
      <h4 className={styles.headline}>{dictionary.heading}</h4>
      <CardComponent
        id={dataTestidDictionary.encoder.jwt.id}
        languageCode={languageCode}
        title={dictionary.title}
        hasHeaderIcon
        compactTitle={dictionary.title}
        options={{ noPadding: false, fullHeight: true, isOutput: true }}
        messages={{
          warnings: encodingWarnings,
          errors: encodingErrors,
        }}
        slots={{
          toolbar: (
            <CardToolbarComponent ariaLabel={"JWT editor toolbar"}>
              <CardToolbarCopyButtonComponent
                languageCode={languageCode}
                value={encodedToken$ || ""}
              />
            </CardToolbarComponent>
          ),
        }}
      >
        <EncodedTokenComponent encodedToken={encodedToken$ || ""} />
      </CardComponent>
    </>
  );
};
