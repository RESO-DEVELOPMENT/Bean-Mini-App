import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { User, UserInfo, UserLogin } from "types/user";
import { Promotion } from "types/promotion";

import { axiosInstances } from 'utils/axios';

const requestPomotion = axiosInstances.promotion;
const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TStore>>(`brands/stores`, {
    params,
  });

const userLogin = (access_token: string, code: string, name: string) => {

  const body = {
    "accessToken": access_token,
    "token": code,
    "name": name
  }
  return requestPomotion.post<UserLogin>(`/memberships/signin-zalo?apiKey=E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6`, body);
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
