export interface Promotion {
  promotionId: string;
  promotionTierId: string;
  promotionName: string;
  promotionCode: string;
  description: string;
  forMembership: number;
  actionType: number;
  saleMode: number;
  imgUrl: string;
  promotionType: number;
  tierIndex: number;
  endDate: string;
  listVoucher: ListVoucher[];
  currentVoucherQuantity: number;
}

export interface ListVoucher {
  voucherId: string;
  voucherCode: string;
  channelId: string;
  storeId: string;
  voucherGroupId: string;
  membershipId: string;
  isUsed: boolean;
  isRedemped: boolean;
  usedDate: string;
  redempedDate: string;
  insDate: string;
  updDate: string;
  promotionId: string;
  index: number;
  promotionTierId: string;
}
