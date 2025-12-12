export interface ArticleMetadataModel {
  title: string;
  description: string;
  authors: { name: string; url: string }[];
  datePublished: string;
  dateModified: string;
  images?: string[];
}
