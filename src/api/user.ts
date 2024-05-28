import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Membership, MembershipCard, UserLogin } from "types/user";
import { Promotion } from "types/promotion";

import { axiosInstances } from 'utils/axios';

const requestPomotion = axiosInstances.promotion;
const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TStore>>(`brands/stores`, {
    params,
  });

const userLogin = (phone: string, name: string) => {

  const body = {
    phone: phone,
    name: name,
  }
  return requestPomotion.post<UserLogin>(`/memberships/signin-zalo?apiKey=E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6`, body);
};

// const userLogin = (phone: string, name: string) => {
//   const data = {
//     phone: phone,
//     brandCode: "BEANAPP",
//     fullName: name,
//   };
//   return requestWebAdmin.post<User>("/users/sign-in/zalo", data);
// };

const getListPromotion = (id: string, params?: any) =>
  requestPomotion.get<Promotion[]>(`memberships/${id}/promotions?apiKey=E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6`, {
    params,
  });

const getMembershipCard = (id: string, params?: any) =>
  requestPomotion.get<MembershipCard[]>(`/memberships/${id}/membershipcards`, {
    params,
  });

const getUserInfo = (id: string, params?: any) =>
  requestPomotion.get<Membership>(`/memberships/${id}`, {
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
  getMembershipCard,
  generateQrCode,
  getUserInfo,
};

export default userApi;
