import React from "react";
import { JwtDictionaryModel } from "@/features/localization/models/jwt-dictionary.model";
import { CardWithHeadlineComponent } from "@/features/common/components/card/card.component";
import { CardToolbarComponent } from "@/features/common/components/card-toolbar/card-toolbar.component";
import { CardToolbarCopyButtonComponent } from "@/features/common/components/card-toolbar-buttons/card-toolbar-copy-button/card-toolbar-copy-button.component";

const COMMAND = "npx skills add jsonwebtoken/jwt-skills";
const COMMAND_SPECIFIC = "npx skills add jsonwebtoken/jwt-skills -s jwt-decode";

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  lineHeight: "1.25rem",
  opacity: 0.6,
};

interface Props {
  languageCode: string;
  dictionary: JwtDictionaryModel["skills"];
}

export const SkillsCardComponent: React.FC<Props> = ({ languageCode, dictionary }) => {
  return (
    <CardWithHeadlineComponent
      sectionHeadline={null}
      id="skills-card"
      languageCode={languageCode}
      title="Terminal"
      compactTitle="Terminal"
      hasHeaderIcon
      options={null}
      slots={{
        toolbar: (
          <CardToolbarComponent ariaLabel="Skills command toolbar">
            <CardToolbarCopyButtonComponent
              languageCode={languageCode}
              value={COMMAND}
            />
          </CardToolbarComponent>
        ),
      }}
      messages={null}
    >
      <p style={labelStyle}>{dictionary.installAllSkills}</p>
      <code>{"$ " + COMMAND}</code>
      <p style={{ ...labelStyle, marginTop: "0.75rem" }}>{dictionary.installSpecificSkill}</p>
      <code>{"$ " + COMMAND_SPECIFIC}</code>
    </CardWithHeadlineComponent>
  );
};
