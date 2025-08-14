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

export const JapaneseFont = localFont({
  src: [
    {
      path: "./fonts/NotoSansJP-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-japanese",
  preload: true
});

export const getLocalizedSecondaryFont = (language: string) =>
  language === "ja" ? JapaneseFont.className : SecondaryFont.className;

export const getLocalizedPrimaryFont = (language: string) =>
  language === "ja" ? JapaneseFont.className : PrimaryFont.className;
