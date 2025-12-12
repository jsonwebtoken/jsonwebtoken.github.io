import React, { PropsWithChildren } from "react";
import styles from "./box.module.scss";
import { clsx } from "clsx";

// From: https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/helpers/component-props.ts
type ComponentPropsWithout<
  T extends React.ElementType,
  O extends
    | Omit<string, keyof React.ComponentPropsWithoutRef<T>>
    | keyof React.ComponentPropsWithoutRef<T>,
> = Omit<React.ComponentPropsWithoutRef<T>, O & string>;

type RemovedProps =
  | "asChild"
  | "defaultChecked"
  | "defaultValue"
  | "color"
  | "children";

type BoxDivProps = { contentAs?: "div" } & ComponentPropsWithout<
  "div",
  RemovedProps
>;
type BoxSectionProps = { contentAs: "section" } & ComponentPropsWithout<
  "section",
  RemovedProps
>;
type BoxNavProps = { contentAs: "nav" } & ComponentPropsWithout<
  "nav",
  RemovedProps
>;

type SectionComponentProps = {
  contentAs?: "div" | "section" | "nav";
  containerClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  fontClassName?: string;
  themeCode?: string;
} & (BoxDivProps | BoxSectionProps | BoxNavProps);

export const BoxComponent = ({
  contentAs = "div",
  containerClassName,
  wrapperClassName,
  contentClassName,
  fontClassName,
  themeCode,
  ...props
}: PropsWithChildren<SectionComponentProps>) => {
  const Component = contentAs || "div";

  return (
    <div
      className={clsx(containerClassName || styles.container)}
      data-theme={themeCode}
    >
      <div
        className={clsx(wrapperClassName || styles.wrapper)}
        data-theme={themeCode}
      >
        <Component
          className={clsx(contentClassName || styles.content, fontClassName)}
          data-theme={themeCode}
          {...props}
        />
      </div>
    </div>
  );
};
