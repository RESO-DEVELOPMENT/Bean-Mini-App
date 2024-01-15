export enum OrderType {
  EATIN = "EAT_IN",
  TAKE_AWAY = "TAKE_AWAY",
  DELIVERY = "DELIVERY",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  PAID = "PAID",
}
export enum PaymentType {
  CASH = "CASH",
  BANKING = "BANKING",
  POINTIFY = "POINTIFY",
}

export interface OrderPreview {
  id: string;
  invoiceId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  finalAmount: number;
  orderType: string;
  status: string;
  paymentType: string;
  paymentStatus: string;
  customerName: string;
  phone: string;
  address: string;
  storeName: string;
}

export interface OrderDetails {
  orderId: string;
  invoiceId: string;
  storeName: string;
  totalAmount: number;
  finalAmount: number;
  vat: number;
  vatAmount: number;
  discount: number;
  orderStatus: string;
  orderType: string;
  paymentType: string;
  checkInDate: string;
  customerNumber: number;
  promotionList: PromotionList[];
  productList: ProductList[];
  customerInfo: CustomerInfo;
}

export interface PromotionList {
  promotionId: string;
  promotionName: string;
  discountAmount: number;
  quantity: number;
  effectType: string;
}

export interface ProductList {
  productInMenuId: string;
  orderDetailId: string;
  sellingPrice: number;
  quantity: number;
  name: string;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  note: string;
  extras: Extra[];
}

export interface Extra {
  productInMenuId: string;
  sellingPrice: number;
  quantity: number;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  name: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  customerType: string;
  paymentStatus: string;
  deliStatus: string;
}
