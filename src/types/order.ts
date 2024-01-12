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
  customerName: string;
  phone: string;
  address: string;
}
