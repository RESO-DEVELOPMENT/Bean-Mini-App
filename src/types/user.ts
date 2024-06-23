export interface Membership {
  membershipId: string
  phoneNumber: string
  email: any
  fullname: string
  gender: number
  memberLevel: MemberLevel
}

export interface MemberLevel {
  memberLevelId: string
  name: string
  indexLevel: number
  benefits: string
  maxPoint: number
  nextLevelName: string
  memberWallet: MemberWallet[]
  membershipCard: MembershipCard[]
  point: number
}


export interface UserLogin {
  status: number
  message: string
  data: Data
}

export interface Data {
  userId: string
  username: string
  fullName: string
  token: string
  brandCode: string
  brandId: string
  roleName: string
}


export interface MembershipCard {
  id: string
  membershipCardCode: string
  physicalCardCode: any
  membershipCardType: MembershipCardType
}

export interface MembershipCardType {
  id: string
  name: string
  cardImg: string
}

export interface MemberWallet {
  id: string
  name: string
  balance: number
  balanceHistory: number
  walletType: WalletType
}

export interface WalletType {
  id: string
  name: string
  currency: string
}

export interface RecentlySearchMember {
  membershipId: string
  phoneNumber: string
  fullname: string
}



export interface MemberActionResponse {
  actionValue: number
  description: string
  id: string
  memberActionTypeId: string
  memberWalletId: string
  status: string
  transactionId: string
}
