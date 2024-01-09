export interface User {
  message: string;
  accessToken: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: string;
  phoneNumber: string;
  fullName: string;
  gender: string;
  email: string;
  status: string;
  fireBaseUid: string;
  fcmtoken: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  urlImg: string;
  level: Level;
}

export interface Level {
  memberLevelId: string;
  name: string;
  indexLevel: number;
  benefits: string;
  maxPoint: number;
  nextLevelName: string;
  memberWallet: MemberWallet[];
  membershipCard: MembershipCard[];
}

export interface MemberWallet {
  id: string;
  balance: number;
  walletType: WalletType;
}

export interface WalletType {
  name: string;
  currency: string;
}

export interface MembershipCard {
  id: string;
  membershipCardCode: string;
  physicalCardCode: string;
  membershipCardType: MembershipCardType;
}

export interface MembershipCardType {
  id: string;
  name: string;
  cardImage: string;
}
