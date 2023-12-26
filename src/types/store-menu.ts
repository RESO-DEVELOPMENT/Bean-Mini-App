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
  groupProducts: GroupProduct[];
  productsInGroup: ProductsInGroup[];
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
  picUrl: string;
  description: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  type: string;
  displayOrder: number;
  description: string;
  picUrl: string;
}

export interface GroupProduct {
  id: string;
  comboProductId: string;
  name: string;
  combinationMode: string;
  priority: number;
  quantity: number;
  status: string;
  productsInGroupIds: string[];
}

export interface ProductsInGroup {
  id: string;
  groupProductId: string;
  productId: string;
  priority: number;
  additionalPrice: number;
  min: number;
  max: number;
  quantity: number;
  status: string;
}
