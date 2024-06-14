export interface Transaction {
  id: string
  transactionJson: string
  insDate: string
  updDate: string
  amount: number
  currency: string
  isIncrease: boolean
  type: string
  description: string
}
export enum TransactionTypeEnum {
  PAYMENT = "PAYMENT",
  GET_POINT = "GET_POINT",
  TOP_UP = "TOP_UP",
  SEND_VOUCHER = "SEND_VOUCHER",
  REDEEM_VOUCHER = "REDEEM_VOUCHER",
}
