import userApi from "api/user";
import zaloApi from "api/zalo-api";
import { atom, selector } from "recoil";
import { UserInfo } from "types/user";
import axios from "utils/axios";
import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk";

export const membershipState = atom<UserInfo | null>({
  key: "membership",
  default: null,
});

export const requestRetriveQRstate = atom({
  key: "requestRetriveQR",
  default: 0,
});

export const accessTokenState = selector({
  key: "accessToken",
  get: () =>
    getAccessToken({
      success: (accessToken) => {
        return accessToken;
      },
      fail: (error) => {
        console.log(error);
      },
    }),
});

export const phoneTokenState = selector({
  key: "phoneToken",
  get: () =>
    getPhoneNumber({
      success: async (data) => {
        if (data.token !== undefined) {
          return data.token;
        } else {
          return null;
        }
      },
      fail: (error) => {
        console.log(error);
        return null;
      },
    }),
});

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const phoneState = selector<string | undefined>({
  key: "phone",
  get: async ({ get }) => {
    const accessToken = await getAccessToken();
    let phone = "0337076898";
    if (true) {
      const { token } = await getPhoneNumber({
        fail: (err) => {
          console.log("Lỗi đăng nhập: ", err);
        },
      });
      if (token !== undefined) {
        await zaloApi.getUserPhone(token, accessToken).then((value) => {
          phone = value.data.data.number.replace(/^\84/, "0");
        });
      }
      return phone;
    }
  },
});

export const memberState = selector({
  key: "member",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const user = get(userState);
      const phone = get(phoneState);
      if (phone !== undefined && user != null) {
        var response = await userApi.userLogin(phone, user.name);
        if (response.status == 200) {
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
          var member = await userApi.getUserInfo(
            response.data.data.userId ?? ""
          );
          console.log(member.data);
          return member.data;
        }
      }
      return null;
    }
    return null;
  },
});

export const qrState = selector({
  key: "qrCode",
  get: async ({ get }) => {
    const request = get(requestRetriveQRstate);
    if (request) {
      const member = get(memberState);
      if (member !== null) {
        const listOrder = await userApi.generateQrCode(
          member?.membershipId || ""
        );
        return listOrder.data;
      }
    }
    return null;
  },
});
