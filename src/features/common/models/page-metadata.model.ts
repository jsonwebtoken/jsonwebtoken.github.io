import { AuthorMetadataModel } from "@/features/common/models/author-metadata.model";
import { Metadata } from "next";

export interface PageMetadataModel extends Metadata {
  title: string;
  description: string;
  authors: AuthorMetadataModel[];
  images: string[];
  keywords: string[];
  datePublished: string;
  dateModified: string;
}
