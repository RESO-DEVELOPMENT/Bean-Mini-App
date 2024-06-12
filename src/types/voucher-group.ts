export interface VoucherGroup {
  voucherGroupId: string;
  promotionId: null;
  brandId: string;
  voucherName: string;
  quantity: number;
  usedQuantity: number;
  redempedQuantity: number;
  charset: string;
  postfix: string;
  prefix: string;
  customCharset: string;
  conditionRuleId: null;
  actionId: string;
  giftId: null;
  codeLength: number;
  redeemPoint: number;
  voucher: any[];
  voucherChannel: null;
  delFlg: boolean;
  insDate: string;
  updDate: string;
}
