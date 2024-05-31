import userApi from "api/user";
import zaloApi from "api/zalo-api";
import { atom, selector } from "recoil";
import { UserInfo } from "types/user";
import axios from "utils/axios";
import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk";
import { cartState } from "./cart.state";
import { memberState } from "./member.state";

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
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return phone;
    }
  },
});



export const qrState = selector({
  key: "qrCode",
  get: async ({ get }) => {
    const request = get(requestRetriveQRstate);
    if (request) {
      const member = get(memberState);
      if (member !== null) {
        const listOrder = await userApi.generateQrCode(member?.membershipId ?? "");
        return listOrder.data;
      }
    }
    return null;
  },
});
