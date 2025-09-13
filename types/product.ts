import { JSX } from "react";

export type ProductType = {
  id: number;
  productName: string;
  productSlug: string;
  shortDescription: string;
  longDescription: string;
  productCover: { url: string };
  productActive: boolean;
  productTaste: string;
  isFeatured: boolean;
  productOrigin: string;
  productFeatured: boolean;
  price: number;
  quantity: number;
  productImages: {
    map(arg0: (image: any) => JSX.Element): import("react").ReactNode;
    id: number;
    url: string;
  };
  category: {
    id: number;
    categorySlug: string;
    categoryName: string;
  };
};
