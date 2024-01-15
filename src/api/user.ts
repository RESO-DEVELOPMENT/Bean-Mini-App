import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { User, UserInfo } from "types/user";
import { Promotion } from "types/promotion";

const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TStore>>(`brands/stores`, {
    params,
  });

const userLogin = (phone: string, name: string) => {
  const data = {
    phone: phone,
    brandCode: "BEANAPP",
    fullName: name,
  };
  return requestWebAdmin.post<User>("/users/sign-in/zalo", data);
};

const getListPromotion = (id: string, params?: any) =>
  requestWebAdmin.get<Promotion[]>(`users/${id}/promotions`, {
    params,
  });

const getUserInfo = (id: string, params?: any) =>
  requestWebAdmin.get<UserInfo>(`users/${id}`, {
    params,
  });
const generateQrCode = (id: string, params?: any) =>
  requestWebAdmin.post<string>(`users/${id}/generate-qr`, {
    params,
  });

const userApi = {
  getListStore,
  userLogin,
  getListPromotion,
  generateQrCode,
  getUserInfo,
};

export default userApi;
