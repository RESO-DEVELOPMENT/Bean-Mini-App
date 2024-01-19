export interface Transaction {
  id: string;
  transactionJson: string;
  createdDate: string;
  orderId: string;
  userId: string;
  status: string;
  brandId: string;
  amount: number;
  currency: string;
  brandPartnerId: string;
  isIncrease: boolean;
  type: string;
}
export enum TransactionTypeEnum {
  PAYMENT = "PAYMENT",
  GET_POINT = "GET_POINT",
  TOP_UP = "TOP_UP",
}
