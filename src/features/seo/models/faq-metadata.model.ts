export interface FaqItemMetadataModel {
  question: string;
  answer: string;
}

export interface FaqMetadataModel {
  items: FaqItemMetadataModel[];
}
