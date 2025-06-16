export interface CommonDictionaryModel {
  openGraph: {
    siteName: string;
    locale: string;
    type: string;
    images: { url: string; width: number; height: number }[];
  };
  alternates: {
    canonical: string;
  };
}
