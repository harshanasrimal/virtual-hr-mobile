declare module "*.ttf" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const value:
    | {
        uri: string;
      }
    | number;
  export default value;
}
