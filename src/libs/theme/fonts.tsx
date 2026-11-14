import localFont from "next/font/local";
import { Inter, Roboto_Mono } from "next/font/google";

export const PrimaryFont = Inter({
  style: ["normal"],
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-primary",
});

export const SecondaryFont = localFont({
  src: [
    {
      path: "./fonts/Aeonik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
});

export const MonoFont = Roboto_Mono({
  style: ["normal"],
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

// Japanese fonts are loaded via CSS in public/fonts/japanese-fonts.css
// to avoid bundling them for non-Japanese users

export const getLocalizedSecondaryFont = (language: string) =>
  language === "ja" ? "japanese-font" : SecondaryFont.className;

export const getLocalizedPrimaryFont = (language: string) =>
  language === "ja" ? "japanese-font" : PrimaryFont.className;
