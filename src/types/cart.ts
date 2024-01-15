export interface Cart {
  storeId?: string | null;
  orderType: string;
  paymentType: string;
  productList: ProductList[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  bonusPoint: number;
  promotionCode?: string | null;
  voucherCode?: string | null;
  promotionList?: PromotionList[];
  customerId?: string | null;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  message?: string;
  customerNumber?: number;
  totalQuantity: number;
  customerNote?: string;
  notes?: string;
}

export interface ProductList {
  productInMenuId: string;
  parentProductId?: string;
  name: string;
  type: string;
  quantity: number;
  sellingPrice: number;
  code?: string;
  categoryCode?: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  promotionCodeApplied?: string;
  note?: string;
  picUrl?: string;
  extras?: Extra[];
  attributes?: Attribute[];
}

export interface Extra {
  productInMenuId: string;
  name: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface PromotionList {
  promotionId: string;
  code: string;
  name: string;
  discountAmount: number;
  effectType: string;
}
