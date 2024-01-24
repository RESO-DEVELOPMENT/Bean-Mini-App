export interface TMenu {
  id: string;
  brandId: string;
  code: string;
  priority: number;
  isBaseMenu: boolean;
  dateFilter: string[];
  startTime: string;
  endTime: string;
  products: Product[];
  collections: Collection[];
  categories: Category[];
}

export interface Product {
  id: string;
  code: string;
  name: string;
  sellingPrice: number;
  picUrl: string;
  status: string;
  historicalPrice: number;
  discountPrice: number;
  description: string;
  displayOrder: number;
  size: string;
  type: string;
  parentProductId: string;
  brandId: string;
  categoryId: string;
  collectionIds: string[];
  extraCategoryIds: string[];
  menuProductId: string;
}

export interface Collection {
  id: string;
  name: string;
  code: string;
  picUrl?: string;
  description: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  type: string;
  childCategoryIds: string[];
  displayOrder: number;
  description?: string;
  picUrl?: string;
}

export enum ProductTypeEnum {
  SINGLE = "SINGLE",
  PARENT = "PARENT",
  CHILD = "CHILD",
  EXTRA = "EXTRA",
  COMBO = "COMBO",
}
export enum ProductSizeEnum {
  Small = "S",
  Medium = "M",
  Large = "L",
  XL = "XL",
}

export enum CategoryType {
  NORMAL = "Normal",
  CHILD = "Child",
  EXTRA = "Extra",
}
export enum CategoryStatus {
  ACTIVE = "Active",
  DEACTIVE = "Deactive",
}
