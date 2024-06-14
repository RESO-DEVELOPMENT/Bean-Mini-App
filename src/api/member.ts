

import { TransactionTypeEnum } from "types/transaction";
import { MemberActionResponse } from "types/user";
import { axiosInstances } from "utils/axios";

const requestPomotion = axiosInstances.promotion;
const apiKey = "E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6";

const getMemberships = (phone: string) => {

  return requestPomotion.get(
    `/memberships?apiKey=${apiKey}&phoneNumber=${encodeURIComponent(phone)}&size=100&page=1`
  );
};

const sendGift = (toMemberId: string, voucherGroupId: string, memberId: string, isGift: boolean) => {
  const action = {
    "apiKey": apiKey,
    "membershipId": memberId,
    "amount": 0,
    "memberActionType": isGift ? TransactionTypeEnum.SEND_VOUCHER : TransactionTypeEnum.REDEEM_VOUCHER,
    "description": "Tặng quà",
    "voucherGroupId": voucherGroupId,
    "toMembershipId": isGift ? toMemberId : null
  };
  return requestPomotion.post<MemberActionResponse>(
    `/member-action`,
    action
  );
};

export const membershipApi = {
  getMemberships,
  sendGift
};
