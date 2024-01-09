import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { User } from "types/user";

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

const userApi = {
  getListStore,
  userLogin,
};

export default userApi;
