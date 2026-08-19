import React from "react";
import styles from "./library-card..module.scss";
import { LibraryModel } from "@/features/libraries/models/library.model";
import { CheckMarkComponent } from "@/features/libraries/components/check-mark.component";
import { QuestionMarkComponent } from "@/features/libraries/components/question-mark.component";
import { XMarkComponent } from "@/features/libraries/components/x-mark.component";
import Image from "next/image";
import { clsx } from "clsx";
import { getLocalizedSecondaryFont, MonoFont } from "@/libs/theme/fonts";
import ReactMarkdown from "react-markdown";
import { UserIconComponent } from "@/features/libraries/components/user-icon.component";
import { StarIconComponent } from "@/features/libraries/components/star-icon.component";
import { GithubIconComponent } from "@/features/libraries/components/github-icon.component";
import rehypeRaw from "rehype-raw";
import { LibrariesDictionaryModel } from "@/features/localization/models/libraries-dictionary.model";
import Link from "next/link";
import {
  libraryAlgorithmDefinitions,
  librarySupportDefinitions,
} from "@/features/libraries/values/library-support.values";

interface ConfigItemComponentProps {
  isSupported: boolean | undefined;
  label: string;
  code?: string;
}

export const ConfigItemComponent: React.FC<ConfigItemComponentProps> = ({
  label,
  isSupported,
  code,
}) => {
  if (code) {
    return (
      <li className={styles.listItem}>
        {isSupported === undefined ? (
          <QuestionMarkComponent />
        ) : isSupported ? (
          <CheckMarkComponent />
        ) : (
          <XMarkComponent />
        )}
        <code>{code}</code> {label}
      </li>
    );
  }

  return (
    <li className={styles.listItem}>
      {isSupported === undefined ? (
        <QuestionMarkComponent />
      ) : isSupported ? (
        <CheckMarkComponent />
      ) : (
        <XMarkComponent />
      )}
      {label}
    </li>
  );
};

interface AlgItemComponentProps {
  isSupported: boolean | undefined;
  label: string;
}

export const AlgItemComponent: React.FC<AlgItemComponentProps> = ({
  label,
  isSupported,
}) => {
  return (
    <li className={styles.listItem}>
      {isSupported === undefined ? (
        <QuestionMarkComponent />
      ) : isSupported ? (
        <CheckMarkComponent />
      ) : (
        <XMarkComponent />
      )}
      {label}
    </li>
  );
};

interface LibraryCardComponentProps {
  languageCode: string;
  category: { name: string; image: string; bgColor: string };
  library: LibraryModel;
  dictionary: LibrariesDictionaryModel["result"];
}

export const LibraryCardComponent: React.FC<LibraryCardComponentProps> = ({
  languageCode,
  category,
  library,
  dictionary,
}) => {
  const { name, image } = category;
  const {
    support,
    installCommandMarkdown,
    authorName,
    authorUrl,
    stars,
    repoUrl,
    minimumVersion,
  } = library;

  const command = installCommandMarkdown.join("<br />");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          className={styles.logo}
          src={image}
          alt={`Logo of ${name}`}
          height={40}
          width={40}
        />
        <span className={getLocalizedSecondaryFont(languageCode)}>
          {library.gitHubRepoPath || library.altRepoPath || name}
        </span>
      </div>
      <div className={styles.metadata}>
        {authorUrl ? (
          <Link
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.author}
          >
            <div className={styles.author__name}>
              <UserIconComponent />
              <span>{authorName}</span>
            </div>
          </Link>
        ) : (
          <div className={styles.author}>
            <div className={styles.author__name}>
              <UserIconComponent />
              <span>{authorName}</span>
            </div>
          </div>
        )}
        <div className={styles.repo}>
          {stars != null && (
            <div className={styles.repo__stars}>
              <StarIconComponent />
              <span>{stars}</span>
            </div>
          )}
          <a
            className={styles.repo__url}
            href={repoUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIconComponent />
            <span>{dictionary.viewRepo.label}</span>
          </a>
        </div>
      </div>
      <div className={clsx(styles.command, MonoFont.className)}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{command}</ReactMarkdown>
      </div>
      <div className={styles.content}>
        <ul className={styles.config}>
          {librarySupportDefinitions.map(({ value, cardLabel, code }) => (
            <ConfigItemComponent
              key={value}
              isSupported={support[value]}
              code={code ?? undefined}
              label={cardLabel}
            />
          ))}
        </ul>
        <ul className={styles.algs}>
          {libraryAlgorithmDefinitions.map(({ value, label }) => (
            <AlgItemComponent
              key={value}
              label={label}
              isSupported={support[value]}
            />
          ))}
        </ul>
      </div>
      {minimumVersion && (
        <div className={styles.minVersion}>
          <span>{`${dictionary.minimumVersion.label} ${minimumVersion}`}</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={dictionary.minimumVersion.resource.url}
            className={styles.minVersion__resourceLabel}
          >
            {dictionary.minimumVersion.resource.label}
          </Link>
        </div>
      )}
    </div>
  );
};
