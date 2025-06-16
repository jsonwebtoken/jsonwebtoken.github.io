"use client";

import React from "react";
import styles from "./json-viewer.module.scss";
import {
  getTimeClaimProcessedValue,
  safeJsonParse,
} from "@/features/common/services/utils";
import { tokenize, languages, Token, TokenStream } from "prismjs";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";

import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";

const isTimeRelatedClaim = (claim: string) => {
  return (
    claim === "iat" ||
    claim === "exp" ||
    claim === "updated_at" ||
    claim === "auth_time" ||
    claim === "nbf"
  );
};

const getPropertyTokenRawValue = (token: Token) =>
  token.content.toString().replace(/['"]/g, "");

interface JsonViewerComponentProps {
  jsonString: string;
  tooltips: Record<string, string>;
}

export const JsonViewerComponent: React.FC<JsonViewerComponentProps> = ({
  jsonString,
  tooltips = {},
}) => {
  const safeJsonParseResult = safeJsonParse(jsonString);

  if (safeJsonParseResult.isErr()) {
    return <div className={clsx(styles.container)}>{jsonString}</div>;
  }

  if (
    !(
      typeof safeJsonParseResult.value === "object" &&
      !Array.isArray(safeJsonParseResult.value) &&
      safeJsonParseResult.value !== null
    )
  ) {
    return (
      <div className={clsx(styles.container)}>{safeJsonParseResult.value}</div>
    );
  }

  const renderTokens = (tokens: TokenStream): React.ReactNode => {
    if (typeof tokens === "string") {
      return tokens;
    }

    if (!Array.isArray(tokens)) {
      const token = tokens;

      return (
        <span className={`token ${token.type}`}>
          {renderTokens(token.content)}
        </span>
      );
    }

    return tokens.map((token, index) => {
      if (typeof token === "string") {
        return token;
      }

      if (token.type === "property") {
        const propertyName = getPropertyTokenRawValue(token);
        const tooltip = tooltips[propertyName];

        if (tooltip) {
          return (
            <TooltipTrigger key={index} delay={0}>
              <Button className={clsx(MonoFont.className, styles.button)}>
                {renderTokens(token)}
              </Button>
              <Tooltip className={clsx(styles.propertyTooltip)}>
                {tooltip}
              </Tooltip>
            </TooltipTrigger>
          );
        }
      }

      const targetPropertyToken = tokens[index - 3];

      if (
        token.type === "number" &&
        targetPropertyToken &&
        typeof targetPropertyToken !== "string" &&
        targetPropertyToken.type === "property" &&
        isTimeRelatedClaim(getPropertyTokenRawValue(targetPropertyToken))
      ) {
        const timeClaimProcessedValueResult = getTimeClaimProcessedValue(
          token.content.toString(),
        );

        if (timeClaimProcessedValueResult.isErr()) {
          return (
            <span key={index} className={clsx(MonoFont.className)}>
              {renderTokens(token)}
            </span>
          );
        }

        const value = timeClaimProcessedValueResult.value;

        return (
          <TooltipTrigger key={index} delay={0}>
            <Button className={clsx(MonoFont.className, styles.button)}>
              {renderTokens(token)}
            </Button>
            <Tooltip className={clsx(styles.propertyTooltip)}>{value}</Tooltip>
          </TooltipTrigger>
        );
      }

      return (
        <span
          key={index}
          className={clsx(MonoFont.className, `token ${token.type}`)}
        >
          {renderTokens(token.content.toString())}
        </span>
      );
    });
  };

  const lines = jsonString.split("\n");

  return (
    <>
      <div className={clsx(styles.container)}>
        <div className={styles.snippet}>
          {lines.map((line, index) => {
            const tokens = tokenize(line, languages.json);

            return <pre key={index}>{renderTokens(tokens)}</pre>;
          })}
        </div>
      </div>
    </>
  );
};
