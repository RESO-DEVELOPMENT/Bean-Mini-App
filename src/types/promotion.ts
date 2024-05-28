export interface Promotion {
  promotionId: string
  promotionName: string
  promotionCode: string
  description: string
  imgUrl: string
  promotionType: number
  endDate: string
  listVoucher: ListVoucher[]
  currentVoucherQuantity: number
}

export interface ListVoucher {
  voucherId: string
  voucherCode: string
  index: number
}