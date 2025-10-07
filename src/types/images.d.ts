declare module "*.png" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}

declare module "*.jpg" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  const content: import("next/dist/shared/lib/get-img-props").StaticImageData;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
