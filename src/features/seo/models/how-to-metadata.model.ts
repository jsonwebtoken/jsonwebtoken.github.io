export interface HowToMetadataModel {
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
  }[];
  totalTime: string;
}
