import type { Metadata, Viewport } from "next";
import React from "react";
import { BASE_URL } from "@/libs/config/project.constants";
import "@/libs/theme/styles/globals.scss";

declare global {
  interface Window {
    OneTrust: any;
    OnetrustActiveGroups: any;
  }
}

export const viewport: Viewport = {
  themeColor: "#111111",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(BASE_URL),
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE,
    },
    manifest: "/manifest.webmanifest",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
