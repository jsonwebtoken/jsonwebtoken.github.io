declare module "*.mdx" {
  export interface MetadataModel {
    title: string;
    sequenceNumber: number;
    cta: {
      primary?: {
        label: string;
      };
      secondary?: {
        label: string;
      };
    };
    userInput?: {
      name: string;
      label: string;
      placeholder: string;
    }[];
    output?: {
      title: string;
    };
  }

  export const metadata: MetadataModel;

  const MDXComponent: (props: any) => JSX.Element;

  export default MDXComponent;
}
