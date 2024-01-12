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
