import { YoutubeLogoComponent } from "./assets/youtube-logo.component";
import { XLogoComponent } from "./assets/x-logo.component";
import { LinkedinLogoComponent } from "./assets/linkedin-logo.component";
import styles from "./footer.module.scss";
import { LayoutDictionaryModel } from "@/features/localization/models/layout-dictionary.model";
import React from "react";

interface FooterIconsComponentProps {
  dictionary: LayoutDictionaryModel["footer"]["social"];
}

export const FooterIconsComponent: React.FC<FooterIconsComponentProps> = ({
  dictionary,
}) => (
  <div className={styles.socialWrapper}>
    <a
      href={dictionary.links.youtube.path}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dictionary.links.youtube.label}
    >
      <YoutubeLogoComponent />
    </a>
    <a
      href={dictionary.links.twitter.path}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dictionary.links.twitter.label}
    >
      <XLogoComponent />
    </a>
    <a
      href={dictionary.links.linkedin.path}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dictionary.links.linkedin.label}
    >
      <LinkedinLogoComponent />
    </a>
  </div>
);
