import { keywordState } from "states/product.state";
import userApi from "api/user";
import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";
import { cartState, prepareCartState } from "./cart.state";
import { requestPhoneTriesState, userState, phoneState } from "./user.state";
import { Membership, RecentlySearchMember } from "types/user";
import { membershipApi } from "api/member";
import { getStorage, setStorage } from "zmp-sdk";

export const listMembershipCardState = selector({
  key: "membershipcardList",
  get: async ({ get }) => {
    const member = get(memberState);
    const listMembership = await userApi.getMembershipCard(
      member?.membershipId ?? ""
    );
    return listMembership.data;
  },
});

export const memberState = selector({
  key: "member",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      // const accessToken = await getAccessToken();
      // const user = get(userState);
      // let phone = "0337076898";
      // const { token } = await getPhoneNumber({
      //   fail: (err) => {
      //     console.log("Lỗi đăng nhập: ", err);
      //   },
      // });
      const user = get(userState);
      const phone = get(phoneState);
      if (phone !== undefined && user != null) {
        var response = await userApi.userLogin(phone, user.name);
        if (response.status == 200) {
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
          var member = await userApi.getUserInfo(
            response.data.data.userId ?? ""
          );
          return member.data;
        }
      }

      // if (token !== undefined && user != null) {
      //   console.log("token", token);
      //   console.log("accessToken", accessToken);
      //   var response = await userApi.userLogin(accessToken, token, user.name);
      //   if (response.status == 200) {
      //     axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
      //     setStorage({
      //       data: {
      //         token: response.data.data.token,
      //         userId: response.data.data.userId,
      //       },
      //       success: (data) => {
      //         console.log("set ok", data);
      //       },
      //       fail: (error) => {
      //         console.log("set error", error);
      //       },
      //     });
      //     var member = await userApi.getUserInfo(response.data.data.userId ?? "");
      //     return member.data;
      //   }
      // }
      return null;
    }
    return null;
  },
  set: ({ set, get }) => {
    const cart = get(cartState);
    const member = get(memberState);
    let res = { ...cart };
    res = {
      ...cart,
      customerId: member?.membershipId,
      customerName: member?.fullname,
      customerPhone: member?.phoneNumber,
    };
    console.log("cart set", res);
    set(cartState, res);
  },
});

export const memberByRawPhoneInputState = selector({
  key: "memberByRawPhoneInput",
  get: async ({ get }) => {
    const keyPhoneSearch = get(phoneSearchState);
    if (keyPhoneSearch.length >= 10) {
      const membersSearch = await membershipApi.getMemberships(keyPhoneSearch);

      return membersSearch.data;
    }
    return null;
  },
});

export const recentSearchMembersKeyState = atom({
  key: "recentSearchMembersKey",
  default: "recentSearchMembers",
});

export const rawPhoneNumberState = atom<string>({
  key: "rawPhoneNumber",
  default: "",
});

export const phoneSearchState = selector<string>({
  key: "phoneSearch",
  get: ({ get }) => {
    const rawPhoneNumber = get(rawPhoneNumberState);
    return rawPhoneNumber.replace(/^0/, "+84");
  },
  set: ({ set }, newValue) => {
    // if (typeof newValue === "string" && newValue.length == 10) {
    set(rawPhoneNumberState, newValue);
    // } else set(rawPhoneNumberState, "");
  },
});
