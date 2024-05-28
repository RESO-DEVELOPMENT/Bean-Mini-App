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
  memberWallet: MemberWallet[]
}

export interface MembershipCardType {
  id: string
  name: string
  cardImg: string
  indexLevel: number
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
