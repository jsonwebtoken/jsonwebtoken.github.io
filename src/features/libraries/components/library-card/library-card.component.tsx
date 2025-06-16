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
      <div className={styles.content}>
        <ul className={styles.config}>
          <ConfigItemComponent
            label="Sign"
            isSupported={support.sign}
          ></ConfigItemComponent>
          <ConfigItemComponent
            label="Verify"
            isSupported={support.verify}
          ></ConfigItemComponent>

          <ConfigItemComponent
            isSupported={support.iss}
            code="iss"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.sub}
            code="sub"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.aud}
            code="aud"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.exp}
            code="exp"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.nbf}
            code="nbf"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.iat}
            code="iat"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.jti}
            code="jti"
            label="check"
          ></ConfigItemComponent>
          <ConfigItemComponent
            isSupported={support.typ}
            code="typ"
            label="check"
          ></ConfigItemComponent>
        </ul>
        <ul className={styles.algs}>
          <AlgItemComponent label="HS256" isSupported={support.hs256} />
          <AlgItemComponent label="HS384" isSupported={support.hs384} />
          <AlgItemComponent label="HS512" isSupported={support.hs512} />
          <AlgItemComponent label="RS256" isSupported={support.rs256} />
          <AlgItemComponent label="RS384" isSupported={support.rs384} />
          <AlgItemComponent label="RS512" isSupported={support.rs512} />
          <AlgItemComponent label="ES256" isSupported={support.es256} />
          <AlgItemComponent label="ES256K" isSupported={support.es256k} />
          <AlgItemComponent label="ES384" isSupported={support.es384} />
          <AlgItemComponent label="ES512" isSupported={support.es512} />
          <AlgItemComponent label="PS256" isSupported={support.ps256} />
          <AlgItemComponent label="PS384" isSupported={support.ps384} />
          <AlgItemComponent label="PS512" isSupported={support.ps512} />
          <AlgItemComponent label="EdDSA" isSupported={support.eddsa} />
        </ul>
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
          {support && (
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
      {minimumVersion && (
        <div className={clsx(styles.minVersion, MonoFont.className)}>
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
      <div className={clsx(styles.command, MonoFont.className)}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{command}</ReactMarkdown>
      </div>
    </div>
  );
};
